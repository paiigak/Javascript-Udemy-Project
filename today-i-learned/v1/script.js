const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

// Selecting DOM elements
const btn = document.querySelector(".btn-open");
const form = document.querySelector(".fact-form");
const factsList = document.querySelector(".facts-list");

// Create DOM elements: Render facts in list
factsList.innerHTML = "";
// it function call mockup from initialFacts
// createImageBitmap(initialFacts)
// createFactsList([{text: 'Jonas'}])  --> if comment above only list with text = Jonas will appear only and other will be undefined

// Load data from Supabase
// use function
loadFacts()

// async use to get the promise we have to waiting
async function loadFacts () {
  // await --> it will now pause the excution of the code while below fecthing
  // fetch('use', {})
  const res = await fetch('https://umqjxfzauvzhmwuzxldr.supabase.co/rest/v1/facts', {
  //  headers will get sent along with API request
  headers: {
    apikey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtcWp4ZnphdXZ6aG13dXp4bGRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYzMjIyMjIsImV4cCI6MjAwMTg5ODIyMn0.BLXzzdDl4dj3k3THIGlbfkVx2bSLDOvFct4OhrWmb5s",
    // Bearer token --> mean you bear a token that can show to the server basically --> apikey add again after Bearer
    authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVtcWp4ZnphdXZ6aG13dXp4bGRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYzMjIyMjIsImV4cCI6MjAwMTg5ODIyMn0.BLXzzdDl4dj3k3THIGlbfkVx2bSLDOvFct4OhrWmb5s"

  }
})
// console.log(res); // --> get the promise --> future value a value we did not know yet --> this fetch has to take sometime

// it take some time the we have to use await keyword --> await use only for function that return promises
const data = await res.json()
// console.log(data);
// bring data which finish detching to function createFactsList
createFactsList(data)
}

function createFactsList(dataArray) {
  // factsList.insertAdjacentHTML("afterbegin", "<li>Jonas</li>"); --> insert element / afterbegin = when use it will show top of the list 

  const htmlArr = dataArray.map(
    (fact) => `<li class="fact">
    <p>
    ${fact.text}
      <a
        class="source"
        href="${fact.source}"
        target="_blank"
      >(Source)</a>
    </p>
    <span class="tag" style="background-color: ${
      // CATEGORIES.find return the first value / eg cat.name = society(from CATEGORIES.find) , fact.category = society (from htmlArr --> fetch data from supabase)
      CATEGORIES.find((cat) => cat.name === fact.category).color
    }">${fact.category}</span>
  </li>`
  );
  const html = htmlArr.join("");
  factsList.insertAdjacentHTML("afterbegin", html);
}

// Toggle form visibility
btn.addEventListener("click", function () {
  if (form.classList.contains("hidden")) {
    form.classList.remove("hidden");
    // use for change name of button
    btn.textContent = "Close"; 
  } else {
    form.classList.add("hidden");
    btn.textContent = "Share a fact";
  }
});

console.log([7, 64, 6, -23, 11].filter((el) => el > 10));
// .find will return the first value of that array
console.log([7, 64, 6, -23, 11].find((el) => el > 10));

/*

let votesInteresting = 23;
let votesMindlowing = 5;
const text = "Lisbon is the capital of Portugal";

votesInteresting = votesInteresting + 1;
votesInteresting++;
console.log(votesInteresting);

let totalUpvotes = votesInteresting + votesMindlowing;
console.log("Upvotes:", totalUpvotes);

let votesFalse = 4;
const isCorrect = votesFalse < totalUpvotes;
console.log(isCorrect);

console.log(parseInt("24.533ccc"));
*/

/*
function calcFactAge(year) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - year;

  if (age >= 0) return age;
  else return `Impossible year. Year needs to be less or equal ${currentYear}`;
}

const age1 = calcFactAge(2015);
console.log(age1);
console.log(calcFactAge(2020));
console.log(calcFactAge(2037));

// const calcFactAge2 = (year) => 2022 - year;
const calcFactAge2 = (year) =>
  year <= new Date().getFullYear()
    ? new Date().getFullYear() - year
    : `Impossible year. Year needs to be less or equal ${new Date().getFullYear()}`;

console.log(calcFactAge2(2015));
console.log(calcFactAge2(2037));
*/

/*
let votesInteresting = 20;
let votesMindlowing = 5;

if (votesInteresting === votesMindlowing) {
  alert("This fact is equally interesting and mindblowing");
} else if (votesInteresting > votesMindlowing) {
  console.log("Intersting fact!");
} else if (votesInteresting < votesMindlowing) {
  console.log("Mindblowing fact!!");
}

// falsy values: 0, '', null, undefined
// truthy value: everything else...
if (votesMindlowing) {
  console.log("MINDBLOWING FACT!!!");
} else {
  console.log("Not so special...");
}

let votesFalse = 7;
const totalUpvotes = votesInteresting + votesMindlowing;

const message =
  totalUpvotes > votesFalse
    ? "The fact is true"
    : "Might be false, check more sources...";
// alert(message);

const text = "Lisbon is the capital of Portugal";
const upperText = text.toUpperCase();
console.log(upperText);

const str = `The current fact is "${text}". It is ${calcFactAge(
  2015
)} years old. It is probably ${
  totalUpvotes > votesFalse ? "correct" : "not true"
}.`;
console.log(str);
*/

/*
const fact = ["Lisbon is the capital of Portugal", 2015, true];
console.log(fact[2]);
console.log(fact.length);
console.log(fact[fact.length - 1]);

// create 3 variable in the same tine --> destructuring
const [text, createdIn] = fact;
// spreading --> ...fact = unpack this outsite the array
const newFact = [...fact, "society"];
console.log(newFact);

const factObj = {
  text: "Lisbon is the capital of Portugal",
  category: "society",
  createdIn: 2015,
  isCorrect: true,
  createSummary: function () {
    return `The fact "${
      this.text
    }" is from the category ${this.category.toUpperCase()}`;
  },
};

console.log(factObj.text);
console.log(factObj["text"]);

// retrieves 2 property from factObj and stored in these two variable
const { category, isCorrect } = factObj;
console.log(category);
console.log(factObj.createSummary());

// [2, 4, 6, 8].forEach(function (el) {
//   console.log(el);
// });

// const times10 = [2, 4, 6, 8].map(function (el) {
//   return el * 10;
// });
const times10 = [2, 4, 6, 8].map((el) => el * 10);
console.log(times10);

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

const allCategories = CATEGORIES.map((el) => el.name);
console.log(allCategories);

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

function calcFactAge(year) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - year;

  if (age >= 0) return age;
  else return `Impossible year. Year needs to be less or equal ${currentYear}`;
}

const factAges = initialFacts.map((el) => calcFactAge(el.createdIn));
console.log(factAges);
console.log(factAges.join("-"));
*/
