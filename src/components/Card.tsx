import React, { useEffect, useState } from 'react';

function Card(props: any) {
  const [idx, setIdx] = useState(0);
  const [fwd, setFwd] = useState(true);
  const [bwd, setBwd] = useState(false);

  const charArray = props.isComp ? ['bluesword', 'greenlizard', 'heavybot', 'redflame', 'avatar', 'monkey', 'jumblo', 'hecto', 'brutal'] : props.playerChars.length==0?['none']:props.playerChars;

  const myVal = props.isComp && !props.isStopped;

  const handleIncrement = () => {
    if (idx != -1) setBwd(true);
    if (idx == charArray.length - 1) {
      setFwd(false);
      return;
    } else {
      setIdx(idx + 1);
      props.playerDetails.setFunc(charArray[idx + 1]);
    }
  };

  const handleDecrement = () => {
    if (idx != charArray.length) setFwd(true);
    if (idx === 0) setBwd(false);
    else if (idx > 0) {
      setIdx(idx - 1);
      props.playerDetails.setFunc(charArray[idx - 1]);
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    const randomSetter = () => {
      if (myVal) {
        setIdx(Math.floor(Math.random() * charArray.length));
        props.playerDetails.setFunc(charArray[idx]);
      }
    };
    intervalId = setInterval(() => {
      randomSetter();
    }, 1000);
    return () => clearInterval(intervalId!);
  }, []);

  return (
    <div className="font-xbody w-52 h-80 text-white">
      <p>{charArray[idx]}</p>
      <img src={`/char/${charArray[idx]}.gif`} alt="" className="border-4 rounded-md border-dashed " />
      <div className="flex justify-between py-2">
        {bwd ? (
          <button onClick={handleDecrement} className="border-4 border-dashed w-24 h-28 rounded-l-lg">
            <img src="/bwd.png" alt="" />
          </button>
        ) : (
          <button disabled onClick={handleDecrement} className="border-4 border-dashed w-24 h-28 rounded-l-lg">
            <img src="/ret2.png" alt="" />
          </button>
        )}

        {!props.isComp && fwd ? (
          <button onClick={handleIncrement} className="border-4 border-dashed w-24 h-28 rounded-r-lg">
            <img src="/fwd.png" alt="" />
          </button>
        ) : (
          <button disabled className="border-4 border-dashed w-24 h-28 rounded-r-lg">
            <img src="/ret1.png" alt="" />
          </button>
        )}
      </div>
    </div>
  );
}

export default Card;
