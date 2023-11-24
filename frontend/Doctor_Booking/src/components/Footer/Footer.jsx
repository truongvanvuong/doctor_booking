import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo.png';
import { RiLinkedinFill } from 'react-icons/ri';
import { BiMap } from 'react-icons/bi';
import { AiFillYoutube, AiFillGithub, AiOutlineInstagram, AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';

const socialLinks = [
    {
        path: 'https://www.youtube.com/',
        icon: <AiFillYoutube className="group-hover:text-white w-4 h-5" />,
    },
    {
        path: 'https://github.com/truongvanvuong',
        icon: <AiFillGithub className="group-hover:text-white w-4 h-5" />,
    },
    {
        path: 'https://www.instagram.com/vuongvan0712',
        icon: <AiOutlineInstagram className="group-hover:text-white w-4 h-5" />,
    },
    {
        path: 'https://www.linkedin.com/',
        icon: <RiLinkedinFill className="group-hover:text-white w-4 h-5" />,
    },
];
const quickLinks = [
    {
        path: '/',
        title: 'Home',
    },
    {
        path: '/about',
        title: 'About Us',
    },
    {
        path: '/services',
        title: 'Services',
    },
    {
        path: '/blog',
        title: 'Blog',
    },
];
const solutionLinks = [
    {
        path: '/medical-center',
        title: 'Medical Center',
    },
    {
        path: '/hospitals',
        title: 'Hospitals',
    },
    {
        path: '/clinic-chains',
        title: 'Clinic Chains',
    },
];
const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="pb-16 pt-10">
            <div className="container">
                <div className="flex justify-between flex-col md:flex-row flex-wrap gap-[30px]">
                    <div>
                        <img src={logo} alt="Logo" />
                        <p className="text-[16px] leading-7 font-[400] text-textColor mt-4">
                            Copyright © {year} VanVuong
                        </p>
                        <div className="flex items-center gap-3 mt-4">
                            {socialLinks.map((socialLink, index) => {
                                return (
                                    <Link
                                        to={socialLink.path}
                                        key={index}
                                        target="blank"
                                        className="w-9 h-9 border border-solid border-[#181A1E] rounded-full flex
                                         items-center justify-center group hover:bg-primaryColor hover:border-none"
                                    >
                                        {socialLink.icon}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor"> Quick Links</h2>
                        <ul>
                            {quickLinks.map((quickLink, index) => {
                                return (
                                    <li key={index} className="mb-4">
                                        <Link
                                            to={quickLink.path}
                                            className=" hover:text-[#0067FF] text-[16px] leading-7 font-[400] text-textColor"
                                        >
                                            {quickLink.title}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor"> Solutions</h2>
                        <ul>
                            {solutionLinks.map((solutionLink, index) => {
                                return (
                                    <li className="mb-4" key={index}>
                                        <Link
                                            to={solutionLink.path}
                                            className=" hover:text-[#0067FF] text-[16px] leading-7 font-[400] text-textColor"
                                        >
                                            {solutionLink.title}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div>
                        <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">Contact</h2>
                        <ul>
                            <li className="mb-4 flex items-center">
                                <AiOutlineMail className="w-5 h-5" />
                                <span className="mr-1 ml-2">Email:</span>
                                <Link
                                    to="mailto:medicaresupport@gmail.com"
                                    className=" hover:text-[#0067FF] text-[16px] leading-7 font-[400] text-textColor"
                                >
                                    medicaresupport@gmail.com
                                </Link>
                            </li>
                            <li className="mb-4 flex items-center">
                                <AiOutlinePhone className="w-5 h-5" />
                                <span className="mr-1 ml-2">Phone</span>
                                <Link
                                    to="tel:+841911061117"
                                    className=" hover:text-[#0067FF] text-[16px] leading-7 font-[400] text-textColor"
                                >
                                    +84 1911061117
                                </Link>
                            </li>
                            <li className="mb-4 flex items-center">
                                <BiMap className="w-5 h-5" />
                                <span className="mr-1 ml-2">HaNoi,VietNam</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
