import { Outlet } from "react-router-dom";
import SideBar from "./Navigations/SideBar";
import BottomNavBar from "./Navigations/BottomNavBar";
import SearchBar from "./SearchBar";
import MiniBar from "./MiniBar";

const Layout = () => {
    return (
        <div className="flex overflow-hidden h-screen bg-gray-200 p-2">
            <div className="w-50 shrink-0">
                <SideBar />
                <BottomNavBar />
            </div>

            <main className="overflow-y-auto gap-4 w-full flex-1 flex flex-col grow p-4 rounded-2xl bg-gray-100 mx-2">
                <div>
                    <SearchBar />
                    <Outlet />
                </div>
                <MiniBar />
            </main>
        </div>
    );
}

export default Layout;