"use client"

import { useState, useEffect } from "react"

export default function Option({index, text}) {

  /* State to get the letter for the option: */
  const [letter, setLetter] = useState("")

  
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

  
  return (
    <div className="flex flex-row gap-2">
      {/* Option Letter: */}
      <p>{letter}.</p>
      {/* Option Text */}
      <p>{text}</p>
    </div>
  )
}