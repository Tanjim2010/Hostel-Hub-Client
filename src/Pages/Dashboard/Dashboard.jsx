import { Outlet } from 'react-router-dom';
import DashboardSidebar from '../../Components/DashboardSidbar/DashboardSidebar';

const Dashboard = () => {
    return (
        <div className='flex max-w-[1900px] mx-auto'>
            <DashboardSidebar></DashboardSidebar>
            <Outlet></Outlet>
        </div>
    );
};

export default Dashboard;