import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loader from "../../../../Components/Loader/Loader";
import Swal from "sweetalert2";
import { toast } from "react-toastify";


const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { data: users, isPending: userLoading, refetch } = useQuery({
        queryKey: ["user/admin"],
        queryFn: async () => {
            const res = await axiosSecure.get('/users/admin');
            return res.data;
        }
    })
    if (userLoading) return <Loader></Loader>

    const handleAdminButton = (id) =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async (result) => {
            if (result.isConfirmed) {
              const res = await axiosSecure.patch(`/users/admin/${id}`)
              if(res.data.modifiedCount > 0){
                refetch()
                toast.success('this admin request is success')
              }
              console.log(res)
            }
          });
    }
    return (
        <div className="w-full">
            <div className="min-h-screen  flex flex-col w-full items-center py-8">
                <h1 className="text-3xl font-bold  mb-6">My Reviews</h1>
                <div className="overflow-x-auto w-full ">
                    <table className="table-auto w-full shadow-lg rounded-lg">
                        <thead>
                            <tr className="bg-blue-900 text-white">
                                <th className="px-4 py-2">User Name</th>
                                <th className="px-4 py-2">email</th>
                                <th className="px-4 py-2">Make admin</th>
                                <th className="px-4 py-2">Subscription status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.filter(user => user.badges !== 'admin')?.map((user) => (
                                <tr
                                    key={user._id}

                                >
                                    <td className="border px-4 py-2 text-center">{user.name}</td>
                                    <td className="border px-4 py-2 text-center">{user.email}</td>
                                    <td  className="border px-4 py-2 text-center"><button onClick={() => handleAdminButton(user._id)} className="btn btn-primary">Admin</button></td>
                                    <td className="border px-4 py-2 text-center">
                                        {user.badges}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageUsers;