import { Play } from "lucide-react";

const RecentlyPlayed = () => {
    // In a real app, you would likely pull this from a 'songs' data file
    const recentlyPlayed = [
        { id: 1, title: "Song A", artist: "Artist A", cover: '../public/images/image.webp' },
        { id: 2, title: "Song B", artist: "Artist B", cover: '../public/images/image.webp' },
        { id: 3, title: "Song C", artist: "Artist C", cover: '../public/images/image.webp' },
        { id: 4, title: "Song D", artist: "Artist D", cover: '../public/images/image.webp' },
        { id: 5, title: "Song E", artist: "Artist E", cover: '../public/images/image.webp' },
        { id: 6, title: "Song F", artist: "Artist F", cover: '../public/images/image.webp' },
    ]

    return ( 
        <div className="w-full py-4">
            {/* Horizontal Scroll Container */}
            <div className="flex flex-row gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x px-2">
                {recentlyPlayed.map(song => (
                    <div 
                        key={song.id}
                        className="group flex flex-col items-center min-w-30 md:min-w-35 snap-center cursor-pointer"
                    >
                        {/* Artwork Container with Hover Play Button */}
                        <div className="relative w-28 h-28 md:w-32 md:h-32 mb-3">
                            <img 
                                src={song.cover} 
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
                ))}
            </div>
        </div>
    );
}

export default RecentlyPlayed;
