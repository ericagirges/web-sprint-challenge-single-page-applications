import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";
import formSchema from "../validation/formSchema";
import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  
`;

const FormStyler = styled.form`
  width: 50%;
  height: 800px;
  font-family: "Noto Sans KR";
  font-weight: 700;
  background-color: whitesmoke;

`;

const OrderHeader = styled.header`
    h2 {
        font-size: 2.0em;
        text-align: center;
        margin-top: 40px;
        margin-bottom: 60px;
    }
`

const InputFields = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 120px;
  font-weight: 400;
  height: 300px;
  width: 100%;

  label {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    text-align: right;
    width: 350px;
    line-height: 26px;
    margin-bottom: 20px;
  }

  input {
    height: 30px;
    width: 200px;
    flex: 0 0 200px;
    margin-left: 40px;
    font-family: "Nunito";
  }

  input:hover {
    border: 2px solid black;
  }

  select {
      margin-left: 110px;
  }


`;

const Checkbox = styled.div `
    display: flex;
    justify-content: space-around;
    width: 700px;
    margin-top: 40px;
    border-top: 2px solid black;
    padding-top: 20px;

`

const SubmitButton = styled.button `
    margin-left: 100px;
    margin-top: 120px;
    width: 100px;
    height: 30px;

`

const Options = styled.div `

`

//set initial form shape and values
const initialFormValues = {
  fname: "",
  lname: "",
  email: "",
  pizzaSize: "",
  toppings: {
    pepperoni: false,
    mushrooms: false,
    jalapenos: false,
    olives: false,
  },
};

const initialFormErrors = {
  fname: "",
  lname: "",
  email: "",
  pizzaSize: "",
};

//set submit button to disabled
const initialDisabled = true;
const initialOrders = [];

const OrderForm = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [orders, setOrders] = useState(initialOrders);
  const [disabled, setDisabled] = useState(initialDisabled);
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  //fetching current order list data
  const getOrders = () => {
    axios
      .get("https://reqres.in/api/users")
      .then((response) => {
        setOrders(response.data.data);
      })
      .catch((error) => {
        debugger;
      });
  };

  //posting new order to database and console logging updated orders list
  const postNewOrder = (newOrder) => {
    axios
      .post("https://reqres.in/api/users", newOrder)
      .then((response) => {
        setOrders([...orders, response.data]);
      })
      .catch((error) => {
        console.log("error", error)
        debugger
      })
      .finally(() => {
        console.log(orders);
        setFormValues(initialFormValues);
      });
  };

  //functionaity to input info while validating order form has all required info
  const orderInput = (name, value) => {
    yup
      .reach(formSchema, name)
      .validate(value)
      .then((valid) => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  //marking toppings checkboxes
  const updateCheckbox = (name, isChecked) => {
    setFormValues({
      ...formValues,
      toppings: {
        ...formValues.toppings,
        [name]: isChecked,
      },
    });
  };

  //submit button functionality
  const handleSubmit = () => {
    const newOrder = {
      fname: formValues.fname.trim(),
      lname: formValues.fname.trim(),
      email: formValues.email.trim(),
      pizzaSize: formValues.pizzaSize,
      toppings: Object.keys(formValues.toppings).filter(
        (topping) => formValues.toppings[topping]
      ),
    };
    postNewOrder(newOrder);
  };

  useEffect(() => {
    getOrders();
  }, []);

  //enable button when form passes validation
  useEffect(() => {
    formSchema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  });

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit();
  };

  const onCheckboxChange = (event) => {
    const { name, checked } = event.target;
    updateCheckbox(name, checked);
  };

  const onInputChange = (event) => {
    const { name, value } = event.target;
    orderInput(name, value);
  };

  return (
    <FormContainer>
      <FormStyler onSubmit={onSubmit}>
        <OrderHeader>
          <h2>Place an Order</h2>
        </OrderHeader>
        <InputFields>
        <label>
          First Name&nbsp;
          <input
            value={formValues.fname}
            onChange={onInputChange}
            name="fname"
            type="text"
          />
        </label>
        <label>
          Last Name&nbsp;
          <input
            value={formValues.lname}
            onChange={onInputChange}
            name="lname"
            type="text"
          />
        </label>
        <label>
          Email&nbsp;
          <input
            value={formValues.email}
            onChange={onInputChange}
            name="email"
            type="email"
          />
        </label>
        <label>
          Pizza Size
          <select
            onChange={onInputChange}
            value={formValues.pizzaSize}
            name="pizzaSize"
          >
            <option value="">- Select an option -</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </label>
        <Checkbox className="checkboxes">
          <h4>Toppings</h4>
          <Options>
          <label>
            Pepperoni
            <input
              type="checkbox"
              name="pepperoni"
              checked={formValues.toppings.pepperoni}
              onChange={onCheckboxChange}
            />
          </label>

          <label>
            Mushrooms
            <input
              type="checkbox"
              name="mushrooms"
              checked={formValues.toppings.mushroom}
              onChange={onCheckboxChange}
            />
          </label>

          <label>
            Jalapenos
            <input
              type="checkbox"
              name="jalapenos"
              checked={formValues.toppings.jalapenos}
              onChange={onCheckboxChange}
            />
          </label>

          <label>
            Olives
            <input
              type="checkbox"
              name="olives"
              checked={formValues.toppings.olives}
              onChange={onCheckboxChange}
            />
          </label>
          </Options>
          </Checkbox>
        </InputFields>
        <SubmitButton disabled={disabled}>submit</SubmitButton>

        <div className='errors'>
          <div>{formErrors.fname}</div>
          <div>{formErrors.lname}</div>
          <div>{formErrors.email}</div>
          <div>{formErrors.pizzaSize}</div>
        </div>
      </FormStyler>
    </FormContainer>
  );
};

export default OrderForm;
