import * as Yup from "yup";

export default Yup.object().shape({
  name: Yup.string().trim().required("This field is required."),
  billingAddress: Yup.string().trim().required("This field is required."),
  billingCity: Yup.string().nullable().required("This field is required."),
  billingPostalCode: Yup.number().nullable().required("This field is required."),
  billingCountry: Yup.string().nullable().required("This field is required."),
});