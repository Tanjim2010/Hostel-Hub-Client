import { useContext } from "react";
import { AuthContext } from "../../../Routes/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../Components/Loader/Loader";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const MyReviews = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const { data: reviews = [], isPending, isLoading,refetch } = useQuery({
        queryKey: ['review'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/review/${user.email}`);
            return res.data;
        }
    });
    console.log(reviews)

    const handleDeleteButton = (id) => {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axiosSecure.delete(`/review/${id}`)
                    if(res.data.deletedCount > 0){
                        toast.success('deleted successful.')
                        refetch()
                    }
                    console.log(res)
                }
            });
        }

    if(isLoading || isPending) return <Loader></Loader>
    return (
        <div className="w-full">
            <div className="min-h-screen  flex flex-col w-full items-center py-8">
                <h1 className="text-3xl font-bold  mb-6">My Reviews</h1>
                <div className="overflow-x-auto w-full ">
                    <table className="table-auto w-full shadow-lg rounded-lg">
                        <thead>
                            <tr className="bg-blue-900 text-white">
                                <th className="px-4 py-2">Meal Title</th>
                                <th className="px-4 py-2">Likes</th>
                                <th className="px-4 py-2">Review</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reviews.map((review) => (
                                <tr
                                    key={review._id}
                                    
                                >
                                    <td className="border px-4 py-2 text-center">{review.mealTitle}</td>
                                    <td className="border px-4 py-2 text-center">{review.likes}</td>
                                    <td className="border px-4 py-2 text-center">{review.review}</td>
                                    <td className="border px-4 py-2 flex justify-center gap-2">
                                        <button
                                            className="px-3 py-1 text-sm font-medium text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteButton(review._id)}
                                            className="px-3 py-1 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                        <Link to={`/mealDetails/${review._id}`} className="px-3 py-1 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600"
                                        >
                                            View Meal
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyReviews;