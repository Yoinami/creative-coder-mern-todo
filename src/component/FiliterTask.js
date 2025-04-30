export default function FiliterTask({ taskList, setRenderFiliter, renderFiliter, remove_task }) {

    function clearCompleted() {
        taskList.filter(task => task.isCompleted == true).map(task => remove_task(task.id))
    }

    return (
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
                <button className="button" onClick={clearCompleted}>Clear completed</button>
            </div>
        </div>
    )
}