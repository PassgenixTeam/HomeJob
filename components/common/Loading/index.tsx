import * as React from 'react';
import { IconContext } from 'react-icons';
import { ImSpinner2 } from 'react-icons/im';

export interface ILoadingProps {
  size?:number
  color?:string
}

export default function Loading ({size,color}: ILoadingProps) {
  return (
    <div className="w-full flex justify-center items-center">
        <div className="animate-spin">
        <IconContext.Provider
                  value={{
                    color:color? color:"#e5e5e5",
                  }}
                >
                  <div>
                  <ImSpinner2 size={size?size:25}/>
                  </div>
                </IconContext.Provider>
        </div>
      </div>
  );
}
