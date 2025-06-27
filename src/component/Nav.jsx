import { Link } from "react-router-dom"

function Nav() {
    const API = 'https://task-back-end-two.vercel.app/register';
    const pages = [
        { id: 1, path: '/', name: 'Home' },
        { id: 2, path: '/register', name: 'Register' },
        { id: 3, path: '/login', name: 'Login' },
    ]
    return (
        <nav>
            <ul className="flex w-full gap-7 py-5">
            {pages.map((page) =>
                <li key={page.id} className="">
                    <Link to={page.path}>{page.name}</Link>
                </li>
            )}
            </ul>
        </nav>
    )
}
export default Nav