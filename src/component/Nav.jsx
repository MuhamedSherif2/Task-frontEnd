import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import axios from "axios";
import { FcMenu } from "react-icons/fc";
import { IoCloseSharp } from "react-icons/io5";

function Nav() {
    const [userName, setUserName] = useState("");
    const [openBar, setOpenBar] = useState(false)
    const API = 'https://task-back-end-blue.vercel.app/profile';
    const pages = [
        { id: 1, path: '/', name: 'Home' },
        { id: 2, path: '/register', name: 'Register' },
        { id: 3, path: '/login', name: 'Login' },
    ]
    useEffect(() => {
        fetchUserName();
    }, []);

    const fetchUserName = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                return;
            }

            const response = await axios.get(API, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUserName(response.data.name);
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <nav className="w-full h-[50px] flex items-center justify-evenly bg-[#EEEEEE]">
            {userName ? <span className="text-[#508C9B] text-[20px] font-bold">Hello {userName}</span> : <span className="text-[#508C9B] text-[20px] font-bold">Please Login</span>}
            <ul className="hidden lg:flex gap-3 ">
                {pages.map((page) =>
                    <li key={page.id} className="text-[#201E43] text-[20px] font-bold bg-[#EEEEEE] w-fit p-1 hover:bg-[#cdcccc] rounded-md transition-all">
                        <Link to={page.path} className="p-2 ">{page.name}</Link>
                    </li>
                )}
            </ul>
            <div className="lg:hidden" onClick={() => setOpenBar(!openBar)}>
                {
                    !openBar ?
                        <FcMenu className="text-[#201E43] text-[30px] cursor-pointer" /> :
                        <ul className="fixed right-0 top-0 bg-[#eeeeee] w-[300px] h-[100vh] transition-all duration-500">
                            <IoCloseSharp className="text-[#201E43] text-[30px] cursor-pointer m-3" />
                            {
                                pages.map((page) =>
                                    <li key={page.id} className="text-[#201E43] text-[20px] font-bold bg-[#EEEEEE] w-fit p-1 hover:bg-[#cdcccc] rounded-md transition-all flex flex-col mx-auto mt-7">
                                        <Link to={page.path} className="p-2 ">{page.name}</Link>
                                    </li>
                                )
                            }
                        </ul>
                }

            </div>
        </nav>
    )
}
export default Nav