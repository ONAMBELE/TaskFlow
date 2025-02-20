import { useEffect, useState } from "react"
import FormAddTask from "./FormAddTask"
import "./dashboardSection.css"
import axios from "axios"


export default function DashboardSection() {
    const [formTask,setFromTask] = useState("")
    
    useEffect(()=>{
        const table = document.querySelector("table tbody")
        const daysOFweek = [
            "MONDAY","TUESDAY","WEDNESDAY","THURSDAY",
            "FRIDAY","SATURDAY","SUNDAY"    
        ]


        function findIndex(value,daysOFweek) {
            let dayIndex,hourIndex=0;
            dayIndex = daysOFweek.indexOf(value.day)

            for (let i = 0; i < 24; i+=2) {
                if (value.hour.split(":")[0] < i+2) {
                    break;
                }
                hourIndex+=1;
            } 
            return [dayIndex,hourIndex]
        }

        axios.get("http://localhost:3000/api/getTask?idUser=kono@gmail.com")
        .then(task=>{
            let tasks = task.data.data
            let dayIndex,hourIndex
            tasks.map((value, index)=>{
                [dayIndex,hourIndex] = findIndex(value,daysOFweek)
                table.childNodes[hourIndex].childNodes[dayIndex+1].innerText = value.object
                if (value.priority === "green") {
                    table.childNodes[hourIndex].childNodes[dayIndex+1].style.backgroundColor = `var(--priority1)`
                }
                if (value.priority === "yellow") {
                    table.childNodes[hourIndex].childNodes[dayIndex+1].style.backgroundColor = `var(--priority2)`
                }
                if (value.priority === "red") {
                    table.childNodes[hourIndex].childNodes[dayIndex+1].style.backgroundColor = `var(--priority3)`
                }
            })
        })
        .catch(error=>{
            console.log("Error: " + error)
        })



    })

    return (
        <div className="DashboardSection">
            {
                formTask
            }
            <table>
                <button className="add"
                    onClick={()=>{
                        setFromTask(
                            <FormAddTask
                                display="flex"
                            />
                        )
                    }}
                >+</button>
    
                <thead>
                    <tr>
                        <td></td>
                        <td>MON</td>
                        <td>TUE</td>
                        <td>WED</td>
                        <td>THU</td>
                        <td>FRI</td>
                        <td>SAT</td>
                        <td>SUN</td>
                    </tr>
               </thead>
               <tbody>
                    <tr>
                        <td className="hour">00:00 - 02:00</td>
                        <td>
                            
                        </td>
                        <td>
                            
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="hour">02:00 - 04:00</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="hour">04:00 - 06:00</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="hour">06:00 - 08:00</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="hour">08:00 - 10:00</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="hour">10:00 - 12:00</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="hour">12:00 - 14:00</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="hour">14:00 - 16:00</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="hour">16:00 - 18:00</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="hour">18:00 - 20:00</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="hour">20:00 - 22:00</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td className="hour">22:00 - 00:00</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>                
               </tbody>
            </table>
        </div>
    )

}
