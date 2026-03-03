// ==============================
// General JS (shared on all pages)
// ==============================

document.addEventListener("DOMContentLoaded", () => {
    // Set current year in footer
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  
    // Initialize page-specific features
    setupResourceSearch();
    setupQuiz();
    setupContactForm();
    setupDarkMode();
  });
  
  // ==============================
  // Resources Page: Search Feature
  // ==============================
  
  /*
    How it works:
    - The search bar with id "resource-search" listens for typing.
    - It looks at all elements with class "resource-card".
    - If the card's title matches the search text, it stays visible; otherwise it hides.
  
    To make a new card searchable:
    - Give it the class "resource-card".
    - Set "data-title" with a short, clear title (or it will use the heading text).
  */
  function setupResourceSearch() {



    const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");

    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    resourceCards.forEach(card => {
      const subject = card.getAttribute("data-subject");

      if (filter === "all" || subject === filter) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  });
});



    const searchInput = document.getElementById("resource-search");
    if (!searchInput) return; // Not on resources page
  
    const resourceCards = Array.from(document.querySelectorAll(".resource-card"));
  
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.trim().toLowerCase();
  
      resourceCards.forEach((card) => {
        // Use data-title if available, otherwise use the card's text
        const titleAttr = card.getAttribute("data-title") || "";
        const cardText = (titleAttr || card.textContent).toLowerCase();
  
        if (cardText.includes(query)) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });
    });
  }
  
  // ==============================
  // Quiz Page: Simple MCQ Quiz
  // ==============================
  
  /*
    How it works:
    - The form with id "quiz-form" contains questions (q1, q2, ...).
    - When you submit, JS compares the chosen answers with "correctAnswers".
    - It shows your score in the element with id "quiz-result".
  
    To UPDATE or ADD questions:
    1. In quiz.html:
       - Add/edit question blocks and ensure each input has the correct "name"
         like q1, q2, q3, etc.
    2. Below, update the "correctAnswers" object so each question (q1, q2...) has
       its correct option value (a, b, c, ...).
  */
  
  function setupQuiz() {
    const quizForm = document.getElementById("quiz-form");
    if (!quizForm) return; // Not on quiz page
  
    const resultDiv = document.getElementById("quiz-result");
  
    // List correct answers here (key = question name, value = correct option value)
    const correctAnswers = {
      q1: "c", // 5 + 7 = 12
      q2: "b", // Carbon dioxide
      q3: "b", // Receive
      q4: "a", // CPU
      q5: "c", // Solar energy
    };
  
    quizForm.addEventListener("submit", (event) => {
      event.preventDefault();
  
      let score = 0;
      let totalQuestions = Object.keys(correctAnswers).length;
  
      Object.keys(correctAnswers).forEach((questionName) => {
        const selected = quizForm.querySelector(
          `input[name="${questionName}"]:checked`
        );
        if (selected && selected.value === correctAnswers[questionName]) {
          score++;
        }
      });
  
      if (resultDiv) {
        const percentage = Math.round((score / totalQuestions) * 100);
localStorage.setItem("lastQuizScore", percentage);

resultDiv.textContent =
  `You scored ${score} out of ${totalQuestions} (${percentage}%).`;
      }
    });
  }
  
  // ==============================
  // Contact Page: Simple Validation
  // ==============================
  
  /*
    How it works:
    - The form with id "contact-form" is validated in the browser, no server needed.
    - Checks that:
      * Name is not empty
      * Email looks like a basic email (has "@" and ".")
      * Message is not empty
    - If everything is OK, it shows a success message and clears the form.
  
    To CHANGE validation:
    - Edit the checks inside handleContactSubmit().
  */
  function setupContactForm() {
    const contactForm = document.getElementById("contact-form");
    if (!contactForm) return; // Not on contact page
  
    const messagePara = document.getElementById("contact-message");
  
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();
      handleContactSubmit(contactForm, messagePara);
    });
  }
  
  function handleContactSubmit(form, messageElement) {
    const nameInput = form.querySelector("#name");
    const emailInput = form.querySelector("#email");
    const messageInput = form.querySelector("#message");
  
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();
  
    // Basic email check: contains "@" and "."
    const emailLooksValid = email.includes("@") && email.includes(".");
  
    let errorMessage = "";
  
    if (!name) {
      errorMessage = "Please enter your name.";
    } else if (!email) {
      errorMessage = "Please enter your email address.";
    } else if (!emailLooksValid) {
      errorMessage = "Please enter a valid email address.";
    } else if (!message) {
      errorMessage = "Please enter a message.";
    }
  
    if (errorMessage) {
      if (messageElement) {
        messageElement.textContent = errorMessage;
        messageElement.classList.remove("success");
        messageElement.classList.add("error");
      }
      return;
    }
  
    // If no errors, show success message
    if (messageElement) {
      messageElement.textContent =
        "Thank you! Your message has been received (demo only, no email sent).";
      messageElement.classList.remove("error");
      messageElement.classList.add("success");
    }
  
    // Clear form fields
    form.reset();
  }





  function setupDarkMode() {
    const toggleBtn = document.getElementById("darkModeToggle");
    if (!toggleBtn) return;
  
    // Load saved preference
    if (localStorage.getItem("darkMode") === "enabled") {
      document.body.classList.add("dark-mode");
    }
  
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
  
      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
      } else {
        localStorage.removeItem("darkMode");
      }
    });
  }






