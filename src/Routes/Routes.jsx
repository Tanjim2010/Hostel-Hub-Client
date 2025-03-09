import { createBrowserRouter } from 'react-router-dom'
import Root from '../Root/Root';
import HomePage from '../Pages/HomePage/HomePage/HomePage';
import Login from '../Pages/Login/Login';
import SignUp from '../Pages/Register/SignUp';
import App from '../App';
import Meals from '../Pages/Meals/Meals';
import UpcomingMeals from '../Pages/Meals/UpcomingMeals';
import Dashboard from '../Pages/Dashboard/Dashboard';
import UserHome from '../Pages/Dashboard/UserDashboard/UserHome/UserHome';
import DashboardProfile from '../Pages/Dashboard/DashboardProfile/DashboardProfile';
import RequestedMeals from '../Pages/Dashboard/UserDashboard/UserHome/RequestedMeals';
import MyReviews from '../Pages/Dashboard/UserDashboard/MyReviews';
import PaymentHistory from '../Pages/Dashboard/UserDashboard/PaymentHistory';
import MealsDetails from '../Components/MealsDetails/MealsDetails';
import CheckOutBadges from '../Pages/HomePage/HomePage/CheckOutBadges/CheckOutBadges';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import AdminRoute from './AdminRoute/AdminRoute';
import AdminDashboard from '../Pages/Dashboard/AdminDashboard/AdminDashboard';
import ManageUsers from '../Pages/Dashboard/AdminDashboard/ManageUsers/ManageUsers';
import AddMeal from '../Pages/Dashboard/AdminDashboard/AddMeal/AddMeal';
import AllMeals from '../Pages/Dashboard/AdminDashboard/AllMeals/AllMeals';
import AllReviews from '../Pages/Dashboard/AdminDashboard/AllReviews/AllReviews';
import ServeMeals from '../Pages/Dashboard/AdminDashboard/ServeMeals/ServeMeals';
import AdminUpcomingMeals from '../Pages/Dashboard/AdminDashboard/AdminUpcomingMeals/AdminUpcomingMeals';
const Routes = createBrowserRouter([
    {
        path: '/',
        element: <App></App>,
        children: [
            {
                path: '/',
                element: <Root></Root>,
                children: [
                    {
                        path: '/',
                        element: <HomePage></HomePage>
                    },
                    {
                        path: 'meals',
                        element: <Meals></Meals>
                    },
                    {
                        path: 'mealDetails/:id',
                        element: <MealsDetails></MealsDetails>
                    },
                    {
                        path: 'checkOut/:badgesName',
                        element: <PrivateRoute><CheckOutBadges></CheckOutBadges></PrivateRoute>,
                        loader: ({ params }) => fetch(`http://localhost:5000/packeges/${params.badgesName}`)
                    },
                    {
                        path: 'upcomingMeals',
                        element: <UpcomingMeals></UpcomingMeals>
                    }
                ]
            },
            {
                path: '/dashboard',
                element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
                children: [
                    {
                        index: true,
                        // path: '/dashboard',
                        element: <DashboardProfile></DashboardProfile>
                    },
                    // user only Dashboard
                    {
                        path: '/dashboard/user',
                        element: <UserHome></UserHome>,
                        children: [
                            {
                                path: '/dashboard/user/requestedMeals',
                                element: <RequestedMeals></RequestedMeals>
                            },
                            {
                                path: '/dashboard/user/myReviews',
                                element: <MyReviews></MyReviews>
                            },
                            {
                                path: '/dashboard/user/paymentHistory',
                                element: <PaymentHistory></PaymentHistory>
                            },
                        ]
                    },


                    // admin only Dashboard
                    {
                        path: '/dashboard/admin',
                        element: <PrivateRoute><AdminRoute><AdminDashboard></AdminDashboard></AdminRoute></PrivateRoute>,
                        children: [
                            {
                                path: '/dashboard/admin/manageUsers',
                                element: <PrivateRoute><AdminRoute><ManageUsers></ManageUsers></AdminRoute></PrivateRoute>
                            },
                            {
                                path: '/dashboard/admin/addMeal',
                                element: <PrivateRoute><AdminRoute><AddMeal></AddMeal></AdminRoute></PrivateRoute>
                            },
                            {
                                path: '/dashboard/admin/allMeals',
                                element: <PrivateRoute><AdminRoute><AllMeals></AllMeals></AdminRoute></PrivateRoute>
                            },
                            {
                                path: '/dashboard/admin/allReviews',
                                element: <PrivateRoute><AdminRoute><AllReviews></AllReviews></AdminRoute></PrivateRoute>
                            },
                            {
                                path: '/dashboard/admin/serveMeals',
                                element: <PrivateRoute><AdminRoute><ServeMeals></ServeMeals></AdminRoute></PrivateRoute>
                            },
                            {
                                path: '/dashboard/admin/upcomingMeals',
                                element: <PrivateRoute><AdminRoute><AdminUpcomingMeals></AdminUpcomingMeals></AdminRoute></PrivateRoute>
                            },
                        ]
                    }
                ]
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'register',
                element: <SignUp></SignUp>
            },

        ]
    },

])

export default Routes;