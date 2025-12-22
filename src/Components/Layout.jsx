import { Outlet, useLocation } from "react-router-dom";
import SideBar from "./Navigations/SideBar";
import BottomNavBar from "./Navigations/BottomNavBar";
import SearchBar from "./SearchBar";
import MiniBar from "./MiniBar";

const Layout = () => {
    const location = useLocation();
    console.log(location);
    const hideMiniBar = location.pathname === '/now-playing';

    return (
        <div className="flex overflow-hidden h-screen bg-gray-200">
            <div className="md:w-15 lg:w-50 shrink-0">
                <SideBar />
            </div>

            <main className="overflow-y-auto gap-4 w-full flex-1 flex flex-col grow">
                <div className="rounded-2xl bg-gray-100 p-4">
                    <SearchBar />
                    <Outlet />
                </div>
                {!hideMiniBar && <MiniBar />}
            </main>
            <BottomNavBar />
        </div>
    );
}

export default Layout;