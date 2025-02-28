import { useEffect, useState } from "react"
import FormAddTask from "./FormAddTask"
import "./dashboardSection.css"
import axios, { AxiosError } from "axios"
import Header from "./Header"
import PopUpPrintTasks from "./popUpPrintTasks"


export default function DashboardSection() {
    const [formTask,setFromTask] = useState("")
    const [email,setEmail] = useState("")
    const [_class,setClass] = useState("")
    const [popUpPrintTasks,setPopUpPrintTasks] = useState("")
    const [tableVisibility,setTableVisibility] = useState("0")
    let taskList = []


    function findIndex(value,_day,daysOFweek) {
        let dayIndex,hourIndex=0;
        console.log([value,_day,daysOFweek])
        dayIndex = daysOFweek.indexOf(_day)
        for (let i = 0; i < 24; i+=2) {
            if (value.hour.split(":")[0] < i+2) {
                break;
            }
            hourIndex+=1;
        } 
        console.log([dayIndex,hourIndex])
        return [dayIndex,hourIndex]
    }

    function printInstructions(e) {
        setClass(
            <p className="message ">Double cliquer sur la tache pour plus d'options</p>
        )
        setTimeout(() => {
            setClass("")
        }, 4000);
    }

    function printTasksDescriptions(e) {
        let td = document.getElementById(`${e.target.id}`)
        let table = document.querySelectorAll("table tbody tr td")
        
        if (!td) {
            return
        } 
        else if(td.getAttribute("class") === null) {
            taskList.push({
                description : td.innerText,
                day: td.getAttribute("day"),
                hour: td.getAttribute("hour")
            })
            table.forEach(task=>{
                if (task.getAttribute("day") !== null && task.getAttribute("id") !== e.target.id) {
                    taskList.push({
                        description : task.innerText,
                        day: task.getAttribute("day"),
                        hour: task.getAttribute("hour")
                    })
                }
            })
        }
        setTimeout(() => {
            setPopUpPrintTasks(<PopUpPrintTasks taskList={taskList} />)
            setTableVisibility("5px")
        }, 1000);
    }

    useEffect(()=>{
        const table = document.querySelector("table tbody")
        const daysOFweek = [ "MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY","SUNDAY" ]
        setEmail(localStorage.getItem("email"))

        //setTimeout(() => {
            if (email !== null) {
                axios.get(`http://localhost:3000/api/getTask?idUser=${email}`)
                .then(task=>{
                    let tasks = task.data.data
                    let dayIndex,hourIndex
                    tasks.map((value, index)=>{
                        //let value = val;
                        let days = value.day.split(",")
                        console.log(days)
                        //for (let i = 0; i < days.length; i++) {
                            console.log([value,days[0],daysOFweek])                            
                            [dayIndex,hourIndex] = findIndex(value,days[0],daysOFweek)
                            console.log(dayIndex,hourIndex)
                            table.childNodes[hourIndex].childNodes[dayIndex+1].innerText = value.object
                            table.childNodes[hourIndex].childNodes[dayIndex+1].setAttribute("id",value.id+"-"+days[0])
                            table.childNodes[hourIndex].childNodes[dayIndex+1].setAttribute("day",days[0])
                            table.childNodes[hourIndex].childNodes[dayIndex+1].setAttribute("hour",value.hour)
                            if (value.priority === "green") {
                                table.childNodes[hourIndex].childNodes[dayIndex+1].style.backgroundColor = `var(--priority1)`
                            }
                            if (value.priority === "yellow") {
                                table.childNodes[hourIndex].childNodes[dayIndex+1].style.backgroundColor = `var(--priority2)`
                            }
                            if (value.priority === "red") {
                                table.childNodes[hourIndex].childNodes[dayIndex+1].style.backgroundColor = `var(--priority3)`
                            }
                        //}    
                    })
                })
                .catch(error=>{                    
                    console.log(error)
                })
            }
        //}, 750);

    })

    

    return (

        <div className="DashboardSection">
            <Header/>
            {formTask}
            {_class}
            {
                popUpPrintTasks
            }           
            <table onClick={(e)=>{
                    printInstructions(e)
                    setTableVisibility("0")
                    setPopUpPrintTasks("")
                }}
                style={{
                    filter: `blur(${tableVisibility})`
                }}
            >

                <thead>
                    <tr>
                        <td> 
                            <button className="add"
                                onClick={()=>{ setFromTask(
                                        <FormAddTask display="flex" email={email} />
                                    )
                                }}
                            >+</button> 
                        </td>
                        <td>MON</td>
                        <td>TUE</td>
                        <td>WED</td>
                        <td>THU</td>
                        <td>FRI</td>
                        <td>SAT</td>
                        <td>SUN</td>
                    </tr>
               </thead>
               <tbody onDoubleClick={(e)=>{printTasksDescriptions(e)}}>
                    <tr>
                        <td className="hour">00:00 - 02:00</td>
                        <td>
                            
                        </td>
                        <td></td>
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
