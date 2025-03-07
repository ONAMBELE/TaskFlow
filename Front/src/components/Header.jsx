import { useEffect, useState } from "react"
import "./header.css"
import {NavLink} from "react-router-dom"
import axios from "axios"


export default function Header() {
    const [profile,setProfile] = useState("")

    useEffect(()=>{
        setProfile(localStorage.getItem("profile"))
    })
    return (
        <div className="Header">
            <h1>
                <img src="/hourglass1.svg" alt="TaskFlow" />
                <span>TaskFlow</span>
            </h1>
            {/* <div className="register">
               <a href="">Login</a>
               <a href="">Sign in</a>
            </div> */}
            <div className="profile">
                {profile}
            </div>
        </div>
    )

}