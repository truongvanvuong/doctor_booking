import PropTypes from 'prop-types';

import { services } from './../../assets/data/services';
import ServicesCard from './ServicesCard';

const ServicesList = ({ className }) => {
    return (
        <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px] ${className}`}
        >
            {services.map((service, index) => {
                return <ServicesCard key={index} index={index} item={service} />;
            })}
        </div>
    );
};
ServicesList.proptypes = {
    className: PropTypes.string,
};
export default ServicesList;
