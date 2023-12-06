import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { HashLoader, RingLoader } from 'react-spinners';
import PropTypes from 'prop-types';
import { AiOutlineUpload } from 'react-icons/ai';

import { BASE_URL, token } from '../../config';
import upLoadImageToCloudinary from '../../Utils/upLoadCloudinary';
const Profile = ({ user }) => {
    const navigate = useNavigate();

    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadImg, setloadImg] = useState(false);

    const [formData, setFromData] = useState({
        name: '',
        email: '',
        password: '',
        avatar: null,
        gender: '',
        bloodType: '',
    });

    useEffect(() => {
        setFromData((prevData) => ({
            ...prevData,
            name: user.name || '',
            email: user.email || '',
            avatar: user.avatar || null,
            gender: user.gender || '',
            bloodType: user.bloodType || '',
        }));
    }, [user]);
    const handleInput = (e) => {
        setFromData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleInputChange = async (e) => {
        const file = e.target.files[0];
        const response = await upLoadImageToCloudinary(file);
        console.log(response);
        setloadImg(true);
        setSelectedFile(response.data);
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

        try {
            const response = await axios.put(`${BASE_URL}/user/${user._id}`, formData, {
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
            });

            const { message } = response.data;

            setLoading(false);
            toast.success(message);
            navigate('/user/profile/me');
        } catch (error) {
            setLoading(false);
            if (error.response) {
                toast.error(error.response.data.message);
            }
        }
    };
    return (
        <div className="mt-10">
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
                    />
                </div>
                <div className="mb-5">
                    <input
                        type="text"
                        placeholder="Blood Type"
                        value={formData.bloodType}
                        onChange={handleInput}
                        name="bloodType"
                        className="w-full pr-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor 
                                    text-[16px] leading-7 text-headingColor placeholder:text-textColor cursor-pointer"
                    />
                </div>
                <div className="mb-5 flex items-center justify-between">
                    <label name="gender" className="text-headingColor font-bold text-[14px] md:text-[16px] leading-7 ">
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
                        selectedFile && (
                            <figure className="w-[60px] h-[60px] rounded-full border-b border-solid border-[#9999] flex items-center justify-center overflow-hidden">
                                <img
                                    src={selectedFile.url}
                                    alt={formData.name}
                                    className="w-full h-full rounded-full object-cover"
                                />
                            </figure>
                        )
                    )}
                    <div className="relative w-[160px] h-[50px] px-4">
                        <input
                            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                            type="file"
                            onChange={handleInputChange}
                            name="avatar"
                            id="customFile"
                            accept=".jpg, .png"
                        />
                        <div className="absolute justify-center px-[12px] py-[6px] text-[15px] top-0 left-0 w-full h-full overflow-hidden flex items-center gap-3 cursor-pointer border border-solid border-[#6666] rounded-md">
                            <label
                                htmlFor="customFile"
                                className="leading-6 text-textColor font-semibold rounded-lg truncate cursor-pointer"
                            >
                                {selectedFile ? selectedFile.original_filename : 'Upload avatar'}
                            </label>
                            <label htmlFor="customFile" className="cursor-pointer">
                                <AiOutlineUpload className="h-5 w-5 text-textColor" />
                            </label>
                        </div>
                    </div>
                </div>
                <div className="mt-7">
                    <button
                        disabled={loading && true}
                        className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                        type="submit"
                    >
                        {loading ? <HashLoader size={25} color="#fff" /> : 'Update Profile'}
                    </button>
                </div>
            </form>
        </div>
    );
};

Profile.propTypes = {
    user: PropTypes.object.isRequired,
};
export default Profile;
