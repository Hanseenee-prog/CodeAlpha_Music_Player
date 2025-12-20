import { Outlet } from "react-router-dom";
import SideBar from "./Navigations/SideBar";
import BottomNavBar from "./Navigations/BottomNavBar";
import SearchBar from "./SearchBar";

const Layout = () => {
    return (
        <div className="flex overflow-hidden h-screen">
            <div className="w-60 shrink-0">
                <SideBar />
                <BottomNavBar />
            </div>

            <main className="overflow-y-auto w-full flex-1 flex flex-col grow p-4">
                <SearchBar />
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;