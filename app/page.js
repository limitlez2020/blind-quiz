"use client"

import { useState } from "react";
import Option from "./components/Option";
import { Poppins } from "next/font/google";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"
import { MicrophoneIcon } from "@heroicons/react/24/outline"



const poppins = Poppins({subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]})


export default function Home() {
  const questionNum = 1;
  const question = "What is the name of the current President of the US?";
  const options = ["Donald Trump", "Barrack Obama", "Ronald Reagan", "Kamala Harris"];
  const correctAnswer = "Donald Trump";


  return (
    <div className="bg-white flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex w-full justify-between px-6 py-4">
        {/* Logo: */}
        <p className={`${poppins.className} font-semibold`}> Quiz </p>
        {/* Button: */}
        <div className={`${poppins.className} flex w-6 h-6 text-white bg-black items-center
                         justify-center rounded-sm text-xs font-medium`}>
          A
        </div>
      </div>

      {/* Main Body: */}
      <div className="flex w-full h-[41rem] px-6 justify-center items-center">
        {/* Container */}
        <div className="flex flex-col bg-[#F0F0F0] w-full h-full px-5
                        rounded-2xl justify-center items-center"
        >
          {/* Question & Answers */}
          <div className="flex flex-col justify-center items-center w-full h-4/5">
            {/* Question: */}
            <div className="flex flex-row gap-3 pb-4">
              <p>{questionNum}.</p>
              <p className="text-2xl">{question}</p>
            </div>

            {/* Answer Options: */}
            <div className="flex flex-wrap w-2/5 px-10 justify-center gap-x-5">
              {options.map((option, index) => (
                <div key={option} className="flex flex-row gap-3 py-2">
                  {/* Display all the options: */}
                  <Option 
                    index={index}
                    text={option}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Part */}
          <div className="flex flex-col items-center w-full">
            {/* Buttons */}
            <div className="flex justify-between items-center w-full px-5">
              {/* Prev Button: */}
              <button className="bg-black p-2 rounded-sm">
                <ChevronLeftIcon className="size-4 stroke-gray-300 stroke-[2]"
                                strokeLinecap="round" strokeLinejoin="round"
                />
              </button>

              {/* Speaker Button: */}
              <button className="border-black border-[1px] rounded-lg p-2">
                <MicrophoneIcon className="size-5 stroke-[1.35]" fill="none"/>
              </button>

              {/* Next Button: */}
              <button className="bg-black p-2 rounded-sm">
                <ChevronRightIcon className="size-4 stroke-gray-300 stroke-[2]"
                                strokeLinecap="round" strokeLinejoin="round"
                />
              </button>
            </div>

            {/* Instruction: */}
            <p className="text-xs italic mt-3 text-gray-500">press spacebar to start speaking</p>
          </div>
        </div>
      </div>
    </div>
  );
}
