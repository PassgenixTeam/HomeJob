import * as Yup from 'yup';

export default Yup.object().shape({
  paidType: Yup.string().trim().required('This field is required.'),
  // milestones: Yup.array().when('paidType', ([paidType], schema) => {
  //   return paidType === 'milestone'
  //     ? schema
  //         .of(
  //           Yup.object().shape({
  //             description: Yup.string().required('This field is required.'),
  //             dueDate: Yup.string().required(),
  //             amount: Yup.number().positive().required(),
  //           })
  //         )
  //         .min(1)
  //         .required('Milestone is required')
  //     : schema.nullable();
  // }),
  amount: Yup.number().when('paidType', ([paidType], schema) => {
    return paidType === 'project' ? schema.positive().required('amount is required') : schema.nullable();
  }),
  bid: Yup.number().when('paidType', ([paidType], schema) => {
    return paidType === 'project' ? schema.positive().required('bid is required') : schema.nullable();
  }),
  projectLong: Yup.string().trim().required('This field is required.'),
  coverLetter: Yup.string().trim().required('This field is required.'),
  // attachments:Yup.array().of(Yup.string()).min(1).required("This field is required."),
});
