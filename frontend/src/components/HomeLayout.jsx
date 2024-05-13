import { Outlet } from "react-router-dom";
import Header from "./Website/Header/Header";
import FooterCom from "./Website/Footer/Footer";

export default function HomeLayout(){
    return (
        <div className="bg-gray-50">
        <Header/>
        <Outlet/>
        <FooterCom/>
        </div>
    );
}
