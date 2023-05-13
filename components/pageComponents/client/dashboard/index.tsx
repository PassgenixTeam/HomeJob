import Button from "@/components/common/Button";
import * as React from "react";
import { AiOutlineDollar, AiOutlinePlus } from "react-icons/ai";
import BannerItem from "./bannerItem";
import Image from "next/image";
import ButtonIcon from "@/components/common/ButtonIcon";
import { BsCheckCircle, BsEnvelopeCheck, BsThreeDots } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import Link from "next/link";
export interface ClientDashboardProps {}

export default function ClientDashboard(props: ClientDashboardProps) {
  return (
    <div className="flex flex-col items-center">
      <section className="px-[5%] w-[90%] pb-10 pt-16 space-y-8">
        <h1 className="text-6xl">
          <span>Hi, Van👋</span>
        </h1>
        <div className="flex justify-between items-center">
          <h6 className="text-3xl font-medium">Your workspace</h6>
          <div className="flex items-center space-x-6">
            <Button
              title="Browse talent services"
              variant="outline"
              className="rounded-full py-[8px] px-[30px]"
            />
            <Button
              title="Post a job"
              icon={<AiOutlinePlus size={24} />}
              className="rounded-full py-[8px] px-[30px]"
            />
          </div>
        </div>
      </section>
      <section className="w-full bg-[color:var(--primary-1)] flex justify-center ">
        <div className="py-8 px-[5%] w-[90%] flex justify-between">
          <BannerItem close title="Guided tour" variant="fill">
            <div className="w-full h-full flex flex-col justify-between">
              <p className="text-2xl font-medium mt-2">
                Use your workspace to manage draft job posts, action items, and
                completed work.
              </p>
              <div className="self-end mb-3">
                <Image
                  src="/images/work-time.png"
                  alt="work from home"
                  width={90}
                  height={90}
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
          </BannerItem>
          <BannerItem title="As das dasd asds">
            <div className="w-full h-full flex flex-col justify-between pb-6 pt-10">
              <div>
                <p className="w-fit px-3 bg-[color:var(--gray-6)] text-white rounded-md font-medium">
                  Draft job post
                </p>
                <h6 className="text-2xl font-medium py-3">
                  Add details to Your draft
                </h6>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  title="Fill in draft"
                  variant="outline"
                  className="py-[8px] rounded-full grow"
                />
                <ButtonIcon
                  icon={<BsThreeDots size={24} />}
                  className="h-[44px] w-[44px]"
                />
              </div>
            </div>
          </BannerItem>
          <BannerItem close title="Quick tip">
            <div className="w-full h-full flex flex-col justify-between py-3">
              <div>
                <h6 className="text-2xl font-medium pb-3">
                  Pay with confidence
                </h6>
                <p className="text-[color:var(--gray-8)]">
                  Talent look for clients with verified billing methods. There’s
                  no cost until you hire; you’ll only be charged once you
                  approve completed work.
                </p>
              </div>
              <Link
                href=""
                className="my-4 font-medium text-[color:var(--primary-7)] hover:underline"
              >
                Learn more about payments
              </Link>
            </div>
          </BannerItem>
          <BannerItem close title="Quick tip">
            <div className="w-full h-full flex flex-col justify-between py-3">
              <div>
                <h6 className="text-2xl font-medium pb-3">
                  Pay with confidence
                </h6>
                <p className="text-[color:var(--gray-8)]">
                  Talent look for clients with verified billing methods. There’s
                  no cost until you hire; you’ll only be charged once you
                  approve completed work.
                </p>
              </div>
              <Link
                href=""
                className="my-4 font-medium text-[color:var(--primary-7)] hover:underline"
              >
                Learn more about payments
              </Link>
            </div>
          </BannerItem>
        </div>
      </section>
      <section className="py-10 px-[5%] w-[90%] flex justify-between">
        <div className="space-y-6 w-full">
          <h6 className="text-3xl font-medium">
            Complete these steps to stand out and hire fast
          </h6>
          <div className="flex space-x-6 w-full">
            <div className="rounded-xl border py-4 px-6 space-y-2 w-[30%] hover:cursor-pointer">
              <span className="text-[color:var(--gray-7)]">
                Required to hire
              </span>
              <div className="flex items-center justify-between">
                <p className="text-xl">
                  <span className="font-medium underline">
                    Add a billing method.
                  </span>
                  There is no cost until you hire
                </p>
                <div className="pl-4 pr-2 text-[color:var(--gray-9)]">
                  <AiOutlineDollar size={40} />
                </div>
              </div>
            </div>
            <div className="rounded-xl border py-4 px-6 space-y-2 w-[30%] bg-[color:var(--primary-1)]">
              <span className="text-[color:var(--gray-7)]">
                Required to hire
              </span>
              <div className="flex items-center justify-between">
                <div className="text-xl flex items-center space-x-2">
                  <span className="font-medium underline text-[color:var(--primary-7)]">
                    <BsCheckCircle />
                  </span>
                  <p className="text-[color:var(--gray-8)]">
                    You verified your email address
                  </p>
                </div>
                <div className="pl-4 pr-2 text-[color:var(--gray-9)]">
                  <BsEnvelopeCheck size={40} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 px-[5%] w-[90%] flex justify-between">
        <div className="w-full">
          <h6 className="text-4xl font-medium ">
            Find experts by category and book consultations
          </h6>
          <div className="py-8 ư-full flex justify-between">
            <BannerItem close title="Guided tour" variant="fill">
              <div className="w-full h-full flex flex-col justify-between">
                <p className="text-2xl font-medium mt-2">
                  Book a consultation with an expert to review your project’s
                  budget, timeline, and scope one-on-one.
                </p>
                <div className="flex justify-between items-end mb-6">
                  <Button
                    title="Learn more"
                    className="py-[6px] h-fit px-[15px] bg-[color:var(--primary-7)]
                     text-white border-2 border-white rounded-full hover:bg-[--primary-8] hover:border-white"
                  />
                  <Image
                    src="/images/new-hire.png"
                    alt="work from home"
                    width={90}
                    height={90}
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </div>
              </div>
            </BannerItem>
            <BannerItem title="">
              <div className="w-full h-full flex flex-col justify-center items-center">
                <Image
                  src="/images/settings.png"
                  alt="work from home"
                  width={120}
                  height={120}
                  style={{
                    objectFit: "contain",
                  }}
                />
                <h6 className="text-2xl mt-6">Development & IT</h6>
              </div>
            </BannerItem>
            <BannerItem title="">
              <div className="w-full h-full flex flex-col justify-center items-center">
                <Image
                  src="/images/strategy-development.png"
                  alt="work from home"
                  width={120}
                  height={120}
                  style={{
                    objectFit: "contain",
                  }}
                />
                <h6 className="text-2xl mt-6">Marketing</h6>
              </div>
            </BannerItem>
            <BannerItem title="">
              <div className="w-full h-full flex flex-col justify-center items-center">
                <Image
                  src="/images/illustration.png"
                  alt="work from home"
                  width={120}
                  height={120}
                  style={{
                    objectFit: "contain",
                  }}
                />
                <h6 className="text-2xl mt-6">Design</h6>
              </div>
            </BannerItem>
          </div>
        </div>
      </section>
      <section className="py-10 px-[5%] w-[90%] flex flex-col justify-between space-y-10">
        <div className="w-full p-6 border rounded-xl flex justify-between items-center">
          <div>
            <span className="text-[color:var(--gray-8)] font-semibold">
              Get Started
            </span>
            <h6 className="text-3xl font-medium mb-6">
              Get started and connect with talent to get work done
            </h6>
            <Button
              title="Go to article"
              variant="outline"
              className="py-[6px] px-[15px] rounded-full font-semibold"
            />
          </div>
          <div className="mr-12">
            <Image
              src="/images/shuttle.png"
              alt="work from home"
              width={90}
              height={90}
              style={{
                objectFit: "contain",
              }}
            />
          </div>
        </div>
        <div className="flex-1 flex justify-between space-x-3">
          <div className="rounded-xl border py-6 px-8 space-y-2 flex justify-between items-center">
            <div>
              <span className="text-[color:var(--gray-7)]">
                Required to hire
              </span>
              <p className="text-[color:var(--gray-8)] text-2xl font-semibold">
              Everything you need to know about payments
              </p>
            </div>
            <div>
              <Image
                src="/images/credit-card.png"
                alt="work from home"
                width={80}
                height={80}
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
          <div className="rounded-xl border py-6 px-8 space-y-2 flex justify-between items-center">
            <div>
              <span className="text-[color:var(--gray-7)]">
                Required to hire
              </span>
              <p className="text-[color:var(--gray-8)] text-2xl font-semibold">
              Everything you need to know about payments
              </p>
            </div>
            <div>
              <Image
                src="/images/credit-card.png"
                alt="work from home"
                width={80}
                height={80}
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
          <div className="rounded-xl border py-6 px-8 space-y-2 flex justify-between items-center">
            <div>
              <span className="text-[color:var(--gray-7)]">
                Required to hire
              </span>
              <p className="text-[color:var(--gray-8)] text-2xl font-semibold">
              Everything you need to know about payments
              </p>
            </div>
            <div>
              <Image
                src="/images/credit-card.png"
                alt="work from home"
                width={80}
                height={80}
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
