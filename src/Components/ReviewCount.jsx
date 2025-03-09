import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Loader from "./Loader/Loader";


const ReviewCount = ({mealTitle}) => {
    const axiosSecure = useAxiosSecure()
    console.log(mealTitle)
    const { data: reviewCount, isPending: pending, isLoading } = useQuery({
        queryKey: [mealTitle],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews/admin/${mealTitle}`);
            return res.data; // Ensure the API returns an array here
        }
    });
    if(pending, isLoading) return <Loader></Loader>
    console.log(reviewCount)
    return reviewCount.length
};


export default ReviewCount;