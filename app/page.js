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
    "Play ball with friends",
    "Don't take everything to heart",
    "Be kind to others",
    "Learn to play the guitar",
    "Eat a salad for lunch",
  ];

  





  return (
    <div className="bg-white flex flex-col min-h-screen">
      {/* Header: navbar wih no progress bar */}
      <NavBar/>

      {/* Main Body: */}
      <div className="flex w-full h-[41rem] px-6 justify-center items-center">
        {/* Container */}
        <div className="flex flex-col bg-[#F0F0F0] w-full h-full px-5
                        rounded-2xl justify-center items-center"
        >
          {/* Instructions */}
          <div>
            {/* Header */}
            <p className="text-2xl">Instructions</p>
            
            {/* Instruction */}
            <p> Instruction 1. {instructions[0]}</p>

          </div>

          {/* Start Quiz: */}
          <Link href={"/quizPage"}>
            <button className="flex flex-row items-center justify-center
                             border-black border-[1px] py-2 px-3 gap-2">
              <p>Begin</p>
              <ArrowTurnDownRightIcon className="size-4"/>
            </button>
          </Link>
          
        </div>
      </div>
    </div>
  );
}
