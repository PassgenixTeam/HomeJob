import HomeLayout from "@/components/layouts/homeLayout";
import SearchJob from "@/components/pageComponents/seachJob";
import { ReactNode } from "react";
export interface SearchPageProps {
}

export default function SearchPage({}: SearchPageProps) {
  return (
    <div>
      <SearchJob />
    </div>
  );
}

SearchPage.getLayout = (page: ReactNode) => {
  return <HomeLayout>{page}</HomeLayout>;
};

SearchPage.auth = {
  unauthorized: "/login",
};
