import InputFilter from "@/components/common/InputFilter";
import Pagination from "@/components/common/Pagination";
import SelectCustom from "@/components/common/SelectCustom";
import TextLink from "@/components/common/Text/TextLink";
import { useAppSelector } from "@/stores/hooks";
import { jobPerPage } from "@/utils/common";
import { useRouter } from "next/router";
import { useState } from "react";
import ItemJob from "../bestMatch/components/ItemJob";
export interface MainJobListProps {}

const sortTypeOption = [
  {
    value: "newest",
    label: "Newest",
  },
  {
    value: "relevance",
    label: "Relevance",
  },
];

export default function MainJobList(props: MainJobListProps) {
  const router = useRouter();
  const [sortType, setSortType] = useState<string>("newest");
  const [searchParam, setSearchParam] = useState<string>(
    (router.query.q as string) || ""
  );
  const jobInfo = useAppSelector((state) => state.jobs);
  const handleSearch = (searchValue: string) => {
    router.push({
      query: { ...router.query, q: searchValue },
    });
  };

  return (
    <div className="w-[75%] h-fit border rounded-2xl ml-3 py-6">
      <div className="mt-3  px-8">
        <InputFilter
          onSearch={(value: string) => handleSearch(value)}
          value={searchParam}
        />
        <TextLink className="my-3">Advanced Search</TextLink>
        <div className="mt-4 mb-6 flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <span className="font-semibold">100000</span>
            <p>jobs found</p>
          </div>
          <div className="flex items-center space-x-2">
            <span>Sort:</span>
            <SelectCustom className="w-[120px]" option={sortTypeOption} />
          </div>
        </div>
      </div>
      <div className="w-full">
        {jobInfo.jobs.map((job) => (
          <ItemJob key={Math.random()} job={job} />
        ))}
      </div>
      <div className="flex justify-between items-center pt-4 px-8">
        <div className="flex items-center space-x-2">
          <p>Jobs Per Page:</p>
          <SelectCustom
            className="w-[120px]"
            option={jobPerPage}
            defaultValue="10"
            value={localStorage.getItem("limit") || undefined}
            onChange={(choice) => localStorage.setItem("limit", choice.value)}
          />
        </div>
        <div>
          <Pagination total={Math.ceil(jobInfo.jobs.length / 10)} />
        </div>
      </div>
    </div>
  );
}
