import "./input.css";
import { useState, useEffect } from "react";

function Input({ notes, setNotes, genericRequest }) {

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
    setNotes([...notes,
    {
      content: inputNote.trim(),
      isCompleted: false,
      id: notes.length === 0 ?
        "1" : (Number(notes[notes.length - 1].id) + 1).toString(),
    }
    ]);
    genericRequest(
      "post",
      "",
      { content: inputNote.trim(), isCompleted: false },
      { checked: true, title: "Successfully Saved", message: "Text added" },
    );
  };

  useEffect(() => {
    setInputNote(initialValue);
  }, [notes]);

  return (
    <form onSubmit={inputSubmit} className='header'>
      <input onChange={changeInput} value={inputNote} placeholder='Please add note!' />
      <button className="button">Add</button>
    </form>
  );
};

export default Input