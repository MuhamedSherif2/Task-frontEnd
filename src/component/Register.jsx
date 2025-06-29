import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
    const API = 'https://task-back-end-blue.vercel.app/register';
    const [item, setItem] = useState({
        name: '',
        email: '',
        password: '',
        role: ''
    });
    const [loading, setLoading] = useState(false);
    const location = useNavigate()

    const handelAdd = async () => {
        if (!item.name || !item.email || !item.password || !item.role) {
            return;
        }
        try {
            setLoading(true);
            await axios.post(API, item);
            setItem({ name: '', email: '', password: '', role: '' });
        } catch (error) {
            console.error('Submission error:', error.response?.data || error.message);
        } finally {
            setLoading(false);
            location('/login', { state: item })
        }
    };

    return (
        <section className="w-full h-screen bg-[#201E43]">
            <h1 className="text-[30px] flex justify-center py-4 font-bold text-[#508C9B]">Add Account</h1>
            <div className="flex flex-col justify-center items-center gap-5 mt-10 py-5">
                <input type="text" placeholder="Enter your Name"
                    value={item.name}
                    onChange={(e) => setItem({ ...item, name: e.target.value })}
                    className="bg-[#EEEEEE] p-1 rounded text-[#201E43] w-[300px] outline-none text-[20px]"
                />
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
                <select
                    value={item.role}
                    onChange={(e) => setItem({ ...item, role: e.target.value })}
                    className="bg-[#EEEEEE] p-1 rounded text-[#201E43] w-[300px] outline-none text-[20px]"
                >
                    <option>Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                </select>
                <br />
                <button onClick={handelAdd} disabled={loading}
                    className="bg-[#5cb85c] py-2 px-4 rounded text-[20px] font-semibold transition-all duration-400 hover:bg-[#47b347] hover:shadow-lg hover:shadow-[#47b347]"
                >
                    {loading ? 'SingUp...' : 'SingUp'}
                </button>
            </div>
        </section>
    );
}

export default Register;