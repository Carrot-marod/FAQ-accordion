// variables
const questions = document.querySelectorAll(".question")
const answers = document.querySelectorAll(".answer")
const body = document.querySelector("body")
const answersArray =  Array.from(answers)



// functions
const resetAllAnswers = () => {
    answers.forEach(oneAsnwer => {
        oneAsnwer.classList.remove("active")
    })
    questions.forEach(oneAsnwer => {
        const picture = oneAsnwer.querySelector("img")
        picture.setAttribute("src", "assets/images/icon-plus.svg")
    })
}

const changeImg = (oneAsnwer) => {
    const picture = oneAsnwer.querySelector("img")
        picture.setAttribute("src", "assets/images/icon-minus.svg")
}


const switcher = (direction, activeIndex) => {
    const answersMaxIndex = answers.length -1
    let newIndex 
    
    resetAllAnswers()


    if (direction === "down") {
        if (activeIndex > -1 && activeIndex < answersMaxIndex) {
            newIndex = activeIndex + 1
        } else {
            newIndex = 0
        }
    } else if (direction === "up") {
        if (activeIndex > 0 && activeIndex <= answersMaxIndex ) {
            newIndex = activeIndex - 1
        } else {
            newIndex = answersMaxIndex
        }
    }

    answers[newIndex].classList.add("active")

    changeImg(questions[newIndex])
}

resetAllAnswers()


// Hide/Show the answer to a question when the question is clicked
questions.forEach(oneQuestion => {

    const clickable = oneQuestion.firstElementChild

    clickable.addEventListener("click", event => {
        event.preventDefault()

        const answer = oneQuestion.querySelector("p")
        const isActive = answer.classList.contains("active")

        resetAllAnswers()

        if (isActive === true) {
            resetAllAnswers()
        } else {
            changeImg(oneQuestion)
            answer.classList.add("active")  
        }
    })
    
})

// Navigate the questions and hide/show answers using keyboard navigation alone
body.addEventListener("keydown", event => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault()
    
        // findig the index of the active answer (0-3) or not active (-1)
        const activeIndex = answersArray.findIndex( x => 
            x.classList.contains("active")
        )
        
        // switching active answers
        if (event.key === "ArrowDown") {
            switcher("down", activeIndex)
        
        } else if (event.key === "ArrowUp") {
            switcher("up", activeIndex)
        }
    }

})



