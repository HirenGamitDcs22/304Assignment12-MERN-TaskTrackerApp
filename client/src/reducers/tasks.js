const taskReducer=(tasks=[],{type,payload})=>{
    switch (type) {
        case "ADD_TASK":
            return {...tasks,payload}
        case "GET_TASKS":
            return payload
        case "DELETE_TASKS":
                return tasks
        case "TOGGLE_REMIND":
            return tasks.map((task)=>task.id === payload.id ?{...task,reminder:payload.data.reminder} : task)
        case "FETCH_TASK":
            return 

        default:
            return tasks
    }
}
export default taskReducer