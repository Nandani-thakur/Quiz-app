const quizData = [
    {
      question: "What is the capital of France?",
      answers: [
        { text: "Paris", correct: true },
        { text: "London", correct: false },
        { text: "Berlin", correct: false },
        { text: "Madrid", correct: false }
      ]
    },
    {
      question: "Which planet is known as the Red Planet?",
      answers: [
        { text: "Earth", correct: false },
        { text: "Mars", correct: true },
        { text: "Jupiter", correct: false },
        { text: "Venus", correct: false }
      ]
    },
    {
      question: "Who wrote 'To Kill a Mockingbird'?",
      answers: [
        { text: "Harper Lee", correct: true },
        { text: "J.K. Rowling", correct: false },
        { text: "Ernest Hemingway", correct: false },
        { text: "Jane Austen", correct: false }
      ]
    },
    {
      question: "What is the smallest prime number?",
      answers: [
        { text: "1", correct: false },
        { text: "2", correct: true },
        { text: "3", correct: false },
        { text: "5", correct: false }
      ]
    },
    {
      question: "In which year did the Titanic sink?",
      answers: [
        { text: "1912", correct: true },
        { text: "1911", correct: false },
        { text: "1905", correct: false },
        { text: "1920", correct: false }
      ]
    },
    {
      question: "Which element has the chemical symbol 'O'?",
      answers: [
        { text: "Oxygen", correct: true },
        { text: "Gold", correct: false },
        { text: "Osmium", correct: false },
        { text: "Oganesson", correct: false }
      ]
    },
    {
      question: "What is the largest mammal in the world?",
      answers: [
        { text: "Elephant", correct: false },
        { text: "Blue Whale", correct: true },
        { text: "Giraffe", correct: false },
        { text: "Orca", correct: false }
      ]
    },
    {
      question: "Which country hosted the 2016 Summer Olympics?",
      answers: [
        { text: "China", correct: false },
        { text: "Brazil", correct: true },
        { text: "Russia", correct: false },
        { text: "United Kingdom", correct: false }
      ]
    },
    {
      question: "Who painted the Mona Lisa?",
      answers: [
        { text: "Vincent van Gogh", correct: false },
        { text: "Leonardo da Vinci", correct: true },
        { text: "Pablo Picasso", correct: false },
        { text: "Claude Monet", correct: false }
      ]
    },
    {
      question: "What is the most abundant gas in the Earth's atmosphere?",
      answers: [
        { text: "Oxygen", correct: false },
        { text: "Hydrogen", correct: false },
        { text: "Carbon Dioxide", correct: false },
        { text: "Nitrogen", correct: true }
      ]
    }
  ];
  

const questionElement = document.querySelector("#question");
const answerElements = document.querySelector(".answer_button");
const nextbtn = document.querySelector("#next_button");

let currentQuestionIndex = 0;
let score = 0;
let isQuizFinished = false;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  isQuizFinished = false;
  nextbtn.textContent = "NEXT";
  showQuiz();
}

function showQuiz() {
  const currentQuestion = quizData[currentQuestionIndex];
  const questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;
  answerElements.innerHTML = "";
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    answerElements.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
  nextbtn.style.display = "none"; // Hide the next button until an answer is selected
}

function selectAnswer(e) {
  const selectBtn = e.target;
  const isCorrect = selectBtn.dataset.correct === "true";

  if (isCorrect) {
    selectBtn.classList.add("correct");
    score++;
  } else {
    selectBtn.classList.add("incorrect");
  }

  Array.from(answerElements.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextbtn.style.display = "block"; // Show the next button after an answer is selected
}

function handleNextQuestion() {
  if (isQuizFinished) {
    // Restart the quiz
    startQuiz();
  } else {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
      showQuiz();
    } else {
      // Quiz is finished
      questionElement.innerHTML = `Quiz Over! Your score is ${score}/${quizData.length}`;
      answerElements.innerHTML = "";
      nextbtn.textContent = "PLAY AGAIN"; // Change button text to "Play Again"
      isQuizFinished = true; // Set quiz finished flag
    }
  }
}

nextbtn.addEventListener("click", handleNextQuestion);

// Start the quiz when the page loads
startQuiz();