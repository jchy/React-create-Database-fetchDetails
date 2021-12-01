import "./styles.css";
import { useState } from "react";
import axios from "axios";
import { TodoInput } from "./Components/TodoInput";
import { v4 as uuid } from "uuid";

const createTodo = (title) => {
  const payload = {
    title,
    status: false
  };

  const config = {
    url: "https://json-server-mocker-masai.herokuapp.com/tasks",
    method: "post",
    data: payload
  };
  return axios(config);
};
const getTodos = () => {
  const config = {
    url: "https://json-server-mocker-masai.herokuapp.com/tasks",
    method: "get"
  };
  return axios(config);
};

export default function App() {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);

  const handleGetTodos = () => {
    return getTodos()
      .then((res) => {
        console.log(res);
        setTodos(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // console.log(todos);

  const onSubmit = async (title) => {
    try {
      setLoading(true);
      await createTodo(title);
      await handleGetTodos();
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <TodoInput onSubmit={onSubmit} />
      {loading ? (
        <h3> ....Loading </h3>
      ) : (
        todos.map((item) => {
          return (
            <>
              <div key={uuid()}>
                <h3>{item.title}</h3>
                <h3>{item.status ? "Done" : "Pending"}</h3>
              </div>
            </>
          );
        })
      )}
    </div>
  );
}
