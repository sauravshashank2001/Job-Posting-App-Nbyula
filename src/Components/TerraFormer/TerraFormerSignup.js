import React from 'react'
import { Button } from '@material-ui/core'
import { useRef, useState } from 'react'
import { useAuth } from '../../Context/AuthContext'
import { Link, useHistory } from 'react-router-dom'



export default function TerraFormerSignup() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const history = useHistory();


    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Password do not match")
        }

        try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push("/login")

        } catch {
            setError("Failed to create account")
        }

        setLoading(false)

    }
    const handleSubmitHome = () => {
        history.push("/")
    }


    return (
        <div className='container' style={{ maxWidth: "50vw" }} m={2}>
            <div className='my-4'><h1 ><strong>TerraFormers Sign Up</strong> </h1></div>

            {error && alert(error)}
            <div className="mb-3">
                <label htmlFor="email" className="form-label"><strong>Email</strong> </label>
                <input type="email" ref={emailRef} className="form-control" id="email" placeholder="name@example.com" required />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label"><strong>Password</strong></label>
                <input type="password" ref={passwordRef} className="form-control" id="password" required />
            </div>
            <div className="mb-3">
                <label htmlFor="password-confirm" className="form-label"> <strong>Confirm Password</strong></label>
                <input type="password" ref={passwordConfirmRef} className="form-control" id="password-confirm" required />
            </div>
            <Button onClick={handleSubmit} variant="outlined" type="submit">Sign Up</Button>
            <div className='my-3'>
                Already have an account? <Link to="/login"> Login</Link>
            </div>
            <div className='my-2' >
                <Button onClick={handleSubmitHome} variant="contained" type="submit">Home</Button>

            </div>

        </div>


    )
}
