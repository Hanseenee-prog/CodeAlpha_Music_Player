import { useSongCover } from "../Hooks/useSongCover";

const UpNextSongItem = ({
    song,
    isActive,
    onClick,
    size = "desktop", // desktop or mobile
}) => {
    const { coverSrc } = useSongCover(song.id);

    return ( 
        <div
            className={`
                ${(size === "desktop")
                    ? "group flex items-center gap-4 p-2 rounded-2xl transition-colors cursor-pointer"
                    : "flex items-center gap-4 p-2 hover:bg-gray-100 cursor-pointer"
                }
                
                ${isActive ? 'bg-blue-100 hover:bg-blue-200' : 'hover:bg-gray-50'}
                `}
            onClick={onClick}
        >
            <img src={coverSrc} className={`
                ${(size === "desktop")
                    ? "w-12 h-12 rounded-xl object-cover shadow-sm"
                    : "w-14 h-14 rounded-2xl object-cover shadow-sm"
                }
            `} alt="art" />
            <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate text-gray-900">{song.title}</p>
                <p className={`
                    ${(size === "desktop") 
                        ? "text-[10px] font-bold text-gray-400 uppercase tracking-tight"
                        : "text-xs text-gray-400 font-bold uppercase"
                    }
                `}>{song.artist}</p>
            </div>
        </div>
    );
}
 
export default UpNextSongItem;