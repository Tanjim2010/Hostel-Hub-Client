import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../../Routes/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAdmin from "../../../Hooks/useAdmin";
import Loader from "../../../Components/Loader/Loader";

const DashboardProfile = () => {
    const { user } = useContext(AuthContext)
    const [ isAdmin, isAdminLoading ] = useAdmin()
    const axiosSecure = useAxiosSecure()
    const { data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/${user.email}`);
            return res.data;
        }
    });
    const { data: meals = [], isLoading, isPending } = useQuery({
        queryKey: ['meals'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/meals/admin/${user.email}`);
            return res.data;
        }
    });
    if (isAdminLoading, isLoading, isPending) return <Loader></Loader>
    const { badges } = users;
    return (
        <div className="w-full min-h-screen flex items-center justify-center">
            {isAdmin? (
                <div className="bg-gray-100 flex flex-col justify-center items-center p-8 rounded-lg max-w-4xl w-full">
                {/* User Image */}
                <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-32 h-32 rounded-full border-4 border-blue-500"
                />

                {/* User Name */}
                <h1 className="mt-4 text-2xl font-bold text-gray-800">{user.displayName}</h1>

                {/* User Email */}
                <p className="text-gray-600 mt-2">{user.email}</p>

                {/* Badges Section */}
                <div className="mt-6 w-full text-center">
                    <h2 className="text-xl font-semibold text-gray-700"> added meals count</h2>
                    <div className="flex justify-center mt-3 gap-4">
                        <span
                            className={`px-3 py-1 rounded-full text-sm font-medium text-white ${badges === "Gold"
                                ? "bg-yellow-500"
                                : badges === "Bronze"
                                    ? "bg-yellow-700"
                                    : "bg-gray-400"
                                }`}
                        >
                            {meals?.length}
                        </span>
                    </div>
                </div>
            </div>
            ) : (
                <div className="bg-gray-100 flex flex-col justify-center items-center p-8 rounded-lg max-w-4xl w-full">
                    {/* User Image */}
                    <img
                        src={user.photoURL}
                        alt={user.displayName}
                        className="w-32 h-32 rounded-full border-4 border-blue-500"
                    />

                    {/* User Name */}
                    <h1 className="mt-4 text-2xl font-bold text-gray-800">{user.displayName}</h1>

                    {/* User Email */}
                    <p className="text-gray-600 mt-2">{user.email}</p>

                    {/* Badges Section */}
                    <div className="mt-6 w-full text-center">
                        <h2 className="text-xl font-semibold text-gray-700">Badges</h2>
                        <div className="flex justify-center mt-3 gap-4">
                            <span
                                className={`px-3 py-1 rounded-full text-sm font-medium text-white ${badges === "Gold"
                                    ? "bg-yellow-500"
                                    : badges === "Bronze"
                                        ? "bg-yellow-700"
                                        : "bg-gray-400"
                                    }`}
                            >
                                {badges}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardProfile;
