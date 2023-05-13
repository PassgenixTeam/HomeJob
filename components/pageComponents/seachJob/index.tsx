import { useAppDispatch } from "@/stores/hooks";
import { getJobs } from "@/stores/slices/jobs/jobsSlide";
import { useRouter } from "next/router";
import { useEffect } from "react";
import FilterBar from "./filterBar";
import MainJobList from "./mainJobList";

export interface SearchJobProps {}

export default function SearchJob(props: SearchJobProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch({
      type: getJobs().type,
    });
  }, [router.query]);
  return (
    <div className="flex justify-center w-full">
      <div className="w-[70%] min-w-[1050px] px-4 text-[color:var(--gray-9)] flex py-6">
        <FilterBar />
        <MainJobList />
      </div>
    </div>
  );
}
