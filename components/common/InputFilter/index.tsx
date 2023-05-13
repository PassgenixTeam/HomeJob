import clsx from 'clsx';
import React, { FormEvent, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import Select from '../Select';

interface InputFilterProps {
  placeholder?: string;
  className?: string;
  iconPosition?: 'left' | 'right';
  onSearch?: (value: string) => void;
  value?: string;
}

const InputFilter = ({ className, iconPosition = 'right', placeholder, onSearch, value }: InputFilterProps) => {
  const [search, setSearch] = useState<string>(value || '');
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const histories = JSON.parse(localStorage.getItem("histories")||"[]");
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (histories?.find((item: string) => item === search)) {
      localStorage.setItem('histories', JSON.stringify([...histories, search]));
    }
    if (onSearch) {
      onSearch(search);
    }
  };
  const handleShowHistory = (isShow: boolean) => {
    setShowHistory(isShow);
  };
  return (
    <div className="relative basis-1/2 rounded-r-md">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          id="search-dropdown"
          name="search"
          value={search}
          className={clsx(
            'block p-2.5 w-full z-20 text-sm text-gray-900 rounded-md border focus:outline-none focus:border-[color:var(--primary-4)] hover:border-[color:var(--primary-4)]',
            className,
            iconPosition === 'left' ? 'pl-12' : 'pr-10'
          )}
          placeholder="Search job postings"
          autoComplete="off"
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => handleShowHistory(true)}
          onBlur={() => handleShowHistory(false)}
        />
        {iconPosition === 'right' ? (
          <button
            type="submit"
            title="Search"
            className="absolute top-0 right-0 p-2.5 text-sm font-medium 
            text-white bg-blue-700  hover:bg-blue-800 rounded-r-md"
          >
            <AiOutlineSearch size={21} />
          </button>
        ) : (
          <button type="submit" title="Search" className="absolute top-0 left-0 p-2.5 text-sm font-medium text-white rounded-l-md">
            <AiOutlineSearch size={21} color="black" />
          </button>
        )}
      </form>
      <div
        className={`w-full  absolute z-50 top-full left-0 shadow-lg mt-2 px-4 transition-all
      ${showHistory ? 'h-fit' : 'h-[0px] overflow-hidden'} bg-white rounded-b-md`}
      >
        <span className="font-semibold text-sm text-[color:var(--gray-7)]  capitalize">Recent Searches</span>
        <div className="space-y-1 mt-1">
          {histories?.map((item: string, index: number) => {
            if (item.includes(search)) return <p key={index}>{item}</p>;
          })}
        </div>
      </div>
    </div>
  );
};

export default InputFilter;
