import * as yup from "yup";

const formSchema = yup.object().shape({
    fname: yup
      .string()
      .min(3, "Name must be at least 3 characters long")
      .required("First name is Required"),
    lname: yup
      .string()
      .min(3, "Name must be at least 3 characters long")
      .required("Last name is Required"),
    email: yup
      .string()
      .email("Must be a valid email address")
      .required("Must include email address"),
    pizzaSize: yup
      .string()
      .oneOf(["small", "medium", "large"], "You must select a pizza size")
      .required("You must select a pizza size"),
  })
  
  export default formSchema