import Button from "@/components/common/Button";
import Radio from "@/components/common/Radio";
import React, { useEffect, useState } from "react";
import { BsClipboard2CheckFill } from "react-icons/bs";
import { HiOutlineClock } from "react-icons/hi";
import { MdOutlineSell } from "react-icons/md";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { selectRole } from "@/stores/slices/login/loginSlide";
import Loading from "@/components/common/Loading";
import { useSession } from "next-auth/react"
import {useRouter} from "next/router"

export interface SelectRoleProps {}

export default function SelectRole(props: SelectRoleProps) {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  const dispatch = useAppDispatch()
  const {isLoading} = useAppSelector(state=>state.login)
  const [role, setRole] = useState<"client" | "freelancer" | "">("");
  const handleSelectRole = ()=>{
    dispatch({
      type:selectRole({role:role,onUpdate:update}).type,
      payload:{role:role,onUpdate:update}
    })
  }
  useEffect(()=>{
    if(session?.user.role)
      router.reload()
  },[session])
  return (
    <div className="w-full h-full ">
      <header>
        <h1 className="text-2xl px-16 pt-4 pb-[200px] font-semibold text-[color:var(--primary-7)]">
          Work From Home
        </h1>
      </header>
      <section className="w-full h-full flex justify-center items-center">
      {isLoading && (
        <div className="absolute w-full h-full z-50 flex items-center justify-center bg-[color:var(--primary-1)] opacity-50">
          <Loading size={34} color="#40a9ff" />
        </div>
      )}
        <div className="w-full max-w-[690px] h-fit p-8 border rounded-xl">
          <h6 className="text-3xl text-center font-semibold pt-2 pb-10">
            Join as a client or freelancer
          </h6>
          <div className="w-full flex justify-center items-center space-x-6">
            <div
              className={`w-[260px] transition-all hover:cursor-pointer h-fit rounded-md 
                        p-2 ${
                          role === "client" && "bg-[color:var(--primary-1)]"
                        } border-[2px] border-[color:var(--primary-7)]`}
              onClick={() => setRole("client")}
            >
              <div className="flex justify-between items-center">
                <MdOutlineSell
                  size={28}
                  className="ml-4 mt-3 mb-4"
                  color="#096dd9"
                />
                <Radio
                  name="budget.type"
                  value={role}
                  label=""
                  checked={role === "client"}
                  custom
                />
              </div>
              <p className="text-2xl font-medium ml-4 my-3">
                I’m a client, hiring for a project
              </p>
            </div>
            <div
              className={`w-[260px] transition-all hover:cursor-pointer h-fit rounded-md p-2 border-[2px] 
                        border-[color:var(--primary-7)] ${
                          role === "freelancer" && "bg-[color:var(--primary-1)]"
                        }`}
              onClick={() => setRole("freelancer")}
            >
              <div className="flex justify-between">
                <BsClipboard2CheckFill
                  size={28}
                  className="ml-4 mt-3 mb-4"
                  color="#096dd9"
                />
                <Radio
                  name="budget.type"
                  value={role}
                  label=""
                  checked={role === "freelancer"}
                  custom
                />
              </div>
              <p className="text-2xl font-medium ml-4 my-3">
                I’m a freelancer, looking for work
              </p>
            </div>
          </div>
          <Button
            title={
              role === "client"
                ? "Join as a client"
                : role === "freelancer"
                ? "Apply as a Freelancer"
                : "Create Account"
            }
            className="mx-auto mt-10 rounded-full py-[8px] px-[50px] font-semibold"
            onClick={()=>handleSelectRole()}
          />
        </div>
      </section>
    </div>
  );
}
