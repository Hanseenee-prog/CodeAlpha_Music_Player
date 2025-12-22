import { Home, Heart, ListMusic, Library as LibraryIcon } from "lucide-react";
import { Link, useLocation } from 'react-router-dom';

const BottomNavBar = () => {
    const { pathname } = useLocation();
    
    const navItems = [
        { icon: Home, label: 'Home', path: '/' },
        { icon: LibraryIcon, label: 'Library', path: '/library' },
        { icon: Heart, label: 'Favorites', path: '/favorites' },
        { icon: ListMusic, label: 'Playlists', path: '/playlists' },
    ];

    return ( 
        <nav className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-white/80 backdrop-blur-lg border-t border-gray-100 flex justify-around items-center z-50">
            {navItems.map((item) => {
                const isActive = pathname === item.path;
                return (
                    <Link key={item.path} to={item.path} className="flex flex-col items-center gap-1 flex-1 transition-colors">
                        <item.icon className={isActive ? "text-amber-600" : "text-gray-400"} size={22} />
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? "text-amber-600" : "text-gray-400"}`}>
                            {item.label}
                        </span>
                    </Link>
                );
            })}
        </nav>
    );
}

export default BottomNavBar;
