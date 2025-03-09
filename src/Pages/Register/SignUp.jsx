import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Routes/AuthProvider";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import { toast } from "react-toastify";

const SignUp = () => {
    const navigate = useNavigate()
    const axiosPublic = useAxiosPublic()
    const { signUpUser, updateUser } = useContext(AuthContext)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const onSubmit = (data) => {
        console.log("Form Data: ", data);
        const { name, email, password, photo } = data;
        signUpUser(email, password)
            .then(() => {
                // console.log(res)
                updateUser(name, photo)
                    .then(res => {
                        console.log(res)
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to the database')
                                    reset();
                                    navigate('/');
                                    toast.success('Login is successful..')
                                }
                            })

                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
            .catch(error => {
                console.log(error)
            })
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-primary">Sign Up</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            {...register("name", { required: "Name is required" })}
                            className="input input-bordered w-full mt-1"
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                        )}
                    </div>
                    {/* photo field */}
                    <div>
                        <label htmlFor="Photo" className="block text-sm font-medium text-gray-700">
                            Photo
                        </label>
                        <input
                            id="Photo"
                            type="text"
                            placeholder="Enter your Photo"
                            {...register("photo", { required: "Photo is required" })}
                            className="input input-bordered w-full mt-1"
                        />
                        {errors.photo && (
                            <p className="text-sm text-red-500 mt-1">{errors.photo.message}</p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            {...register("email", { required: "Email is required" })}
                            className="input input-bordered w-full mt-1"
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={isPasswordVisible ? "text" : "password"}
                                placeholder="Enter your password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Password must be at least 6 characters long" }
                                })}
                                className="input input-bordered w-full mt-1"
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-2"
                                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                            >
                                {isPasswordVisible ? "Hide" : "Show"}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                        )}
                    </div>



                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary w-full">
                        Sign Up
                    </button>
                </form>

                <SocialLogin></SocialLogin>

                {/* Additional Links */}
                <p className="text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary underline">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
