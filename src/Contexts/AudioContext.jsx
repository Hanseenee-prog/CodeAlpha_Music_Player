import { createContext, useState, useRef, useContext, useEffect } from "react";
import songs from "../data/songs";

const AudioContext = createContext();

/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */

export const AudioProvider = ({ children }) => {
    const [currentSongIndex, setCurrentSongIndex] = useState(() => JSON.parse(localStorage.getItem('current-song-index')) || 0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(70);
    const [repeat, setRepeat] = useState('off');
    const [shuffle, setShuffle] = useState(() => JSON.parse(localStorage.getItem('shuffle-mode')) || false);
    const [nowPlaying, setNowPlaying] = useState(songs[currentSongIndex]);
    const audioRef = useRef(null);

    const [originalQueue, setOriginalQueue] = useState(() => JSON.parse(localStorage.getItem('original-queue')) || songs); // The source (playlist/library)
    const [activeQueue, setActiveQueue] = useState(() => JSON.parse(localStorage.getItem('active-queue')) || songs); // The list that respects shuffle
    const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('music-history')) || []); // Recently played

    const getPlaybackQueue = () => shuffle ? activeQueue : originalQueue;

    useEffect(() => {
        audioRef.current = new Audio();
        audioRef.current.volume = 0.7; // Initial volume

        const queue = getPlaybackQueue();
        audioRef.current.src = queue[currentSongIndex].audioSrc // Load the song with currentIndex on first mount
        setNowPlaying(queue[currentSongIndex]);

        const audio = audioRef.current;

        audio.addEventListener('loadedmetadata', () => {
            setDuration(audio.duration);
        });

        audio.addEventListener('timeupdate', () => {
            setCurrentTime(audio.currentTime);
        })

        return () => {
            audio.pause();
            audio.src = '';
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('current-song-index', JSON.stringify(currentSongIndex))
    }, [currentSongIndex])

    const playSong = (index, newQueue = originalQueue ) => {
        const song = newQueue[index];
        if (!song) return;

        // Let playSong play from the queue (so that playlists and favorites can be respected)
        setOriginalQueue(() => {
            const updatedQueue = [...newQueue];
            localStorage.setItem('original-queue', JSON.stringify(updatedQueue));
            return updatedQueue;
        });

        // Set the recently played songs to filter out the song that was already there if the same song is added
        setHistory(prev => {
            const updatedHistory = [song, ...prev.filter(s => s.id !== song.id)].slice(0, 10);
            localStorage.setItem('music-history', JSON.stringify(updatedHistory));
            
            return updatedHistory;
        });

        setCurrentSongIndex(index);
        setNowPlaying(song)
        audioRef.current.src = newQueue[index].audioSrc;
        audioRef.current.play();
        setIsPlaying(true);
    }

    const togglePlayPause = () => {
        if (isPlaying) audioRef.current.pause();
        else audioRef.current.play();

        setIsPlaying(!isPlaying);
    }

    const handleNext = () => {
        let nextIndex;
        const queue = getPlaybackQueue();

        if (shuffle) {
            // if shuffle mode is on, generate a random index that is not the current one
            do {
                nextIndex = Math.floor(Math.random() * songs.length);
            } while (nextIndex === currentSongIndex && songs.length > 1);
        } else {
            nextIndex = currentSongIndex === songs.length - 1 ? 0 : currentSongIndex + 1;
        }

        setCurrentSongIndex(nextIndex);
        playSong(nextIndex);
        setNowPlaying(queue[nextIndex]);
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
        return () => {
            audio.removeEventListener('ended', handleSongEnd);
        }
    }, [repeat, shuffle, currentSongIndex])

    const handlePrev = () => {
        const queue = getPlaybackQueue();
        
        // If more than 3 secs played, restart the current song
        if (audioRef.current.currentTime > 3) audioRef.current.currentTime = 0;
        else {
            const prevIndex = currentSongIndex === 0 ? songs.length - 1 : currentSongIndex - 1;

            setCurrentSongIndex(prevIndex);
            playSong(prevIndex);
            setNowPlaying(queue[prevIndex]);
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

        setActiveQueue(prevQueue => {
            let newQueue;

            if (nextShuffleState) {
                // SHUFFLE ON: Create a randomized version of the queue
                // Pro Tip: Keep the 'nowPlaying' song at the top so it doesn't jump
                const currentSong = prevQueue[currentSongIndex];
                const otherSongs = prevQueue.filter((_, i) => i !== currentSongIndex);
                
                newQueue = [currentSong, ...otherSongs.sort(() => Math.random() - 0.5)];
                setCurrentSongIndex(0);
            } else {
                // SHUFFLE OFF: Restore the original order from your backup
                newQueue = [...originalQueue];
                
                // Re-find the index of the current song in the original order
                const newIndex = newQueue.findIndex(s => s.id === nowPlaying.id);
                setCurrentSongIndex(newIndex);
            }

            localStorage.setItem('active-queue', JSON.stringify(newQueue));
            localStorage.setItem('shuffle-mode', JSON.stringify(nextShuffleState));

            return newQueue;
        });
    };

    const value = {
        currentSongIndex, setCurrentSongIndex,
        isPlaying, setIsPlaying,
        currentTime, setCurrentTime,
        duration, setDuration,
        audioRef,
        volume, setVolume,
        repeat, setRepeat,
        shuffle, toggleShuffle,
        nowPlaying, setNowPlaying,
        originalQueue, setOriginalQueue,
        activeQueue, setActiveQueue,
        history, setHistory,
        
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