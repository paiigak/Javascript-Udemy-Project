// import css
import { useEffect, useState } from "react";
import "./style.css";
import supabase from "./supabase";

// const initialFacts = [
//   {
//     id: 1,
//     text: "React is being developed by Meta (formerly facebook)",
//     source: "https://opensource.fb.com/",
//     category: "technology",
//     votesInteresting: 24,
//     votesMindblowing: 9,
//     votesFalse: 4,
//     createdIn: 2021,
//   },
//   {
//     id: 2,
//     text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
//     source:
//       "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
//     category: "society",
//     votesInteresting: 11,
//     votesMindblowing: 2,
//     votesFalse: 0,
//     createdIn: 2019,
//   },
//   {
//     id: 3,
//     text: "Lisbon is the capital of Portugal",
//     source: "https://en.wikipedia.org/wiki/Lisbon",
//     category: "society",
//     votesInteresting: 8,
//     votesMindblowing: 3,
//     votesFalse: 1,
//     createdIn: 2015,
//   },
// ];

/*
// example of useState
// useState --> as we click --> react took value passed into setCount and update the count value --> update the count state will re-render entire component (re-render function)
function Counter() {
  const [count, setCount] = useState(0)
  console.log("rendering...");
  // console.log(useState(0)); // --> (2) [0, ƒ]
  
  // btn.AddEventListener('click', function()...)
  return (
  <div>
    <span style={{ fontSize: "40px" }}>{count}</span>
    <button className="btn btn-large" onClick={()=> setCount((c)=> c + 1)}></button>
    +1
  </div>
  )
}
*/

// do App() to uppercase letter react will know this is a component
// whenever we need to change on the screen --> re-render the screen --> has to updating state
function App() {
  // 1. define state variable
  const [showForm, setShowForm] = useState(false);
  // the data we gonna load from supabase will be stored inside the facts state
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("all");

  // useEffect use for run this function only for the firsttime
  // useEffect(function() {},[]) --> [] is what will ensure this function actually runs only the begining(first render) ex if we click share the post to updating the state --> data will not coming up but if we get rid of the array it will show data everytime state update
  useEffect(
    function () {
      //use async function with await always
      async function getFacts() {
        setIsLoading(true); // before fetch data

        // it is not load the data --> it build the query
        let query = supabase.from("facts").select("*");

        if (currentCategory !== "all")
          query = query.eq("category", currentCategory);

        const { data: facts, error } =
          // await supabase has use some times to get data from database
          // .order("text",{accending: true})--> adjust text top to bottom with a-z
          // .limit(1000) --> use to limit the facts not over 1000 the other to the next page
          // .select('*') --> select everythings in there
          // all .form,.select is query
          // .eq("category",currentCategory) --> set the category equal to currentCategory
          await query
            .order("votesInteresting", { accending: false })
            .limit(1000);
        // console.log(facts);

        // check the error
        if (!error) setFacts(facts);
        else alert("There was a problem getting data");
        setIsLoading(false); // after fetch data
      }
      getFacts();
    },
    [currentCategory]
  );
  // whem we click this button --> the function will execute again

  // just return one element from each component
  return (
    // <> = fragment --> JSX element which just not produce HTML output
    // <header></header> is JSX sybtax that react created not html class has to change to className
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />

      {/* <Counter /> --> example */}
      {/* link 2 comnponent together */}

      {/* null = nothing */}
      {/* 2. use state variable */}
      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}

      <main className="main">
        <CategoryFilter setCurrentCategory={setCurrentCategory} />
        {isLoading ? (
          <Loader />
        ) : (
          <FactList facts={facts} setFacts={setFacts} />
        )}
      </main>
    </>
  );
}

function Loader() {
  return <p className="message">Loading...</p>;
}

function Header({ showForm, setShowForm }) {
  const appTitle = "Today I Learned";
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" height="68" width="68" alt="Today I Learned Logo" />
        <h1>{appTitle}</h1>
      </div>
      <button
        className="btn btn-large btn-open"
        // 3. update state variable
        onClick={() => setShowForm((show) => !show)}
      >
        {showForm ? "close" : "Share a fact"}
      </button>
    </header>
  );
}

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

