import {useState} from 'react'
import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Header from '../components/Header'

const Register = () => {
    const [username,setUname]=useState('')
    const [password,setPwd]=useState('')
    const [name,setName]=useState('')
    const [age,setAge]=useState('')
    const Navigate=useNavigate()
    const onSubmit=(e)=>{
        e.preventDefault()
        onReg({username,password,name,age})
        setUname('')
        setPwd('')
        setName('')
        setAge('')
    }
    const onReg=async (user) => {
        console.log(user)
        const res=await fetch("/users/registration",{
            method: "POST",
            headers:{
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
          })
          const newTask= await res.json();
          console.log(newTask)
        Navigate("/login")
    }
    return (
        <div>
            <Header title="Register" isLogged="false"/>
            <form onSubmit={onSubmit} className='add-form'>
                <div className='form-control'>
                    <label>User Name</label>
                    <input type='text' placeholder='User Name' value={username}
                        onChange={(e)=>setUname(e.target.value)} />
                </div>
                <div className='form-control'>
                    <label>Password</label>
                    <input type='password' placeholder='password' value={password}
                        onChange={(e)=>setPwd(e.target.value)} />
                </div>
                <div className='form-control'>
                    <label>Name</label>
                    <input type='text' placeholder='Name' value={name}
                        onChange={(e)=>setName(e.target.value)} />
                </div>
                <div className='form-control'>
                    <label>Age</label>
                    <input type='text' placeholder='Age' value={age}
                        onChange={(e)=>setAge(e.target.value)} />
                </div>
                <input type='submit' value='Register' className='btn btn-block' ></input>
            </form>
            <div>Already have a Account?<Link to='/login'> Login</Link></div>
        </div>
        
    )
}

export default Register