"use client"

import { useState } from "react";
import NavBar from "./components/NavBar";
import { Poppins } from "next/font/google";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"
import { MicrophoneIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline"
import Link from "next/link";



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
    /* Check if all questions have been answered: */
    if (selectedAnswers.includes("")) {
      /* Display the question numbers that have been unanswered: */
      const unansweredQuestionNums = []
      for (let i = 0; i < selectedAnswers.length; i++) {
        if (selectedAnswers[i] === "") {
          /* We add one to cover for the 0-indexing */
          unansweredQuestionNums.push(i + 1)
        }
      }
      
      /* Print the questions unanswered: */
      alert(`You still have some questions unanswered: ${unansweredQuestionNums}`)
      return
    }

    /* Check if answers are correct: */
    let score = 0;
    questions.forEach((question, index) => {
      /* Keep track of the how many gotten right */
      if (question.correctAnswer === selectedAnswers[index]) {
        score += 1;
      }
    })
    
    /* Display score and percentage */
    let percentage = (score / questions.length) * 100
    alert(`Congrats! You got ${score} out of ${questions.length} \nPercentage is: ${percentage}`)
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
            Here are the Instructions
          </div>

          {/* Start Quiz: */}
          <Link href={"/quizPage"}>
            <button className="bg-black size-10">
              Start Quiz
            </button>
          </Link>
          
        </div>
      </div>
    </div>
  );
}
