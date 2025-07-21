// variables
let questions = document.querySelectorAll(".question")
let answers = document.querySelectorAll(".answer")
let body = document.querySelector("body")
let answersArray =  Array.from(answers)



// functions
let resetAllAnswers = () => {
    answers.forEach(oneAsnwer => {
        oneAsnwer.classList.remove("active")
    })
    questions.forEach(oneAsnwer => {
        let picture = oneAsnwer.querySelector("img")
        picture.setAttribute("src", "assets/images/icon-plus.svg")
    })
}

let changeImg = (oneAsnwer) => {
    let picture = oneAsnwer.querySelector("img")
        picture.setAttribute("src", "assets/images/icon-minus.svg")
}


let switcher = (direction, activeIndex) => {
    let answersMaxIndex = answers.length -1
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

    let clickable = oneQuestion.firstElementChild

    clickable.addEventListener("click", event => {
        event.preventDefault()

        let answer = oneQuestion.querySelector("p")
        let isActive = answer.classList.contains("active")

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
        let activeIndex = answersArray.findIndex( x => 
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



