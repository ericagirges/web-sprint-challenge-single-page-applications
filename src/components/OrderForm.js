import React , { useState, useEffect } from "react";
import axios from "axios";

const initialFormValues = {
    name: "",
    email: "", 
    pizzaSize: "",
    quantity: "",
    toppings: "",
}

const initialDisabled = true
const initialOrders = []

const OrderForm = props => {
    const [formValues, setFormValues] = useState(initialFormValues)
    const [order, setOrders] = useState(initialOrders)
    const [disabled, setDisabled] = useState(initialDisabled)

    const getOrders = () => {
        axios.get('https://reqres.in/')
      .then(response => {
        setOrders(response.data)
      })
      .catch(error => {
        debugger
      })
    }

    return (
        <form>

        </form>
    )
}

export default OrderForm