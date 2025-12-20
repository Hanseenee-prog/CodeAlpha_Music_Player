import { Search } from "lucide-react";

const SearchBar = () => {
    return (
        <div className="z-50 bg-white sticky top-0 flex items-center border-b-2 border-amber-300 pb-2">
            <input
                type="text"
                placeholder="Search..."
                className="flex grow px-4 py-2 outline-none"
            />
            <button className="ml-2 p-2 bg-amber-500 rounded-lg hover:bg-amber-600">
                <Search />
            </button>
        </div>
    );
}

export default SearchBar;
