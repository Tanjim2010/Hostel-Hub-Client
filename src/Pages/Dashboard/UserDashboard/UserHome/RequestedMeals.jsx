import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../../Routes/AuthProvider";
import Swal from "sweetalert2";
import Loader from "../../../../Components/Loader/Loader";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";


const RequestedMeals = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const { data: requestMeals = [], isPending, isLoading, refetch } = useQuery({
        queryKey: ['requestMeals'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/requestMeal/${user.email}`);
            return res.data;
        }
    });


    const handleCancelButton = (id) => {
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
                const res = await axiosSecure.delete(`/requestMeal/${id}`)
                if (res.data.deletedCount > 0) {
                    toast.success('deleted successful.')
                    refetch()
                }
                console.log(res)
            }
        });
    }
    if (isPending, isLoading) return <Loader></Loader>
    return (
        <div className="w-full">
            <div className="min-h-screen w-full flex flex-col items-center py-8">
                <h1 className="text-3xl font-bold mb-6">Requested Meals</h1>
                <div className="overflow-x-auto w-full">
                    <table className="table-auto   w-full shadow-lg rounded-lg ">
                        <thead>
                            <tr className="bg-blue-800 ">
                                <th className="px-4 py-2">Meal Title</th>
                                <th className="px-4 py-2">Likes</th>
                                <th className="px-4 py-2">Reviews</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requestMeals.map((meal) => (
                                <tr
                                    key={meal._id}
                                >
                                    <td className="border text-center px-4 py-2 ">{meal.title}</td>
                                    <td className="border text-center px-4 py-2 ">{meal.likes}</td>
                                    <td className="border text-center px-4 py-2 ">{meal.review}</td>
                                    <td
                                        className={`border px-4 py-2 font-semibold text-center text-white ${meal.status === "Delivered"
                                            ? "bg-green-500"
                                            : "bg-yellow-500"
                                            }`}
                                    >
                                        {meal.status}
                                    </td>
                                    <td className="border px-4 py-2 text-center text-sm font-medium text-white ">
                                        <button
                                            disabled={meal.status === "delivered" && "bg-red-600"}
                                            onClick={() => handleCancelButton(meal._id)}
                                            className={`px-4 py-2  rounded-lg hover:bg-red-600 ${meal.status === "delivered" && "bg-slate-300 hover:bg-slate-400"}`}
                                        >
                                            Cancel
                                        </button>
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

export default RequestedMeals;