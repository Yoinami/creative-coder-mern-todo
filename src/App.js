import './reset.css';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import TaskInput from './component/TaskInput';
import TaskList from './component/TaskList';
import CheckAllAndRemaining from './component/CheckAllAndRemaining';
import FiliterTask from './component/FiliterTask';


function App() {

  let nameRef = useRef();
  const [taskList, setTaskList] = useState([]);
  const [renderFiliter, setRenderFiliter] = useState('All');

  useEffect(() => {
    fetch("http://localhost:3001/todo")
      .then(res => res.json())
      .then(taskLs => {
        setTaskList(taskLs);
        console.log(taskLs);
      });
  }, [])

  function add_task(e) {
    e.preventDefault();
    if (nameRef.current.value === '') return;

    let new_task = {
      name: nameRef.current.value,
      isCompleted: false,
      id: toString(Math.floor(Math.random() * 1000).toString() + taskList.length.toString())
    };

    //Server site
    fetch("http://localhost:3001/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(new_task)
    }).then(res => {
      //Client site
      setTaskList([...taskList, new_task]);
      nameRef.current.value = '';
    });
  }

  function remove_task(delete_task_id) {
    //server side
    fetch(`http://localhost:3001/todo/${delete_task_id}`, {
      method: "DELETE"
    })
    //client side
    setTaskList(taskList.filter(task => task.id !== delete_task_id));
  }

  function update_single_task(task) {
    //server side
    fetch(`http://localhost:3001/todo/${task.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(task)
    }).then(res => {
      //Client site
      setTaskList(taskList.map(value => (value.id === task.id) ? task : value));
    });
  }

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <TaskInput add_task={add_task} nameRef={nameRef} />
        <TaskList taskList={taskList} renderFiliter={renderFiliter} remove_task={remove_task} update_single_task={update_single_task} />
        <CheckAllAndRemaining taskList={taskList} setTaskList={setTaskList} />

        <FiliterTask taskList={taskList} setTaskList={setTaskList} setRenderFiliter={setRenderFiliter} renderFiliter={renderFiliter} />
      </div>
    </div>
  );
};
export default App;
