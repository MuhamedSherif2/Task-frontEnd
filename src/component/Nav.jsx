import { Link } from "react-router-dom"
import axios from "axios";
import { useEffect, useState } from "react";

function Nav() {
    const [userName, setUserName] = useState("");
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
            if (!token) return;

            const response = await axios.get(API, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUserName(response.data.name);
        } catch (error) {
            console.error("something wrong:", error);
        }
    };

    return (
        <nav className="w-full h-[50px] flex items-center justify-evenly bg-[#EEEEEE]">
            <ul className="flex gap-3 ">
                {pages.map((page) =>
                    <li key={page.id} className="text-[#201E43] text-[20px] font-bold bg-[#EEEEEE] w-fit p-1 hover:bg-[#cdcccc] rounded-md transition-all">
                        <Link to={page.path} className="p-2 ">{page.name}</Link>
                    </li>
                )}
            </ul>
            {userName && <span className="text-[#508C9B] text-[20px] font-bold">Hello {userName}</span>}
        </nav>
    )
}
export default Nav