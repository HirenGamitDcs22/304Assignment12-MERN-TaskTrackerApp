import {FaTimes,FaEdit} from 'react-icons/fa'
const Task=({task, onDelete, onToggle,onEdit})=> {
    return (
        <div className={`task ${task.reminder ? 'reminder':''}`}  
        onDoubleClick={() => onToggle(task._id)}>
            <h3>
                {task.text}
                <div> 
                <FaEdit 
                    style={{color:'blue',cursor:'pointer'}}
                    onClick={()=>onEdit(task._id)}
                 />
                 <FaTimes
                    style={{color:'red',cursor:'pointer'}}
                    onClick={()=>onDelete(task._id)}/> </div>
            </h3>
            <p>{task.day}</p>
            <h3>
                
            </h3>
        </div>
    )
}

export default Task
