import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loader from "../../Components/Loader/Loader";
import { useContext } from "react";
import { toast } from "react-toastify"
import { AuthContext } from "../../Routes/AuthProvider";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const UpcomingMeals = () => {
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });

    const { data: upcomingMealsData = [], isPending: pending, refetch } = useQuery({
        queryKey: ['upcomingMeals'],
        queryFn: async () => {
            const res = await axiosPublic.get('/upcomingMeals');
            return res.data.map(meal => ({ ...meal, likeCount: 0 })); // Initialize likeCount for each meal
        }
    });

    const handleLikeButton = async (id) => {
        if (!user) {
            Swal.fire({
                title: "Please log in to like meals!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Go to Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login');
                }
            });
            return;
        }

        if (users?.badges === 'silver' || users?.badges === 'gold' || users?.badges === 'platinum') {
            try {

                const response = await axiosSecure.patch(`/upcomingMeals/${id}`, { email: user.email });

                if (response.data.success) {
                    toast.success(response.data.message); 
                    await refetch(); 
                } else {
                    toast.warning(response.data.message); 
                }
            } catch {
                toast.error("Failed to like the meal. Please try again later.");
                
            }
        } else {
            // যদি ব্যবহারকারী প্রিমিয়াম না হয়
            toast.warning("You need a premium account to like meals.");
        }
    };



    if (pending) return <Loader></Loader>;

    return (
        <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {upcomingMealsData.map(upcomingMeal => (
                <div key={upcomingMeal._id}>
                    <div className="card image-full max-h-60 shadow-xl hover:-translate-y-3 transition-all duration-700">
                        <figure>
                            <img
                                className="object-cover w-full h-full"
                                src={upcomingMeal.image}
                                alt={upcomingMeal.title}
                            />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">{upcomingMeal.title}</h2>
                            <p>{upcomingMeal.description}</p>
                            <p>likes: {upcomingMeal?.likes ? upcomingMeal?.likes : 0}</p>
                            {/* Show like count */}
                            <div className="card-actions justify-end">
                                <button
                                    disabled={upcomingMeal.likedBy?.filter(email => email === users.email)}
                                    onClick={() => handleLikeButton(upcomingMeal._id)}
                                    className={`btn `}
                                >
                                    Like Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );

};

export default UpcomingMeals;
