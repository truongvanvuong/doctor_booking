import RingLoader from 'react-spinners/RingLoader';
const loading = () => {
    return (
        <div className="flex items-center justify-center w-full h-full">
            <RingLoader color="#0067FF" />
        </div>
    );
};

export default loading;
