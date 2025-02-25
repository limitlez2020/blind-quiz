"use client"

import { useState } from "react";
import Option from "./components/Option";
import { Poppins } from "next/font/google";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"
import { MicrophoneIcon } from "@heroicons/react/24/outline"



const poppins = Poppins({subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]})


export default function Home() {
  /* Keep track of the current question */
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  /* Array of question objects: */
  const questions = [
    {
      question: "What is the name of the current President of the US?",
      options: ["Donald Trump", "Barrack Obama", "Ronald Reagan", "Kamala Harris"],
      correctAnswer: "Donald Trump",
    },
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      correctAnswer: "Paris",
    }
  ]

  /* Array of selected answers by the user
   * Create an array with the same size as the # questions and 
   * fill it with empty strings */
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(""))


  /* Move to next question */
  const nextQuestion = () => {
    /* Only move to next question if we're not on last question: */
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
    else {
      return
    }
  }


  /* Move to previous question */
  const prevQuestion = () => {
    /* Only move to the previous question if we're not on the first question: */
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
    else {
      return
    }
  }





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
              <p>{currentQuestionIndex + 1}.</p>
              <p className="text-2xl">{questions[currentQuestionIndex].question}</p>
            </div>

            {/* Answer Options: */}
            <div className="flex flex-wrap w-2/5 px-10 justify-center gap-x-5">
              {questions[currentQuestionIndex].options.map((option, index) => (
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
              <button className={`${currentQuestionIndex === 0 ? "bg-neutral-600 pointer-events-none" : "bg-black"} p-2 rounded-sm`}
                      onClick={prevQuestion}
              >
                <ChevronLeftIcon className="size-4 stroke-gray-300 stroke-[2]"
                                strokeLinecap="round" strokeLinejoin="round"
                />
              </button>

              {/* Speaker Button: */}
              <button className="border-black border-[1px] rounded-lg p-2">
                <MicrophoneIcon className="size-5 stroke-[1.35]" fill="none"/>
              </button>

              {/* Next Button: */}
              <button className="bg-black p-2 rounded-sm" onClick={nextQuestion}>
                <ChevronRightIcon className="size-4 stroke-gray-300 stroke-[2]"
                                strokeLinecap="round" strokeLinejoin="round"
                />
              </button>
            </div>

            {/* Instruction: */}
            {/* Laptops: */}
            <p className="hidden sm:block text-xs italic mt-3 text-gray-500">press spacebar to start speaking</p>
            {/* Phones/Tablets: */}
            <p className="block sm:hidden text-[10px] italic mt-3 text-gray-500">click to start speaking</p>
          </div>
        </div>
      </div>
    </div>
  );
}
