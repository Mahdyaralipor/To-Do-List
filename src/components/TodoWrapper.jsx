import React, { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./EditTodoForm";

export const TodoWrapper = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterLabel, setFilterLabel] = useState("");

  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo, label) => {
    if (todo.trim() !== "") {
      setTodos([
        ...todos,
        { id: uuidv4(), task: todo, completed: false, isEditing: false, label },
      ]);
    }
  };

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, label, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, task, label, isEditing: !todo.isEditing }
          : todo
      )
    );
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterLabel(event.target.value);
  };

  // Filtered todos based on search query and label
  const filteredTodos = todos.filter(
    (todo) =>
      todo.task.toLowerCase().includes(searchQuery.toLowerCase()) &&
      todo.label.toLowerCase().includes(filterLabel.toLowerCase())
  );

  return (
    <div className="TodoWrapper">
      <h1>Task Manager</h1>
      <select
        value={filterLabel}
        onChange={handleFilterChange}
        className="todo-select"
      >
        <option value="">Alll</option>
        <option value="on">on</option>
        <option value="off">off</option>
      </select>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search tasks..."
        className="todo-input"
      />

      <TodoForm addTodo={addTodo} />

      {filteredTodos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
            toggleComplete={toggleComplete}
          />
        )
      )}
    </div>
  );
};

export default TodoWrapper;
