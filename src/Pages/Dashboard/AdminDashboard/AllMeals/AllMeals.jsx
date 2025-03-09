import { useQuery } from "@tanstack/react-query";
import Loader from "../../../../Components/Loader/Loader";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";


const AllMeals = () => {
    const axiosSecure = useAxiosSecure()

    const { data: mealsData, isPending: pending, isLoading, refetch } = useQuery({
        queryKey: ['meals'],
        queryFn: async () => {
            const res = await axiosSecure.get('/meals/admin');
            return res.data; // Ensure the API returns an array here
        }
    });


    if (pending, isLoading) return <Loader></Loader>

    const handleDeleteButton = async(id) => {
        await axiosSecure.delete(`/meals/admin/${id}`)
        refetch()
    }

    return (
        <div className="container mx-auto py-10 px-20">
            <h2 className="text-2xl font-bold text-center mb-6 text-primary">Meals List</h2>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-700 bg-base-200 text-base-content">
                    <thead className="bg-primary text-base-100">
                        <tr>
                            <th className="border border-gray-700 px-4 py-2">Title</th>
                            <th className="border border-gray-700 px-4 py-2">Likes</th>
                            <th className="border border-gray-700 px-4 py-2">Rating</th>
                            <th className="border border-gray-700 px-4 py-2">Distributor Name</th>
                            <th className="border border-gray-700 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Example row. Replace with dynamic data */}
                        {
                            mealsData.map(meal =><tr key={meal._id} className="hover:bg-base-300">
                                <td className="border border-gray-700 px-4 py-2">{meal.title}</td>
                                <td className="border border-gray-700 px-4 py-2 text-center">{meal.likes ? meal.likes : 0}</td>
                                <td className="border border-gray-700 px-4 py-2 text-center">{meal.rating}</td>
                                <td className="border border-gray-700 px-4 py-2">{meal.mealAddedEmail}</td>
                                <td className="border border-gray-700 px-4 py-2 flex justify-center space-x-2">
                                    <button className="btn btn-xs btn-primary">View</button>
                                    <button className="btn btn-xs btn-secondary">Update</button>
                                    <button onClick={() => handleDeleteButton(meal._id)} className="btn btn-xs btn-error">Delete</button>
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

export default AllMeals;
