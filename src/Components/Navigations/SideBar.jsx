import { Home, Heart, ListMusic, Plus, Music2Icon, Library as LibraryIcon } from "lucide-react";
import { Link, useLocation } from 'react-router-dom';

const SideBar = () => {
    const { pathname } = useLocation();
    
    const links = [
        { to: "/", icon: Home, label: "Home" },
        { to: "/library", icon: LibraryIcon, label: "Library" },
        { to: "/favorites", icon: Heart, label: "Favorites" },
        { to: "/playlists", icon: ListMusic, label: "Playlists" },
    ];

    return ( 
        <nav className="w-full h-full bg-white border-r border-gray-200 flex flex-col items-center lg:items-start transition-all duration-300">
            <div className="flex items-center p-6 gap-3 mb-4">
                <div className="p-2 bg-amber-500 rounded-xl text-white">
                    <Music2Icon size={24} />
                </div>
                <h2 className="hidden lg:block text-xl font-black tracking-tight">My Music</h2>
            </div>

            <ul className="w-full space-y-1 px-3">
                {links.map((link) => {
                    const isActive = pathname === link.to;
                    return (
                        <Link key={link.to} to={link.to}>
                            <li className={`group flex items-center p-3 rounded-xl transition-all ${
                                isActive ? 'bg-amber-100 text-amber-700' : 'hover:bg-gray-100 text-gray-500'
                            }`}>
                                <link.icon size={22} className={isActive ? "text-amber-600" : "group-hover:text-amber-500"} />
                                <span className="hidden lg:block ml-4 font-semibold">{link.label}</span>
                            </li>
                        </Link>
                    );
                })}
            </ul>

            <button className="mt-auto m-4 p-3 lg:p-4 bg-amber-500 text-white rounded-2xl hover:bg-amber-600 transition-transform active:scale-95 flex items-center justify-center lg:w-[calc(100%-2rem)] shadow-lg shadow-amber-200">
                <Plus size={20} />
                <span className="hidden lg:block ml-2 font-bold whitespace-nowrap">Add Song</span>
            </button>
        </nav>
    );
}

export default SideBar;
