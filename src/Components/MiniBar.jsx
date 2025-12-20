import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { useAudio } from '../Contexts/AudioContext';

const MiniBar = () => {
    const { 
        currentSong, currentTime,
        handleSeek, isPlaying, togglePlayPause
    } = useAudio();

    if (!currentSong) return null;

    const { title, artist, duration } = currentSong;

    // Converts time like "5:30" to seconds
    const timeToSec = (time) => {
        const [minutes, seconds] = time.split(":").map(Number);
        return (minutes * 60) + seconds;
    }                       

    // Converts the current duration to a percentage value
    const progress = timeToSec(duration) > 0 ? Math.floor((currentTime / timeToSec(duration)) * 100) : 0;

    const handleSliderChange = (e) => {
        const percentage = e.target.value;
        const newTime = Math.floor((percentage / 100) * timeToSec(duration));
        handleSeek(newTime);
    }

    return (
        <div className="justify-between sticky bottom-0 w-full h-30 bg-gray-300 rounded-t-lg flex items-center">
            <div className="flex flex-row items-center gap-2">
                <img src='../public/image.webp' className='w-10 mx-2' />

                <span className='flex flex-col text-[14px]'>
                    <span>{title}</span>
                    <span>{artist}</span>
                    <span className="">Now Playing</span>
                </span>
            </div>

            <div className='flex flex-col items-center w-3/5'>
                <input 
                    type="range" 
                    min="0" 
                    max={duration}
                    value={progress}
                    onChange={handleSliderChange} 
                    className="mx-4 w-4/5" 
                />
                
                <div className='w-3/5 flex justify-between'>
                    <button><SkipBack /></button>
                    <button
                        onClick={togglePlayPause}
                    >
                        {isPlaying ? <Pause /> : <Play />}
                    </button>
                    <button><SkipForward /></button>
                </div>
            </div>

            <div>{Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')} / {duration}</div>
        </div>
    )
}

export default MiniBar;