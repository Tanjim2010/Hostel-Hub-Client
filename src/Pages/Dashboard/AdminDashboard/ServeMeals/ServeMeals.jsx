import { useQuery } from "@tanstack/react-query";
import Loader from "../../../../Components/Loader/Loader";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2"


const ServeMeals = () => {
    const axiosSecure = useAxiosSecure()

    const { data: requestData, isPending: pending, isLoading, refetch } = useQuery({
        queryKey: ['requestMeal'],
        queryFn: async () => {
            const res = await axiosSecure.get('/requestMeal/admin');
            return res.data; // Ensure the API returns an array here
        }
    });

    if (pending || isLoading) return <Loader></Loader>
    // console.log(requestData)

    const handleServe = (id) => {
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
                // console.log(id)
                const res = await axiosSecure.patch(`/request/admin/${id}`)
                // console.log(res)
                if (res.status === 200) {
                    refetch()
                    Swal.fire({
                        title: "Your meal is delivered",
                        text: "Delivered",
                        icon: "success"
                    });
                }

            }
        });
    }

    return (
        <div className="container mx-auto py-10 px-20">
            <h2 className="text-2xl font-bold text-center mb-6 text-primary">Requested List</h2>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-700 bg-base-200 text-base-content">
                    <thead className="bg-primary text-base-100">
                        <tr>
                            <th className="border border-gray-700 px-4 py-2">Title</th>
                            <th className="border border-gray-700 px-4 py-2">User Email</th>
                            <th className="border border-gray-700 px-4 py-2">Name</th>
                            <th className="border border-gray-700 px-4 py-2">Status</th>
                            <th className="border border-gray-700 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requestData.map((request) => (
                            <tr key={request._id} className="hover:bg-base-300">
                                <td className="border border-gray-700 px-4 py-2">{request.title}</td>
                                <td className="border border-gray-700 px-4 py-2">{request.email}</td>
                                <td className="border border-gray-700 px-4 py-2">{request.name}</td>
                                <td className="border border-gray-700 px-4 py-2 text-center">{request.status}</td>
                                <td className="border border-gray-700 px-4 py-2 flex justify-center space-x-2">
                                    <button
                                        className="btn btn-xs btn-success"
                                        onClick={() => handleServe(request._id)}
                                    >
                                        Serve
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};

export default ServeMeals;