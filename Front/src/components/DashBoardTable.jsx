import "./DashBoardTable.css"
import axios from "axios"
import { useEffect, useState } from "react"
import FormAddTask from "../components/FormAddTask"
import PopUpPrintTasks from "../components/popUpPrintTasks"
import { useNavigate } from "react-router-dom"



export default function DashBoardTable(){
    const [tableVisibility,setTableVisibility] = useState("0")
    const [email,setEmail] = useState("")
    const [_class,setClass] = useState("")
    const [formTask,setFromTask] = useState("")
    const [popUpPrintTasks,setPopUpPrintTasks] = useState("")
    
    
    let taskList = []
    const navigate = useNavigate()
    
    if (!localStorage.getItem("email")) {
        navigate("/login")   
    }


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

    function printInstructions() {
        setClass(
            <p className="message ">Double-cliquez sur la tache pour plus d'options</p>
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
                id: td.getAttribute("id"),
                description : td.innerText,
                day: td.getAttribute("day"),
                hour: td.getAttribute("hour"),
                priority: td.getAttribute("priority"),
                deadLine: td.getAttribute("deadLine"),
                duration: td.getAttribute("duration")
            })
            table.forEach(task=>{
                if (task.getAttribute("day") !== null && task.getAttribute("id") !== e.target.id) {
                    taskList.push({
                        id: task.getAttribute("id"),
                        description : task.innerText,
                        day: task.getAttribute("day"),
                        hour: task.getAttribute("hour"),
                        priority: task.getAttribute("priority"),
                        deadLine: task.getAttribute("deadLine"),
                        duration: task.getAttribute("duration")
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

        setTimeout(() => {
            if (email !== null) {
                axios.get(`https://taskflow-back.onrender.com/api/getTask?idUser=${email}`)
                .then(task=>{
                    let tasks = task.data.data
                    let indexes = []
                    tasks.map((value, index)=>{
                        indexes = findIndex(value,daysOFweek)
                        table.childNodes[indexes[1]].childNodes[indexes[0]+1].innerHTML = `<span>${value.object}</span>`
                        table.childNodes[indexes[1]].childNodes[indexes[0]+1].setAttribute("id",value.id)
                        table.childNodes[indexes[1]].childNodes[indexes[0]+1].setAttribute("day",value.day)
                        table.childNodes[indexes[1]].childNodes[indexes[0]+1].setAttribute("hour",value.hour)
                        table.childNodes[indexes[1]].childNodes[indexes[0]+1].setAttribute("priority",value.priority)
                        table.childNodes[indexes[1]].childNodes[indexes[0]+1].setAttribute("deadLine",value.deadLine)
                        table.childNodes[indexes[1]].childNodes[indexes[0]+1].setAttribute("duration",value.duration)

                        if (value.priority === "green") {
                            table.childNodes[indexes[1]].childNodes[indexes[0]+1].style.backgroundColor = `var(--green2)`
                        }
                        if (value.priority === "yellow") {
                            table.childNodes[indexes[1]].childNodes[indexes[0]+1].style.backgroundColor = `var(--yellow2)`
                        }
                        if (value.priority === "red") {
                            table.childNodes[indexes[1]].childNodes[indexes[0]+1].style.backgroundColor = `var(--red2)`
                        }
                        
                    })
                })
                .catch(error=>{
                    if (error.response.data.message !== "Aucune tache pour l'utilisateur ") {
                        //console.log({Error: error})
                    }
                })
            }
        }, 750);

    })



    return (
        <div>
            {_class}
            {formTask}
            {
                popUpPrintTasks
            } 

            <table onClick={(e)=>{
                setTableVisibility("0")
                setPopUpPrintTasks("")
                }}
                style={{
                    filter: `blur(${tableVisibility})`
                }}
            >   
                <thead>
                    <tr>
                        <td className="add" onClick={()=>{ setFromTask( <FormAddTask display="flex" email={email} />)}}> 
                            <img src="/add.svg" alt="add" />
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
                <tbody onDoubleClick={(e)=>{printTasksDescriptions(e)}}
                    onClick={()=> printInstructions()}
                 >
                    <tr>
                        <td className="hour">00:00 - 02:00</td>
                        <td></td>
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