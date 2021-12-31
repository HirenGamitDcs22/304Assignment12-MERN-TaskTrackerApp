import { useSelector ,useDispatch} from 'react-redux';
import './App.css';
import {useState, useEffect} from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'
import Login from './components/Login';
import * as actions from './actions'


function App() {
  const isLogged = useSelector(state => state.isLogged)
  const stateTask=useSelector(state=>state.tasks)
  const dispatch =useDispatch();
  const [showAddTask, setShowAddTask]=useState(false)
  const [mytasks,setTasks] =useState([])
  const [showLogin, setShowLogin]=useState(false)

  useEffect(()=>{
    const getTask=async()=>{
      const res= featchTasks();
      setTasks((await res).payload)
    }
    getTask();
  },[dispatch])

  const featchTasks=async()=>{
    return dispatch(actions.getTask());
  }

  //Add task
  const addTask =(task)=>{
    dispatch(actions.addTask(task));
    console.log(mytasks)
    setTasks(await stateTask)
  }
  //Delete A Task
  const DeleteTask =async(id)=>{ 
    dispatch(actions.delTask(id))
    setTasks(await stateTask)
  }

  const featchTask=(data)=>{
    return dispatch(actions.featchTask(data)).payload;
  }
  //Toggle
  const toggleReminder =async(id)=>{
    const taskToToggle=await featchTask(id)
    const updateTask ={...taskToToggle,reminder:!taskToToggle.reminder}
    const res=await fetch(`/tasks/${id}`,{
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updateTask)
    })
    const data = await res.json();
    dispatch(actions.toggleReminder(data,id))
    setTasks(await stateTask)
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
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
        isLogged={isLogged}
        onLogin={()=>setShowLogin(!showLogin)}
      />
      <Routes>
        <Route
          path='/'
          element={
            <>
              {!isLogged && showLogin && <Login onLogin={login} />} 
              {isLogged && showAddTask && <AddTask onAdd={addTask} />}
              {stateTask.length > 0 ? (
                <Tasks
                  tasks={mytasks}
                  onDelete={DeleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                'No Tasks To Show'
              )}
            </>
          }
        />
        <Route path='/about' element={<About />} />
      </Routes>
      <Footer />
    </div>
  </Router>
  );
}

export default App;
