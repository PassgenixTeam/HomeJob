import { wrapper } from "@/stores/store";
import PaymentLayout from "@/components/layouts/paymentheader";
import Login from "@/components/pageComponents/login";
import { loginHome } from "@/stores/slices/login/loginSlide";
import { ReactNode } from "react";
export interface ILoginPageProps {}

function LoginPage(props: ILoginPageProps) {
  return <Login/>;
}
// LoginPage.getLayout = (page: ReactNode) => {
//   return <PaymentLayout>{page}</PaymentLayout>;
// };

// LoginPage.getInitialProps = wrapper.getInitialPageProps(
//   ({ dispatch }) =>
//     async () => {
//       // await dispatch(loginHome({ userName: "asd", password: "123" }));
//       return {}
//     }
// );

export default LoginPage;
