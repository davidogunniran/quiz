// store all required elements in accessible variables
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn')
const questionContainer = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtons = document.getElementById('answer-btn')
const scoreElement = document.getElementById('score')
const total = document.getElementById('total')

//create undefined variables for question shuffling and postion of current game question
let shuffledQuestions, currentQuestionIndex

//click event to start the game
startButton.addEventListener('click', startGame)
//initiates next button
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})
//function that runs on game start
function startGame(){
    startButton.classList.add('hide')
    questionContainer.classList.remove('hide')
    //shuffles array 
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    //Sets first question in Question array
    currentQuestionIndex = 0
    //sets game score to zero
    score = 0
    //Run function to populates DOM with question from question array
    setNextQuestion()
 }

//this sets the question from the array
function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function resetState() {   
    //hides next button
    nextButton.classList.add('hide')
    //hides total html tag
    total.classList.add('hide')
    //displays score 
    scoreElement.classList.remove('hide')
    //populates DOM with score on game start
    scoreElement.innerHTML = `Score: ` + score + ` of 5`

    //Loop to remove pre-existing html boilerplate btn elements
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}
   //populates question and answers with objects from Questions array
function showQuestion(question){
    //populate questionElement with question object from array
    questionElement.innerText = question.question
    //run function to create btns for each answer from the array
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        //populate button element with values from answers array
        button.innerText = answer.text
        //add css class to button
        button.classList.add('btn')
        //adds attribute 'Data-correct = true' to element populated with 'correct: true' from the Questions Array
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        //run function selectAnswer on btn click which determines correct answer
        button.addEventListener('click', selectAnswer)
        //add created button as child into DOM Parent element answerButtons 
        answerButtons.appendChild(button)  
    })
}

//run function to detect selected answer btn
function selectAnswer(e) {
    //stores target property of evt in selectedButton
    const selectedButton = e.target
    //checks if selected answer's data-correct attribute is true
    if (selectedButton.getAttribute('data-correct')) {
        //increase score by 1
        score++
        //populate DOM with value of Score 
        scoreElement.innerHTML = `Score: ` + score + ` of 5`
    }
    //set status for each answer btn once clicked
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button)
    })
   //run loop to determine if there are still questions to be displayed
    if (shuffledQuestions.length > currentQuestionIndex +1) {
        nextButton.classList.remove('hide')
    } else {
        //display total score
        total.innerHTML = 'You scored ' + score + ' out of 5'
        //display total element
        total.classList.remove('hide')
        //change startButton text to Restart
        startButton.innerText = 'Restart'
        //display Restart
        startButton.classList.remove('hide')
        //hide question container
        questionContainer.classList.add('hide')
        //hide scoreElemnt
        scoreElement.classList.add('hide')
    }
}
//function to set answer btn status when selected
function setStatusClass(element){
    //clears previous answer btn status
    clearStatusClass(element)
    //run loop to check if each answer has a true state of attribute 'data-correct'
    if(element.getAttribute('data-correct')) {
        //disables answer btns to prevent multiple selections
        Array.from(answerButtons.children).forEach( disableButton => {
            disableButton.disabled = true
        })
        //adds a css class 'correct' to answer btn with true value of attribute 'data-correct'
        element.classList.add('correct')
    } else {         
        //adds a css class 'wrong' to answer btn with true value of attribute 'data-correct'
        element.classList.add('wrong')
    }  
}

// clears answer btn status for next selection
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

//Array to store question and answers
const questions = [
    {
        question: 'Who was elected President of the United States in 2017?', 
        answers: [
        { text: 'Donald Trump', correct: true},
        { text: 'Barack Obama', correct: false},
        { text: 'George Bush', correct: false}
        ]
    },
    {
        question: 'What is the national language of Canada?', 
        answers: [
            { text: 'English', correct: false},
            { text: 'Dutch', correct: true},
            { text: 'French', correct: false}
        ]
    }, 
    {
        question: 'Saudi Arabia is the biggest producer of?', 
        answers: [
            { text: 'Oil', correct: true},
            { text: 'Coal', correct: false},
            { text: 'Coffee', correct: false}
        ]
    },
    {
        question: ' What is a great remedy for weight loss?', 
        answers: [
            { text: 'Black tea', correct: false}, 
            
            
            { text: 'Diet soda', correct: false},
            { text: 'Drinking green tea', correct: true}
        ]
    },
    {
        question: 'How many colors in the Rainbow?', 
        answers: [
            { text: 'One', correct: false}, 
            { text: 'Five', correct: false},
            { text: ' Seven', correct: true}
        ]
    },
]