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

  console.log(tasks)
  useEffect(()=>{
    const getTask=async()=>{
      const res=await fetchTasks();
      console.log(res)
      setTasks(...tasks.data)
      console.log(tasks,tasks.length,mytasks,mytasks.length);
    }
    getTask();
  },[])
  console.log(tasks.length)
  const fetchTasks=async()=>{
    const res=await fetch("/tasks/list");
    const data=await res.json(); 
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
    dispatch(actions.addTask())
    console.log(tasks)
    //snewTasketTasks(await stateTask)
  }
  //Delete A Task
  const DeleteTask =async(id)=>{
    await fetch(`/tasks/${id}`,{
      method: 'DELETE'
    });  
    dispatch(actions.delTask(id))
    setTasks(tasks)
    console.log(tasks)
  }

  const fetchTask=async(id)=>{
    const res=await fetch(`/tasks/fetchtask/${id}`)
    const rec=await res.json()
    console.log(rec)
    return dispatch(actions.fetchTask(rec.data)).payload;
  }
  //Toggle
  const toggleReminder =async(id)=>{
    const taskToToggle=await fetchTask(id)
    const updateTask ={...taskToToggle,reminder:!taskToToggle.reminder}
    const res=await fetch(`/tasks/${id}`,{
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updateTask)
    })
    const data = await res.json();
    dispatch(actions.toggleReminder(data,id))
   // setTasks(await stateTask)
  }
  
  const chkisLogged=async(user)=>{
    const res = await  fetch("/users")
    const usersdata=await res.json(); 
    const rec=usersdata.filter((u)=>u.uname === user.uname && u.pwd === user.pwd)
    const id=rec.map((u)=>u.id)
    const res1=await fetch(`/users/${id[0]}`);
    const data=await res1.json();
    const r=dispatch(actions.featchuser(data))
    const users=r.user;
    const updateUser={...users,logedin:!users.logedin}
    const res2=await fetch(`/users/${users.id}`,{
      method:'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updateUser)
    })
    const data1 = await res2.json();
    const rec1=dispatch(actions.updateUser(data1,users.id))
  }
  //Login
  const login=(logindata)=>{
    chkisLogged(logindata)
    dispatch(actions.chkisLogged())
  }
  return (
    <Router>
    <div className='container'>
      <Routes>
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
        showLogin={showLogin}
        isLogged={isLogged}
        onLogin={()=>setShowLogin(!showLogin)}
      />
        <Route
          path='/'
          element={
            <>
              {!isLogged && !showLogin && <Login onLogin={login} />} 
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
