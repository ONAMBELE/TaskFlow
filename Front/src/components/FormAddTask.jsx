import { useState } from "react"
import "./formAddTask.css"
import axios from "axios"


export default function FormAddTask(props) {
    const [display,setDisplay] = useState(props.display)
    const [day,setDay] = useState("")
    const [description,setDescription] = useState("")
    const [hour,setHour] = useState("") 
    const [priority,setPriority] = useState("")

    function handlePost() {
        axios.post("http://localhost:3000/api/setTask",{
            day: day, hour: hour, object: description, idUser: props.email,priority: priority
        }).then(res=>{ window.location.reload()})
        .catch(err=>{ console.log("Error: " + err)})
    }


    return (
        <form action="" className="FormAddTask"
            onSubmit={(e)=>{ e.preventDefault()
                handlePost()
            }}
            style={{ display: `${display}` }}
        >
            
            <img className="close top"  src="/close.svg" alt="close" 
                onClick={()=>{
                    setDisplay("none")
                    window.location.reload()
                }}
            />
            
            <h3>NEW TASK</h3>
            <textarea name="task" id="task" placeholder="Task description" rows={5} required
                onChange={(e)=>{setDescription(e.target.value)}}
            ></textarea>
            <select name="day" id="day" 
                value={day} onChange={(e)=>setDay(e.target.value)} required
            >
                <option value="" disabled hidden>Select a day</option>
                <option value="MONDAY">MONDAY</option>
                <option value="TUESDAY">TUESDAY</option>
                <option value="WEDNESDAY">WEDNESDAY</option>
                <option value="THURSDAY">THURSDAY</option>
                <option value="FRIDAY">FRIDAY</option>
                <option value="SATURDAY">SATURDAY</option>
                <option value="SUNDAY">SUNDAY</option>
            </select>
            <select name="priority" id="priority" required
                value={priority} onChange={(e)=>{ setPriority(e.target.value) }}       
            >
                <option value="" disabled hidden>Niveau de priorité de la tache</option>
                <option value="green">Faible(vert)</option>
                <option value="yellow">Moyenne(jaune)</option>
                <option value="red">Elevée(Rouge)</option>
            </select>
            <input type="time" name="time" id="time" placeholder="Heure (Au format heure:minute)" required 
                onChange={(e)=>{ setHour(e.target.value) }}
            />
            <button className="addBtn">ADD</button>
        </form>
    )
}