"use client"

import { useState } from "react";
import Option from "./components/Option";

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
        <p className="font-semibold"> Typequiz </p>
        {/* Button: */}
        <div className="w-5 h-5 border-black border-[1px] rounded-full"></div>
      </div>

      {/* Main Body: */}
      <div className="flex w-full h-[41rem] px-6 justify-center items-center">
        {/* Container */}
        <div className="flex flex-col bg-[#F0F0F0] w-full h-full px-5
                        rounded-2xl justify-center items-center">
          {/* Question: */}
          <div className="flex flex-row gap-3 pb-4">
            <p>{questionNum}.</p>
            <p className="text-2xl">{question}</p>
          </div>

          {/* Answer Options: */}
          <div className="flex flex-wrap w-full px-10 justify-center gap-x-5">
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
      </div>
    </div>
  );
}
