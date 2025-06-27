import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [item, setItem] = useState({ email: '', password: '' })
    const [loading, setLoading] = useState(false)
    const API = 'https://task-back-end-two.vercel.app/login';

    const navigate = useNavigate()
    const handelAdd = async() => {
        if(!item.email || !item.password){
            alert('Please fill all fields');
            return;
        }
        try {
            const res = await axios.post(API, {email:item.email, password:item.password})
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
        <>
            <h1>login</h1>
            <input type='email' placeholder="Enter your Email"
                value={item.email}
                onChange={(e) => setItem({ ...item, email: e.target.value })}
            />
            <input type='password' placeholder="Enter your password"
                value={item.password}
                onChange={(e) => setItem({ ...item, password: e.target.value })}
            />
            <button onClick={handelAdd} disabled={loading}>
                {loading ? 'LogIn...' : 'LogIn'}
            </button>
        </>
    )
}
export default Login