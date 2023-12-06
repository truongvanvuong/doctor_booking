import { useEffect, useRef, useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { BiMenu, BiX } from 'react-icons/bi';

import logo from '../../assets/images/logo.png';
import { authContext } from '../../context/AuthContext.jsx';

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
    const { user, role, token } = useContext(authContext);

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
                            <div className="flex items-center justify-between m-4 md:hidden">
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
                            <div className="mr-8 md:mr-0 mt-8 md:mt-0 inline-block float-right">
                                {token && user ? (
                                    <div className="md:hidden">
                                        <Link to={`${role === 'doctor' ? '/doctors/profile/me' : 'user/profile/me'}`}>
                                            <div className="flex flex-col gap-3 items-end mb-4">
                                                <figure className="w-[65px] h-[65px] rounded-full cursor-pointer overflow-hidden border-[1px] border-solid  border-[#3333]">
                                                    <img
                                                        src={user?.avatar}
                                                        alt="avatar"
                                                        className="w-full h-full object-cover rounded-full"
                                                    />
                                                </figure>
                                                <h2 className="font-[600]">{user?.name}</h2>
                                            </div>
                                        </Link>
                                    </div>
                                ) : null}
                                <ul className="menu flex items-end md:gap-[2.7rem] gap-[2.4rem] mt-[40px] md:mt-0 md:items-center">
                                    {navLinks.map((link, index) => (
                                        <li key={index}>
                                            <NavLink
                                                to={link.path}
                                                className={(navClass) =>
                                                    navClass.isActive
                                                        ? 'text-primaryColor text-16px block leading-7 font-[500] text-right'
                                                        : 'text-textColor text-16px block leading-7 font-[500] text-right hover:text-primaryColor hover:opacity-90 transition-colors'
                                                }
                                            >
                                                {link.display}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/*_______nav right_______*/}

                    <div className="flex items-center gap-4">
                        {token && user ? (
                            <div className="hidden md:block">
                                <Link to={`${role === 'doctor' ? '/doctors/profile/me' : 'user/profile/me'}`}>
                                    <div className="flex items-center gap-4">
                                        <figure className="w-[35px] h-[35px] rounded-full cursor-pointer overflow-hidden border border-solid  border-[#333]">
                                            <img
                                                src={user?.avatar}
                                                alt="avatar"
                                                className="w-full h-full object-cover rounded-full"
                                            />
                                        </figure>
                                        <h2>{user?.name}</h2>
                                    </div>
                                </Link>
                            </div>
                        ) : (
                            <Link to="login">
                                <button className="hover:brightness-110 transition ease-linear duration-200 bg-primaryColor py-2 px-6 text-white font-[600] rounded-[50px]">
                                    Login
                                </button>
                            </Link>
                        )}
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
