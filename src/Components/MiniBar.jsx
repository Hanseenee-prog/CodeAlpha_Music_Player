import { 
    Play, Pause, SkipBack, SkipForward, 
    Volume1Icon, ShuffleIcon, RepeatIcon 
} from 'lucide-react';

import { useAudio } from '../Contexts/AudioContext';
import songs from '../data/songs';

const MiniBar = () => {
    const { 
        currentSongIndex, currentTime,
        handleSeek, isPlaying, togglePlayPause,
        handleNext, handlePrev
    } = useAudio();

    if (!songs[currentSongIndex]) return null;

    const { title, artist, duration } = songs[currentSongIndex];

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
        <div className="justify-between sticky bottom-16 md:bottom-0 w-full bg-gray-300 rounded-lg flex items-center">
            <div className="flex flex-row items-center gap-2 shrink-0 w-40">
                <img src='../public/image.webp' className='w-10 mx-2' />

                <span className='flex flex-col text-[14px]'>
                    <span className='whitespace-nowrap font-semibold'>{title}</span>
                    <span>{artist}</span>
                </span>
            </div>

            <div className='w-2/5 flex gap-1 h-20 md:h-30 justify-center items-center'>
                <div className='hidden md:flex flex-col items-center w-4/5'>
                    <div className='flex flex-row w-full'>
                        <span className='hidden md:block'>{Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')}</span>
                        
                        <input 
                            type="range" 
                            min="0" 
                            max={duration}
                            value={progress}
                            onChange={handleSliderChange} 
                            className="mx-2 w-[90%]" 
                        />
                        
                        <span className='hidden md:block'>{duration}</span>
                    </div>
                    
                    <div className='w-3/5 flex justify-between'>
                        <button>
                            <ShuffleIcon />
                        </button>

                        <button
                            onClick={handlePrev}
                        ><SkipBack /></button>

                        <button
                            onClick={togglePlayPause}
                        >
                            {isPlaying ? <Pause /> : <Play />}
                        </button>

                        <button
                            onClick={handleNext}
                        ><SkipForward /></button>

                        <button>
                            <RepeatIcon />
                        </button>
                    </div>
                </div>
            </div>
          
            <div className='hidden md:block'>
                <div className='flex'>
                    <Volume1Icon />
                    <input 
                            type="range" 
                            min="0" 
                            max="100"
                            className="mx-1 w-2/5" 
                        />
                </div>
            </div>

            <div className='flex flex-row mx-4 gap-2 md:hidden'>
                <div className=''>
                    <span>{Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')}</span> 
                </div>

                <button
                    onClick={togglePlayPause}
                    className=''
                >
                    {isPlaying ? <Pause /> : <Play />}
                </button>
            </div>
        </div>
    )
}

export default MiniBar;