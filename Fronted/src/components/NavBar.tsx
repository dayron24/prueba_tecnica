import { Link } from 'react-router-dom';
import '../styles/NavBar.css';
import { useAuth } from "../hooks/useAuth";

const NavBar = () => {
    const { auth } = useAuth();

    return auth?.username ? (
        <nav className='navbar navbar-expand-lg navbar-light bg-light my-4'>
            <div className='container'>
                <ul className='navbar-nav'>
                    <li className='nav-item'>
                        <Link className='nav-link btn btn-link' to='/'>Characters</Link>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link btn btn-link' to='/nuevo-marvelCharacter'>New character</Link>
                    </li>
                </ul>
            </div>
        </nav>
    ):null
}

export default NavBar;