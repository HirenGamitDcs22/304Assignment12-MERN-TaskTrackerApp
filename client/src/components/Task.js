import {FaTimes,FaEdit} from 'react-icons/fa'
const Task=({task, onDelete, onToggle,onUpdate})=> {
    return (
        <div className={`task ${task.reminder ? 'reminder':''}`}  
        onDoubleClick={() => onToggle(task._id)}>
            <h3>
                {task.text}
                <h4> 
                <FaEdit 
                    style={{color:'blue',cursor:'pointer'}}
                    onClick={()=>onUpdate(task._id)}
                 />
                 <FaTimes
                    style={{color:'red',cursor:'pointer'}}
                    onClick={()=>onDelete(task._id)}/> </h4>
            </h3>
            <p>{task.day}</p>
            <h3>
                
            </h3>
        </div>
    )
}

export default Task
