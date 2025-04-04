import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Routes/AuthProvider";
import { toast } from "react-toastify";

const CheckOutFrom = ({ price, badges }) => {
    const {user} = useContext(AuthContext)
    const [clientSecret, setClientSecret] = useState()
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure()
    // console.log(price)

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price })
            .then(res => {
                // console.log(res.data.clientSecret)
                setClientSecret(res.data.clientSecret)
            })
    }, [axiosSecure, price])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            // console.log('[error]', error);
        } else {
            // console.log('[PaymentMethod]', paymentMethod);
        }
        // conform card payment
        const {paymentIntent, error:confirmError} = await stripe.confirmCardPayment(clientSecret,{
            payment_method: {
                card:card,
                billing_details: {
                    email:user.email,
                    name:user.displayName
                }
            }
        })
        if(confirmError){
            // console.log(confirmError)
        }
        else{
            // console.log('paymentIntent',paymentIntent)
            if(paymentIntent.status === 'succeeded'){
                toast.success('payment success full')
                const payment = {
                    email: user.email,
                    transactionId: paymentIntent.id,
                    price,
                    badges,
                    date: new Date()
                }

                const res = await axiosSecure.post('/payments', payment);
                // console.log('payment saved',res)
            }
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="w-full text-green-500">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#22c55e',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-sm btn-success" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
            </form>
        </div>
    );
};

export default CheckOutFrom;