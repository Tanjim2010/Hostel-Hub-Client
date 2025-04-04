import { useLoaderData } from "react-router-dom";
import {loadStripe} from "@stripe/stripe-js"
import {Elements} from "@stripe/react-stripe-js"
import CheckOutFrom from "./CheckOutFrom";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Getaway_key)
const CheckOutBadges = () => {
    const loadedPackage = useLoaderData()
    // console.log(loadedPackage)
    return (
        <div className="flex items-center my-10 mx-20">
            <div className="w-1/2">
                <h1>{loadedPackage.category}</h1>
                <h1>{loadedPackage.price}</h1>
                <h1>{loadedPackage.description}</h1>
            </div>
            <div className="w-1/2">
                <Elements stripe={stripePromise}>
                    <CheckOutFrom price={loadedPackage?.price} badges={loadedPackage?.category}></CheckOutFrom>
                </Elements>
            </div>
        </div>
    );
};

export default CheckOutBadges;