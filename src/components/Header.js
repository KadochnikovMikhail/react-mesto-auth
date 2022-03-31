import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

function Header({text, link, email='', handleLogin=()=>{}}) {
    function onSignOut(){
        if (localStorage.getItem('token')){
            localStorage.removeItem('token');
            handleLogin(email, false);
        }
    }
    return (
        <header className="header">
            <img className="header__logo" alt="Проект Место" src={logo}/>
            <p className="header__email">{email}</p>
            <Link to={link} onClick={onSignOut} className="header__sign">{text}</Link>



        </header>
    );
}

export default Header;