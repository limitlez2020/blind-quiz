"use client"

import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import { Poppins } from "next/font/google";
import { ArrowTurnDownRightIcon } from "@heroicons/react/24/solid"
import Link from "next/link";



const poppins = Poppins({subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]})


export default function Home() {
  /* Array of instructions: */
  const instructions = [
    "'next'       = next question",
    "'previous'   = previous question",
    "'option _'   = choose answer",
    "'submit'     = submit the quiz",
    "'instructions' = hear instructions",
  ];


  /* Function to enable the user to start quiz
   * by pressing spacebar. i.e. The Listener */
  const handleSpaceBar = (event) => {
    /* if key pressed is spacebar */
    if (event.key === ' ') {
      /* Go to quizPage */
      window.location.href = "/quizPage"
    }
  }


  /* Enable user to start quiz by pressing spacebar */
  useEffect(() => {
    /* Add the eventListener handleSpaceBar to listen
     * for spacebar key is pressed. Keydown is event type */
    document.addEventListener('keydown', handleSpaceBar)
    /* Remove eventListener when component is unmounted */
    return () => {
      document.removeEventListener('keydown', handleSpaceBar)
    }
  }, [])
  





  return (
    <div className="bg-white flex flex-col min-h-screen">
      {/* Header: navbar wih no progress bar */}
      <NavBar/>

      {/* Main Body: */}
      <div className="flex w-full h-[41rem] px-6 justify-center items-center">
        {/* Gray Container */}
        <div className="flex flex-col bg-[#F0F0F0] w-full h-full px-5
                        rounded-2xl justify-center items-center"
        >
          {/* Content Container */}
          <div className="flex flex-col items-start">
            {/* Instructions */}
            <div>
              {/* Header */}
              <p className="text-2xl">Instructions</p>
              {/* Subheader */}
              <p className="-mt-1 mb-4 text-xs">Say these words to control quiz</p>
              
              {/* Instruction */}
              {instructions.map((instruction, index) => (
                <div className="mb-2 flex flex-row gap-2 items-center" key={index}>
                  {/* Number */}
                  <div className="border-[1px] text-sm border-black py-[3px] px-[9px]">
                    {index + 1}.
                  </div>
                  {/* Text */}
                  <p>
                    {instruction}
                  </p>
                </div>
              ))}
            </div>

            {/* Start Quiz: */}
            <Link href={"/quizPage"}>
              <button className="flex flex-row items-center justify-center
                              bg-black text-white py-2 px-3 gap-2 mt-2">
                <p className={`${poppins.className} text-sm font-mednium`}>Begin</p>
                <ArrowTurnDownRightIcon className="size-3"/>
              </button>
            </Link>
            <p className="hidden sm:block text-xs italic text-neutral-500">press spacebar to begin quiz</p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
