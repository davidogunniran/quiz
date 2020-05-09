// store all required elements in accessible variables

const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next')
const questionContainer = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtons = document.getElementById('answer-btn')
const scoreElement = document.getElementById('score')
const total = document.getElementById('total')
    
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
    currentQuestionIndex = 0
    score = 0
    scoreElement.innerHTML = `Score: ` + score + ` of 5`
    setNextQuestion()
 }

//this sets the question from the array
function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}
   //populates question and answers with values from array
function showQuestion(question){
    //populate questionElement with question in array
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        //populate button element with answers array
        button.innerText = answer.text
        //add css class to button
        button.classList.add('btn')
        
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtons.appendChild(button)  
    })
}

function resetState() {   
    nextButton.classList.add('hide')
    total.classList.add('hide')
    scoreElement.classList.remove('hide')

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    // const correctButton = selectedButton.dataset.correct
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button)
    })
   
    if (shuffledQuestions.length > currentQuestionIndex +1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
        questionContainer.classList.add('hide')
        total.classList.remove('hide')
        scoreElement.classList.add('hide')
        total.innerHTML = 'You scored ' + score + ' out of 5'
        
    }
}

function setStatusClass(element){
    clearStatusClass(element)
    if(element.getAttribute('data-correct')) {
        score++
        console.log(score)
        scoreElement.innerHTML = `Score: ` + score + ` of 5`
        Array.from(answerButtons.children).forEach( disableButton => {
            disableButton.disabled = true
        })
        element.classList.add('correct')
    } else {         
        element.classList.add('wrong')

        scoreElement.innerHTML = `Score: ` + score + ` of 5`
    }  
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'What is 2*5', 
        answers: [
        { text: '10', correct: true},
        { text: '5', correct: false},
        { text: '6', correct: false}
        ]
    },
    {
        question: 'What is 4*5', 
        answers: [
            { text: '4', correct: false},
            { text: '20', correct: true},
            { text: '6', correct: false}
        ]
    }, 
    {
        question: 'What is 7*5', 
        answers: [
            { text: '4', correct: false},
            { text: '35', correct: true},
            { text: '6', correct: false}
        ]
    },
    {
        question: 'What is 2*3', 
        answers: [
            { text: '4', correct: false},
            { text: '5', correct: false},
            { text: '6', correct: true}
        ]
    },
    {
        question: 'What is 4*4', 
        answers: [
            { text: '4', correct: false},
            { text: '5', correct: false},
            { text: '16', correct: true}
        ]
    },
]