import "./dashboardSection.css"
import Header from "../components/Header"
import DashBoardTable from "../components/DashBoardTable"
import Profile from "../components/Profile"
import { useState } from "react"
import Calender from "../components/Calender"
export default function DashboardSection() {
    const [option,setOptions] = useState(<DashBoardTable/>)


    return (

        <div className="DashboardSection">
            <Header
                onSelectDashBoard={()=>{
                    setOptions(<DashBoardTable/>)
                }}
                onSelectProfile={()=>{
                    setOptions(<Profile/>)
                }}
                
            />          
            { option }
        </div>
    )

}
