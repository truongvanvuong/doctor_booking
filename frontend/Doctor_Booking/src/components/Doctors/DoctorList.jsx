import PropTypes from 'prop-types';

import { doctors } from '../../assets/data/doctors';
import DoctorCard from './DoctorCard';
const DoctorList = ({ className }) => {
    return (
        <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px] ${className}`}
        >
            {doctors.map((doctor) => {
                return <DoctorCard key={doctor.id} doctor={doctor} />;
            })}
        </div>
    );
};
DoctorList.propTypes = {
    className: PropTypes.string,
};
export default DoctorList;
