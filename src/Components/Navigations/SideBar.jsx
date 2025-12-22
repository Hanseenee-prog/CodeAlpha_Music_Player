import { Home, Heart, ListMusic, Plus, Music2Icon } from "lucide-react";
import { Link } from 'react-router-dom';

const SideBar = () => {
    return ( 
        <nav className="w-full h-full bg-transparent hidden md:flex flex-col justify-start">
            <div className="flex items-center justify-center lg:block">
                <Music2Icon />
                <h2 className="hidden lg:text-lg font-bold">My Music App</h2>
            </div>
                <ul>
                    <Link to="/">
                        <li className="py-2 px-4 hover:bg-amber-400 flex items-center">
                            <span className="mr-2"><Home /></span>
                            <span className="hidden lg:block">Home</span>
                        </li>
                    </Link>

                    <Link to="/favorites">
                        <li className="py-2 px-4 hover:bg-amber-400 flex items-center">
                            <span className="mr-2"><Heart /></span>
                            <span className="hidden lg:block">Favorites</span>
                        </li>
                    </Link>

                    <Link to="/playlists">
                        <li className="py-2 px-4 hover:bg-amber-400 flex items-center">
                            <span className="mr-2"><ListMusic /></span>
                            <span className="hidden lg:block">Playlists</span>
                        </li>
                    </Link>
                </ul>

                <button className="m-4 p-2 bg-amber-500 rounded-lg hover:bg-amber-600 flex items-center">
                    <span className="mr-2"><Plus /></span>
                    <span className="hidden lg:block">Add Song</span>
                </button>
        </nav>
    );
}
 
export default SideBar;