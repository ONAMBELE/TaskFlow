import "./header.css"
import {NavLink} from "react-router-dom"

export default function Header() {
    
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
                
            </div>
        </div>
    )

}