import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loader from "../../Components/Loader/Loader";
import MealsCart from "../../Components/MealsCart/MealsCart";
import { IoMdSearch } from "react-icons/io";

const Meals = () => {
    const axiosPublic = useAxiosPublic();

    const { data: mealsData, isPending: pending, isLoading } = useQuery({
        queryKey: ['meals'],
        queryFn: async () => {
            const res = await axiosPublic.get('/meals');
            return res.data; // Ensure the API returns an array here
        }
    });

    if (pending || isLoading) {
        return (
            <div className="min-h-screen">
                <Loader />
            </div>
        );
    }

    // Ensure mealsData is an array or fallback to an empty array
    const meals = Array.isArray(mealsData) ? mealsData : [];

    return (
        <div>
            {/* Search Bar */}
            <div className="p-10">
                <label className="input input-bordered flex items-center gap-2">
                    <input type="text" className="grow" placeholder="Search" />
                    <button className="btn-sm btn-ghost">
                        <IoMdSearch />
                    </button>
                </label>
            </div>

            {/* Meals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-10">
                {meals.length > 0 ? (
                    meals.map((meal) => (
                        <div key={meal._id}>
                            <MealsCart meal={meal} />
                        </div>
                    ))
                ) : (
                    <p className="col-span-full text-center text-xl">
                        No meals found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Meals;
