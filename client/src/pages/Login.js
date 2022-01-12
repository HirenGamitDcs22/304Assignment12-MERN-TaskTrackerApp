import {useState} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import * as actions from '../actions'
import { useDispatch, useSelector } from 'react-redux'

const Login=()=> {
    const [uname,setUname]=useState('')
    const [pwd,setPwd]=useState('')
    const [msg,setMsg]=useState('')
    const Navigate=useNavigate()
    const isLogged = useSelector(state => state.isLogged)
    const dispatch =useDispatch();
    const onSubmit=(e)=>{
        e.preventDefault()
        login({uname,pwd})
        setUname('')
        setPwd('')
    }

    const login=async(user)=>{
        const res = await  fetch("/users/login",{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(user)
        })
        const usersdata=await res.json(); 
        const code=usersdata.code
        if(code=='SUCCESS'){
            dispatch(actions.chkisLogged())
        }
        else{
            setMsg(usersdata.data)
        }
        Navigate('/')
    }

    return (
        <>
            <form className='add-form' onSubmit={onSubmit}>
                <h3 className="msg">{msg}</h3>
                <div className='form-control'>
                    <label>User Name</label>
                    <input type='text' placeholder='User Name'
                    value={uname} onChange={(e)=>setUname(e.target.value)}></input>
                </div>
                <div className='form-control'>
                    <label>Password</label>
                    <input type='password' placeholder='password' value={pwd} onChange={(e)=>setPwd(e.target.value)}></input>
                </div>
                <input type='submit' value='Login' className='btn btn-block' ></input>
            </form>
            <div>
                New here?<Link to={"/register"}>Register</Link>
            </div>
        </>
    )
}

export default Login
