import { useEffect } from "react"
import "./popUpPrintTasks.css"


export default function PopUpPrintTasks(props) {
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
                        />
                    })
                    
                    }
                </div>
            </div>
        </div>
    )
}

function Task(props) {
    return (
        <div className="task" id={props.id} 
            onClick={(e)=>{
                console.log(props.id)
            }}
        >
            <h5>Description</h5>
            <p className="description">
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