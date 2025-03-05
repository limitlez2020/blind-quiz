"use client"

import { useEffect, useState } from "react";
import Option from "../components/Option";
import { Poppins } from "next/font/google";
import { ChevronLeftIcon, ChevronRightIcon, StopIcon } from "@heroicons/react/24/solid"
import { MicrophoneIcon, SpeakerWaveIcon } from "@heroicons/react/24/outline"
import "regenerator-runtime/runtime"
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import NavBar from "../components/NavBar";
import { async } from "regenerator-runtime";



const poppins = Poppins({subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]})


export default function Quiz() {
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
    /* Turn off computer speaking */
    speechSynthesis.cancel();
  }


  /* Move to next question */
  const nextQuestion = () => {
    /* Only move to next question if we're not on last question: */
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
    /* Turn off computer speaking */
    speechSynthesis.cancel();
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




  /***********   Handle Speech   ***********/
  /* Get functions needed from the useSpeechRecognition: */
  const {
    transcript,
    resetTranscript,
    listening,  /* see if user still recording or not */
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition()

  /* Quick check to see if browser support speech recognition: */
  if (!browserSupportsSpeechRecognition) {
    console.log("Sorry, your browser does not support speech recognition");
  }

  /* Start recording: */
  const startRecording = () => {
    SpeechRecognition.startListening({ continuous: true });

    /* Reset transcript */
    resetTranscript();
    /* Turn off computer speaking */
    speechSynthesis.cancel();
  }
  
  /* Stop recording: */
  const stopRecording = () => {
    SpeechRecognition.stopListening();
  }


  /* Perform users commands as soon as we stop recording: */
  useEffect(() => {
    if (!listening && transcript !== "") {
      handleUserCommands();
    }
  }, [listening]);


  /* Optional: use spacebar to control the microphone */
  const toggleRecord = (event) => {
    /* check if event key is a spacebar */
    if (event.key === ' ') {
      /* Prevent default spacebar behavior e.g. scrolling */
      event.preventDefault();
      /* Toggle recording */
      if (listening) {
        stopRecording();
      }
      else {
        startRecording();
      }
    }
  }


  /* Add an event handler to listen for a spacebar key down */
  useEffect(() => {
    /* Create an event */
    const handleSpacebar = (event) => {
      toggleRecord(event)
    }
    /* Add event listener */
    document.addEventListener("keydown", handleSpacebar)

    /* Remove event listener */
    return () => {
      document.removeEventListener("keydown", handleSpacebar)
    }
  }, [listening])




  /* Speech: instructions */
  const instructions = [
    "Here are the instructions:",
    "To read the question and answer options, click anywhere on the screen",
    "To start and stop recording your voice, hit the spacebar.",
    "To go to the next question, say the word 'next'.",
    "To go to the previous question, say the word 'previous'.",
    "To choose an answer, say the word 'option' followed by the letter of the answer.",
    "To submit the quiz, say the word 'submit'.",
    "To hear these instructions again during the quiz, say the word 'instructions'.",
  ]


  /* Speech: question and option answers */
  const QandA = [
    "Question " + (currentQuestionIndex + 1),
    questions[currentQuestionIndex].question,
    "Option A",
    questions[currentQuestionIndex].options[0],
    "",
    "Option B",
    questions[currentQuestionIndex].options[1],
    "",
    "Option C",
    questions[currentQuestionIndex].options[2],
    "",
    "Option D",
    questions[currentQuestionIndex].options[3],
    "",
    "Which option do you choose?",
  ]


  /* Load voices asynchronously */
  const loadVoices = () => {
    /* Create a promise: */
    return new Promise((resolve) => {
      /* Try to get voice: */
      const voices = speechSynthesis.getVoices();
      /* If voices already loaded, resolve the promise */
      if (voices.length !== 0) {
        resolve(voices);
      }
      else {
        /* If voices not loaded, listen to onvoiceschanged event: 
         * it will fire when the voices finish loading.
         * Once this is done, get the voices and resolve the promise */
        speechSynthesis.onvoiceschanged = () => {
          resolve(speechSynthesis.getVoices());
        }
      }
    })
  }


  /* Read Function: to read any speech given to it
   * i.e. Q and A and intrsuctions */
  const read = async (speech) => {
    /* Set voice: */
    let voices = await loadVoices();
    let voice = voices.find(voice => voice.lang === 'en-GB')

    /* Speak each line: */
    speech.forEach(line => {
      const utterance = new SpeechSynthesisUtterance(line);
      if (voice) {utterance.voice = voice}
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    });
  };



  /* Add a listener so whenever anywhere on the screen is clicked, read Q&A */
  useEffect(() => {
    const handleClick = (event) => {
      if (event.target.tagName === "BUTTON") {
        return;
      }
      read(QandA);
    }

    document.addEventListener("click", handleClick);

    /* remove event listener: */
    return () => {
      document.removeEventListener("click", handleClick);
    }
  }, [currentQuestionIndex])




  /* Check transcript for user commands */
  const handleUserCommands = () => {
    /* Set transcript to lowercase: */
    let new_transcript = transcript.toLowerCase();
    // console.log("Transcript is: ", new_transcript);

    /* Move to next question */
    if (new_transcript.includes("next")) {
      nextQuestion()
    }

    /* Move to previous question */
    else if (new_transcript.includes("previous")) {
      prevQuestion()
    }

    /* Choose an option on the current question */
    else if (new_transcript.includes("option")) {
      let option;

      /* Choose option A */
      if (new_transcript.match(/option\s+(a|ah|ay|hey)/)) {
        option = questions[currentQuestionIndex].options[0];
      }
      /* Choose option B */
      else if (new_transcript.includes("option b")) {
        option = questions[currentQuestionIndex].options[1];
      }
      /* Choose option C */
      else if (new_transcript.includes("option c")) {
        option = questions[currentQuestionIndex].options[2];
      }
      /* Choose option D */
      else if (new_transcript.includes("option d")) {
        option = questions[currentQuestionIndex].options[3];
      }

      /* Add the option to the selectedAnswers array i.e. select that option */
      handleOptionSelect(option);
    }

    /* Submit Quiz: */
    else if (new_transcript.includes("submit")) {
      /* Only submit if at the last question */
      if (currentQuestionIndex === (questions.length - 1)) {
        handleSubmit()
      }
    }

    /* Read the instruction: */
    else if (new_transcript.includes("instruction" || "instructions")) {
      read(instructions);
    }
  }

  /***********   End Handle Speech   ***********/







  return (
    <div className="bg-white flex flex-col min-h-screen">
      {/* Header */}
      {/* We add the parameters coz we want to see progress bar in NavBar */}
      <NavBar
       currentQuestionIndex={currentQuestionIndex}
       totalQestions={questions.length}
      />

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
              <button className={`${currentQuestionIndex === 0 ? "bg-neutral-500" : "bg-black"} p-2 rounded-sm`}
                      onClick={prevQuestion}
                      disabled={currentQuestionIndex === 0}
              >
                <ChevronLeftIcon className="size-4 stroke-gray-300 stroke-[2]"
                                strokeLinecap="round" strokeLinejoin="round"
                />
              </button>

              {/* Speaker Button: */}
              {listening ? (
                /* Stop recording */
                <button className="border-black border-[1px] rounded-lg p-2"
                        onClick={stopRecording}>
                  <StopIcon className="size-5 stroke-[1.35] animate-pulse" fill="black"/>
                </button>
                
              ) : (
                /* Start recording */
                <button className="border-black border-[1px] rounded-lg p-2"
                        onClick={startRecording}>
                  <MicrophoneIcon className="size-5 stroke-[1.35]" fill="none"/>
                </button>
              )}

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
