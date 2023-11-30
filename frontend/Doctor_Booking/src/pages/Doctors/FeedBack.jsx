import { useState } from 'react';
import PropTypes from 'prop-types';

import FeedBackForm from './FeedBackForm';
import { AiFillStar } from 'react-icons/ai';
import { formateDate } from '../../Utils/FormateDate';
import avatar from '../../assets/images/avatar-icon.png';

const FeedBack = (props) => {
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);
    return (
        <div>
            <div className="mb-[50px]">
                <h4 className="text-[20px] leading-[30px] font-bold text-headingColor mb-[30px]">All reviews (272)</h4>
                <div className="flex justify-between gap-10 mb-[30px]">
                    <div className="flex gap-3">
                        <figure className="w-10 h-10 rounded-full">
                            <img src={avatar} alt="avatar" className="w-full" />
                        </figure>
                        <div>
                            <h5 className="text-[16px] leading-6 text-primaryColor font-bold">Ali ahmed</h5>
                            <p className="text-[14px] leading-6 text-textColor"> {formateDate('12-07-2010')}</p>
                            <p className="text__para mt-3 font-medium text-[15px]">
                                Good services, highy recommended 👍
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-1">
                        {[...Array(5).keys()].map((_, index) => {
                            return <AiFillStar key={index} color="#0067FF" />;
                        })}
                    </div>
                </div>
            </div>
            {!showFeedbackForm && (
                <div className="text-center">
                    <button className="btn" onClick={() => setShowFeedbackForm(true)}>
                        Give FeedBack
                    </button>
                </div>
            )}
            {showFeedbackForm && <FeedBackForm />}
        </div>
    );
};

FeedBack.propTypes = {};

export default FeedBack;
