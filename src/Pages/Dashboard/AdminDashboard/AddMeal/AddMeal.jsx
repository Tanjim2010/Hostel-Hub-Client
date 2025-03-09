import { useContext } from 'react';
import { useForm } from "react-hook-form"
import { AuthContext } from '../../../../Routes/AuthProvider';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddMeal = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()
    const onSubmit = async (mealData) => {
        const res = await axiosSecure.post('/meals/admin', mealData)
        if (res.data.insertedId) {
            reset()
            navigate('/dashboard/admin/allMeals')
            toast.success('Your meal is added successfully')
        }
    }

    return (
        <div className="container mx-auto py-10">
            <h2 className="text-2xl font-bold text-center mb-6 text-primary">Add Meal</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto bg-base-200 p-6 rounded shadow-md">
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium text-primary">Title</label>
                    <input
                        type="text"
                        id="title"
                        {...register('title', { required: true })}
                        className="w-full border border-gray-600 bg-base-100 text-base-content rounded px-3 py-2"
                        placeholder="Enter meal title"
                    />

                    {errors.exampleRequired && <span>This field is required</span>}
                </div>

                <div className="mb-4">
                    <label htmlFor="category" className="block text-sm font-medium text-primary">Category</label>
                    <select
                        id="category"
                        {...register('category', { required: true })}
                        className="w-full border border-gray-600 bg-base-100 text-base-content rounded px-3 py-2"
                    >
                        <option value="">Select category</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                    </select>

                    {errors.exampleRequired && <span>This field is required</span>}
                </div>

                <div className="mb-4">
                    <label htmlFor="image" className="block text-sm font-medium text-primary">imageURL</label>
                    <input
                        type="text"
                        id="image"
                        {...register('image', { required: true })}
                        className="w-full border border-gray-600 bg-base-100 text-base-content rounded px-3 py-2"
                        placeholder="Enter meal image"
                    />

                    {errors.exampleRequired && <span>This field is required</span>}
                </div>

                <div className="mb-4">
                    <label htmlFor="ingredients" className="block text-sm font-medium text-primary">Ingredients</label>
                    <textarea
                        id="ingredients"
                        {...register('ingredients', { required: true })}
                        className="w-full border border-gray-600 bg-base-100 text-base-content rounded px-3 py-2"
                        placeholder="Enter ingredients"
                    ></textarea>

                    {errors.exampleRequired && <span>This field is required</span>}
                </div>

                <div className="mb-4">
                    <label htmlFor="rating" className="block text-sm font-medium text-primary">rating</label>
                    <input
                        type="number"
                        id="rating"
                        {...register('rating', { required: true })}
                        className="w-full border border-gray-600 bg-base-100 text-base-content rounded px-3 py-2"
                        placeholder="Enter meal rating"
                    />

                    {errors.exampleRequired && <span>This field is required</span>}
                </div>

                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium text-primary">Description</label>
                    <textarea
                        id="description"
                        {...register('description', { required: true })}
                        className="w-full border border-gray-600 bg-base-100 text-base-content rounded px-3 py-2"
                        placeholder="Enter description"
                    ></textarea>

                    {errors.exampleRequired && <span>This field is required</span>}
                </div>

                <div className="mb-4">
                    <label htmlFor="price" className="block text-sm font-medium text-primary">Price</label>
                    <input
                        type="number"
                        id="price"
                        {...register('price', { required: true })}
                        className="w-full border border-gray-600 bg-base-100 text-base-content rounded px-3 py-2"
                        placeholder="Enter price"
                    />
                    {errors.exampleRequired && <span>This field is required</span>}
                </div>

                <div className="mb-4">
                    <label htmlFor="postTime" className="block text-sm font-medium text-primary">Post Time</label>
                    <input
                        type="datetime-local"
                        id="postTime"
                        {...register('postTime', { required: true })}
                        className="w-full border border-gray-600 bg-base-100 text-base-content rounded px-3 py-2"
                    />
                    {errors.exampleRequired && <span>This field is required</span>}
                </div>

                <div className="mb-4">
                    <label htmlFor="distributorEmail" className="block text-sm font-medium text-primary">Distributor Email</label>
                    <input
                        type="email"
                        id="mealAddedEmail"
                        {...register('distributorEmail', { required: true })}
                        className="w-full border border-gray-600 bg-base-100 text-base-content rounded px-3 py-2"
                        value={user.email} // Replace with logged-in admin's email
                        readOnly
                    />
                </div>

                <button type="submit" className="w-full bg-primary text-base-100 py-2 rounded hover:bg-primary-focus">
                    Add Meal
                </button>
            </form>
        </div>
    );
};

export default AddMeal;
