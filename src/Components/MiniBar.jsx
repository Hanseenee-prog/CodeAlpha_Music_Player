import { 
    Play, Pause, SkipBack, SkipForward, 
    Volume2, VolumeX, Shuffle, 
    Repeat, Repeat1, Heart
} from 'lucide-react';
import { useAudio } from '../Contexts/AudioContext';
import { useNavigate } from 'react-router-dom';

const MiniBar = () => {
    const { 
        currentSongIndex, currentTime, handleSeek, isPlaying, 
        togglePlayPause, handleNext, handlePrev, volume, 
        handleVolChange, repeat, shuffle, toggleShuffle, toggleRepeat,
        setNowPlaying, activeQueue
    } = useAudio();

    const navigate = useNavigate();
    const song = activeQueue[currentSongIndex];

    if (!song) return null;

    const { title, artist, duration, coverImage } = song;

    const timeToSec = (time) => {
        const [minutes, seconds] = time.split(":").map(Number);
        return (minutes * 60) + seconds;
    };

    const durationSec = timeToSec(duration);
    const progress = durationSec > 0 ? (currentTime / durationSec) * 100 : 0;

    const handleSliderChange = (e) => {
        const percentage = e.target.value;
        const newTime = Math.floor((percentage / 100) * durationSec);
        handleSeek(newTime);
    };

    const handleClick = () => {
        navigate('/now-playing');
        setNowPlaying(song);
    };

    return (
        <div 
            className="fixed bottom-20 md:bottom-6 left-4 md:left-28 lg:left-48 right-4 z-50 
                       bg-white/80 backdrop-blur-2xl border border-white/40 
                       shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-3xl 
                       flex items-center justify-between p-4 transition-all 
                       hover:bg-white/95 cursor-pointer group"
            onClick={handleClick}
        >
            {/* 
                LARGER CLICKABLE PROGRESS BAR 
                h-6 hit-area for easier dragging
            */}
            <div 
                className="absolute top-0 left-6 right-6 h-6 -translate-y-1/2 flex items-center z-20"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Visual Track */}
                <div className="relative w-full h-1.5 bg-gray-200/60 rounded-full overflow-hidden group-hover:h-2 transition-all">
                    <div 
                        className="h-full bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.4)]" 
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Functional Input (Transparent Layer) */}
                <input 
                    type="range"
                    min="0"
                    max="100"
                    step="0.1"
                    value={progress}
                    onChange={handleSliderChange}
                    className="absolute w-full h-full opacity-0 cursor-pointer accent-blue-600"
                />
            </div>

            {/* Song Info Section */}
            <div className="flex items-center gap-4 w-1/3 min-w-0">
                <div className="relative">
                    <img 
                        src={coverImage} 
                        className="w-14 h-14 rounded-2xl object-cover shadow-lg transform transition-transform group-hover:scale-105" 
                        alt="cover" 
                    />
                    {isPlaying && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-2xl">
                           <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                        </div>
                    )}
                </div>
                <div className="flex flex-col min-w-0">
                    <span className="font-extrabold text-[15px] text-gray-900 truncate tracking-tight">{title}</span>
                    <span className="text-xs font-medium text-gray-500 truncate">{artist}</span>
                </div>
            </div>

            {/* Controls Section (Center) */}
            <div className="flex items-center gap-3 md:gap-8 justify-center">
                <button
                    onClick={(e) => { e.stopPropagation(); toggleShuffle(!shuffle); }}
                    className={`hidden lg:block p-2 rounded-full hover:bg-gray-100 transition-all ${shuffle ? 'text-blue-600' : 'text-gray-400'}`}
                >
                    <Shuffle size={20} />
                </button>

                <button onClick={(e) => { e.stopPropagation(); handlePrev(); }} className="p-2 rounded-full hover:bg-gray-100 hover:scale-110 active:scale-95 transition-all">
                    <SkipBack size={24} fill="currentColor" />
                </button>

                <button
                    onClick={(e) => { e.stopPropagation(); togglePlayPause(); }}
                    className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-full shadow-xl shadow-blue-600/30 hover:scale-110 active:scale-90 transition-all"
                >
                    {isPlaying ? <Pause size={24} fill="white" /> : <Play size={24} className="ml-1" fill="white" />}
                </button>

                <button onClick={(e) => { e.stopPropagation(); handleNext(); }} className="p-2 rounded-full hover:bg-gray-100 hover:scale-110 active:scale-95 transition-all">
                    <SkipForward size={24} fill="currentColor" />
                </button>

                <button
                    onClick={(e) => { e.stopPropagation(); toggleRepeat(); }}
                    className={`hidden lg:block p-2 rounded-full hover:bg-gray-100 transition-all ${repeat !== 'off' ? 'text-blue-600' : 'text-gray-400'}`}
                >
                    {repeat === 'one' ? <Repeat1 size={20} /> : <Repeat size={20} />}
                </button>
            </div>

            {/* Right Options Section */}
            <div className="hidden md:flex items-center justify-end gap-6 w-1/3 pr-2">
                <div className="flex items-center gap-3 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
                    {volume === '0' ? <VolumeX size={18} className="text-gray-400" /> : <Volume2 size={18} className="text-blue-600" />}
                    <input 
                        type="range" min="0" max="100" value={volume}
                        onChange={(e) => handleVolChange(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-24 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                    />
                </div>
                <button onClick={(e) => e.stopPropagation()} className="p-2 hover:bg-red-50 rounded-full transition-colors group/heart">
                    <Heart className="text-gray-300 group-hover/heart:text-red-500 transition-colors" size={22} />
                </button>
            </div>

            {/* Mobile Time */}
            <div className="md:hidden flex flex-col items-end pr-2">
                <span className="text-[10px] font-bold text-blue-600/70 uppercase tracking-tighter">Live</span>
                <span className="text-xs font-black text-gray-800">
                    {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')}
                </span>
            </div>
        </div>
    );
};

export default MiniBar;
