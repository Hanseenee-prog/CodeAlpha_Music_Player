import { createContext, useState, useRef, useContext, useEffect } from "react";
import songs from "../data/songs";
import shuffleQueue from '../utils/shuffleQueue';

const AudioContext = createContext();

/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */

export const AudioProvider = ({ children }) => {
    const [currentSongIndex, setCurrentSongIndex] = useState(() => JSON.parse(localStorage.getItem('current-song-index')) || 0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(() => JSON.parse(localStorage.getItem('current-song-time')) || 0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(() => JSON.parse(localStorage.getItem('current-song-volume')) || 70);
    const [repeat, setRepeat] = useState(() => localStorage.getItem('current-song-repeat') || 'off');
    const [shuffle, setShuffle] = useState(() => JSON.parse(localStorage.getItem('shuffle-mode')) || false);
    const [nowPlaying, setNowPlaying] = useState(songs[currentSongIndex]);
    const [queueSource, setQueueSource] = useState(() => localStorage.getItem('queue-source') || 'Library'); // 'library', 'favorites', 'playlist'
    const audioRef = useRef(null);

    const [librarySongs, setLibrarySongs] = useState(() => JSON.parse(localStorage.getItem('library-songs')) || songs); // All the songs on the site
    const [originalQueue, setOriginalQueue] = useState(() => JSON.parse(localStorage.getItem('original-queue')) || songs); // The list that respects mode (playlists or favorites)
    const [activeQueue, setActiveQueue] = useState(() => JSON.parse(localStorage.getItem('active-queue')) || songs); // The list that respects shuffle
    const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('music-history')) || []); // Recently played

    const getPlaybackQueue = () => shuffle ? activeQueue : originalQueue;

    // This useEffect is for loading the song that was last played or with currentSongIndex on first mount
    // Else it won't be able to be played
    useEffect(() => {
        audioRef.current = new Audio();
        audioRef.current.volume = volume / 100;

        const queue = getPlaybackQueue();

        // Load the song with currentIndex on first mount
        audioRef.current.src = queue[currentSongIndex].audioSrc; 
        audioRef.current.currentTime = currentTime;
        setNowPlaying(queue[currentSongIndex]);

        const audio = audioRef.current;

        const handlers = {
            loadedemetadata: () => setDuration(audio.duration),
            timeupdate: () => setCurrentTime(audio.currentTime),
            play: () => setIsPlaying(true),
            pause: () => setIsPlaying(false),
        }

        Object.entries(handlers).forEach(([event, handler]) => {
            audio.addEventListener(event, handler);
        })

        return () => {
            Object.entries(handlers).forEach(([event, handler]) => {
                audio.removeEventListener(event, handler);
            })
            audio.src = '';
        }
    }, [])

    // This useEffect is for persisting values to localStorage
    useEffect(() => {
        localStorage.setItem('current-song-index', JSON.stringify(currentSongIndex));
        localStorage.setItem('current-song-time', JSON.stringify(currentTime));
        localStorage.setItem('current-song-volume', JSON.stringify(volume));
        localStorage.setItem('current-song-repeat', repeat);
        localStorage.setItem('original-queue', JSON.stringify(originalQueue));
        localStorage.setItem('active-queue', JSON.stringify(activeQueue));
        localStorage.setItem('library-songs', JSON.stringify(librarySongs));
        localStorage.setItem('music-history', JSON.stringify(history));
    }, [currentSongIndex, currentTime, volume, repeat, originalQueue, activeQueue, librarySongs, history])

    const playSong = (
        index, 
        newQueue = originalQueue, 
        source = 'library', 
        skipQueueUpdate = false, 
        shouldAutoPlay = true
    ) => {
        const song = newQueue[index];
        if (!song) return;

        setQueueSource(source);
        localStorage.setItem('queue-source', source);

        let finalQueue, finalIndex;

        if (skipQueueUpdate) {
            finalQueue = getPlaybackQueue();
            finalIndex = index;
        } 
        else {
            // Check if we're switching to a different queue
            const isNewQueue = JSON.stringify(originalQueue) !== JSON.stringify(newQueue);

            setOriginalQueue(newQueue);

            // New queue + shuffle on, shuffle it
            if (isNewQueue && shuffle) {
                finalQueue = shuffleQueue(newQueue, index);
                finalIndex = 0;
                console.log('New queue + shuffle on, shuffle it ran 1')
            }
            // New queue + shuffle off, do not shuffle
            else if (isNewQueue && !shuffle) {
                finalQueue = newQueue;
                finalIndex = index;
                console.log('New queue + shuffle off, do not shuffle ran 2')
            } 
            // Same queue, so do not shuffle, use existing activeQueue
            else if (!isNewQueue && shuffle) {
                finalQueue = activeQueue;
                finalIndex = activeQueue.findIndex(s => s.id === song.id)
                console.log('Same queue, so do not shuffle, use existing activeQueue ran 3')
            } 
            // Same queue + shuffle off, use original
            else {
                finalQueue = originalQueue;
                finalIndex = index;
                console.log('Same queue + shuffle off, use original ran 4')
            }

            setActiveQueue(finalQueue);
        }
        
        setCurrentSongIndex(finalIndex);

        // Set the recently played songs to filter out the song that was already there if the same song is added
        setHistory(prev => [song, ...prev.filter(s => s.id !== song.id)].slice(0, 10));
        
        audioRef.current.src = finalQueue[finalIndex].audioSrc;
        setNowPlaying(song)

        if (shouldAutoPlay) {
            audioRef.current.play();
            setIsPlaying(true);
        } else {
            setIsPlaying(false);
            // We load the new song so the UI updates, but we don't play it
            audioRef.current.load();
        }
    }

    const togglePlayPause = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (audio.paused) audio.play();
        else audio.pause();
    }

    const handleNext = () => {
        const queue = getPlaybackQueue();
        if (queue.length === 0) return;

        const nextIndex = (currentSongIndex === queue.length - 1)
            ? 0
            : currentSongIndex + 1;

        playSong(nextIndex, queue, queueSource, true);
    }

    // This useEffect hook is put here so that the handleNext function can load before using it
    useEffect(() => {
        const audio = audioRef.current;

        const handleSongEnd = () => {
            if (repeat === 'one') {
                audio.currentTime = 0;
                audio.play();
            }
            else if (repeat === 'all') handleNext();
            else setIsPlaying(false);
        }

        audio.addEventListener('ended', handleSongEnd);

        // Cleanup function
        return () => audio.removeEventListener('ended', handleSongEnd);
    }, [repeat, shuffle, currentSongIndex])

    const handlePrev = () => {
        const queue = getPlaybackQueue();
        
        // If more than 3 secs played, restart the current song
        if (audioRef.current.currentTime > 3) audioRef.current.currentTime = 0;
        else {
            const prevIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;

            playSong(prevIndex, queue, queueSource, true);
        }
    }

    const handleSeek = (time) => {
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    }

    const handleVolChange = (value) => {
        const volumeValue = value / 100;
        audioRef.current.volume = volumeValue;
        setVolume(value);
    }

    const toggleRepeat = () => {
        // Cycle through: off to all to one to off
        if (repeat === 'off') setRepeat('all');
        else if (repeat === 'all') setRepeat('one');
        else setRepeat('off')
    }

    const toggleShuffle = () => {
        const nextShuffleState = !shuffle;
        setShuffle(nextShuffleState);

        let newQueue, newIndex;

        if (nextShuffleState) {
            newQueue = shuffleQueue(originalQueue, currentSongIndex);
            newIndex = 0;
        } 
        else {
            newQueue = [...originalQueue];
            newIndex = newQueue.findIndex(s => s.id === nowPlaying.id);
        }

        setActiveQueue(newQueue);
        setCurrentSongIndex(newIndex);
        localStorage.setItem('active-queue', JSON.stringify(newQueue));
        localStorage.setItem('shuffle-mode', JSON.stringify(nextShuffleState));

        return newQueue;
    };

    const deleteSong = (songId) => {
        const wasCurrent = nowPlaying?.id === songId;
        const wasPlaying = isPlaying; 

        setLibrarySongs(prev => prev.filter(s => s.id !== songId));
        setOriginalQueue(prev => prev.filter(s => s.id !== songId));
        setActiveQueue(prev => prev.filter(s => s.id !== songId));

        // If we deleted a song that wasn't playing, stop here.
        if (!wasCurrent) return;

        // Create the local updated queue (Synchronous, not waiting for State)
        const currentQueue = getPlaybackQueue();
        const updatedQueue = currentQueue.filter(s => s.id !== songId);

        if (updatedQueue.length > 0) {
            let nextIndex = currentSongIndex;
            if (nextIndex >= updatedQueue.length) nextIndex = 0;

            playSong(nextIndex, updatedQueue, queueSource, false, wasPlaying);
        } else {
            // Queue is empty
            audioRef.current.pause();
            audioRef.current.src = '';
            setNowPlaying(null);
            setIsPlaying(false);
        }
    };

    const value = {
        currentSongIndex, setCurrentSongIndex,
        isPlaying, setIsPlaying,
        currentTime, setCurrentTime,
        duration, setDuration,
        audioRef, deleteSong,
        volume, setVolume,
        repeat, setRepeat,
        shuffle, toggleShuffle,
        nowPlaying, setNowPlaying,
        originalQueue, setOriginalQueue,
        activeQueue, setActiveQueue,
        history, setHistory,
        librarySongs, setLibrarySongs,
        queueSource, setQueueSource,
        
        playSong, togglePlayPause,
        handleNext, handlePrev,
        handleSeek, handleVolChange,
        toggleRepeat, getPlaybackQueue,
    }

    return (
        <AudioContext.Provider value={value}>
            { children }
        </AudioContext.Provider>
    )
}

export const useAudio = () => useContext(AudioContext);