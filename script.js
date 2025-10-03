/* ==========================================================
   Mastering JavaScript Fundamentals — script.js
   Covers:
   - Part 1: Variables, data types, operators, conditionals
   - Part 2: Functions (>= 2 custom)
   - Part 3: Loops (>= 2 examples)
   - Part 4: DOM (>= 3 interactions)
   ========================================================== */

// ---------- Utilities ----------
/** Title-case a string (Function #1) */
function toTitleCase(str = "") {
  return String(str)
    .toLowerCase()
    .replace(/\b[a-z]/g, (c) => c.toUpperCase());
}

/** Calculate total with tax from an array of numbers (Function #2) */
function calculateTotal(prices = [], taxPercent = 0) {
  let subtotal = 0;
  // Loop example #1 (for...of)
  for (const p of prices) {
    const num = Number(p) || 0;
    subtotal += num;
  }
  const total = subtotal * (1 + (Number(taxPercent) || 0) / 100);
  return Number(total.toFixed(2));
}

/** Make an element with classes and text */
function makeEl(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
}

// ---------- Part 1: Basics ----------
/**
 * Demonstrates variables, operators, and conditionals using user input.
 * Also updates the DOM (interaction #1: textContent update).
 */
function handleBasicsSubmit(e) {
  e.preventDefault();

  const nameInput = document.querySelector("#name");
  const ageInput = document.querySelector("#age");
  const out = document.querySelector("#basicsOutput");

  const nameRaw = nameInput.value.trim();
  const ageRaw = ageInput.value.trim();

  // Variables + data types
  let name = toTitleCase(nameRaw || "Friend"); // reuse function
  let age = Number(ageRaw);

  // Conditionals + operators
  let message;
  if (!ageRaw || Number.isNaN(age) || age < 0) {
    message = "Please enter a valid non-negative age.";
  } else if (age < 18) {
    message = `Hi ${name}, you are under 18.`;
  } else if (age === 18) {
    message = `Welcome ${name}! You're exactly 18 🎉`;
  } else {
    message = `Hello ${name}, age ${age}.`;
  }

  out.textContent = message;
  console.log({ name, age, typeOfName: typeof name, typeOfAge: typeof age });
}

// ---------- Part 2: Functions ----------
/**
 * Reads three item prices + tax, uses calculateTotal(), prints formatted total.
 */
function handleTotalSubmit(e) {
  e.preventDefault();
  const p1 = document.querySelector("#price1").value;
  const p2 = document.querySelector("#price2").value;
  const p3 = document.querySelector("#price3").value;
  const tax = document.querySelector("#tax").value;
  const out = document.querySelector("#totalOutput");

  const total = calculateTotal([p1, p2, p3], tax);
  out.textContent = `Total (incl. ${tax || 0}% tax): KSh ${total.toLocaleString()}`;
}

// ---------- Part 3: Loops ----------
/**
 * Builds a UL list from an array (DOM interaction #2: create + append).
 * Uses forEach (Loop example #2).
 */
function generateTechList() {
  const items = ["HTML", "CSS", "JavaScript", "DOM", "Flexbox", "Grid"];
  const list = document.querySelector("#listOutput");
  list.innerHTML = ""; // clear previous

  items.forEach((tech, idx) => {
    const li = makeEl("li", null, `${idx + 1}. ${tech}`);
    list.appendChild(li);
  });
}

/**
 * Simple countdown using a while loop (Loop example #3).
 * Updates DOM every 500ms (interaction #3: live updates).
 */
function startCountdown(start = 5) {
  const out = document.querySelector("#countdownOutput");
  let n = Number(start) || 5;

  out.textContent = `Countdown: ${n}`;
  const timer = setInterval(() => {
    n -= 1;
    out.textContent = `Countdown: ${n}`;
    if (n <= 0) {
      clearInterval(timer);
      out.textContent = "Liftoff! 🚀";
    }
  }, 500);
}

// ---------- Part 4: DOM ----------
/** Toggle theme by flipping a class on <body> (interaction #4: classList.toggle) */
function toggleTheme(btn) {
  const isDark = document.body.classList.toggle("dark");
  // ARIA pressed state for accessibility
  if (btn) btn.setAttribute("aria-pressed", String(isDark));
}

/** Add a dynamic “card” (interaction #5: create elements) */
function addCard() {
  const grid = document.querySelector("#cardGrid");
  const card = makeEl("article", "card");
  card.append(
    makeEl("h3", null, "Dynamic Card"),
    makeEl("p", null, "This card was created with JavaScript (DOM API).")
  );
  grid.appendChild(card);
}

/** Remove the last card if present (interaction #6: removeChild) */
function removeLastCard() {
  const grid = document.querySelector("#cardGrid");
  const last = grid.lastElementChild;
  if (last) grid.removeChild(last);
}

// ---------- Wire up events after DOM is ready ----------
document.addEventListener("DOMContentLoaded", () => {
  // Basics
  document.querySelector("#basicsForm").addEventListener("submit", handleBasicsSubmit);

  // Functions (total)
  document.querySelector("#totalForm").addEventListener("submit", handleTotalSubmit);

  // Loops
  document.querySelector("#btnGenerateList").addEventListener("click", generateTechList);
  document.querySelector("#btnCountdown").addEventListener("click", () => startCountdown(5));

  // DOM interactions
  const themeBtn = document.querySelector("#btnToggleTheme");
  themeBtn.addEventListener("click", () => toggleTheme(themeBtn));
  document.querySelector("#btnAddCard").addEventListener("click", addCard);
  document.querySelector("#btnRemoveCard").addEventListener("click", removeLastCard);
});
