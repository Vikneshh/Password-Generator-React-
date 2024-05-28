import { useState, useCallback, useEffect, useRef } from "react";
const App = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charactersAllowed, setCharactersAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // To highlight the text we are using the useRef Hook.
  const passwordRef = useRef(null);

  // Using the usecallback for the memoization techniques.
  const generatePassword = useCallback(() => {
    let pass = "";
    let string = "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM";
    if (numberAllowed) {
      string += "1234567890";
    }
    if (charactersAllowed) {
      string += "!@#$%^&*()[]{}/?|";
    }
    for (let i = 0; i <= length; i++) {
      let value = string[Math.floor(Math.random() * string.length)];
      pass += value;
    }
    setPassword(pass);
  }, [length, numberAllowed, charactersAllowed]);

  // Run this generate password method whenever the dependency array changes and also when we come to the webpage.

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charactersAllowed]);

  // Copying the password to the clipboard

  const copyPassword = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select()
  };

  return (
    <div className="container">
      <h1>Password Generator</h1>
      <div className="inputContainer">
        <input
          type="text"
          className="input"
          value={password}
          ref={passwordRef}
          readOnly
        />
        <button className="btn" onClick={copyPassword}>
          Copy
        </button>
      </div>
      <div className="modificationsContainer">
        <div>
          <input
            type="range"
            name=""
            id="range"
            className="rangeInput"
            min={6}
            max={25}
            value={length}
            onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="range">Length:{length}</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="check1"
            className="check1"
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="check1">Include Numbers</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="check2"
            className="check2"
            defaultChecked={charactersAllowed}
            onChange={() => {
              setCharactersAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="check2">Include Characters</label>
        </div>
      </div>
    </div>
  );
};

export default App;
