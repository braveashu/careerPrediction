// //quiz.js
// document.addEventListener("DOMContentLoaded", function () {
//   const quizForm = document.getElementById("quiz-form");
//   const quizResults = document.getElementById("quiz-results");

//   quizForm.addEventListener("submit", function (e) {
//     e.preventDefault();

//     const formData = new FormData(quizForm);
//     const answers = {};

//     for (const [name, value] of formData) {
//       answers[name] = value;
//     }

//     // const correctAnswers = {
//     //   Q1: "True",
//     //   Q2: "Flase",
//     //   Q3: "Flase",
//     //   Q4: "True",
//     //   Q5: "True",
//     //   Q6: "True",
//     //   Q7: "True",
//     //   Q8: "Flase",
//     //   Q9:"True",
//     //   Q10:"True"
//     // };

//     let score = 0;
//     for (const question in correctAnswers) {
//       if (answers[question] === "True") {
//         score++;
//       }
//     }
//     if (score >= 0 && score <= 4) {
//       score = 0;
//     } else if (score >= 5 && score <= 7) {
//       score = 1;
//     } else {
//       score = 2;
//     }

//     // Map the score based on your requirements (0-4, 5-7, 8-10, etc.)
//     // ...

//     // Display the result
//    // quizResults.innerHTML =`<p>Hello, ${answers.username}Your score is: ${score}</p>`;

//     const dataToSend = {
//       username: answers.username,
//       score: score,
//     };
//     const jsonData = JSON.stringify(dataToSend);
//     sendData(jsonData);
//   });
// });

// const sendData = (data) => {
//   console.log(data);
//   fetch("http://localhost:30008/submit-quiz", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: data,
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     })
//     .then((data) => {
//       console.log("Success:", data);
//       window.location.replace(`/work.html`);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// };