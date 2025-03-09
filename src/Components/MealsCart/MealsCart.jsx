import { NavLink } from 'react-router-dom';


const MealsCart = ({ meal }) => {
    console.log(meal.image)
    return (
        <div className="card card-compact bg-base-100 shadow-xl w-full">
            <figure>
                <img
                    className='h-56 w-full object-cover'
                    src={meal?.image}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{meal?.title}</h2>
                <p>{meal?.description}</p>
                <div className="card-actions justify-end">
                    <NavLink to={`/mealDetails/${meal?._id}`} className="btn btn-primary">See Details</NavLink>
                </div>
            </div>
        </div>
    );
};

export default MealsCart;