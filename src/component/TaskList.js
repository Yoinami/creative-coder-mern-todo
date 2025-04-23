import React, { useState } from 'react';

function TaskListItem({ task, remove_task, update_single_task }) {

    const [focused, setFocused] = useState(false);
    const [name, setName] = useState(task.name)

    let check_single_task = task => {
        task = { ...task, isCompleted: !task.isCompleted }
        update_single_task(task)
    }

    let change_task_name = task => {
        task = { ...task, name }
        update_single_task(task)
    }

    let handleSubmit = e => {
        e.preventDefault();
        change_task_name(task);
        setFocused(false)
    }

    return (
        <li className="todo-item-container">
            <div className="todo-item">
                <input type="checkbox" checked={task.isCompleted} onChange={() => check_single_task(task)} />
                {focused &&
                    (<form onSubmit={e => handleSubmit(e)}>
                        <input
                            type="text"
                            className="todo-input"
                            value={name}
                            onBlur={() => {
                                change_task_name(name, task)
                                setFocused(false);
                            }}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </form>
                    )
                }
                {
                    !focused &&
                    (<span
                        onDoubleClick={() => setFocused(true)}
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


export default function TaskList({ taskList, renderFiliter, remove_task, check_single_task, update_single_task }) {


    return (
        <ul className="todo-list">
            {
                taskList.filter(task => {
                    if (renderFiliter === 'All') return true;
                    else if (renderFiliter === 'Active' && task.isCompleted === false) return true;
                    else if (renderFiliter === 'Completed' && task.isCompleted === true) return true;
                    return false;
                }).map((task, index) => {
                    return <TaskListItem key={task.id} task={task} remove_task={remove_task} check_single_task={check_single_task} update_single_task={update_single_task} />
                })
            }
        </ul>
    )
}