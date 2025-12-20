import { Home, Heart, ListMusic, Plus } from "lucide-react";
import { Link } from 'react-router-dom';

const SideBar = () => {
    return ( 
        <aside className="w-full h-full bg-transparent hidden md:block">
            <h2 className="text-lg font-bold">My Music App</h2>
                <ul>
                    <Link to="/">
                        <li className="py-2 px-4 hover:bg-amber-400 flex items-center">
                            <span className="mr-2"><Home /></span>
                            Home
                        </li>
                    </Link>

                    <Link to="/favorites">
                        <li className="py-2 px-4 hover:bg-amber-400 flex items-center">
                            <span className="mr-2"><Heart /></span>
                            Favorites
                        </li>
                    </Link>

                    <Link to="/playlists">
                        <li className="py-2 px-4 hover:bg-amber-400 flex items-center">
                            <span className="mr-2"><ListMusic /></span>
                            Playlists
                        </li>
                    </Link>
                </ul>

                <button className="m-4 p-2 bg-amber-500 rounded-lg hover:bg-amber-600 flex items-center">
                    <span className="mr-2"><Plus /></span>
                    Add Song
                </button>
        </aside>
    );
}
 
export default SideBar;