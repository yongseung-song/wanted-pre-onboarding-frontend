import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../App";
// import { useNavigate } from 'react-router-dom';
import Task from "./task";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const { logout } = useContext(AppContext);
  const jwtToken = localStorage.getItem("jwtToken");

  const fetchTasks = async (operation, taskData) => {
    let url = "https://www.pre-onboarding-selection-task.shop/todos";
    let method;
    let headers = {
      Authorization: `Bearer ${jwtToken}`,
    };
    let body;

    switch (operation) {
      case "create":
        method = "POST";
        headers["Content-Type"] = "application/json";
        body = JSON.stringify({
          todo: taskData.todo,
        });
        break;
      case "update":
        method = "PUT";
        url += `/${taskData.id}`;
        headers["Content-Type"] = "application/json";
        body = JSON.stringify({
          todo: taskData.todo,
          isCompleted: taskData.isCompleted,
        });
        break;
      case "delete":
        method = "DELETE";
        url += `/${taskData.id}`;
        break;
      default:
        method = "GET";
    }
    const response = await fetch(url, {
      method,
      headers,
      ...(body && { body }),
    });

    if (response.ok) {
      if (operation === "get") {
        const data = await response.json();
        setTasks(data);
        // console.log(data);
      } else if (operation === "delete") {
        return true;
      } else {
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          return data;
        }
      }
    } else {
      console.error("Error:", response.statusText);
    }
  };

  useEffect(() => {
    if (jwtToken) {
      fetchTasks("get");
    }
  }, []);

  const addTask = async (newTask) => {
    const createdTask = await fetchTasks("create", { todo: newTask });
    if (createdTask) {
      setTasks((prevTasks) => [...prevTasks, createdTask]);
    }
  };

  async function updateTask(taskData, updateType = "content", editedContent) {
    const updatedTaskData =
      updateType === "content"
        ? { ...taskData, todo: editedContent }
        : { ...taskData, isCompleted: !taskData.isCompleted };

    try {
      await fetchTasks("update", updatedTaskData);
      const updatedTasks = tasks.map((task) =>
        task.id === taskData.id ? updatedTaskData : task
      );
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  const deleteTask = async (id) => {
    const isDeleted = await fetchTasks("delete", { id });
    if (isDeleted) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    }
  };

  const handleNewTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleNewTaskSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      addTask(newTask);
      setNewTask("");
    }
  };

  return (
    <div className="container todo">
      <h1>ToDo List</h1>
      <form className="todo" onSubmit={handleNewTaskSubmit}>
        <input
          data-testid="new-todo-input"
          type="text"
          placeholder="새 할 일 입력하기..."
          value={newTask}
          onChange={handleNewTaskChange}
        />
        <button data-testid="new-todo-add-button" type="submit">
          추가
        </button>
      </form>
      <ul className="todo">
        {tasks.map((task) => (
          <Task
            key={task.id}
            taskData={task}
            onUpdate={updateTask}
            onDelete={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
}

export default Todo;
