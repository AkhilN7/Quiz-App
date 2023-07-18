"use strict";
let score = 0;
let scoremap = new Map();
const originalcontent = document.querySelector(".one").innerHTML;
console.log(originalcontent);
const questions = [
  {
    questionText: "Commonly used data types DO NOT include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts",
  },
  {
    questionText: "Arrays in JavaScript can be used to store ______.",
    options: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    answer: "4. all of the above",
  },
  {
    questionText:
      "String values must be enclosed within _____ when being assigned to variables.",
    options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "3. quotes",
  },
  {
    questionText:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    answer: "4. console.log",
  },
  {
    questionText:
      "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
    options: ["1. break", "2. stop", "3. halt", "4. exit"],
    answer: "1. break",
  },
];
const [question1, question2, question3, question4] = [...questions];
function displayQuestion(question) {
  const one = document.querySelector(".one");
  const [option1, option2, option3, option4] = [...question.options];
  one.innerHTML = `<p>${question.questionText}</p>
  <input type="radio" class="ans" id="option1" name="answer" data-index="1" value="${option1}">
  <label for="option1">${option1}</label><br>
  <input type="radio" class="ans" id="option2" name="answer" data-index="2" value="${option2}">
  <label for="option2">${option2}</label><br>
  <input type="radio" class="ans" id="option3" name="answer" data-index="3" value="${option3}">
  <label for="option3">${option3}</label><br>
  <input type="radio" class="ans" id="option4" name="answer" data-index="4" value="${option4}">
  <label for="option4">${option4}</label><br>
                   `;
}
let startclicked = false;
let currentIndex = 0;
document.querySelector(".start").addEventListener("click", function (e) {
  e.preventDefault();
  //const [question1] = questions;
  displayQuestion(questions[currentIndex]);
  startclicked = !startclicked;
});

document.querySelector(".submit").addEventListener("click", function (e) {
  e.preventDefault();
  currentIndex++;
  if (currentIndex < questions.length) {
    displayQuestion(questions[currentIndex]);
  } else {
    document.querySelector(".one").innerHTML = `<h1>Test is finished!!</h1>
    <h3> Score:${score}</h3>
    <label for="fname">First name:</label>
<input type="text" class="fname" name="fname">
<button class="ok"> OK</button>
<button class="reset"> Reset</button>`;
  }
});
function printcheckedradiovalue() {
  let ele = document.getElementsByName("answer");
  for (let i = 0; i < ele.length; i++) {
    //console.log(ele[i].value);
    if (ele[i].checked && ele[i].value === questions[currentIndex].answer) {
      console.log(ele[i].value === questions[currentIndex].answer);
      score += 5;
    } else if (
      ele[i].checked &&
      ele[i].value !== questions[currentIndex].answer
    ) {
      console.log(false);
    }
  }
}
function displayhighscore(e) {
  //document.querySelector(".one").innerHTML = "<h1> Highscores </h1>";
  let scorehtml = "";
  scoremap.forEach((value, key) => {
    scorehtml += `<p> ${key} : ${value}`;
  });
  document.querySelector(".one").innerHTML = `<h1> Highscores </h1>
                                            <p> ${scorehtml} </p>
                                            <button class="fullclean"> clear </button>`;
}

function clearListener() {
  //e.preventDefault();
  document.querySelector(".fullclean").addEventListener("click", function () {
    scoremap.clear();
    console.log(scoremap.size);
    document.querySelector(".one").innerHTML = originalcontent;
    score = 0;
    currentIndex = 0;
    document.querySelector(".start").addEventListener("click", function () {
      displayQuestion(questions[currentIndex]);
    });
  });
}
document.querySelector("#leaderboard").addEventListener("click", function (e) {
  e.preventDefault();
  displayhighscore();
  //console.log(e.target.classList.contains("clear"));
  // document.querySelector(".clear").addEventListener(function () {
  //   scoremap.clear();
  //   console.log(scoremap.size);
  // });
  clearListener();
});
document.querySelector(".one").addEventListener("click", function (e) {
  if (e.target.tagName === "INPUT" && e.target.classList.contains("ans")) {
    console.log("Radio button with class 'ans' is clicked");
  }
  printcheckedradiovalue();
  if (e.target.classList.contains("ok")) {
    //console.log(document.querySelector(".fname").value);
    let name = document.querySelector(".fname").value;
    scoremap.set(name, score);
    console.log(scoremap);
    //score = 0;
    document.querySelector(".ok").addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Name submitted");
      currentIndex = 0;
      //displayQuestion(questions[currentIndex]);
      // if (e.target.classList.contains(".reset"))
      //   console.log("reset class present");
    });
  }

  document.querySelector(".reset").addEventListener("click", function (e) {
    //console.log("reset class present");
    document.querySelector(".one").innerHTML = originalcontent;
    score = 0;
    currentIndex = 0;
    document.querySelector(".start").addEventListener("click", function (e) {
      displayQuestion(questions[currentIndex]);
    });
  });
  clearListener();
});
// if (document.querySelector(".one").classList.contains("clear")) {
//   // document.querySelector(".clear").addEventListener("click", function (e) {
//   //   scoremap.clear();
//   //   console.log(scoremap.size);
//   //   document.querySelector(".one").innerHTML = originalcontent;
//   // });
//   console.log(
//     document.querySelector(".one").classList.contains("clear")
//       ? "present"
//       : "not present"
//   );
// }

// function display(question) {
//   console.log(question[0].questionText);
// }
// display(questions);
