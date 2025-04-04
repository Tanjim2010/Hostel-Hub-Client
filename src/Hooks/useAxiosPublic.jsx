import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://hostel-hub-server-six.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;