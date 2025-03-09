import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from 'react';
import MealsCart from '../../../../Components/MealsCart/MealsCart';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../../Components/Loader/Loader';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function MealsByCategory() {
    const [value, setValue] = React.useState(0);
    const [mealsCategory, setMealsCategory] = useState('Breakfast');
    const axiosPublic = useAxiosPublic();

    const { data: mealsData = [], isPending: pending, isLoading: loading } = useQuery({
        queryKey: ['meals'],
        queryFn: async () => {
            const res = await axiosPublic.get('/meals');
            return res.data;
        }
    });

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // Ensure mealsData is always an array, fallback to empty array if not
    const meals = Array.isArray(mealsData) ? mealsData : [];

    return (
        <div className='my-10 mx-auto'>
            <Box sx={{ width: '100%' }}>
                <Box sx={{
                    borderBottom: 1, borderColor: 'divider', display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }} >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        TabIndicatorProps={{
                            style: { color: 'white' },
                        }}
                    >
                        <Tab
                            sx={{ color: 'white', '&.Mui-selected': { color: 'white' } }}
                            label="Breakfast"
                            onClick={() => setMealsCategory('Breakfast')}
                            {...a11yProps(0)}
                        />
                        <Tab
                            sx={{ color: 'white', '&.Mui-selected': { color: 'white' } }}
                            label="Lunch"
                            onClick={() => setMealsCategory('Lunch')}
                            {...a11yProps(1)}
                        />
                        <Tab
                            sx={{ color: 'white', '&.Mui-selected': { color: 'white' } }}
                            label="Dinner"
                            onClick={() => setMealsCategory('Dinner')}
                            {...a11yProps(2)}
                        />
                    </Tabs>
                </Box>

                {(pending || loading) ? <Loader /> : (
                    <div className=''>
                        <CustomTabPanel value={value} index={0}>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                                {mealsCategory === 'Breakfast' && meals.filter(meal => meal.category === "Breakfast").slice(0, 3).map(meal => (
                                    <div key={meal?._id}>
                                        <MealsCart meal={meal} />
                                    </div>
                                ))}
                            </div>
                        </CustomTabPanel>

                        <CustomTabPanel value={value} index={1}>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                                {mealsCategory === 'Lunch' && meals.filter(meal => meal.category === "Lunch").slice(0, 3).map(meal => (
                                    <div key={meal?._id}>
                                        <MealsCart meal={meal} />
                                    </div>
                                ))}
                            </div>
                        </CustomTabPanel>

                        <CustomTabPanel value={value} index={2}>
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                                {mealsCategory === 'Dinner' && meals.filter(meal => meal.category === "Dinner").slice(0, 3).map(meal => (
                                    <div key={meal?._id}>
                                        <MealsCart meal={meal} />
                                    </div>
                                ))}
                            </div>
                        </CustomTabPanel>
                    </div>
                )}
            </Box>
        </div>
    );
}