function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const textLength = text.length;

  async function handleSubmit(e) {
    // 1. Prevent browser reload
    e.preventDefault();
    console.log(text, source, category);

    // 2. Check if data is valid, If so, create a new fact
    if (text && isValidHttpUrl(source) && category && textLength <= 200) {
      // 3.(normal data) Create a new fact object
      // const newFact = {
      //   id: Math.round(Math.random() * 10000000),
      //   text, // text: text
      //   source,
      //   category,
      //   votesInteresting: 0,
      //   votesMindblowing: 0,
      //   votesFalse: 0,
      //   createdIn: new Date().getFullYear(),
      // }

      // 3.(instead) Upload fact to Supabase and recieve the new fact object
      setIsUploading(true);
      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([{ text, source, category }])
        .select();
      setIsUploading(false);

      // 4. Add the new fact to the UI: add the fact to state
      // sedtFact([]) // --> when add data and push post --> it will empty
      if (!error) setFacts((facts) => [newFact[0], ...facts]); // --> spread add newFact and the other will the same // newFact[0] --> add to supabase

      // 5. Reset input fields
      setText("");
      setSource("");
      setCategory("");
      //6. Close the form
      setShowForm(false);
    }
  }

  return (
    // handleSubmit === () => handleSubmit()
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Share a fact with the world..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={isUploading}
        // when input newFact and it is isUploading process we can add or delete in input --> disabled will help it
      />
      <span>{200 - textLength}</span>
      <input
        type="text"
        placeholder="Trustworthy source..."
        value={source}
        onChange={(e) => setSource(e.target.value)}
        disabled={isUploading}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        disabled={isUploading}
      >
        <option value="">Choose category:</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUploading}>
        Post
      </button>
    </form>
  );
}

function CategoryFilter({ setCurrentCategory }) {
  return (
    <aside>
      <ul>
        <li className="category">
          <button
            className="btn btn-all-categories"
            onClick={() => setCurrentCategory("all")}
          >
            All
          </button>
        </li>

        {CATEGORIES.map((cat) => (
          <li key={cat.name} className="category">
            <button
              className="btn btn-category"
              style={{ backgroundColor: cat.color }}
              onClick={() => setCurrentCategory(cat.name)}
            >
              {" "}
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function FactList({ facts, setFacts }) {
  if (facts.length === 0) {
    return (
      <p className="message">
        No facts for this category yet! Create the first one{" "}
      </p>
    );
  }

  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} setFacts={setFacts} />
        ))}
        {/* must has key */}
        {/* method-2 --> factObj={fact} */}
      </ul>
      <p>There are {facts.length} facts in the database. Add your own!</p>
    </section>
  );
}

// method-2 --> function Fact(props) {
function Fact({ fact, setFacts }) {
  // if we not use useState isUpdating with disabled(button) it can click multiple time and response will disabled
  // console.log(props); // --> {factObj: {each fact}} --> ex key={fact.id} will change to key={props.factObj.id} --> it will work

  // destruturing
  // method 2 --> const { factObj } = props // === const factObj = props.factObj

  const [isUpdating, setIsUpdating] = useState(false);
  const isDisputed =
    fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;

  async function handleVote(columnName) {
    setIsUpdating(true);
    const { data: updatedFact, error } =
      // first after .update --> we have totell supabase which fact should actually get updated(supabase will not know which all our facts is in the table should be the one to update) --> do .eq(eq filter) --> select the fact that we can also update our local facts state array
      await supabase
        .from("facts")
        .update({ [columnName]: fact[columnName] + 1 }) // if you did not do this it has to use 3 function for 3 button
        .eq("id", fact.id)
        .select();
    // console.log(updatedFact);
    setIsUpdating(false);
    if (!error)
      setFacts((facts) =>
        facts.map((f) => (f.id === fact.id ? updatedFact[0] : f))
      );
  }

  return (
    <li className="fact">
      <p>
        {isDisputed ? <span className="disputed">[⛔ DISPUTED]</span> : null}
        {fact.text}
        <a
          className="source"
          href={fact.source}
          target="_blank"
          rel="noreferrer"
        >
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: CATEGORIES.find((cat) => cat.name === fact.category)
            .color,
        }}
      >
        {fact.category}
      </span>
      <div className="vote-buttons">
        <button
          onClick={() => handleVote("votesInteresting")}
          disabled={isUpdating}
        >
          👍 {fact.votesInteresting}
        </button>
        <button
          onClick={() => handleVote("votesMindblowing")}
          disabled={isUpdating}
        >
          🤯 {fact.votesMindblowing}
        </button>
        <button onClick={() => handleVote("votesFalse")} disabled={isUpdating}>
          ⛔️ {fact.votesFalse}
        </button>
      </div>
    </li>
  );
}

// have to always export
export default App;
