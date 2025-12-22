import { Outlet, useLocation } from "react-router-dom";
import SideBar from "./Navigations/SideBar";
import BottomNavBar from "./Navigations/BottomNavBar";
import SearchBar from "./SearchBar";
import MiniBar from "./MiniBar";

const Layout = () => {
    const location = useLocation();
    const hideMiniBar = location.pathname === '/now-playing';

    return (
        <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
            <div className="hidden md:block shrink-0">
                <SideBar />
            </div>

            <main className="flex-1 flex flex-col min-w-0 relative">
                <div className="flex-1 overflow-y-auto px-4 md:px-6">
                    <SearchBar />
                    <Outlet />
                    
                    {!hideMiniBar && <MiniBar />}
                </div>

                <BottomNavBar />
            </main>
        </div>
    );
}

export default Layout;