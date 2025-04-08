export default function CheckAllAndRemaining({setTaskList, taskList}) {
    return (
        <div className="check-all-container">
            <div>
                <div className="button" onClick={() => setTaskList(taskList.map(value => { return { ...value, isCompleted: true } }))}>
                    Check All
                </div>
            </div>

            <span>{taskList.filter(task => task.isCompleted === false).length} items remaining</span>
        </div>
    )
}