export const  chkisLogged=()=>{
    return{
        type:"SING_IN"
    }  
}

export const featchuser=(user)=>{
    return{
        type:"FEATCH_USER",
        user
    }
}
export const updateUser=(user,id)=>{
    return{
        type:"UPDATE_USER",
        user,
        id
    }
}
export const addTask=(task)=>{
    return{
        type:"ADD_TASK",
        task
    }
}
export const getTask=(task)=>{
    return {
        type:"GET_TASKS",
        payload: task
    }
}
export const fetchTask=(id)=>{
    return{
        type:"FETCH_TASK",
        id
    }
}
export const delTask=(id)=>{
    return{
        type:"DELETE_TASKS",
        id
    }
}

export const toggleReminder=(data,id)=>{
    return{
        type:"TOGGLE_REMIND",
        data,
        id
    }
}