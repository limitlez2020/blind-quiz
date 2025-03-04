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


  /* Array of instructions to be spoken: */
  const spokenInstructions = [
    "Welcome to the quiz. Here are the instructions:",
    "You can control the quiz with your voice.",
    "To read what is on each screen, click anywhere on the screen",
    "To go to the next question, say the word 'next'.",
    "To go to the previous question, say the word 'previous'.",
    "To choose an answer, say the word 'option' followed by the letter of the answer.",
    "To submit the quiz, say the word 'submit'.",
    "To hear these instructions again during the quiz, say the word 'instructions'.",
    "To begin the quiz, hit the spacebar button.",
    "Goodluck!"
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



  /* Function to speak the instructions */
  /* async function coz we wait for the voices to load first */
  const speakInstructions = async () => {
    // const voices = speechSynthesis.getVoices()
    const voices = await loadVoices();
    const voice = voices.find((voice) => voice.lang === 'en-GB')

    /* Get each instruction line as an utterance and speak it */
    spokenInstructions.forEach((line) => {
      const utterance = new SpeechSynthesisUtterance(line);
      utterance.lang = 'en-US'
      utterance.rate = 0.8
      if (voice) {utterance.voice = voice;}
      
      /* speak utterance */
      speechSynthesis.speak(utterance);
    });
  }



  
  /* Listener to read out the instructions when screen is clicked: */
  useEffect(() => {
    const handleFirstInteraction = () => {
      speakInstructions();
      window.removeEventListener('click', handleFirstInteraction);
    };

    /* Add event listener to when the screen is clicked first: */  
    window.addEventListener('click', handleFirstInteraction);
  
    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      speechSynthesis.cancel();
    };
  }, []);
  
  


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
        <div className="relative bg-[#F0F0F0] w-full h-full px-5
                        rounded-2xl"
        >
          {/* Click screen instruction: */}
          <div className="flex absolute bottom-8 left-1/2 -translate-x-1/2 items-center whitespace-pre">
            <p className="border-b-[1px] border-black text-xs motion-safe:animate-pulse"> click screen to hear instructions </p>
          </div>

          {/* Outer Container: */}
          <div className="flex h-full items-center justify-center">
            {/* Inner Container */}
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
    </div>
  );
}
