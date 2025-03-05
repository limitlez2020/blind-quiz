import Link from "next/link"
import { useState, useEffect, use } from "react"
import { Poppins } from "next/font/google"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
})



export default function NavBar({currentQuestionIndex, totalQestions}) {
  /* State to know when we are in the Quiz page */
  const [inQuizPage, setInQuizPage] = useState(false)

  /* Figure out if we're in Quiz Page or not
   * To know whether to display the progressBar
   * Only display if the two parameters exists */
  useEffect(() => {
    if (currentQuestionIndex != null && totalQestions != null) {
      setInQuizPage(true)
    }
    else { 
      setInQuizPage(false)
    }
  }, [])


  
  return (
     /* Header */
     <div className="navbar-container flex w-full items-center justify-between px-6 py-4">
     {/* Logo: Home page */}
     <Link href={"/"}>
       <p className={`${poppins.className} font-semibold`}> Quiz </p>
     </Link>

     {/* Progress Bar: Only display if inQuizPage is true */}
     {inQuizPage && (
        <div className="flex w-1/5 h-1 bg-neutral-200 rounded-full">
          <div className="bg-black h-1 rounded-full transition-all duration-500"
                style={{
                //  width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`
                width: `${((currentQuestionIndex + 1) / totalQestions) * 100}%`
                }}
          />
        </div>
      )}

     {/* Button: */}
     <div className={`${poppins.className} flex size-6 text-white bg-black items-center
                      justify-center rounded-sm text-xs font-medium`}>
       {/* <SpeakerWaveIcon className="size-4 stroke-[1.6]"/> */}
       A
     </div>
   </div>
  )
}