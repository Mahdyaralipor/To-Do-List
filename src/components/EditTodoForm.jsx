import React, {useState} from 'react'

export const EditTodoForm = ({editTodo, task}) => {
    const [value, setValue] = useState(task.task);
    const [label, setLabel] = useState(task.label);
    

    const handleSubmit = (e) => {
      // prevent default action
        e.preventDefault();
        // edit todo
        editTodo(value, label, task.id);


      };
  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <select value={label} onChange={(e) => setLabel(e.target.value)} className='todo-select'>
        <option value="normal">Normal</option>
        <option value="important">Important</option>
        <option value="very important">Very Important</option>
      </select>
    <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="todo-input" placeholder='Update task' />
    <button type="submit" className='todo-btn'>Edit Task</button>
  </form>
  )
}

export default EditTodoForm