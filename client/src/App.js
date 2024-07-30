import "./App.css";
import React, { useEffect } from "react";

function App() {
  const fetchData = async () => {
    const res = await fetch("http://localhost:4000/");
    console.log(res);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
      <div className="App">
        <header className="App-header">

          <div className="bg-blue-500 text-white p-4">
            This is a Tailwind CSS styled component.
          </div>

          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
  );
}

export default App;