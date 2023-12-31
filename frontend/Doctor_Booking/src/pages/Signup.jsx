import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { HashLoader, RingLoader } from 'react-spinners';

import { BASE_URL } from '../config';
import singupImg from '../assets/images/signup.gif';
import avatarDefault from '../assets/images/avatar-default.jpg';
import upLoadImageToCloudinary from '../Utils/upLoadCloudinary';

const Signup = () => {
    const navigate = useNavigate();

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewURL, setPreviewURL] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadImg, setloadImg] = useState(false);

    const [formData, setFromData] = useState({
        name: '',
        email: '',
        password: '',
        avatar: selectedFile,
        gender: '',
        role: 'patient',
    });
    const handleInput = (e) => {
        setFromData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleInputChange = async (e) => {
        const file = e.target.files[0];
        const response = await upLoadImageToCloudinary(file);

        setloadImg(true);
        setPreviewURL(response.data.url);
        setSelectedFile(response.data.url);
        setFromData({ ...formData, avatar: response.data.url });
        setTimeout(() => {
            if (response.success) {
                setloadImg(false);
            }
        }, 1500);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (formData.gender === '') {
            toast.warning('select gender');
        } else {
            try {
                const response = await axios.post(`${BASE_URL}/auth/register`, formData, {
                    headers: { 'Content-Type': 'application/json' },
                });

                const { message } = response.data;

                setLoading(false);
                toast.success(message);
                navigate('/login');
            } catch (error) {
                setLoading(false);
                if (error.response) {
                    toast.error(error.response.data.message);
                }
            }
        }
    };
    return (
        <section className="px-5 xl:px-0">
            <div className="max-w-[1170px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/*________ img box______*/}
                    <div className="hidden lg:block bg-primaryColor rounded-l-lg">
                        <figure className="rounded-l-lg">
                            <img src={singupImg} alt="Singup image" className="w-full rounded-l-lg" />
                        </figure>
                    </div>

                    {/*_____Singup from______*/}
                    <div className="rounded-l-lg lg:pl-16 py-10">
                        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
                            Create an <span className="text-primaryColor">acconut</span>
                        </h3>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-5">
                                <input
                                    type="text"
                                    placeholder="Full name"
                                    value={formData.name}
                                    onChange={handleInput}
                                    name="name"
                                    className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor 
                                    text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                                    required
                                />
                            </div>
                            <div className="mb-5">
                                <input
                                    type="email"
                                    placeholder="Enter your name"
                                    value={formData.email}
                                    onChange={handleInput}
                                    name="email"
                                    className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor 
                                    text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                                    required
                                />
                            </div>
                            <div className="mb-5">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInput}
                                    name="password"
                                    className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor 
                                    text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                                    required
                                />
                            </div>
                            <div className="mb-5 flex items-center justify-between">
                                <label className="text-headingColor font-bold text-[14px] md:text-[16px] leading-7 ">
                                    Are you a:
                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleInput}
                                        className="ml-[2px] md:ml-0 text-textColor font-semibold text-[14px] md:text-[15px] leading-7 px-1 md:px-2 py-3 focus:outline-none cursor-pointer bg-transparent"
                                    >
                                        <option value="patient">Patient</option>
                                        <option value="doctor">Doctor</option>
                                    </select>
                                </label>
                                <label
                                    name="gender"
                                    className="text-headingColor font-bold text-[14px] md:text-[16px] leading-7 "
                                >
                                    Gender:
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleInput}
                                        className=" ml-[2px] md:ml-0 text-textColor font-semibold text-[14px] md:text-[15px] leading-7 px-1 md:px-2 py-3 focus:outline-none cursor-pointer  bg-transparent"
                                    >
                                        <option value="">Seclect</option>
                                        <option value="male">Male</option>
                                        <option value="female">female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </label>
                            </div>
                            <div className="mb-5 flex items-center gap-5">
                                {loadImg ? (
                                    <RingLoader color="#333" loading size={35} speedMultiplier={1} />
                                ) : (
                                    <figure className="w-[60px] h-[60px] rounded-full border-b border-solid border-[#9999] flex items-center justify-center overflow-hidden">
                                        <img
                                            src={previewURL === '' ? avatarDefault : previewURL}
                                            alt="Avatar"
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    </figure>
                                )}
                                <div className="relative w-[130px] h-[50px]">
                                    <input
                                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                                        type="file"
                                        onChange={handleInputChange}
                                        name="avatar"
                                        id="customFile"
                                        accept=".jpg, .png"
                                    />
                                    <label
                                        htmlFor="customFile"
                                        className="absolute top-0 left-0 w-full h-full flex items-center justify-center px-[12px] py-[6px] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] 
                                        text-headingColor font-semibold rounded-lg truncate cursor-pointer"
                                    >
                                        Upload Photo
                                    </label>
                                </div>
                            </div>
                            <div className="mt-7">
                                <button
                                    disabled={loading && true}
                                    className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                                    type="submit"
                                >
                                    {loading ? <HashLoader size={35} color="#fff" /> : 'Sign Up'}
                                </button>
                            </div>
                            <p className="text-textColor mt-5 text-center">
                                Already have an account?{''}
                                <Link to="/login" className=" text-primaryColor font-medium ml-1 hover:opacity-80">
                                    Login
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Signup;
