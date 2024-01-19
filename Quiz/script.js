/* --------------------------------------------------------------
   Author: Ananta Narayan Sethy
   Date: 19/01/2004
   Description: JavaScript logic for the quiz application.
   -------------------------------------------------------------- */



// JavaScript logic for the quiz application

// Variables
const userInfoContainer = document.getElementById('user-info');
const quizQuestionsContainer = document.getElementById('quiz-questions');
const resultContainer = document.getElementById('result-container');
const nameInput = document.getElementById('name');
const genderSelect = document.getElementById('gender');
const registrationInput = document.getElementById('registration'); // Updated for registration input
const questionContainer = document.getElementById('question-container');
const userScoreDisplay = document.getElementById('user-score');

let currentQuestionIndex = 0;
let userScore = 0;
let quizStarted = false; // Variable to track whether the quiz has started

// Quiz Questions
const questions = [
  {
    question: 'In 2023, which country became the first to officially launch a digital currency?',
    options: ['United States', 'China', 'India', 'Russia'],
    correctOption: 1,
  },
  {
    question: 'Who won the Nobel Prize in Literature in 2023?',
    options: ['Haruki Murakami', 'Chimamanda Ngozi Adichie', 'Salman Rushdie', 'Olga Tokarczuk'],
    correctOption: 3,
  },
  {
    question: 'What major sporting event was postponed in 2022 due to concerns about the COVID-19 pandemic?',
    options: ['UEFA Euro 2020', 'Tokyo 2020 Summer Olympics', 'FIFA World Cup 2022', 'Wimbledon 2022'],
    correctOption: 1,
  },
  {
    question: 'Which company became the first to reach a trillion-dollar valuation in 2024?',
    options: ['Amazon', 'Microsoft', 'Apple', 'Google'],
    correctOption: 2,
  },
  {
    question: 'In 2023, scientists discovered a new species of dinosaur. What was it named?',
    options: ['Titanoboa', 'Spinosaurus', 'Dreadnoughtus', 'Nessie-Rex'],
    correctOption: 3,
  },
  {
    question: 'Which country hosted the 2023 G20 summit?',
    options: ['United States', 'China', 'Germany', 'India'],
    correctOption: 2,
  },
  {
    question: 'What breakthrough technology was featured prominently in the news for revolutionizing quantum computing in 2023?',
    options: ['Graphene processors', 'Quantum entanglement', 'Photonic computing', 'Neuromorphic computing'],
    correctOption: 1,
  },
  {
    question: 'In 2023, a record-breaking mission sent humans to which celestial body for the first time?',
    options: ['Mars', 'Jupiter', 'Venus', 'Titan (Saturn\'s moon)'],
    correctOption: 3,
  },
  {
    question: 'Which environmental initiative was launched globally to combat climate change and protect biodiversity in 2022?',
    options: ['Green New Deal', 'Project Drawdown', 'The Great Green Wall', 'One Trillion Trees Initiative'],
    correctOption: 2,
  },
  {
    question: 'In 2023, a viral social media trend started the "Plant a Tree Challenge." Which platform was it most popular on?',
    options: ['Instagram', 'TikTok', 'Twitter', 'Facebook'],
    correctOption: 1,
  },
  // Add more questions as needed
];


// Function to start the quiz
function startQuiz() {
  const name = nameInput.value.trim();
  const gender = genderSelect.value;
  const registration = registrationInput.value.trim();

  if (!name || !registration) {
    alert('Please provide both name and registration number.');
    return;
  }

  userInfoContainer.style.transform = 'translateY(-100%)'; // Move user info window up
  quizQuestionsContainer.style.display = 'flex';
  document.body.style.backgroundImage = "url('background_quiz.jpg')"; // Change background image
  displayQuestion();

  // Set quizStarted to true to indicate that the quiz has started
  quizStarted = true;
}

// ... (your existing JavaScript code)

// Function to display a question
function displayQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  const optionsHTML = currentQuestion.options.map((option, index) => {
    return `<input type="radio" name="answer" value="${index}">${option}<br>`;
  }).join('');

  questionContainer.innerHTML = `
    <h3>${currentQuestion.question}</h3>
    ${optionsHTML}
    <button onclick="nextQuestion()">Next Question</button>
  `;
}

// ... (your existing JavaScript code)

// Function to move to the next question
function nextQuestion() {
  const selectedOption = document.querySelector('input[name="answer"]:checked');

  if (!selectedOption) {
    alert('Please select an answer');
    return;
  }

  const userAnswer = parseInt(selectedOption.value);
  const currentQuestion = questions[currentQuestionIndex];

  if (userAnswer === currentQuestion.correctOption) {
    userScore++;
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    displayQuestion();
  } else {
    showResult();
  }
}

// Function to calculate user score (replace this with your actual scoring logic)
function calculateUserScore() {
  // Replace this with your actual scoring logic
  return Math.floor(Math.random() * 11); // Example: Random score between 0 and 10
}

// Function to show result with message and animation
function showResult() {
  quizQuestionsContainer.style.display = 'none';
  resultContainer.style.display = 'block';

  // Calculate the user's score (replace this with your actual scoring logic)
  const userScore = calculateUserScore();

  // Display the score in a circle
  userScoreDisplay.innerHTML = `<div class="score-circle">${userScore}/10</div>`;

  // Display a message based on the user's score
  let message = '';
  if (userScore >= 8) {
    message = "You are awesome! Keep shining...";
  } else if (userScore >= 5) {
    message = "You did good! More hard work needed.";
  } else {
    message = "You need to study more. Get off your phone, you dumb!";
  }

  // Display the message with an animation
  showMessageWithAnimation(message);

  // Hide the login page if the quiz has started
  if (quizStarted) {
    userInfoContainer.style.display = 'none';
  }
}

// Function to show message with animation
function showMessageWithAnimation(message) {
  const messageContainer = document.createElement('div');
  messageContainer.className = 'message-container';
  messageContainer.textContent = message;

  resultContainer.appendChild(messageContainer);

  // Apply animation class after a short delay
  setTimeout(() => {
    messageContainer.classList.add('animate-message');
  }, 500);
}
