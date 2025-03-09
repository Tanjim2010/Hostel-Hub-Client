import Banner from "../Banner/Banner";
import MealsByCategory from "./MealsByCategory/MealsByCategory";
import MembershipSection from "./MemberShipSection/MembershipSection";


const HomePage = () => {
    
    return (
        <div>

            <div>
                <Banner></Banner>
                <div className="max-w-7xl mx-auto">

                    {/* Meals By Category Section */}
                    <MealsByCategory></MealsByCategory>

                    {/* extra section  */}


                    {/* membership section */}
                    <MembershipSection></MembershipSection>
                </div>
            </div>

        </div>
    );
};

export default HomePage;