import * as Yup from 'yup';

export const CreateJobSchema = Yup.object().shape({
  title: Yup.string().min(6).max(100).required('Title is required'),
  // skills: Yup.array()
  //   .of(
  //     Yup.object().shape({
  //       value: Yup.string().required(),
  //       label: Yup.string().required(),
  //     })
  //   )
  //   .min(3)
  //   .required("Skills is required"),
  // scope: Yup.object().shape({
  //   size: Yup.string().required("Size is required"),
  //   time: Yup.string().required("Time is required"),
  //   level: Yup.string().required("Level is required"),
  // }),
  // budget: Yup.object().shape({
  //   type: Yup.string().required("type is required"),
  //   maxBudget: Yup.number().when("type", ([type], schema) => {
  //     return type === "Project budget"
  //       ? schema.positive().required("maxBudget is required")
  //       : schema.nullable();
  //   }),
  //   from: Yup.number().when("type", ([type], schema) => {
  //     return type === "Hourly rate"
  //       ? schema.positive().lessThan(Yup.ref("to")).required("From is required")
  //       : schema.nullable();
  //   }),
  //   to: Yup.number().when("type", ([type], schema) => {
  //     return type === "Hourly rate"
  //       ? schema.positive().moreThan(Yup.ref("from")).required("to is required")
  //       : schema.nullable();
  //   }),
  // }),
  estimate: Yup.number().required('estimate is required'),
  budget: Yup.number().required('budget is required'),
  describe: Yup.string().required('describe is required'),
});
