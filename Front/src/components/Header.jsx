import { useEffect, useState } from "react"
import "./header.css"
import {NavLink} from "react-router-dom"
import axios from "axios"


export default function Header(props) {
    const [profile,setProfile] = useState("")
    const [circle1,setCircle1] = useState("")
    const [circle2,setCircle2] = useState("rgb(197, 12, 197")

    useEffect(()=>{
        setProfile(localStorage.getItem("profile"))

    })
    return (
        <div className="Header">
            <h1>
                <img src="/hourglass1.svg" alt="TaskFlow" />
                <span>TaskFlow</span>
            </h1>
            <div className="profile">
                <span>
                    {profile}
                </span>
            </div>
            <div className="options" >
                <li style={{backgroundColor: circle1}}
                    onClick={()=>{
                        setCircle1("rgb(197, 12, 197")
                        setCircle2("")
                        props.onSelectProfile?.()
                    }}
                >
                    <img src="/profile.svg" alt="profile" />
                    <div>
                        <span>Profile</span>
                        <span className="circle"
                            style={{
                                backgroundColor: circle1
                            }}
                        ></span>
                    </div>
                </li>
                <li style={{backgroundColor: circle2}}
                    onClick={()=>{
                        setCircle2("rgb(197, 12, 197")
                        setCircle1("")
                        props.onSelectDashBoard?.()
                    }}
                >
                    <img src="/calendar.svg" alt="dashboard" />
                    <div>
                        <span>Dashboard</span>
                        <span className="circle" style={{backgroundColor: circle2}}></span>     
                    </div>
                </li>
            </div>
        </div>
    )

}