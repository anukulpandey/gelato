function SingleCard(props:any) {
    return (
      <div className="w-64 border-2 contrast-200 border-dashed relative">
        <img src={props.src} alt="" />
        {props.burn?
        <div>
        <img src="/verdict/fire2.gif" alt="" className="absolute w-8 bottom-8 left-0" />
        <img src="/verdict/fire2.gif" alt="" className="absolute w-8 bottom-8 left-8" />
        <img src="/verdict/fire2.gif" alt="" className="absolute w-8 bottom-8 left-16" />
        <img src="/verdict/fire2.gif" alt="" className="absolute w-8 bottom-8 left-24" />
        <img src="/verdict/fire2.gif" alt="" className="absolute w-8 bottom-8 left-32" />
        </div>:<></>
    }
        <p className="text-white">{props.charName}</p>
      </div>
    );
  }
  
  export default SingleCard;
  