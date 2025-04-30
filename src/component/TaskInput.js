export default function taskInput({ add_task, nameRef}) {
    return (
        <>
            <h2>Todo App</h2>
            <form action="#" onSubmit={add_task}>
                <input
                    type="text"
                    className="todo-input"
                    placeholder="What do you need to do?"
                    ref={nameRef}
                />
            </form>
        </>
    )
}