const taskReducer=(tasks=[],{type,payload})=>{
    switch (type) {
        case "ADD_TASK":
            return [{...tasks,payload}]
        case "GET_TASKS":
            return payload
        case "DELETE_TASKS":
                return tasks.data.filter(t=>t._id != payload)
        case "TOGGLE_REMIND":
            return tasks
        case "FETCH_TASK":
            return tasks

        default:
            return tasks
    }
}
export default taskReducer