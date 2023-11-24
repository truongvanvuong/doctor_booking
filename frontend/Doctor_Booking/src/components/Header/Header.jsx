import { useEffect, useRef } from 'react';
import logo from '../../assets/images/logo.png';
import userImg from '../../assets/images/avatar-icon.png';
import { NavLink, Link } from 'react-router-dom';
import { BiMenu, BiX } from 'react-icons/bi';

const navLinks = [
    {
        path: '/',
        display: 'Home',
    },
    {
        path: '/doctors',
        display: 'Find a Doctor',
    },
    {
        path: '/services',
        display: 'Services',
    },
    {
        path: '/contact',
        display: 'Contact',
    },
];

const Header = () => {
    const headerRef = useRef(null);
    const menuRef = useRef(null);

    const handleStickyHeader = () => {
        const headerHeight = headerRef.current.clientHeight;
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > headerHeight || document.documentElement.scrollTop > headerHeight) {
                headerRef.current.classList.add('sticky__header');
            } else {
                headerRef.current.classList.remove('sticky__header');
            }
        });
    };
    useEffect(() => {
        handleStickyHeader();
        return () => {
            window.removeEventListener('scroll', handleStickyHeader);
        };
    });
    const stop = (e) => {
        e.stopPropagation();
    };
    const toggleMenu = (e) => {
        menuRef.current.classList.toggle('show__menu');
    };
    return (
        <header className="header flex items-center" ref={headerRef}>
            <div className="container">
                <div className="flex items-center justify-between">
                    <div>
                        <Link to="/">
                            <img src={logo} alt="logo" />
                        </Link>
                    </div>
                    {/*_____menu_____*/}

                    <div className="navigation" ref={menuRef} onClick={toggleMenu}>
                        <div className="wrap__menu" onClick={stop}>
                            <div className="menu__heading md:hidden">
                                <Link to="/">
                                    <img src={logo} alt="logo" />
                                </Link>
                                <div
                                    onClick={toggleMenu}
                                    className="border-2 border-transparent border-solid rounded-md transition ease-linear duration-200 hover:border-slate-950"
                                >
                                    <BiX className="w-8 h-8 cursor-pointer" />
                                </div>
                            </div>
                            <ul className="menu flex items-center gap-[2.7rem]">
                                {navLinks.map((link, index) => (
                                    <li key={index}>
                                        <NavLink
                                            to={link.path}
                                            className={(navClass) =>
                                                navClass.isActive
                                                    ? 'text-primaryColor text-16px leading-7 font-[600]'
                                                    : 'text-textColor text-16px leading-7 font-[500]'
                                            }
                                        >
                                            {link.display}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/*_______nav right_______*/}

                    <div className="flex items-center gap-4">
                        <div className="hidden">
                            <Link to="/">
                                <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
                                    <img src={userImg} alt="avatar" className="w-full rounded-full" />
                                </figure>
                            </Link>
                        </div>
                        <Link to="login">
                            <button className="hover:brightness-110 transition ease-linear duration-200 bg-primaryColor py-2 px-6 text-white font-[600] rounded-[50px]">
                                Login
                            </button>
                        </Link>
                        <span className="md:hidden" onClick={toggleMenu}>
                            <BiMenu className="w-8 h-7 cursor-pointer" />
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
