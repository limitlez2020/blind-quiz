"use client"

import { useState } from "react";
import Option from "./components/Option";
import { Poppins } from "next/font/google";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"
import { MicrophoneIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline"



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
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      correctAnswer: "Mars",
    },
    {
      question: "Who wrote the play 'Romeo and Juliet'?",
      options: ["William Shakespeare", "Charles Dickens", "Mark Twain", "Jane Austen"],
      correctAnswer: "William Shakespeare",
    },
    {
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      correctAnswer: "Pacific Ocean",
    },
    {
      question: "Which element has the chemical symbol 'O'?",
      options: ["Oxygen", "Gold", "Iron", "Carbon"],
      correctAnswer: "Oxygen",
    },
    {
      question: "What is the smallest prime number?",
      options: ["1", "2", "3", "5"],
      correctAnswer: "2",
    },
  ];

  /* Array of selected answers by the user
   * Create an array with the same size as the # questions and 
   * fill it with empty strings */
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(""));

  
  
  /* Move to previous question */
  const prevQuestion = () => {
    /* Only move to the previous question if we're not on the first question: */
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }


  /* Move to next question */
  const nextQuestion = () => {
    /* Only move to next question if we're not on last question: */
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }


  /* Submit the quiz */
  const handleSubmit = () => {
    // TODO: implement this later
    alert("The quiz has been submitted!")
  }



  /* Handle the choosing of options by user
   * Keep track of the options chosen */
  const handleOptionSelect = (option) => {
    /* Update the selected answers array with the
     * option chosen for the current question */
    /* Make a copy of the selected answers */
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = option;
    setSelectedAnswers(newAnswers);
  }





  return (
    <div className="bg-white flex flex-col min-h-screen">
      {/* Header */}
      <div className="flex w-full items-center justify-between px-6 py-4">
        {/* Logo: */}
        <p className={`${poppins.className} font-semibold`}> Quiz </p>

        {/* Progress Bar: */}
        <div className="flex w-1/5 h-1 bg-neutral-200 rounded-full">
          <div className="bg-black h-1 rounded-full transition-all duration-500"
               style={{
                width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
               }}
          />
        </div>

        {/* Button: */}
        <div className={`${poppins.className} flex size-6 text-white bg-black items-center
                         justify-center rounded-sm text-xs font-medium`}>
          {/* <SpeakerWaveIcon className="size-4 stroke-[1.6]"/> */}
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
              <p className="text-2xl text-cen">{questions[currentQuestionIndex].question}</p>
            </div>

            {/* Answer Options: */}
            <div className="grid grid-cols-1 sm:grid-cols-2 mx-10 w-fit gap-x-5 gap-y-3">
              {questions[currentQuestionIndex].options.map((option, index) => (
                /* Display all the options: */
                <Option
                  key={option} 
                  index={index}
                  text={option}
                  /* To know if this choice is selected: return the boolean */
                  isSelected={selectedAnswers[currentQuestionIndex] === option}
                  onSelect={() => handleOptionSelect(option)}
                />
              ))}
            </div>
          </div>

          {/* Bottom Part */}
          <div className="flex flex-col items-center w-full">
            {/* Buttons */}
            <div className="flex justify-between items-center w-full px-5">
              {/* Prev Button: */}
              <button className={`${currentQuestionIndex === 0 ? "bg-neutral-500 pointer-events-none" : "bg-black"} p-2 rounded-sm`}
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

              {/* Submit Button or Next Button: */}
              {(currentQuestionIndex === questions.length - 1) ? (
                /* Submit Button */
                <button className="bg-black p-2 rounded-sm" onClick={handleSubmit}>
                  <p className={`${poppins.className} text-white text-xs font-medium`}>Submit</p>
                </button>
              ) : (
                /* Next Button */
                <button className="bg-black p-2 rounded-sm" onClick={nextQuestion}>
                  <ChevronRightIcon className="size-4 stroke-gray-300 stroke-[2]"
                                  strokeLinecap="round" strokeLinejoin="round"
                  />
                </button>
              )}

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
