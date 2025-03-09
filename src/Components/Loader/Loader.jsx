import { Watch } from "react-loader-spinner";


const Loader = () => {
    return (
        <div className="min-w-[100vh] h-full my-10">
            <div className="flex justify-center w-full mx-auto items-center h-full">
                <Watch
                    visible={true}
                    height="80"
                    width="80"
                    radius="48"
                    color="#4fa94d"
                    ariaLabel="watch-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
        </div>
    );
};

export default Loader;