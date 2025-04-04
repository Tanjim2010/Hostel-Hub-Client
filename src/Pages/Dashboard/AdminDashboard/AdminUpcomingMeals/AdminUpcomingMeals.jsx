import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loader from "../../../../Components/Loader/Loader";
import { AuthContext } from "../../../../Routes/AuthProvider";
import Swal from "sweetalert2";
import { toast } from "react-toastify";


const AdminUpcomingMeals = () => {
    const [showModal, setShowModal] = useState(false)
    const axiosSecure = useAxiosSecure()
    const { user } = useContext(AuthContext)

    const { data: upcomingMeals = [], isPending, isLoading, refetch } = useQuery({
        queryKey: ['upcomingMeals'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/upcomingMeals/admin`);
            return res.data;
        }
    });



    if (isPending || isLoading) return <Loader></Loader>


    const handlePublish = async (meal) => {
        // console.log(meal)
        const data = {
            title: meal.title,
            category: meal.category,
            image: meal.image,
            ingredients: [],
            description: meal.description,
            price: meal.price,
            rating: meal.rating,
            distributor_name: user.displayName,
            post_time: new Date(),
            mealAddedEmail: user.email
        }
        // console.log(data)
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
                const res = await axiosSecure.post(`/request/admin/${meal._id}`, data)
                if (res.data.deletedCount > 0) {
                    toast.success('deleted successful.')
                    refetch()
                }
                // console.log(res)
            }
        });

    }

    const handleAddMeal = async (e) => {
        e.preventDefault()
        const form = e.target;
        const title = form.title.value;
        const category = form.category.value;
        const price = form.price.value;
        const description = form.category.value;
        const rating = form.rating.value;
        const image = form.image.value;
        const data = { title, category, price, description, rating, image, }
        // console.log(data)
        const res = await axiosSecure.post('/upcomingMeals/admin', data)
        if (res.data.acknowledged) {
            refetch()
            toast.success('success')
        }
        setShowModal(false)
    }

    return (
        <div className="container mx-auto py-10 px-20">
            <h2 className="text-2xl font-bold text-center mb-6 text-primary">upcoming meal List</h2>
            <div className="flex justify-end mb-4">
                <button
                    className="btn btn-primary"
                    onClick={() => setShowModal(true)}
                >
                    Add Upcoming Meal
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-700 bg-base-200 text-base-content">
                    <thead className="bg-primary text-base-100">
                        <tr>
                            <th className="border border-gray-700 px-4 py-2">Title</th>
                            <th className="border border-gray-700 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            upcomingMeals.map(meals => <tr key={meals._id} className="hover:bg-base-300">
                                <td className="border border-gray-700 px-4 py-2">{meals.title}</td>
                                <td className="border border-gray-700 px-4 py-2 flex justify-center space-x-2">
                                    <button
                                        className="btn btn-xs btn-success"
                                        onClick={() => handlePublish(meals)}
                                    >
                                        Publish
                                    </button>
                                </td>
                            </tr>

                            )
                        }
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-4">Add Upcoming Meal</h3>
                        <form onSubmit={handleAddMeal}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Meal Title</label>
                                <input type="text" className="input input-bordered w-full" name="title" placeholder="Enter meal title" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Meal category</label>
                                <input type="text" className="input input-bordered w-full" name="category" placeholder="Enter meal category" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Meal rating</label>
                                <input type="text" className="input input-bordered w-full" name="rating" placeholder="Enter meal rating" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Description</label>
                                <textarea className="textarea textarea-bordered w-full" name="description" placeholder="Enter meal description" required></textarea>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">image</label>
                                <input type="text" className="input input-bordered w-full" name="image" placeholder="Enter image" required />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">Price</label>
                                <input type="number" className="input input-bordered w-full" name="price" placeholder="Enter price" required />
                            </div>
                            <div className="modal-action">
                                <button type="submit" className="btn btn-primary">Add Meal</button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>

    );
};

export default AdminUpcomingMeals;