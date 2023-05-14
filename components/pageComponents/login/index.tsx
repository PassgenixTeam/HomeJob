import Button from '@/components/common/Button';
import ButtonSocial from '@/components/common/ButtonSocial';
import Checkbox from '@/components/common/Checkbox';
import InputCustomField from '@/components/common/InputFieldCustom';
import Loading from '@/components/common/Loading';
import { ILogin } from '@/interfaces';
import { LoginSchema } from '@/validations/loginSchema';
import { FastField, Form, Formik } from 'formik';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
export interface LoginProps {}

export default function Login(props: LoginProps) {
  const [rememberLogin, setRememberLogin] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');
  const [showLoading, setShowLoading] = useState<boolean>(false);
  const router = useRouter();
  const session = useSession();
  const initialValues: ILogin = {
    email: '',
    password: '',
  };
  const handleSubmit = (values: ILogin) => {
    setShowLoading(true);
    signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
    }).then(({ ok, error }: any) => {
      if (!ok) {
        setLoginError(error);
        setShowLoading(false);
      } else {
        setLoginError('');
        setShowLoading(false);
      }
    });
  };
  useEffect(() => {
    session.status === 'authenticated' && router.push('/');
  }, [session.status]);
  useEffect(() => {
    if (router.query.error) {
      toast.error(router.query.error);
    }
  }, [router]);
  return (
    <div className="bg-[color:var(--primary-1)] min-h-screen h-full w-full flex justify-center items-center">
      {showLoading && (
        <div className="absolute w-full h-full z-50 flex items-center justify-center bg-[color:var(--primary-1)] opacity-50">
          <Loading size={34} color="#40a9ff" />
        </div>
      )}
      <div className="flex flex-col items-center">
        <h1 className="text-4xl text-[color:var(--primary-5)] font-bold text-center mb-4">HomeJob</h1>
        <div className="w-[380px] bg-white rounded-md px-3 py-6">
          <p className="text-center font-bold text-xl py-4">Đăng nhập</p>
          <Formik
            enableReinitialize
            initialValues={initialValues}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
            validateOnChange={false}
            validationSchema={LoginSchema}
          >
            {(formikProps) => {
              return (
                <Form>
                  <div className="px-2">
                    <div className="space-y-3">
                      <div className="w-full">
                        <FastField
                          component={InputCustomField}
                          name="email"
                          title="Địa chỉ email"
                          placeholder=""
                          inputClassName="h-[37px]"
                        />
                      </div>
                      <div className="w-full">
                        <FastField
                          component={InputCustomField}
                          name="password"
                          title="Mật khẩu"
                          placeholder=""
                          className="mt-4 md:mt-0"
                          inputClassName="h-[37px]"
                        />
                      </div>
                      {loginError && <span className="text-[color:var(--red-err)]">{loginError}</span>}
                    </div>
                    <Button
                      title="Đăng nhập"
                      className="rounded-[40px] py-[10px] mt-5 mb-3 mx-auto text-lg font-semibold px-[90px]"
                      onClick={() => false}
                      type="submit"
                    />
                    <div>
                      {/* <div className="flex justify-center mb-3">
                        <Checkbox
                          label="Save login state (30 days)"
                          checked={rememberLogin}
                          onClick={() => setRememberLogin(!rememberLogin)}
                        />
                      </div> */}
                      <div className="text-center text-[color:var(--primary-7)]">
                        <Link href={'/'}>Bạn đã quên mật khẩu của bạn?</Link>
                      </div>
                    </div>
                    <div className="h-[1px] w-full bg-[color:var(--gray-7)] my-6"></div>
                    <div className="px-4">
                      <p className="font-semibold text-center mb-3">Đăng nhập bằng tài khoản khác</p>
                      <div className="space-y-2 mb-3">
                        <ButtonSocial
                          imgUrl="/images/share_icon_google_hover.png"
                          label="Đăng nhập với Google"
                          action={() => signIn('google')}
                        />
                        <ButtonSocial
                          imgUrl="/images/share_icon_facebook_hover.png"
                          label="Đăng nhập với Facebook"
                          action={() => signIn('facebook')}
                        />
                        <ButtonSocial imgUrl="/images/github.png" label="Đăng nhập với Gihub" action={() => signIn('github')} />
                      </div>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
        <Link href="/register" className="text-[color:var(--primary-7)] mt-2">
          Tạo tài khoản
        </Link>
      </div>
    </div>
  );
}
