import React,{memo, useEffect, useRef, useState} from 'react';

export interface  TimerProps {
}

 function Timer (props:  TimerProps) {
  const [timer,setTimer] = useState(new Date())
  useEffect(()=>{
    const timerId = setInterval(() => setTimer(new Date()), 1000);
    return ()=>clearInterval(timerId)
  },[])
  return (
    <div>
      {timer.getHours().toString()}:{timer.getMinutes()<10?"0"+timer.getMinutes().toString():timer.getMinutes().toString()}
    </div>
  );
}

export default memo(Timer)