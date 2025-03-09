import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loader from "../Loader/Loader";
import { useContext, useState } from "react";
import { AuthContext } from "../../Routes/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";


const MealsDetails = () => {
    const params = useParams();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [reviewValue, setReviewValue] = useState('')

    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });
    
    const { data: loadedMeals = [], isPending: pending, isLoading, refetch } = useQuery({
        queryKey: [`meals`, params.id], // Key now includes the meal id
        queryFn: async () => {
            const res = await axiosPublic.get(`/meals/${params.id}`);
            return res.data;
        }
    });
    console.log(loadedMeals)

    // Ensure reviewsData query runs only after `loadedMeals` is available
    const { data: reviewsData = [], isPending: reviewPending, isLoading: reviewLoading, refetch: reviewFetch } = useQuery({
        queryKey: ['reviews', loadedMeals.title], // Only fetch reviews if title is available
        queryFn: async () => {
            if (loadedMeals.title) {
                const res = await axiosPublic.get(`/reviews/${loadedMeals.title}`);
                return res.data;
            }
            return [];
        },
        enabled: !!loadedMeals.title, // Only enable the query when title is available
    });

    const { title, description, category, image, _id, ingredients, price, rating, distributor_name, post_time } = loadedMeals;

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

        try {
            const response = await axiosSecure.patch(`/meal/${id}`, { email: user.email });
            if (response.data.success) {
                toast.success(response.data.message);
                await refetch();
            } else {
                toast.warning(response.data.message);
            }
        } catch {
            toast.error("Failed to like the meal. Please try again later.");
        }
    };

    // handle request button work
    const requestButton = () => {
        Swal.fire({
            title: "Are you sure. You need to request to this meals",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ok"
        }).then((result) => {
            if (result.isConfirmed) {
                handleRequestButton()
            }
        });
    }
    const handleRequestButton = async () => {
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
        }
        if(!users.badges === 'gold'|| !users.badges === 'silver'|| !users.badges === 'platinum') {
            Swal.fire({
                title: "You are not a member of our hostel. please buy a package of member ship",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "go to home and buy now"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/');
                }
            });
        }
        const requestData = {
            title,
            likes: loadedMeals?.likes == undefined ? 0 : loadedMeals.likes,
            review: reviewsData.length === 0 ? 0 : reviewsData.length,
            status: 'pending',
            email: user.email,
            name: user.displayName,
        }
        const res = await axiosSecure.post('/requestMeal', requestData)
        if (res.data.acknowledged) {
            toast.success('your review is successful.')
        }
    }

    // handle review button work
    const handleReviewButton = async () => {
        const reviewData = {
            mealTitle: title,
            userEmail: user.email,
            review: reviewValue,
            likes: loadedMeals?.likes == undefined ? 0 : loadedMeals.likes,
            rating,
            postedAt: new Date()
        }
        const res = await axiosSecure.post('/reviews', reviewData);
        if (res.data.acknowledged) {
            reviewFetch()
            toast.success('your review is successful.')
        }

        document.getElementById('my_modal_1').close()
    }


    // Check for loading states
    if (pending || reviewPending || isLoading || reviewLoading) return <Loader />;

    return (
        <div>
            <div className="flex flex-col md:flex-row px-20 py-10 gap-7">
                <div className="w-1/2 rounded-3xl h-full">
                    <img src={image} className="rounded-3xl h-full" alt="" />
                </div>
                <div className="w-1/2 space-y-3">
                    <h1 className="text-xl">name: {title}</h1>
                    <h1 className="text-xl">price: {price}</h1>
                    <h1 className="text-xl">category: {category}</h1>
                    <h1 className="text-xl"> distributor name: {distributor_name}</h1>
                    <h1 className="">description: {description}</h1>
                    {ingredients?.map((ingredient, ind) => <div key={ind} className=""><p>ingredient: {ingredient}</p></div>)}
                    <h1 className="text-xl">rating: {rating}</h1>
                    <h1 className="text-xl">posted time: {post_time}</h1>
                    <h1 className="text-xl">likes: {loadedMeals?.likes || 0}</h1>
                    <div className="space-x-2">
                        <button
                            disabled={loadedMeals?.likedBy?.includes(user?.email)}
                            onClick={() => handleLikeButton(_id)} className="btn btn-primary">Like Now</button>
                        <button onClick={requestButton} className="btn btn-primary">Request Now</button>
                    </div>
                </div>
            </div>

            <div className="divider px-20"></div>

            <div className="px-20 py-5">
                <h1 className="text-2xl text-center">Reviews</h1>
                {reviewsData.length > 0 ? reviewsData.map(review => (
                    <div className="" key={review._id}>
                        <h3 className="font-medium my-2 btn rounded-full">{review.review}</h3>
                    </div>
                )) : 'We have no reviews for this meal'}
            </div>

            <button onClick={() => document.getElementById('my_modal_1').showModal()} className="mx-20 mb-10 btn btn-primary">Review Please</button>

            {/* Modal */}
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Write your review.</h3>
                    <input required onChange={(e) => setReviewValue(e.target.value)} name="review" type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                    <div className="modal-action">
                        <button onClick={handleReviewButton} className="btn">Ok</button>
                        <form method="dialog">
                            <button className="btn">cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default MealsDetails;
