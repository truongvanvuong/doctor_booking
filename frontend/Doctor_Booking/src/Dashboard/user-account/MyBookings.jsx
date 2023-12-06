import useFetchData from '../../hook/useFetchData';
import { BASE_URL } from '../../config';
import DoctorCard from '../../components/Doctors/DoctorCard';
import Loading from '../../components/Loader';
import Error from '../../components/Error';

const MyBookings = () => {
    const { data: appointments, error, loading } = useFetchData(`${BASE_URL}/user/appointments/my-appointments`);
    return (
        <div>
            {loading && !error && <Loading />}
            {error && !loading && <Error errMessage={error} />}
            {!loading && !error && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {appointments.map((doctor) => {
                        return <DoctorCard doctor={doctor} key={doctor._id} />;
                    })}
                </div>
            )}
            {!loading && !error && appointments.length === 0 && (
                <h2 className="mt-5 text-center text-headingColor leading-7 text-[20px] font-semibold">
                    You did not book any doctor get!
                </h2>
            )}
        </div>
    );
};

export default MyBookings;
