import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loader from "../../../../Components/Loader/Loader";
import ReviewCount from "../../../../Components/reviewCount";


const AllReviews = () => {
    const axiosSecure = useAxiosSecure();

    const { data: allReview, isPending: pending, isLoading } = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosSecure.get('/review/admin');
            return res.data; // Ensure the API returns an array here
        }
    });

    if(pending, isLoading) return <Loader></Loader>

    return (
        <div className="container mx-auto py-10 px-20">
            <h2 className="text-2xl font-bold text-center mb-6 text-primary">Review List</h2>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-700 bg-base-200 text-base-content">
                    <thead className="bg-primary text-base-100">
                        <tr>
                            <th className="border border-gray-700 px-4 py-2">Title</th>
                            <th className="border border-gray-700 px-4 py-2">Likes</th>
                            <th className="border border-gray-700 px-4 py-2">Rating</th>
                            <th className="border border-gray-700 px-4 py-2">reviewCount</th>
                            <th className="border border-gray-700 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Example row. Replace with dynamic data */}
                        {
                            allReview.map(review =><tr key={review._id} className="hover:bg-base-300">
                                <td className="border border-gray-700 px-4 py-2">{review.mealTitle}</td>
                                <td className="border border-gray-700 px-4 py-2 text-center">{review.likes ? review.likes : 0}</td>
                                <td className="border border-gray-700 px-4 py-2 text-center">{review.rating}</td>
                                <td className="border border-gray-700 px-4 py-2"><ReviewCount mealTitle={review.mealTitle} />
                                </td>
                                <td className="border border-gray-700 px-4 py-2 flex justify-center space-x-2">
                                    <button className="btn btn-xs btn-primary">View</button>
                                    <button className="btn btn-xs btn-error">Delete</button>
                                </td>
                            </tr>)
                        }
                        {/* Add more rows dynamically */}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllReviews;