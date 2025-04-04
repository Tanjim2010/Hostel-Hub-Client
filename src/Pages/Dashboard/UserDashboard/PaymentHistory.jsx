import { useContext } from "react";
import { AuthContext } from "../../../Routes/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../Components/Loader/Loader";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const PaymentHistory = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const { data: payments = [], isPending, isLoading } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`);
            return res.data;
        }
    });
    // console.log(payments)

    if(isLoading|| isPending) return <Loader></Loader>
    return (
        <div className="w-full">
            <div className="min-h-screen  flex flex-col w-full items-center py-8">
                <h1 className="text-3xl font-bold  mb-6">My Reviews</h1>
                <div className="overflow-x-auto w-full ">
                    <table className="table-auto w-full shadow-lg rounded-lg">
                        <thead>
                            <tr className="bg-blue-900 text-white">
                                <th className="px-4 py-2">email</th>
                                <th className="px-4 py-2">transaction Id</th>
                                <th className="px-4 py-2">price</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((review) => (
                                <tr
                                    key={review._id}
                                    
                                >
                                    <td className="border px-4 py-2 text-center">{review.email}</td>
                                    <td className="border px-4 py-2 text-center">{review.transactionId}</td>
                                    <td className="border px-4 py-2 text-center">{review.price}</td>
                                    <td className="border px-4 py-2 text-center">{review.date} </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;