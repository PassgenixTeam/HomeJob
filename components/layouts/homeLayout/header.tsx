import Dropdown from "@/components/common/Dropdown";
import { ROUTER } from "@/constants/router";
import { useAppDispatch } from "@/stores/hooks";
import { signOutUser } from "@/stores/slices/login/loginSlide";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineBell, AiOutlineProfile } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { TbMessageCircle2 } from "react-icons/tb";
export interface HomeHeaderProps {}

export default function HomeHeader(props: HomeHeaderProps) {
  const [showProfile, setShowProfile] = useState(false);
  const [active, setActive] = useState<"Online" | "Offline">("Online");
  const router = useRouter();
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const handleSignOut = () => {
    dispatch(signOutUser());
    signOut();
  };
  return (
    <div className="w-full h-[70px] z-50 fixed top-0 left-0 shadow-md flex justify-center bg-white">
      <div className="w-full max-w-[1440px] px-8 flex justify-between items-center font-semibold text-[color:var(--primary-8)]">
        <div className="space-x-6">
          <Link
            href={ROUTER.HOME}
            className="text-3xl font-bold text-[color:var(--primary-5)]"
          >
            Work Market
          </Link>
          {
            (status === "unauthenticated" || status === "loading")&& (
              <>
              <Link href="">Find Talent</Link>
              <Link href="">Find Work</Link>
              <Link href="">Why Us</Link>
              <Link href={ROUTER.PAYMENTS}>Payments</Link>
                
              </>
            )
          }
          {status === "authenticated" && session?.user?.role=== "client" ? (
            <>
              <Link href={`${ROUTER.CLIENT}${ROUTER.MY_JOB}`}>My Jobs</Link>
                <Link href="">Reports</Link>
                <Link href={ROUTER.CREATE_JOB}>Create Job</Link>
                <Link href={ROUTER.PAYMENTS}>Payments</Link>
            </>
          ):status === "authenticated" && session?.user?.role=== "freelancer"?(
            <>
              <Link href={`${ROUTER.BEST_MATCHES}`}>Find Work</Link>
                <Link href={`${ROUTER.FREELANCER}${ROUTER.MY_JOB}`}>My Jobs</Link>
                <Link href={ROUTER.PAYMENTS}>Payments</Link>
            </>
          ):(<></>)
        }
        </div>
        <div className="flex  justify-center items-center space-x-6">
          {status === "unauthenticated" || status === "loading" ? (
            <>
              <Link href={ROUTER.LOGIN}>Login</Link>
              <Link href={ROUTER.REGISTER}>Register For Free</Link>
            </>
          ) : (
            <>
              <Link href={ROUTER.NOTIFICATION}>
                <AiOutlineBell size={22} />
              </Link>
              <Link href={ROUTER.CONTACT}>
                <TbMessageCircle2 size={22} />
              </Link>
              <div
                className="h-[40px] w-[40px] rounded-[50%] 
              overflow-hidden user-avatar hover:cursor-pointer flex justify-center items-center"
                onClick={() => setShowProfile(!showProfile)}
              >
                {session?.user?.avatarUrl ? (
                  <Image
                    src={session?.user?.avatarUrl}
                    alt="work market"
                    width={40}
                    height={40}
                    
                  />
                ) : (
                  <FaUserAlt size={26} />
                )}
              </div>
              <Dropdown
                visible={showProfile}
                onClose={() => setShowProfile(false)}
                className="top-[70px] w-[245px]"
              >
                <div className="">
                  <div className="text-black flex flex-col justify-end items-center">
                    <div className="h-[90px] w-[90px] rounded-[50%] overflow-hidden flex justify-center items-center text-[color:var(--primary-8)]">
                      {session?.user?.avatarUrl ? (
                        <Image
                          src={session?.user?.avatarUrl}
                          alt="work market"
                          width={90}
                          height={90}
                        />
                      ) : (
                        <FaUserAlt size={55} />
                      )}
                    </div>
                    <h5 className="mt-2 capitalize">
                      {session?.user?.firstName + " " + session?.user?.lastName}
                    </h5>
                    <p className="text-xs font-normal capitalize">
                      {session?.user?.role}
                    </p>
                  </div>
                  <div
                    className="flex w-full justify-between items-center 
                  border-2 border-[color:var(--gray-5)] rounded-full relative my-2"
                  >
                    <div
                      className={`absolute w-1/2 rounded-full h-full transition-all left-0 top-0 ${
                        active === "Offline" && "translate-x-[100%]"
                      } bg-[color:var(--primary-7)] z-[-1]`}
                    ></div>
                    <div
                      onClick={() => setActive("Online")}
                      className={`py-2 w-1/2 text-center rounded-full 
                      transition-all ${
                        active === "Online"
                          ? "text-white"
                          : "hover:cursor-pointer"
                      }`}
                    >
                      Online
                    </div>
                    <div
                      onClick={() => setActive("Offline")}
                      className={`py-2 w-1/2 text-center rounded-full hover:cursor-pointer
                      transition-all ${
                        active === "Offline"
                          ? "text-white"
                          : "hover:cursor-pointer"
                      }`}
                    >
                      Offline
                    </div>
                  </div>
                  <div className="px-3 space-y-4 text-md my-5 text-start text-black flex flex-col">
                    <div className="flex items-center space-x-3">
                      <AiOutlineProfile size={22} />
                      <Link href={ROUTER.PROFILE} className="w-full">
                        Profile
                      </Link>
                    </div>
                    <div className="flex items-center space-x-3">
                      <IoSettingsOutline size={22} />
                      <Link href={ROUTER.SETTING} className="w-full">
                        Setting
                      </Link>
                    </div>
                    <div
                      className="hover:cursor-pointer flex items-center space-x-3"
                      onClick={() => handleSignOut()}
                    >
                      <div>
                        <IoIosLogOut size={22} />
                      </div>
                      <p>Logout</p>
                    </div>
                  </div>
                </div>
              </Dropdown>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
