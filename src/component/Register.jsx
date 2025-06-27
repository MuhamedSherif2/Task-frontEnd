import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
    const API = 'https://task-back-end-two.vercel.app/register';
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
            location('/login', {state:item})
        }
    };

    return (
        <section>
            <h1 className="text-red-800 text-[20px]">Add Account</h1>
            <div>
                <input type="text" placeholder="Enter your Name"
                    value={item.name}
                    onChange={(e) => setItem({ ...item, name: e.target.value })}
                />
                <input type='email' placeholder="Enter your Email"
                    value={item.email}
                    onChange={(e) => setItem({ ...item, email: e.target.value })}
                />
                <input type='password' placeholder="Enter your password"
                    value={item.password}
                    onChange={(e) => setItem({ ...item, password: e.target.value })}
                />
                <select
                    value={item.role}
                    onChange={(e) => setItem({ ...item, role: e.target.value })}
                >
                    <option value="">Select Role</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                </select>
                <br />
                <button onClick={handelAdd} disabled={loading}>
                    {loading ? 'SingUp...' : 'SingUp'}
                </button>
            </div>
            <div>
                
            </div>
        </section>
    );
}

export default Register;