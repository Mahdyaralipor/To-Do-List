import React, {useState} from 'react'

export const TodoForm = ({addTodo}) => {
    const [value, setValue] = useState('');
    const [label, setLabel] = useState('Normal');
    const handleSubmit = (e) => {
      // prevent default action
        e.preventDefault();
        if (value || label) {
          // add todo
          addTodo(value, label);
          // clear form after submission
          setValue('');
          setLabel('Normal');
        }
      };
  return (
    <form onSubmit={handleSubmit}  className="TodoForm">
      <select value={label} onChange={(e) => setLabel(e.target.value)} className='todo-select'>
        <option value="normal">Normal</option>
        <option value="important">Important</option>
        <option value="very important">Very Important</option>
      </select>
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} className="todo-input" placeholder='What is the task today?' />
      <button type="submit" className='todo-btn'>Add Task</button>

    </form>
  )
}
export default TodoForm
