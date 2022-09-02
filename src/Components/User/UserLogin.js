import React from 'react'
import {  Button} from '@material-ui/core'
import { useRef, useState } from 'react'
import { useAuth } from '../../Context/AuthContext'
import { Link,useHistory } from 'react-router-dom' 



export default function Login() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const history= useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/UserDashBoard")

        } catch {
            setError("Failed to login")
        }

        setLoading(false)

    }

    const handleSubmitHome= () => {
        history.push("/")
    }


    return (
        <div className='container'style={{maxWidth:"50vw"}} >
            <h1 className='my-4'><strong>User Login</strong></h1>
            
             {error && alert(error)}
            <div className="mb-3">
                <label htmlFor="email" className="form-label"> <strong> Email </strong></label>
                <input type="email" ref={emailRef} className="form-control" id="email" placeholder="name@example.com" required />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label"><strong>  Password</strong></label>
                <input type="password" ref={passwordRef} className="form-control" id="password" required />
            </div>
            <Button onClick={handleSubmit}  variant="outlined" type="submit"><strong>Sign in</strong></Button>
            <div >
                Dont have an account ?<Link to="/usersignup"> Signup as User</Link> 
            </div>
            <div className='my-3'>
            <Button onClick={handleSubmitHome}  variant="contained" type="submit"><strong>Home</strong></Button>

            </div>


        </div>


    )
}

