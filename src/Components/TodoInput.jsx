import { useState } from "react";

export const TodoInput = ({ onSubmit }) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    onSubmit && onSubmit(text);
    setText("");
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      <input placeholder="...Enter the task" onChange={handleChange} />
      <button onClick={handleSubmit}>SUBMIT</button>
    </div>
  );
};
