const taskReducer=(tasks=[],action)=>{
    switch (action.type) {
        case "GET_TASKS":
            return action.payload
        case "ADD_TASK":
            const {task} = action
            return[...tasks,{...task}]
        case "DELETE_TASKS":
            return tasks.filter(t=>t._id !== action.id)
        case "TOGGLE_REMIND":  
            return tasks.map(task=>task._id===action.id ? {...task, reminder:!task.reminder} : task)
        case "FETCH_TASK":
            return tasks
        default:
            return tasks
    }  
}
export default taskReducer