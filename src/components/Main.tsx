import React from 'react'

export default function Main() {
  return (
    <div className="py-14">
        <div className="flex">
        <div className="rounded-tl-lg  w-28 border-2 contrast-200 border-dashed">
          <img src="/char/avatar.gif" className="transition duration-150 ease-in-out" alt="" />
        </div>
        <div className="w-28 border-2 contrast-200 border-dashed">
          <img src="/char/bluesword.gif" alt="" />
        </div>
        <div className="w-28 border-2 contrast-200 border-dashed">
          <img src="/char/brutal.gif" alt="" />
        </div>
        <div className="rounded-tr-lg w-28 border-2 contrast-200  border-dashed">
          <img src="/char/greenlizard.gif" alt="" />
        </div>
        </div>
        <div className="flex">
        <div className="rounded-bl-lg w-28  contrast-200 border-2 border-dashed">
          <img src="/char/heavybot.gif" alt="" />
        </div>
        <div className="w-28 border-2  contrast-200 border-dashed">
          <img src="/char/hecto.gif" alt="" />
        </div>
        <div className="w-28 border-2  contrast-200 border-dashed">
          <img src="/char/jumblo.gif" alt="" />
        </div>
        <div className="rounded-br-lg w-28 contrast-200 border-2 border-dashed">
          <img src="/char/redflame.gif" alt="" />
        </div>
        </div>
        </div>
  )
}
