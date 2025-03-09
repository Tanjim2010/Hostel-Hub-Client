import { Link } from 'react-router-dom';
import useAdmin from '../../Hooks/useAdmin';
import Loader from '../Loader/Loader';

const Sidebar = () => {
    const [isAdmin, isAdminLoading] = useAdmin()

    if(isAdminLoading) return <Loader></Loader>
    return (
        <div className="flex flex-col min-w-72 min-h-screen  bg-gray-800 text-white">
            <div className="flex justify-center items-center py-5 border-b border-gray-700">
                <h2 className="text-2xl font-semibold">Dashboard</h2>
            </div>
            <div className="flex flex-col items-start px-4 space-y-2 mt-4">
                <Link to="/dashboard" className="py-2 px-4 text-lg hover:bg-gray-700 w-full rounded">My Profile</Link>
                {/* User Dashboard Links */}
                {
                    isAdmin ? <>
                        <Link to="/dashboard/admin/manageUsers" className="py-2 px-4 text-lg hover:bg-gray-700 w-full rounded">Manage Users</Link>
                        <Link to="/dashboard/admin/addMeal" className="py-2 px-4 text-lg hover:bg-gray-700 w-full rounded">Add Meal</Link>
                        <Link to="/dashboard/admin/allMeals" className="py-2 px-4 text-lg hover:bg-gray-700 w-full rounded">All Meals</Link>
                        <Link to="/dashboard/admin/allReviews" className="py-2 px-4 text-lg hover:bg-gray-700 w-full rounded">All Reviews</Link>
                        <Link to="/dashboard/admin/serveMeals" className="py-2 px-4 text-lg hover:bg-gray-700 w-full rounded">Serve Meals</Link>
                        <Link to="/dashboard/admin/upcomingMeals" className="py-2 px-4 text-lg hover:bg-gray-700 w-full rounded">Upcoming Meals</Link>
                        <div className="divider"></div>
                        <Link to="/" className="py-2 px-4 text-lg hover:bg-gray-700 w-full rounded">Home</Link>
                    </>
                        : <>

                            <Link to="/dashboard/user/requestedMeals" className="py-2 px-4 text-lg hover:bg-gray-700 w-full rounded">Requested Meals</Link>
                            <Link to="/dashboard/user/myReviews" className="py-2 px-4 text-lg hover:bg-gray-700 w-full rounded">My Reviews</Link>
                            <Link to="/dashboard/user/paymentHistory" className="py-2 px-4 text-lg hover:bg-gray-700 w-full rounded">Payment History</Link>
                            <div className="divider"></div>
                            <Link to="/" className="py-2 px-4 text-lg hover:bg-gray-700 w-full rounded">Home</Link>
                        </>
                }

                {/* Admin Dashboard Links */}

            </div>
        </div>
    );
};

export default Sidebar;
