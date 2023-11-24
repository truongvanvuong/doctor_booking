import { BsArrowUp } from 'react-icons/bs';

const BackTop = () => {
    const handleBacktop = () => {
        window.scrollTo({
            top: 0,
        });
    };
    return (
        <div
            className="animate__fadein fixed bottom-0 right-0 w-12 h-12 rounded-full bg-primaryColor 
            mb-8 mr-8 flex items-center justify-center hover:shadow-2xl shadow-blue-500/50 hover:brightness-110 
            cursor-pointer z-50 transition-all "
            onClick={handleBacktop}
        >
            <BsArrowUp className="text-white font-[700] w-5 h-5" />
        </div>
    );
};

export default BackTop;
