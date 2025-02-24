import './reset.css';
import './App.css';
import { useState } from 'react';

function TaskListItem({ task, remove_task, check_single_task, update_single_task }) {

  const [focused, setFocused] = useState(false);
  const [name, setName] = useState(task.name)

  return (
    <li className="todo-item-container">
      <div className="todo-item">
        <input type="checkbox" checked={task.isCompleted} onChange={() => check_single_task(task.id)} />
        {focused ?
          (<input
            type="text"
            className="todo-input"
            value={name}
            onBlur={() => {
              update_single_task(name, task.id)
              setFocused(false);
            }}
            onChange={(e) => setName(e.target.value)}
          />
          ) :
          (<span
            onClick={() => setFocused(true)}
            className={`todo-item-label ${task.isCompleted ? "completed-todo-item" : ""}`}>
            {name}
          </span>
          )
        }
        {/* <input type="text" className="todo-item-input" value="Finish React Series" /> */}
      </div>
      <button className="x-button" onClick={() => remove_task(task.id)}>
        <svg
          className="x-button-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </li>
  )

}


function App() {

  const [taskList, setTaskList] = useState([]);
  const [task_input, setTaskInput] = useState('');
  const [renderFiliter, setRenderFiliter] = useState('All');
  console.log(taskList)



  function add_task(e) {
    e.preventDefault();
    if (task_input === '') return;

    let new_task = {
      name: task_input,
      isCompleted: false,
      id: Number(Math.floor(Math.random() * 1000).toString() + taskList.length.toString())
    };
    setTaskList([...taskList, new_task]);
  }

  function remove_task(delete_task_id) {
    setTaskList(taskList.filter(task => task.id !== delete_task_id));
  }

  function check_single_task(check_task_id) {
    setTaskList(taskList.map(value => (value.id === check_task_id) ? { ...value, isCompleted: !value.isCompleted } : value
    ));
  };


  function update_single_task(updated_value, update_task_id) {
    setTaskList(taskList.map(value => (value.id === update_task_id) ? { ...value, name: updated_value } : value
    ));
  }

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>
        <form action="#" onSubmit={add_task}>
          <input
            type="text"
            className="todo-input"
            placeholder="What do you need to do?"
            value={task_input}
            onChange={(e) => setTaskInput(e.target.value)}
          />
        </form>

        <ul className="todo-list">
          {
            taskList.filter(task => {
              if (renderFiliter === 'All') return true;
              else if (renderFiliter === 'Active' && task.isCompleted === false) return true;
              else if (renderFiliter === 'Completed' && task.isCompleted === true) return true;
              return false;
            }).map((task, index) => {
              return <TaskListItem key={task.id} task={task} remove_task={remove_task} check_single_task={check_single_task} update_single_task={update_single_task} />
            })}
        </ul>

        <div className="check-all-container">
          <div>
            <div className="button" onClick={() => setTaskList(taskList.map(value => { return { ...value, isCompleted: true } }))}>
              Check All
            </div>
          </div>

          <span>{taskList.filter(task => task.isCompleted === false).length} items remaining</span>
        </div>

        <div className="other-buttons-container">
          <div>
            <button
              className={`button filter-button ${(renderFiliter === 'All') ? "filter-button-active" : ''}`}
              onClick={() => setRenderFiliter('All')}
            >
              All
            </button>
            <button
              className={`button filter-button ${(renderFiliter === 'Active') ? "filter-button-active" : ''}`}
              onClick={() => setRenderFiliter('Active')}
            >Active
            </button>
            <button
              className={`button filter-button ${(renderFiliter === 'Completed') ? "filter-button-active" : ''}`}
              onClick={() => setRenderFiliter('Completed')}
            >Completed
            </button>
          </div>
          <div>
            <button className="button" onClick={() => {
              setTaskList(
                taskList.filter(task => task.isCompleted === false))
            }}>Clear completed</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default App;
