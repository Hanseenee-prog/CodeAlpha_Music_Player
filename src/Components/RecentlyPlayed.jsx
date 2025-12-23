import { Play } from "lucide-react";
import { useAudio } from "../Contexts/AudioContext";
import { useEffect, useRef } from "react";
import handleSongClick from "../utils/handleSongClick";

const RecentlyPlayed = () => {
    const { history, playSong, getPlaybackQueue } = useAudio();
    const scrollRef = useRef(null);

    useEffect(() => {
        if (!scrollRef) return;

        scrollRef.current.scrollTo({
            left: 0,
            behavior: 'smooth'
        })
        
    }, [history]);

    const queue = getPlaybackQueue();

    return ( 
        <div className="w-full py-4">
            {/* Horizontal Scroll Container */}
            <div 
                className="flex flex-row gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x px-2"
                ref={scrollRef}
            >
                {(history.length > 0) ? (
                    history.map((song) => (
                        <div 
                            key={song.id}
                            className="group flex flex-col items-center min-w-30 md:min-w-35 snap-center cursor-pointer"
                            onClick={() => handleSongClick(song, queue, playSong)}
                        >
                            {/* Artwork Container with Hover Play Button */}
                            <div className="relative w-28 h-28 md:w-32 md:h-32 mb-3">
                                <img 
                                    src={song.coverImage} 
                                    alt={song.title} 
                                    className="w-full h-full object-cover rounded-2xl shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl group-hover:brightness-75"
                                />
                                
                                {/* Hidden Play Icon on Hover */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 shadow-lg">
                                        <Play size={24} className="text-white fill-white ml-1" />
                                    </div>
                                </div>
                            </div>

                            {/* Text Info */}
                            <div className="flex flex-col items-center text-center max-w-full px-1">
                                <span className="text-sm font-bold text-gray-900 truncate w-full tracking-tight">
                                    {song.title}
                                </span>
                                <span className="text-[11px] font-medium text-gray-400 uppercase tracking-widest mt-0.5">
                                    {song.artist}
                                </span>
                            </div>
                        </div>
                    ))
                    ) : (
                        <div className="w-full text-center">
                            <span className="text-xl font-semibold text-gray-400">You haven't played any songs yet</span>
                            <span className="text-sm">Start listening to see your recently played tracks</span>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default RecentlyPlayed;
