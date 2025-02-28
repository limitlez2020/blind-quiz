"use client"

import { useState } from "react";
import NavBar from "./components/NavBar";
import { Poppins } from "next/font/google";
import { ArrowTurnDownRightIcon } from "@heroicons/react/24/solid"
import Link from "next/link";



const poppins = Poppins({subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]})


export default function Home() {
  /* Array of instructions: */
  const instructions = [
    "'start quiz' = begin quiz",
    "'next'       = next question",
    "'previous'   = previous question",
    "'option _'   = choose answer",
    "'submit'     = submit the quiz",
  ];

  





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
              <p className="-mt-1 mb-1 text-xs">Say these words to control quiz</p>
              
              {/* Instruction */}
              {instructions.map((instruction, index) => (
                <div className="mb-1" key={index}>
                  {index + 1}. {instruction}
                </div>
              ))}
            </div>

            {/* Start Quiz: */}
            <Link href={"/quizPage"}>
              <button className="flex flex-row items-center justify-center self-end
                              border-black border-[2px] py-2 px-3 gap-2 text-sm mt-2">
                <p>Begin</p>
                <ArrowTurnDownRightIcon className="mt-[5px] size-3"/>
              </button>
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}
