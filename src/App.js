import './reset.css';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import useFetch from './hooks/useFetch';
import TaskInput from './component/TaskInput';
import TaskList from './component/TaskList';
import CheckAllAndRemaining from './component/CheckAllAndRemaining';
import FiliterTask from './component/FiliterTask';


function App() {

  const [taskList, setTaskList] = useState([]);
  let nameRef = useRef();
  const [renderFiliter, setRenderFiliter] = useState('All');

  let { data } = useFetch("http://localhost:3001/todo");
  console.log(data);

  useEffect(() => {
    if (data) {
      setTaskList(data);
      console.log("inside the if statement" + data.toString());
    };
  }, [data])

  function add_task(e) {
    e.preventDefault();
    if (nameRef.current.value === '') return;


    let new_task = {
      name: nameRef.current.value,
      isCompleted: false,
      id: Number(Math.floor(Math.random() * 1000).toString() + taskList.length.toString())
    };
    setTaskList([...taskList, new_task]);
    nameRef.current.value = ''
  }


  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <TaskInput add_task={add_task} nameRef={nameRef} />
        <TaskList taskList={taskList} renderFiliter={renderFiliter} setTaskList={setTaskList} />
        <CheckAllAndRemaining taskList={taskList} setTaskList={setTaskList} />

        <FiliterTask taskList={taskList} setTaskList={setTaskList} setRenderFiliter={setRenderFiliter} renderFiliter={renderFiliter}/>
      </div>
    </div>
  );
};
export default App;
