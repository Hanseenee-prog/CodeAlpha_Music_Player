import { useState } from "react";
import { useAudio } from "../Contexts/AudioContext";
import songs from "../data/songs";
import { 
    Play, Pause, SkipBack, SkipForward, 
    Shuffle, Repeat, Repeat1, Heart, 
    ListMusic, X
} from "lucide-react";

const NowPlaying = () => {
    const { 
        nowPlaying, isPlaying, togglePlayPause, 
        handleNext, handlePrev, currentTime, handleSeek,
        shuffle, setShuffle, repeat, toggleRepeat 
    } = useAudio();

    const [showMobileQueue, setShowMobileQueue] = useState(false);

    const timeToSec = (time) => {
        if (!time) return 0;
        const [m, s] = time.split(":").map(Number);
        return (m * 60) + s;
    };

    if (!nowPlaying) return (
        <div className="h-full flex items-center justify-center bg-gray-50 text-gray-400 font-medium">
            Select a track to start vibing
        </div>
    );

    const { title, artist, duration, coverImage } = nowPlaying;
    const durationSec = timeToSec(duration);
    const progress = durationSec > 0 ? (currentTime / durationSec) * 100 : 0;

    return (
        <div className="relative h-4/5 lg:h-[85%] w-full overflow-hidden bg-white flex flex-col md:flex-row">
            {/* Background Ambient Glow */}
            <div 
                className="absolute inset-0 opacity-10 blur-[100px] pointer-events-none"
                style={{ backgroundImage: `url(${coverImage})`, backgroundSize: 'cover' }}
            />

            {/* Left: Interactive Media Section */}
            <div className="relative flex-1 z-10 flex flex-col items-center justify-between p-6 md:p-8 lg:p-12 overflow-hidden">
                
                {/* Mobile Header Action */}
                <div className="w-full flex justify-end lg:hidden">
                    <button 
                        onClick={() => setShowMobileQueue(true)}
                        className="p-3 bg-blue-50 text-blue-600 rounded-2xl flex items-center gap-2 font-bold text-xs uppercase tracking-widest active:scale-95 transition-transform"
                    >
                        <ListMusic size={18} />
                        Up Next
                    </button>
                </div>

                {/* Floating Artwork - Responsive Sizing */}
                <div className="flex-1 flex items-center justify-center w-full min-h-0">
                    <div className="relative group max-h-full aspect-square max-w-70 md:max-w-95 lg:max-w-105">
                        <img 
                            src={coverImage} 
                            alt={title}
                            className="w-full h-full rounded-[40px] md:rounded-[56px] shadow-2xl object-cover transition-transform duration-500 group-hover:scale-[1.02]" 
                        />
                        <div className="absolute -inset-4 bg-blue-500/5 rounded-[64px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                </div>

                {/* Controls Container */}
                <div className="w-full max-w-md mx-auto space-y-4 md:space-y-6 pt-4">
                    <div className="text-center md:text-left">
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight leading-tight truncate">
                            {title}
                        </h1>
                        <p className="text-base md:text-lg font-semibold text-blue-600 mt-1">{artist}</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1">
                        <div className="relative h-6 flex items-center group/scrub">
                            <input 
                                type="range" min="0" max="100" value={progress}
                                onChange={(e) => handleSeek(Math.floor((e.target.value / 100) * durationSec))}
                                className="absolute w-full h-1.5 bg-gray-100 rounded-full appearance-none cursor-pointer accent-blue-600 z-10 opacity-0"
                            />
                            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-600 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
                            </div>
                        </div>
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-gray-400">
                            <span>{Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60).toString().padStart(2, '0')}</span>
                            <span>{duration}</span>
                        </div>
                    </div>

                    {/* Control Hub */}
                    <div className="flex items-center justify-between px-6 py-4 md:py-6 bg-gray-50/50 rounded-4xl border border-gray-100">
                        <button onClick={() => setShuffle(!shuffle)} className={`transition-colors ${shuffle ? 'text-blue-600' : 'text-gray-400'}`}>
                            <Shuffle size={18} />
                        </button>
                        <div className="flex items-center gap-4 md:gap-8">
                            <button onClick={handlePrev} className="text-gray-900 hover:text-blue-600 transition-colors">
                                <SkipBack size={24} fill="currentColor" />
                            </button>
                            <button 
                                onClick={togglePlayPause}
                                className="w-14 h-14 md:w-16 md:h-16 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-blue-200 hover:scale-105 transition-transform"
                            >
                                {isPlaying ? <Pause size={28} fill="white" /> : <Play size={28} className="ml-1" fill="white" />}
                            </button>
                            <button onClick={handleNext} className="text-gray-900 hover:text-blue-600 transition-colors">
                                <SkipForward size={24} fill="currentColor" />
                            </button>
                        </div>
                        <button onClick={toggleRepeat} className={`transition-colors ${repeat !== 'off' ? 'text-blue-600' : 'text-gray-400'}`}>
                            {repeat === 'one' ? <Repeat1 size={18} /> : <Repeat size={18} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Right: Desktop Queue Sidebar */}
            <aside className="hidden lg:flex flex-col w-96 z-20 border-l border-gray-50 p-8">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
                        <ListMusic size={22} className="text-blue-600" />
                        Up Next
                    </h2>
                </div>

                <div className="flex-1 space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                    {songs.slice(0, 8).map((song, idx) => (
                        <div key={idx} className="group flex items-center gap-4 p-2 rounded-2xl hover:bg-gray-50 transition-colors cursor-pointer">
                            <img src={song.coverImage} className="w-12 h-12 rounded-xl object-cover shadow-sm" alt="art" />
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-sm truncate text-gray-900">{song.title}</p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{song.artist}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </aside>

            {/* Mobile/Tablet Queue Bottom Sheet */}
            <div 
                className={`fixed inset-0 z-60 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${showMobileQueue ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setShowMobileQueue(false)}
            >
                <div 
                    className={`absolute bottom-0 w-full bg-white rounded-t-[40px] p-8 transition-transform duration-500 ease-out ${showMobileQueue ? 'translate-y-0' : 'translate-y-full'}`}
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-black">Up Next</h2>
                        <button onClick={() => setShowMobileQueue(false)} className="p-2 bg-gray-100 rounded-full">
                            <X size={20} />
                        </button>
                    </div>
                    <div className="max-h-[60vh] overflow-y-auto space-y-4 pr-2">
                        {songs.slice(0, 10).map((song, idx) => (
                            <div key={idx} className="flex items-center gap-4 p-2">
                                <img src={song.coverImage} className="w-14 h-14 rounded-2xl object-cover shadow-sm" alt="art" />
                                <div className="flex-1">
                                    <p className="font-bold text-sm">{song.title}</p>
                                    <p className="text-xs text-gray-400 font-bold uppercase">{song.artist}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NowPlaying;
