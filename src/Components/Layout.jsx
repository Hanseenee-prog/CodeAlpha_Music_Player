import { Outlet } from "react-router-dom";
import SideBar from "./Navigations/SideBar";
import BottomNavBar from "./Navigations/BottomNavBar";

const Layout = () => {
    return (
        <div className="flex h-screen w-screen">
            <SideBar />
            <BottomNavBar />

            <main className="flex grow p-4">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;