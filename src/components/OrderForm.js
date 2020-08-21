import React , { useState, useEffect } from "react";
import axios from "axios";
import * as yup from 'yup';
import formSchema from "../validation/formSchema";

//set initial form shape and values
const initialFormValues = {
    fname: "",
    lname: "",
    email: "", 
    pizzaSize: "",
    toppings: {
        pepperoni: false,
        mushroom: false,
        jalapenos: false,
        olives: false,
    },
}

const initialFormErrors = {
    fname: "",
    lname: "",
    email: "", 
    pizzaSize: "",
}

//set submit button to disabled 
const initialDisabled = true
const initialOrders = []

const OrderForm = props => {
    const [formValues, setFormValues] = useState(initialFormValues)
    const [orders, setOrders] = useState(initialOrders)
    const [disabled, setDisabled] = useState(initialDisabled)
    const [formErrors, setFormErrors] = useState(initialFormErrors)

    //fetching current order list data
    const getOrders = () => {
        axios.get("https://reqres.in/")
      .then(response => {
        setOrders(response.data)
      })
      .catch(error => {
        debugger
      })
    }

    //posting new order to database and console logging updated orders list
    const postNewOrder = newOrder => {
        axios.post("https://reqres.in/", newOrder)
            .then(response => {
                setOrders([...orders, response.data])
            })
            .catch(error => {
                alert("Order could not be placed at this time.")
            })
            .finally(() => {
                console.log(orders)
                setFormValues(initialFormValues)
            })
    }

    //functionaity to input info while validating order form has all required info
    const orderInput = (name, value) => {
        yup
            .reach(formSchema, name)
            .validate(value)
            .then(valid => {
                setFormErrors({
                ...formErrors,
                [name]: "",
                })
            })
            .catch(err => {
                setFormErrors({
                ...formErrors,
                [name]: err.errors[0],
                })
            })
         setFormValues({
        ...formValues,
        [name]: value
      })
    }

    const updateCheckbox = (name, isChecked) => {
        setFormValues({
          ...formValues,
          toppings: {
            ...formValues.toppings,
            [name]: isChecked,
          }
        })
      }
    


    return (
        <form>

        </form>
    )
}

export default OrderForm