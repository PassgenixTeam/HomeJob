import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { getProfile, signOutUser } from "@/stores/slices/login/loginSlide";
import { removeRefreshToken, removeToken, setRefreshToken, setToken } from "@/utils/common";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import Loading from "../Loading";
import _ from "lodash";
interface AuthProp {
  children: ReactNode;
}
function Auth({ children }: AuthProp) {
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession({
    required: true,
    onUnauthenticated() {
      removeRefreshToken()
      removeToken()
      router.push("/login");
    }
  });
  const isUser = !!session?.user;
  const {info:profile} = useAppSelector((state) => state.login);
  const dispatch = useAppDispatch();
  const authorized = sessionStatus === 'authenticated';
  const loading = sessionStatus === 'loading';
  const handleGetProfile = () => {
    //@ts-ignore
    setToken(session?.user?.tokenInfo?.accessToken);
    //@ts-ignore
    setRefreshToken(session?.user?.tokenInfo?.refreshToken);
    dispatch(getProfile());
  };
  useEffect(() => {
    if (loading) return;
    console.log(isUser , profile?.id==="")
    if (isUser && profile?.id==="") {
      handleGetProfile();
    }
  }, [isUser, profile, loading, authorized, router]);
  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loading color="#40a9ff" />
      </div>
    );
  }

  return <> {children}</>;
}
export default Auth;
