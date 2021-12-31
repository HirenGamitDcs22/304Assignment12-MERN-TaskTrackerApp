const taskReducer=(tasks=[],action)=>{
    switch (action.type) {
        case "ADD_TASK":
            return (
                async()=>{
                    const res=await fetch("/tasks",{
                      method: "POST",
                      headers:{
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(action.payload)
                    })
                }
            )
        case "GET_TASKS":
            return (
                async()=>{
                    const res=await fetch("/tasks")
                    const data=await res.json(); 
                    return data
                }
            )
        case "DELETE_TASKS":
                return( 
                    async(id)=>{
                        await fetch(`/tasks/${id}`,{
                        method: 'DELETE'
                        });
                        tasks.filter((task)=>task.id !== action.id)
                    }
                )
        case "TOGGLE_REMIND":
            return tasks.map((task)=>task.id === action.id ?{...task,reminder:action.data.reminder} : task)
        case "FEATCH_TASK":
            return (async(id)=>{
                const res=await fetch(`/tasks/${id}`);
                const data=await res.json();
                return data;
            })

        default:
            return tasks
    }
}
export default taskReducer