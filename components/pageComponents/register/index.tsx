import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import Button from "@/components/common/Button";
import ButtonSocial from "@/components/common/ButtonSocial";
import InputCustomField from "@/components/common/InputFieldCustom";
import Loading from "@/components/common/Loading";
import { ILogin, IRegister } from "@/interfaces";
import { register, selectIsLoading } from "@/stores/slices/login/loginSlide";
import { RegisterSchema } from "@/validations/loginSchema";
import { FastField, Form, Formik } from "formik";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import SelectField from "@/components/common/SelectField";
import { countryList } from "@/utils/common";
import RadioField from "@/components/common/RadioField";
import _ from "lodash";
export interface RegisterProps {}
export default function Register(props: RegisterProps) {
  const dispatch = useAppDispatch();
  const loginInfo = useAppSelector((state) => state.login);
  const router = useRouter();
  const { status, data: session } = useSession();
  const initialValues: IRegister = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    country: "US",
    sendEmail:false,
    agreement:false,
  };
  const handleSubmit = (values: IRegister) => {
    const {agreement,sendEmail,...newValue} = values
    dispatch(register(newValue));
  };
  useEffect(() => {
    status === "authenticated" && router.push("/");
  }, [status]);
  return (
    <div className="bg-[color:var(--primary-1)] h-full min-h-screen w-full flex justify-center items-center">
      {loginInfo.isLoading && (
        <div className="absolute w-full h-full z-50 flex items-center justify-center bg-[color:var(--primary-1)] opacity-50">
          <Loading size={34} color="#40a9ff" />
        </div>
      )}
      <div className="flex flex-col items-center">
        <h1 className="text-4xl text-[color:var(--primary-5)] font-bold text-center mb-4">
          Work Market
        </h1>
        <div className="w-[680px] bg-white rounded-md px-3 py-6">
          <p className="text-center font-bold text-xl py-4">Register</p>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
            validateOnChange={false}
            validationSchema={RegisterSchema}
          >
            {(formikProps) => {
              const { values, setFieldValue,errors,touched } = formikProps;
              console.log(values,errors,touched)
              return (
                <Form>
                  <div className="px-2">
                    <div className="space-y-3">
                      <div className="w-full">
                        <FastField
                          component={InputCustomField}
                          name="email"
                          title="Email"
                          placeholder=""
                          inputClassName="h-[37px]"
                        />
                      </div>
                      <div className="w-full">
                        <FastField
                          component={InputCustomField}
                          name="password"
                          title="Password"
                          type="password"
                          placeholder=""
                          inputClassName="h-[37px]"
                        />
                      </div>
                      <div className="flex space-x-6">
                        <div className="w-full">
                          <FastField
                            component={InputCustomField}
                            name="firstName"
                            title="First Name"
                            placeholder=""
                            inputClassName="h-[37px]"
                          />
                        </div>
                        <div className="w-full">
                          <FastField
                            component={InputCustomField}
                            name="lastName"
                            title="Last Name"
                            placeholder=""
                            inputClassName="h-[37px]"
                          />
                        </div>
                      </div>
                      <div className="w-full">
                        <FastField
                          component={SelectField}
                          name="country"
                          title="Country"
                          className="mt-4 md:mt-0"
                          inputClassName="h-[40px] text-medium"
                          height="40px"
                          placeholder={
                            countryList.find(
                              (item) => item.value === values.country
                            )?.label
                          }
                          options={countryList}
                        />
                      </div>
                      <div>
                        <FastField
                          component={RadioField}
                          name="sendEmail"
                          value={values.sendEmail}
                          checked={values.sendEmail}
                          onClick={() => {
                            setFieldValue("sendEmail", !values.sendEmail);
                          }}
                          description="Send me helpful emails to find rewarding work and job leads."
                          square
                          className="mt-3"
                        />
                        <FastField
                          component={RadioField}
                          name="agreement"
                          value={values.agreement}
                          checked={values.agreement}
                          onClick={() => {
                            setFieldValue("agreement", !values.agreement);
                          }}
                          description="Yes, I understand and agree to the Work Terms of Service , including the User Agreement and Privacy Policy ."
                          square
                          className="mt-3"
                        />
                      </div>

                      {loginInfo.error && (
                        <span className="text-[color:var(--red-err)]">
                          {loginInfo.error}
                        </span>
                      )}
                    </div>
                    <Button
                      title="Register as a Freelancer"
                      className="rounded-[40px] py-[10px] mt-5 mb-3 mx-auto text-lg font-semibold px-[40px]"
                      type="submit"
                      disabled={!_.isEmpty(errors) || _.isEmpty(touched) || !values.agreement}
                    />
                    {/* <div className="h-[1px] w-full bg-[color:var(--gray-7)] my-6"></div> */}
                    <div className="px-4">
                      <p className="font-semibold text-center mb-3">
                        Start with another account
                      </p>
                      <div className="space-y-2 mb-3">
                        <ButtonSocial
                          imgUrl="/images/share_icon_google_hover.png"
                          label="Get stated with Google"
                          action={() => signIn("google")}
                        />
                        <ButtonSocial
                          imgUrl="/images/share_icon_facebook_hover.png"
                          label="Get stated with Facebook"
                          action={() => signIn("facebook")}
                        />
                        <ButtonSocial
                          imgUrl="/images/github.png"
                          label="Get stated with Gihub"
                          action={() => signIn("github")}
                        />
                      </div>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
        <Link href="/login" className="text-[color:var(--primary-7)] mt-2">
          Login here
        </Link>
      </div>
    </div>
  );
}
