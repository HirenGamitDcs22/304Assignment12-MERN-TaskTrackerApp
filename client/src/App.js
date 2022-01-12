import { useSelector ,useDispatch} from 'react-redux';
import './App.css';
import {useState, useEffect} from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './pages/About'
import Login from './pages/Login';
import * as actions from './actions'
import Register from './pages/Register';


function App() {
  const isLogged = useSelector(state => state.isLogged)
  const tasks=useSelector(state=>state.tasks)
  const dispatch =useDispatch();
  const [showAddTask, setShowAddTask]=useState(false)
  const [mytasks,setTasks] =useState([])
  const [showLogin, setShowLogin]=useState(false)

  useEffect(()=>{
    const getTask=async()=>{
      const res=await fetchTasks();
      if(res != 1){
        setTasks(await res.payload.data)
      }  
    }
    getTask();
  },[dispatch])

  const fetchTasks=async()=>{
    const res=await fetch("/tasks/list");
    const data=await res.json();
    console.log(data) 
    if(data.code=='NO_TASKS'){
      return 1
    }
    return dispatch(actions.getTask(data));
  }

  //Add task
  const addTask =async(task)=>{
    const res=await fetch("/tasks/addtask",{
      method: "POST",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const newTask= await res.json();
    dispatch(actions.addTask(newTask))
    setTasks(await tasks.data)
  }
  //Delete A Task
  const DeleteTask =async(id)=>{
    await fetch(`/tasks/deltask/${id}`,{
      method: 'DELETE'
    });  
    dispatch(actions.delTask(id))
    setTasks(await tasks.data)
  }

  const fetchTask=async(id)=>{
    const res=await fetch(`/tasks/fetchtask/${id}`)
    const rec=await res.json()
    return dispatch(actions.fetchTask(rec.data))
  }
  //Toggle
  const toggleReminder =async(id)=>{
    const taskToToggle=await fetchTask(id)
    const updateTask ={...taskToToggle,reminder:!taskToToggle.reminder}
    const res=await fetch(`/tasks/updatereminder/${id}`,{
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updateTask)
    })
    const data = await res.json();
    dispatch(actions.toggleReminder(data,id))
    setTasks(await tasks.data)
  }
  return (
    <Router>
    <div className='container'>
    <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
        showLogin={showLogin}
        isLogged={isLogged}
        onLogin={()=>setShowLogin(!showLogin)}
      />
      <Routes>
      
        <Route
          path='/'
          element={
            <>
              {!isLogged && showLogin && <Login/>} 
              {isLogged && showAddTask && <AddTask onAdd={addTask} />}
              {mytasks.length>0?(<Tasks
                tasks={mytasks}
                onDelete={DeleteTask}
                onToggle={toggleReminder}
              />):(
                "No task To Show"
              )
            } 
            </>
          }
        />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
    </div>
  </Router>
  );
}

export default App;
