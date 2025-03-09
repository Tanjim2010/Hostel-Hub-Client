import { Outlet } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className='w-full'>
            <Outlet></Outlet>
        </div>
    );
};

export default AdminDashboard;