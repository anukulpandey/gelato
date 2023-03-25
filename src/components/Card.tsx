import React, { useEffect, useState } from 'react'

function Card(props: any) {
    const [idx, setIdx] = useState(0);
    const [fwd, setfwd] = useState(true);
    const [bwd, setbwd] = useState(false);

    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;
        const randomSetter = () => {
            if (myVal != true) return;
            setIdx(Math.floor(Math.random() * charArray.length));
            props.playerDetails.setFunc(charArray[idx]);
            return;
        }
        intervalId = setInterval(() => {
            randomSetter();
        }, 1000);
        return () => clearInterval(intervalId!);
    }, [])


    let charArray = ['bluesword', 'greenlizard', 'heavybot', 'redflame', 'avatar', 'monkey', 'jumblo', 'hecto', 'brutal'];

    let myVal = props.isComp && !props.isStopped;
    const handleIncrement = () => {
        console.log(props.playerDetails.player)
        if (idx != -1) setbwd(true);
        if (idx == charArray.length - 1) {
            setfwd(false);
            return;
        }
        else {
            setIdx(idx + 1);
            props.playerDetails.setFunc(charArray[idx + 1]);
        }
    }

    const handleDecrement = () => {
        if (idx != charArray.length) setfwd(true);
        if (idx === 0) setbwd(false);
        else if (idx > 0) {
            setIdx(idx - 1);
            props.playerDetails.setFunc(charArray[idx - 1]);
        }
    }
    return (
        <div className='font-xbody w-52 h-80 text-white'>
            <p>{charArray[idx]}</p>
            <img src={`/char/${charArray[idx]}.gif`} alt="" className=' border-4 rounded-md border-dashed ' />
            <div className='flex justify-between py-2'>
                {bwd ? <button onClick={handleDecrement} className="border-4 border-dashed w-24 h-28 rounded-l-lg">
                    <img src="/bwd.png" alt="" />
                </button> :
                    <button disabled onClick={handleDecrement} className="border-4 border-dashed w-24 h-28 rounded-l-lg">
                        <img src="/ret2.png" alt="" />
                    </button>
                }

                {props.isComp == false && fwd ? <button onClick={handleIncrement} className="border-4 border-dashed w-24 h-28 rounded-r-lg">
                    <img src="/fwd.png" alt="" />
                </button> :
                    <button disabled className="border-4 border-dashed w-24 h-28 rounded-r-lg">
                        <img src="/ret1.png" alt="" />
                    </button>
                }
            </div>
        </div>
    )
}

export default Card