"use client"

import { useState, useEffect } from "react"
import { Poppins } from "next/font/google"

const poppins = Poppins({subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]})

export default function Option({index, text, isSelected, onSelect}) {

  /* State to get the letter for the option: */
  const [letter, setLetter] = useState("")
  /* State for if the button is clicked */
  const [isClicked, setIsClicked] = useState(false)

  
  /* Get the letter for the option: (A B C or D) */
  const optionLetter = () => {
    if (index === 0) {
      setLetter('A')
    }
    else if (index === 1) {
      setLetter('B')
    }
    else if (index === 2) {
      setLetter('C')
    }
    else if (index === 3) {
      setLetter('D')
    }
  }

  /* Call the optionLetter function when the component mounts */
  useEffect(() => {
    optionLetter();
  }, [])


  /* Toggle clicked state */
  const handleClick = () => {
    setIsClicked(!isClicked)
  }

  
  return (
    // <button onClick={handleClick}>
    <button onClick={onSelect}>
      <div className={`${isSelected ? "border-2" : "border-[1px]"} flex flex-row gap-2
                    border-black bg-[#DEDDDE] p-2 pr-10 rounded-sm items-center`}>
        {/* Option Letter: */}
        <div className={`${isSelected ? "bg-black text-white" : "bg-[#EBEAEC] text-black border-black border-[0.2px]"}
                      ${poppins.className} text-sm font-medium px-2 py-1 rounded-sm`}>
          {letter}
        </div>

        {/* Option Text */}
        <p> {text} </p>
      </div>
    </button>
  )
}