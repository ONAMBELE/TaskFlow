import { useState } from "react"
import "./signIn.css"
import { NavLink } from "react-router-dom"
import axios from "axios"

export default function SignIn() {
    const [name,setName] = useState("")
    const [surname,setSurName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    async function singIn() {
        await axios.post("http://localhost:3000/api/setuser",{
            name: name,
            surname: surname,
            email: email,
            password: password,
        })
        .then(res=>{
            console.log("res: " + res)
            window.location.href = "http://localhost:5173/login"
        })
        .catch(error=>{
            console.log("Error: " + error)
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
                        console.log(name)
                    }} 
                required/>
                <input type="text" name="surname" id="surname" placeholder="Surname" 
                    onChange={(e)=>{
                        setSurName(e.target.value)
                        console.log(surname)
                    }} 
                required/>
                <input type="email" name="email" id="email" placeholder="Email" 
                    onChange={(e)=>{
                        setEmail(e.target.value)
                        console.log(email)
                    }} 
                required/>
                <input type="password" name="password" id="password" placeholder="Password" 
                    onChange={(e)=>{
                        setPassword(e.target.value)
                        console.log(password)
                    }} 
                required/>
                <div className="errors">
                    {/* Lorem ipsum dolor sit amet
                    consectetur adipisicing elit.
                    Expedita, facilis! */}
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