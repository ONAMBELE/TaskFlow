import { useEffect, useState } from "react"
import "./popUpPrintTasks.css"
import "./formUpdateTask.css"
import axios from "axios"
import FormAddTask from "./FormAddTask"

export default function PopUpPrintTasks(props) {
    const email = localStorage.getItem("email")
    const [formTask,setFromTask] = useState("")



    useEffect(()=>{
        const nextBtn = document.querySelector(".next")
        const prevBtn = document.querySelector(".previous")
        const content = document.querySelector(".popUpPrintTasks .content")
        
        nextBtn.addEventListener("click",(e)=>{
            content.scrollLeft += 50
        })
        prevBtn.addEventListener("click",(event)=>{
            content.scrollLeft -= 50
        })
        content.addEventListener("wheel",(e)=>{
            e.preventDefault()
            if (e.deltaX > 0) {
                content.scrollBy({
                    left: 150,
                    behavior: "smooth"
                })
            } else {
                content.scrollBy({
                    left: -150,
                    behavior: "smooth"
                })   
            }
        })
        

    })

    return (
        <div className="popUpPrintTasks">

            {
                formTask
            }

            <img src="/back.svg" alt="back" className="previous"/>
            <img src="/forward.svg" alt="forward" className="next"/>
            <div className="content">
                <div className="scroll">
                    {props.taskList.map((value,index)=>{
                        return <Task 
                            key={index}
                            id={value.id}
                            description={value.description}
                            day={value.day}
                            hour={value.hour}
                            priority={value.priority}

                            onUpdate={()=>{
                                setFromTask(
                                    <FormAddTask display="flex" email={email} 
                                        id={value.id}
                                        description={value.description}
                                        day={value.day}
                                        hour={value.hour}
                                        priority={value.priority}
                                    />
                                )
                            }}
                        />
                    })
                    
                    }
                </div>
            </div>
        </div>
    )
}

function Task(props) {
    const [display,setDisplay] = useState("inline-block")

    function delTask() {
        
        setTimeout(() => {
            axios.delete(`https://taskflow-back.onrender.com/api/delTask?id=${props.id}`)
            .then(del=>{
                setDisplay("none")
            })
            .catch(error=>{
                console.log("Error: ")
                console.log(error)
            })
        }, 1000);
    }


    return (
        <div className="task" id={props.id} 
            style={{
                display: display
            }}
        >
            <img src="/edit.svg" alt="edit" className="edit"
                onClick={()=>{
                    props.onUpdate?.()
                }}
            />
            <img src="trash-1.svg" alt="delete" className="delete"
                onClick={(e)=>{
                    delTask()
                }}
            />
            <h5>Description</h5>
            <p className="description" 
                style={{
                    color: props.priority
                }}
            >
                {props.description}
            </p>
            <h5>Days</h5>
            <ul className="days">
                {props.day}
            </ul>
            <h5>Hour</h5>
            <p>{props.hour}</p>
        </div>
    )
}