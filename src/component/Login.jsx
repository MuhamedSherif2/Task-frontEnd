import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [item, setItem] = useState({ email: '', password: '' })
    const [loading, setLoading] = useState(false)
    const API = 'https://task-back-end-blue.vercel.app/login';

    const navigate = useNavigate()
    const handelAdd = async () => {
        if (!item.email || !item.password) {
            alert('Please fill all fields');
            return;
        }
        try {
            const res = await axios.post(API, { email: item.email, password: item.password })
            localStorage.setItem('token', res.data.user.jwt)
            setLoading(true);
            console.log(res)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
            navigate('/')
        }
    }

    return (
        <section className="w-full h-screen bg-[#201E43]">
            <h1 className="text-[30px] flex justify-center py-4 font-bold text-[#508C9B]">login</h1>
            <div className="flex flex-col justify-center items-center gap-5 mt-10 py-5">
                <input type='email' placeholder="Enter your Email"
                    value={item.email}
                    onChange={(e) => setItem({ ...item, email: e.target.value })}
                    className="bg-[#EEEEEE] p-1 rounded text-[#201E43] w-[300px] outline-none text-[20px]"
                />
                <input type='password' placeholder="Enter your password"
                    value={item.password}
                    onChange={(e) => setItem({ ...item, password: e.target.value })}
                    className="bg-[#EEEEEE] p-1 rounded text-[#201E43] w-[300px] outline-none text-[20px]"
                />
                <button onClick={handelAdd} disabled={loading} className="bg-[#5cb85c] py-2 px-4 rounded text-[20px] font-semibold transition-all duration-400 hover:bg-[#47b347] hover:shadow-lg hover:shadow-[#47b347]">
                    {loading ? 'LogIn...' : 'LogIn'}
                </button>
            </div>
        </section>
    )
}
export default Login