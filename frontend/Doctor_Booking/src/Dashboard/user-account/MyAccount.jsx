import { useContext, useEffect, useState } from 'react';
import { authContext } from '../../context/AuthContext';
import { CiLogout } from 'react-icons/ci';

import MyBookings from './MyBookings';
import Profile from './Profile';
import useGetProfile from '../../hook/useFetchData';
import { BASE_URL } from '../../config';
import Loading from '../../components/Loader';
import Error from '../../components/Error';
const MyAccount = () => {
    const { dispatch } = useContext(authContext);
    const [tab, setTab] = useState('bookings');
    const { data: userData, loading, error } = useGetProfile(`${BASE_URL}/user/profile/me`);

    const handleLogout = () => {
        dispatch({
            type: 'LOGOUT',
        });
    };

    return (
        <section className="pt-[35px]">
            <div className="max-w-[1170px] px-5 mx-auto">
                {loading && !error && <Loading />}
                {error && !loading && <Error errMessage={error} />}
                {!loading && !error && (
                    <div className="grid md:grid-cols-3 gap-10">
                        <div className="pb-[50px] px-[30px] rounded-md ">
                            <div className="flex items-center justify-center">
                                <figure className="w-[100px] h-[100px] rounded-full border-2 border-solid border-[#ddd] overflow-hidden">
                                    <img
                                        className="w-full h-full rounded-full object-cover"
                                        src={userData.avatar}
                                        alt={userData.name}
                                    />
                                </figure>
                            </div>
                            <div className="text-center mt-4">
                                <h3 className="text-[18px] leading-[30px] text-headingColor font-bold">
                                    {userData.name}
                                </h3>
                                <p className="text-textColor text-[15px] leading-6 font-medium">{userData.email}</p>
                                <p className="text-textColor text-[15px] leading-6 font-medium">
                                    Blood Type :{' '}
                                    <span className="ml-2 text-headingColor text-[22px] leading-8">
                                        {userData.bloodType}
                                    </span>
                                </p>
                            </div>
                            <div className="mt-[50px] md:mt-24 text-center">
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center justify-center w-[80%] bg-transparent p-3 mx-auto rounded-md outline-none border-[1px] border-solid border-primaryColor text-primaryColor hover:bg-primaryColor hover:text-white transition-colors"
                                >
                                    <CiLogout className="w-[20px] h-[20px] mr-2" />
                                    <span>Logout</span>
                                </button>
                                <button className="w-[80%] bg-transparent p-3 rounded-md outline-none border-[1px] border-solid border-red-600 mt-4 text-red-600 hover:bg-red-600 hover:text-white transition-colors">
                                    Delete account
                                </button>
                            </div>
                        </div>
                        <div className="md:col-span-2 md:px-[30px]">
                            <div className="border-b border-solid border-[#0066ff34]">
                                <button
                                    onClick={() => setTab('bookings')}
                                    className={`${
                                        tab === 'bookings' && 'border-b border-solid border-primaryColor'
                                    } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold transition-all `}
                                >
                                    My Bookings
                                </button>
                                <button
                                    onClick={() => setTab('settings')}
                                    className={`${
                                        tab === 'settings' && 'border-b border-solid border-primaryColor'
                                    } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold transition-all `}
                                >
                                    Profile Settings
                                </button>
                            </div>
                            <div className="mt-[50px]">
                                {tab == 'bookings' && <MyBookings />}
                                {tab == 'settings' && <Profile user={userData} />}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default MyAccount;
