import { useState,useNavigate } from "react"
import "./signIn.css"
import { NavLink } from "react-router-dom"
import axios from "axios"

export default function SignIn() {
    const [name,setName] = useState("")
    const [surname,setSurName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [err,setErr] = useState("")
    const navigate = useNavigate()

    async function singIn() {
        await axios.post("https://taskflow-back.onrender.com/api/setuser",{
            name: name,
            surname: surname,
            email: email,
            password: password,
        })
        .then(res=>{
            console.log("res: " + res)
            navigate("/login")
        })
        .catch(error=>{
            console.log(error)
            setErr(error.response.data.message)
        })


    }

    return (
        <div className="SignIn">
            <form action="" 
                onSubmit={(e)=>e.preventDefault()}
            >
                <h1>Sign In</h1>
                <input type="text" name="name" id="name" placeholder="Name" 
                    onChange={(e)=>{
                        setName(e.target.value)
                    }} 
                required/>
                <input type="text" name="surname" id="surname" placeholder="Surname" 
                    onChange={(e)=>{
                        setSurName(e.target.value)
                    }} 
                required/>
                <input type="email" name="email" id="email" placeholder="Email" 
                    onChange={(e)=>{
                        setEmail(e.target.value)
                    }} 
                required/>
                <input type="password" name="password" id="password" placeholder="Password" 
                    onChange={(e)=>{
                        setPassword(e.target.value)
                    }} 
                required/>
                <div className="errors">
                    {err}
                </div>
                <input type="submit" value="Sign In" className="submit" onClick={singIn}/>
                <div className="already">
                    <span>Already have account ? </span>
                    <NavLink to="login">Login</NavLink>
                </div>
            </form>
        </div>
    )

}