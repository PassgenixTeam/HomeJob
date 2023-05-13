import React, { useState } from "react";
import { useRouter } from "next/router";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
export interface PaginationProps {
  total?: number;
}

export default function Pagination({ total = 1 }: PaginationProps) {
  const router = useRouter();
  const [page, setPage] = useState(
    router.query.page ? Number(router.query.page) : 1
  );
  const handleChangePage = (pageNumber:number) => {
    if(pageNumber>0 && pageNumber<=total){
      setPage(pageNumber)
      router.push({
        query:{...router.query,page:pageNumber}
      })
    }
  };
  return (
    <div className="flex items-center w-fit space-x-6">
      <div
        className={`flex items-center space-x-3 ${
          page === 1
            ? "text-[color:var(--gray-8)]"
            : "text-[color:var(--primary-7)]"
        } font-medium`}
      >
        <p
          className={`${
            page === 1
              ? "hover:cursor-default"
              : "hover:cursor-pointer hover:text-[color:var(--primary-6)]"
          }`}
          onClick={()=>handleChangePage(1)}
        >
          First
        </p>
        <div
          className={`flex items-center space-x-2 ${
            page === 1
              ? "hover:cursor-default"
              : "hover:cursor-pointer hover:text-[color:var(--primary-6)]"
          }`}
          onClick={()=>handleChangePage(page-1)}
        >
          <FaChevronLeft />
          <p>Previous</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        {Array.from(Array(total), (e, i) => {
          if(total>5 && (i+3<page||i-1>page)){
            if(i+4<page||i-2>page){
              return <></>
            }else{
              return (<p>...</p>)
            }
          }
          return (
            <p
              className={`hover:cursor-pointer ${
                page === i+1 &&
                "p-2 rounded-full bg-[color:var(--primary-7)] text-white font-medium h-[25px] flex justify-center items-center"
              }`}
              key={i}
              onClick={()=>handleChangePage(i+1)}
            >
              {i + 1}
            </p>
          );
        })}
      </div>
      <div
        className={`flex items-center space-x-3 ${
          page === total
            ? "text-[color:var(--gray-8)]"
            : "text-[color:var(--primary-7)]"
        } font-medium`}
      >
        <div
          className={`flex items-center space-x-2 ${
            page === total
              ? "hover:cursor-default"
              : "hover:cursor-pointer hover:text-[color:var(--primary-6)]"
          }`}
          onClick={()=>handleChangePage(page+1)}
        >
          <p>Next</p>
          <FaChevronRight />
        </div>
        <p
          className={`${
            page === total
              ? "hover:cursor-default"
              : "hover:cursor-pointer hover:text-[color:var(--primary-6)]"
          }`}
          onClick={()=>handleChangePage(total)}
        >
          Last
        </p>
      </div>
    </div>
  );
}
