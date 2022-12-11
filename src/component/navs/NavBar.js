import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import './NavBarCss.css';
const NavBar = () => {
    const navigate = useNavigate();
    const [userInfo] = useAuth();
    const handleLink = (e) => {
        e.preventDefault();

        let el = document.querySelector('#headerNav .nav .nav-item a.active');
        console.log(el);
        if (el !== null) {
            el.classList.remove("active");
        }
        let linkPath = e.target.getAttribute('href')

        navigate(linkPath, { replace: true });
        e.target.classList.toggle("active");

    }

    return (
        <div id="headerNav">
            <ul className="nav">
                <li className="nav-item">
                    <a className="nav-link active" onClick={handleLink} href="/home">Home</a>
                </li>

                <li className="nav-item">
                    <a className="nav-link" onClick={handleLink} href="/contact">Contact</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" onClick={handleLink} href='/about'>About</a>
                </li>

                {!userInfo ? <li className="nav-item">
                    <a className="nav-link" onClick={handleLink} href="/login">Login</a>
                </li> : <li className="nav-item">
                    <a className="nav-link" onClick={handleLink} href="/profile">Profile</a>
                </li>}

            </ul>
        </div>
    )
}
export default NavBar;