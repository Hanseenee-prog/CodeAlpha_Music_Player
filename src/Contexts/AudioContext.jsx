import { createContext, useState, useRef, useContext, useEffect } from "react";

const AudioContext = createContext();

/* eslint-disable react-refresh/only-export-components */

export const AudioProvider = ({ children }) => {
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(null);

    useEffect(() => {
        audioRef.current = new Audio();
        const audio = audioRef.current;

        audio.addEventListener('loadedmeta', () => {
            setDuration(audio.duration);
        });

        audio.addEventListener('timeupdate', () => {
            setCurrentTime(audio.currentTime);
        })

        audio.addEventListener('ended', () => {
            setIsPlaying(false);
        })

        return () => {
            audio.pause();
            audio.src = '';
        }
    }, [])

    const playSong = (song) => {
        setCurrentSong(song);

        audioRef.current.src = song.audioSrc;
        audioRef.current.play();

        setIsPlaying(true);
    }

    const togglePlayPause = () => {
        if (isPlaying) audioRef.current.pause();
        else audioRef.current.play();

        setIsPlaying(!isPlaying)
    }

    const handleNext = () => {

    }

    const handlePrev = () => {
        
    }

    const handleSeek = (time) => {
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    }

    const value = {
        currentSong, setCurrentSong,
        isPlaying, setIsPlaying,
        currentTime, setCurrentTime,
        duration, setDuration,
        audioRef,
        
        playSong, togglePlayPause,
        handleNext, handlePrev,
        handleSeek
    }

    return (
        <AudioContext.Provider value={value}>
            { children }
        </AudioContext.Provider>
    )
}

export const useAudio = () => useContext(AudioContext);