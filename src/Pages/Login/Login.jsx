import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Routes/AuthProvider";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Login = () => {
    const { loginInUser} = useContext(AuthContext)
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Form Data: ", data);
        const {email, password} = data;
        loginInUser(email, password)
        .then(res => {
            console.log(res)
            navigate('/')
            toast.success('Login in successful...')
        })
        .catch(error => {
            console.log(error)
            toast.error(error.message)
        })
    };

    

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-primary">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", { required: "Password is required" })}
                            className="input input-bordered w-full mt-1"
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="btn btn-primary w-full">
                        Login
                    </button>
                </form>
                <SocialLogin></SocialLogin>

                {/* Additional Links */}
                <p className="text-center text-sm text-gray-600">
                    Do not have an account?{" "}
                    <a href="/register" className="text-primary underline">
                        Register here
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
