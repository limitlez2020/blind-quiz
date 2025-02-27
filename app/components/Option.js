"use client"

import { useState, useEffect } from "react"
import { Poppins } from "next/font/google"

const poppins = Poppins({subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]})

export default function Option({index, text, isSelected, onSelect}) {

  /* Get the letter for the option: (A B C or D) */
  /* Get ASCII value and then turn it to corresponding char: */
  let ascii_value = 65 + index
  const optionLetter = String.fromCharCode(ascii_value)

  
  return (
    <button onClick={onSelect}>
      <div className={`${isSelected ? "border-2" : "border-[1px]"} flex flex-row gap-2
                    border-black bg-[#DEDDDE] p-2 pr-20 rounded-sm items-center`}>
        {/* Option Letter: */}
        <div className={`${isSelected ? "bg-black text-white" : "bg-[#EBEAEC] text-black border-black border-[1px]"}
                      ${poppins.className} text-sm font-medium px-2 py-1 rounded-sm`}>
          {optionLetter}
        </div>

        {/* Option Text */}
        <p className="text-left"> {text} </p>
      </div>
    </button>
  )
}