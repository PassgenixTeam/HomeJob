import React, { useEffect, useState } from "react";
import DropdownItem from "./dropdowItem";
import { FastField, Form, Formik } from "formik";
import { IFilter } from "@/interfaces";
import { useRouter } from "next/router";
import InputField from "@/components/common/InputDateField";
import { AiOutlineSearch } from "react-icons/ai";
import RadioField from "@/components/common/RadioField";
import Input from "@/components/common/Input";
import { ImSearch } from "react-icons/im";
import Radio from "@/components/common/Radio";
import { BsCurrencyDollar } from "react-icons/bs";

export interface FilterBarProps {}

export default function FilterBar(props: FilterBarProps) {
  const router = useRouter();
  const [filter, setFilter] = useState<IFilter>({
    category: router.query.cat as string||"",
    experience: (router.query.exp as string)?.split(",")||[],
    jobType: undefined,
    proposal:  (router.query.pro as string)?.split(",")||[],
    clientHistory:  (router.query.history as string)?.split(",")||[],
    length:  (router.query.length as string)?.split(",")||[],
    hourPerWeek:  (router.query.hour as string)?.split(",")||[],
    coinNeeded:  (router.query.coin as string)?.split(",")||[],
  });
  const handleChangeFilter = (value: string) => {};

  // useEffect(()=>{

  // },[router])

  return (
    <div className="w-[25%] min-w-[250px] pr-3">
      <h6 className="text-2xl pb-4 font-medium">Filter By</h6>
      <div>
        <DropdownItem title="Category">
          <div className="p-4">
            <Input
              name="category"
              iconRight={<ImSearch />}
              className="h-[32px]"
              inputClassName="h-[32px] rounded-[30px]"
              value={filter.category}
              onChange={(e) => handleChangeFilter(e.target.value)}
            />
          </div>
        </DropdownItem>
        <DropdownItem title="Experience level">
          <div className="space-y-2">
            <Radio
              label={
                <div className="text-base flex items-center space-x-1">
                  <p>Entry Level</p>
                  <span className="text-xs text-[color:var(--gray-7)]">
                    (25574)
                  </span>
                </div>
              }
              square
            />
            <Radio
              label={
                <div className="text-base flex items-center space-x-1">
                  <p>Intermediate</p>
                  <span className="text-xs text-[color:var(--gray-7)]">
                    (25574)
                  </span>
                </div>
              }
              square
            />
            <Radio
              label={
                <div className="text-base flex items-center space-x-1">
                  <p>Expert</p>
                  <span className="text-xs text-[color:var(--gray-7)]">
                    (25574)
                  </span>
                </div>
              }
              square
            />
          </div>
        </DropdownItem>
        <DropdownItem title="Job Type">
          <div className="space-y-6 mb-3">
            <div className="pl-2">
              <p className="mb-3">Hourly</p>
              <div className="pl-3 flex items-center">
                <Radio label={""} square />
                <div className="flex items-center space-x-1">
                  <Input
                    name="hourlyFrom"
                    iconRight={<BsCurrencyDollar />}
                    className="h-[32px]"
                    inputClassName="h-[32px]"
                    value={filter.category}
                    onChange={(e) => handleChangeFilter(e.target.value)}
                    placeholder="Min"
                  />
                  <p>/hr</p>
                  <Input
                    name="hourlyFrom"
                    iconRight={<BsCurrencyDollar />}
                    className="h-[32px]"
                    inputClassName="h-[32px]"
                    value={filter.category}
                    onChange={(e) => handleChangeFilter(e.target.value)}
                    placeholder="Max"
                  />
                  <p>/hr</p>
                </div>
              </div>
            </div>
            <div className="pl-2">
              <p className="mb-3">Fixed-Price</p>
              <div className="pl-3 space-y-2">
                <Radio
                  label={
                    <div className="text-base flex items-center space-x-1">
                      <p>Less than $100</p>
                      <span className="text-xs text-[color:var(--gray-7)]">
                        (25574)
                      </span>
                    </div>
                  }
                  square
                />
                <Radio
                  label={
                    <div className="text-base flex items-center space-x-1">
                      <p>$100 to $500</p>
                      <span className="text-xs text-[color:var(--gray-7)]">
                        (25574)
                      </span>
                    </div>
                  }
                  square
                />
                <Radio
                  label={
                    <div className="text-base flex items-center space-x-1">
                      <p>$500 to $1K </p>
                      <span className="text-xs text-[color:var(--gray-7)]">
                        (25574)
                      </span>
                    </div>
                  }
                  square
                />
                <Radio
                  label={
                    <div className="text-base flex items-center space-x-1">
                      <p>$1K to $5K</p>
                      <span className="text-xs text-[color:var(--gray-7)]">
                        (25574)
                      </span>
                    </div>
                  }
                  square
                />
                <Radio
                  label={
                    <div className="text-base flex items-center space-x-1">
                      <p>$5K+</p>
                      <span className="text-xs text-[color:var(--gray-7)]">
                        (25574)
                      </span>
                    </div>
                  }
                  square
                />
                <div className=" flex items-center">
                  <Radio label={""} square />
                  <div className="flex items-center space-x-1">
                    <Input
                      name="hourlyFrom"
                      iconRight={<BsCurrencyDollar />}
                      className="h-[32px]"
                      inputClassName="h-[32px]"
                      value={filter.category}
                      onChange={(e) => handleChangeFilter(e.target.value)}
                      placeholder="Min"
                    />
                    <p>/hr</p>
                    <Input
                      name="hourlyFrom"
                      iconRight={<BsCurrencyDollar />}
                      className="h-[32px]"
                      inputClassName="h-[32px]"
                      value={filter.category}
                      onChange={(e) => handleChangeFilter(e.target.value)}
                      placeholder="Max"
                    />
                    <p>/hr</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DropdownItem>
        <DropdownItem title="Number of proposals">
          <div className="space-y-2  mb-3">
            <Radio
              label={
                <div className="text-base flex items-center space-x-1">
                  <p>Less than 5</p>
                  <span className="text-xs text-[color:var(--gray-7)]">
                    (25574)
                  </span>
                </div>
              }
              square
            />
            <Radio
              label={
                <div className="text-base flex items-center space-x-1">
                  <p>5 to 10</p>
                  <span className="text-xs text-[color:var(--gray-7)]">
                    (25574)
                  </span>
                </div>
              }
              square
            />
            <Radio
              label={
                <div className="text-base flex items-center space-x-1">
                  <p>10 to 15</p>
                  <span className="text-xs text-[color:var(--gray-7)]">
                    (25574)
                  </span>
                </div>
              }
              square
            />
            <Radio
              label={
                <div className="text-base flex items-center space-x-1">
                  <p>15 to 20</p>
                  <span className="text-xs text-[color:var(--gray-7)]">
                    (25574)
                  </span>
                </div>
              }
              square
            />
            <Radio
              label={
                <div className="text-base flex items-center space-x-1">
                  <p>20 to 25</p>
                  <span className="text-xs text-[color:var(--gray-7)]">
                    (25574)
                  </span>
                </div>
              }
              square
            />
          </div>
        </DropdownItem>
        <DropdownItem title="Client history">
          <div className="space-y-2  mb-3">
            <Radio
              label={
                <div className="text-base flex items-center space-x-1">
                  <p>No hires</p>
                  <span className="text-xs text-[color:var(--gray-7)]">
                    (25574)
                  </span>
                </div>
              }
              square
            />
            <Radio
              label={
                <div className="text-base flex items-center space-x-1">
                  <p>1 to 9 hires</p>
                  <span className="text-xs text-[color:var(--gray-7)]">
                    (25574)
                  </span>
                </div>
              }
              square
            />
            <Radio
              label={
                <div className="text-base flex items-center space-x-1">
                  <p>10+ hires</p>
                  <span className="text-xs text-[color:var(--gray-7)]">
                    (25574)
                  </span>
                </div>
              }
              square
            />
          </div>
        </DropdownItem>
        <DropdownItem title="Project length">
          <div className="space-y-2  mb-3">
            <Radio
              label={
                <div className="text-base flex items-center space-x-1">
                  <p>Less than one month</p>
                  <span className="text-xs text-[color:var(--gray-7)]">
                    (25574)
                  </span>
                </div>
              }
              square
            />
            <Radio
              label={
                <div className="text-base flex items-center space-x-1">
                  <p>1 to 3 months</p>
                  <span className="text-xs text-[color:var(--gray-7)]">
                    (25574)
                  </span>
                </div>
              }
              square
            />
            <Radio
              label={
                <div className="text-base flex items-center space-x-1">
                  <p>3 to 6 months</p>
                  <span className="text-xs text-[color:var(--gray-7)]">
                    (25574)
                  </span>
                </div>
              }
              square
            />
            <Radio
              label={
                <div className="text-base flex items-center space-x-1">
                  <p>More than 6 months</p>
                  <span className="text-xs text-[color:var(--gray-7)]">
                    (25574)
                  </span>
                </div>
              }
              square
            />
          </div>
        </DropdownItem>
        <DropdownItem title="Hours per week">
          <div className="space-y-2  mb-3">
            <Radio
              label={
                <div className="text-base flex items-center space-x-1">
                  <p>Less than 30 hrs/week</p>
                  <span className="text-xs text-[color:var(--gray-7)]">
                    (25574)
                  </span>
                </div>
              }
              square
            />
            <Radio
              label={
                <div className="text-base flex items-center space-x-1">
                  <p>More than 30 hrs/week</p>
                  <span className="text-xs text-[color:var(--gray-7)]">
                    (25574)
                  </span>
                </div>
              }
              square
            />
          </div>
        </DropdownItem>
        <DropdownItem title="Connects needed">
          <div className="space-y-2 mb-3">
            <Radio
              label={
                <div className="text-base flex items-center space-x-1">
                  <p>2 or less connects</p>
                  <span className="text-xs text-[color:var(--gray-7)]">
                    (25574)
                  </span>
                </div>
              }
              square
            />
            <Radio
              label={
                <div className="text-base flex items-center space-x-1">
                  <p>4 connects</p>
                  <span className="text-xs text-[color:var(--gray-7)]">
                    (25574)
                  </span>
                </div>
              }
              square
            />
            <Radio
              label={
                <div className="text-base flex items-center space-x-1">
                  <p>6 connects</p>
                  <span className="text-xs text-[color:var(--gray-7)]">
                    (25574)
                  </span>
                </div>
              }
              square
            />
          </div>
        </DropdownItem>
      </div>
    </div>
  );
}
