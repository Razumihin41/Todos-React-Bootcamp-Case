import "./input.css";
import { useState } from "react";

function Input({ genericRequest, setIsLoading }) {

  const initialValue = "";
  const [inputNote, setInputNote] = useState(initialValue);

  const changeInput = (e) => {
    setInputNote(e.target.value);
  };

  const inputSubmit = (e) => {
    e.preventDefault();
    if (inputNote.trim() === "" || inputNote.trim().length < 3) {
      return false;
    };
    setInputNote(initialValue)
    setIsLoading(true);
    genericRequest(
      "post",
      "",
      { content: inputNote.trim(), isCompleted: false },
      { checked: true, title: "Successfully Saved", message: "Text added" },
    );
  };
  
  return (
    <form onSubmit={inputSubmit} className='header'>
      <input onChange={changeInput} value={inputNote} placeholder='Please add note!' />
      <button className="button">Add</button>
    </form>
  );
};

export default Input