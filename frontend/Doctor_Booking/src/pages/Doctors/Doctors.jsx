import { DoctorList, Testimonial } from '../../components';
const Doctors = () => {
    return (
        <div>
            <section className="bg-[#fff9ea]">
                <div className="container text-center">
                    <h2 className="heading">Find a Doctor</h2>
                    <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
                        <input
                            type="search"
                            placeholder="Search Doctor"
                            className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
                        />
                        <button className="btn mt-0 rounded-[0px] rounded-r-md">Search</button>
                    </div>
                </div>
            </section>
            <section>
                <div className="container">
                    <DoctorList className="mt-0 lg:mt-[0px] lg:gap-[0px] lg:grid-cols-4" />
                </div>
            </section>
            <section>
                <div className="container">
                    <div className="lg:w-[470px] mx-auto">
                        <h2 className="heading text-center">What our patient say</h2>
                        <p className="text__para text-center">
                            World-class care for everyone. Our health system offers unmatched, expert health care.
                        </p>
                    </div>
                    <Testimonial />
                </div>
            </section>
        </div>
    );
};

export default Doctors;
