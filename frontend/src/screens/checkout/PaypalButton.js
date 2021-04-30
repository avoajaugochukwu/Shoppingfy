import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = () => {

    const clientId = 'AQfXF1OFPgKdBlMG0tvsvNiKyANJNtEb0zx0K8rodSHQRGn8YN3fY6qRfw4iv9lMA15owtTAdferG9dg'

    const initialOptions = {
        "client-id": clientId,
        currency: "USD",
        // intent: "capture",
        // "data-client-token": sandBoxSecrete,
    };

    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    description: +"Mercedes G-Wagon",
                    amount: {
                        currency_code: "USD",
                        value: 200
                    }
                }
            ]
        });
    }

    const onApprove = (data, actions) => {
        console.log(data, actions)
        actions.order.capture().then(() => {
            const paymentData = {
                payerID: data.payerID,
                orderID: data.orderID
            };
            console.log("Payment Approved: ", paymentData);
        })
    }

    return (
        <PayPalScriptProvider options={initialOptions}>

            <PayPalButtons
                style={{ layout: "vertical" }}
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions)}
            />
        </PayPalScriptProvider>
    )

}

export default PayPalButton