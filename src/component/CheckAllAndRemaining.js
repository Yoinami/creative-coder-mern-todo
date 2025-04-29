export default function CheckAllAndRemaining({setTaskList, taskList, update_single_task}) {

    function checkAll() {
        //will automatically rerender because it's parents has been changed
        taskList.filter(task => task.isCompleted == false)
                    .map(task => update_single_task({...task, isCompleted: true}));
    }

    return (
        <div className="check-all-container">
            <div>
                <div className="button" onClick={checkAll}>
                    Check All
                </div>
            </div>

            <span>{taskList.filter(task => task.isCompleted === false).length} items remaining</span>
        </div>
    )
}