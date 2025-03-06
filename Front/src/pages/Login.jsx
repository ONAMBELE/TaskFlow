import { useState } from "react"
import "./login.css"
import { NavLink,useNavigate } from "react-router-dom"
import axios from "axios"


export default function Login(props) {
    const [errors,setErrors] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()

    function getUser() {

        axios.get(`https://taskflow-back.onrender.com/api/getuser?email=${email}&password=${password}`)
        .then(res=>{
            console.log("Res: " + res.data.data.email)
            localStorage.setItem("email",res.data.data.email)
            //props.setAccount?.(res.data.data.email)
            setTimeout(() => {
                navigate("/dashboard")
            }, 1000);
        })
        .catch(error=>{
            console.log(error)
            setErrors(error.response.data.message)
        })
        
    }

    return (
        <div className="Login">
            <form action="" onSubmit={(e)=>{e.preventDefault()}}>
                <h1>Login</h1>
                <input type="email" name="email" id="email" placeholder="Email" required
                    onChange={(e)=>{
                        setEmail(e.target.value)
                        setErrors("")
                    }}
                />
                <input type="password" name="password" id="password" placeholder="Password" required
                    onChange={(e)=>{
                        setPassword(e.target.value)
                        setErrors("")
                    }}
                />
                <div className="errors">
                    {
                        errors
                    }
                </div>
                <input type="submit" value="Login" className="submit"
                    onClick={getUser}
                />
                <div className="already">
                    <span>Don't have account ? </span>
                    <NavLink to="/SignIn">Sign In</NavLink>
                </div>
            </form>
        </div>
    )

}