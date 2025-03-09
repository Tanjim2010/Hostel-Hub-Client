
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import { useContext } from 'react';
import { AuthContext } from '../../../../Routes/AuthProvider';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';

const MembershipSection = () => {
   const {user} = useContext(AuthContext)
  const axiosPublic = useAxiosPublic()
  const axiosSecure = useAxiosSecure()
  const { data: users = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    }
  })
  const { data: packages = [] } = useQuery({
    queryKey: ['packeges'],
    queryFn: async () => {
      const res = await axiosPublic.get('/packeges');
      return res.data;
    }
  })

  return (
    <section className="membership-section py-10 w-full">
      <h2 className="text-3xl font-bold text-center mb-6">Upgrade to a Premium Package</h2>
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-8 ">


        {/* Platinum Package */}
        {packages.filter(packege => packege.category !== users.badges).map(packege => <div key={packege._id} className="membership-card bg-white shadow-lg rounded-lg p-6 text-center w-full">
          <h3 className="text-2xl font-semibold mb-4">{packege.category}</h3>
          <p className="text-xl text-gray-600 mb-4">${packege.price}</p>
          <p className="text-gray-500 mb-6">{packege.description}</p>
          <Link
            to={`/checkOut/${packege.category}`}
            className="btn btn-primary text-white w-full py-2 rounded-md bg-green-500 hover:bg-green-600"
          >
            Buy Now
          </Link>
        </div>)}
      </div>
    </section>
  );
};

export default MembershipSection;
