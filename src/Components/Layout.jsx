import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import SideBar from "./Navigations/SideBar";
import BottomNavBar from "./Navigations/BottomNavBar";
import SearchBar from "./SearchBar";
import MiniBar from "./MiniBar";
import PlaylistModal from "./PlayListModal";

const Layout = () => {
    const location = useLocation();
    const hideMiniBar = location.pathname === '/now-playing';
    const [currentMenuId, setCurrentMenuId] = useState(null); // Menu for the song component

    const dismissMenu = () => setCurrentMenuId(null);

    return (
        <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
            <PlaylistModal />
            <div className="hidden md:block shrink-0">
                <SideBar />
            </div>

            <main className="flex-1 flex flex-col min-w-0 relative">
                <div className="flex-1 overflow-y-auto px-4 md:px-6">
                    <SearchBar />
                    
                    <Outlet context={{ currentMenuId, setCurrentMenuId, dismissMenu }} />

                    {!hideMiniBar && <MiniBar />}
                </div>

                <BottomNavBar />
            </main>
        </div>
    );
}

export default Layout;