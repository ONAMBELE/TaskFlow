import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./formAddTask.css"
import axios from "axios"


export default function FormAddTask(props) {
    const [display,setDisplay] = useState(props.display)
    let days = []
    const [description,setDescription] = useState(props.description ?  props.description :  "")
    const [hour,setHour] = useState(props.hour ?  props.hour :  "") 
    const [priority,setPriority] = useState(props.priority ?  props.priority :  "")
    const daysOFweek = [ "MONDAY","TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY","SUNDAY" ]
    const navigate = useNavigate()
       
    

    function handlePost() {
        
        localStorage.getItem("days").split(",")
        .forEach(day=>{
            console.log(day)
            axios.post("https://taskflow-back.onrender.com/api/setTask",{
                day: day, hour: hour, object: description, idUser: props.email,priority: priority
            })
            .then(_task=>{
                localStorage.removeItem("days")
                setTimeout(() => {
                    navigate("/dashboard")
                }, 1000);
            })
            .catch(err=>{ 
                console.log("Error: ")
                console.log(err)
            
            })
        })
        
    }

    function handleUpdate() {
        axios.delete(`https://taskflow-back.onrender.com/api/delTask?id=${props.id}`)
            .then(del=>{
                localStorage.getItem("days").split(",")
                .forEach(day=>{
                    axios.post("https://taskflow-back.onrender.com/api/setTask",{
                        day: day, hour: hour, object: description, idUser: props.email,priority: priority
                    })
                    .then(_task=>{
                        console.log("CREATION")
                        localStorage.removeItem("days")
                        setTimeout(() => {
                            navigate("/dashboard")
                        }, 1000);
                    })
                    .catch(err=>{ console.log("Error: " + err)})
                })
        })
        .catch(error=>{
            console.log("Error: ")
            console.log(error)
        })    
        
    }

    function getDays(e) {
        let index = days.indexOf(e.target.value)
        if (index === -1) {
            days.push(e.target.value)            
        }
        else{
            days.splice(index,1)
        }
        localStorage.setItem("days",days.toString())
    }

    useEffect(()=>{
        if (props.day) {
            let index = daysOFweek.indexOf(props.day)+1
            document.getElementById(`${index}`).checked = true
            days.push(props.day)
            if (days.length > 1) {
                days.pop()
                console.log(days)
            }
            else{
                localStorage.setItem("days",days)
            }

        }
        
    })

    return (
        <form action="" className="FormAddTask"
            onSubmit={(e)=>{ e.preventDefault()
                if (props.id) {
                    handleUpdate()
                } else {
                    handlePost()
                }
            }}
            style={{ display: `${display}` }}
        >
            
            <img className="close top"  src="/close.svg" alt="close" 
                onClick={()=>{
                    setDisplay("none")
                    navigate("/dashboard")
                }}
            />
            
            <h3>NEW TASK</h3>
            <textarea name="task" id="task" placeholder="Task description" rows={5} required
                onChange={(e)=>{setDescription(e.target.value)}}
                value={description}
            ></textarea>
            
            <fieldset 
                onChange={(e)=>{
                    getDays(e)
                }
            }>
                <legend>Days :</legend>
                <div className="champs">
                    <div>
                        <input type="checkbox" id="1" name="Day" value="MONDAY" 
                            
                        />
                        <label htmlFor="1">MONDAY</label>
                    </div>
                    <div>
                        <input type="checkbox" id="2" name="Day" value="TUESDAY"/>
                        <label htmlFor="2">TUESDAY</label>
                    </div>
                    <div>
                        <input type="checkbox" id="3" name="Day" value="WEDNESDAY"/>
                        <label htmlFor="3">WEDNESDAY</label>
                    </div>
                    <div>
                        <input type="checkbox" id="4" name="Day" value="THURSDAY" />
                        <label htmlFor="4">THURSDAY</label>
                    </div>
                    <div>
                        <input type="checkbox" id="5" name="Day" value="FRIDAY"/>
                        <label htmlFor="5">FRIDAY</label>
                    </div>
                    <div>
                        <input type="checkbox" id="6" name="Day" value="SATURDAY"/>
                        <label htmlFor="6">SATURDAY</label>
                    </div>
                    <div>
                        <input type="checkbox" id="7" name="Day" value="SUNDAY"/>
                        <label htmlFor="7">SUNDAY</label>
                    </div>

                </div>
            </fieldset>

            <select name="priority" id="priority" required
                value={priority} onChange={(e)=>{ setPriority(e.target.value) }}       
            >
                <option value="" disabled hidden>Niveau de priorité de la tache</option>
                <option value="green">Faible(vert)</option>
                <option value="yellow">Moyenne(jaune)</option>
                <option value="red">Elevée(Rouge)</option>
            </select>
            <input type="time" name="time" id="time" placeholder="Heure (Au format heure:minute)" required 
                value={hour} onChange={(e)=>{ setHour(e.target.value) }}
            />
            <button className="addBtn">ADD</button>
        </form>
    )
}