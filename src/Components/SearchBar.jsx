import { Search } from "lucide-react";

const SearchBar = () => {
    return (
        <div className="z-50 bg-gray-50/80 backdrop-blur-md sticky top-0 py-4 flex items-center gap-2">
            <div className="relative flex-1 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-amber-500 transition-colors" size={20} />
                <input
                    type="text"
                    placeholder="Search songs, artists..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-transparent outline-none transition-all shadow-sm"
                />
            </div>
        </div>
    );
}

export default SearchBar;
