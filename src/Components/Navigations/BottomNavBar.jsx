import { Home, Heart, ListMusic } from "lucide-react";
import { Link } from 'react-router-dom';

const BottomNavBar = () => {
    return ( 
        <div>
            <nav className="border-t-2 w-full h-16 bg-amber-300 fixed bottom-0 left-0 flex justify-around items-center md:hidden">
                <Link to="/">
                    <button className="flex flex-col items-center">
                        <Home />
                        <span className="text-sm">Home</span>
                    </button>
                </Link>

                <Link to="/favorites">
                    <button className="flex flex-col items-center">
                        <Heart />
                        <span className="text-sm">Favorites</span>
                    </button>
                </Link>
                
                <Link to="/playlists">
                    <button className="flex flex-col items-center">
                        <ListMusic />
                        <span className="text-sm">Playlists</span>
                    </button>
                </Link>
            </nav>
        </div>
    );
}
 
export default BottomNavBar;