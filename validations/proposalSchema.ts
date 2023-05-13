import * as Yup from "yup";

export default Yup.object().shape({
  paymentOption: Yup.string().trim().required("This field is required."),
  amount:Yup.number().positive().required("amount is required"),
  title:Yup.string().trim().required("This field is required."),
  description:Yup.string().trim().required("This field is required."),
  milestones: Yup.array().when('deposit', ([deposit],schema)=>{
    return deposit==="first_milestone"?schema.of(
      Yup.object().shape({
        description: Yup.string().required("This field is required."),
        dueDate: Yup.string().required(),
        amount: Yup.number().positive().required(),
      })
    )
    .min(1)
    .required("Milestone is required"):schema.nullable()
  })
});