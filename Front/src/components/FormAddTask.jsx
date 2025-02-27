import { useState } from "react"
import "./formAddTask.css"
import axios from "axios"


export default function FormAddTask(props) {
    const [display,setDisplay] = useState(props.display)
    let day = []
    const [description,setDescription] = useState("")
    const [hour,setHour] = useState("") 
    const [priority,setPriority] = useState("")



    function handlePost() {
        axios.post("http://localhost:3000/api/setTask",{
            day: day, hour: hour, object: description, idUser: props.email,priority: priority
        }).then(res=>{ window.location.reload()})
        .catch(err=>{ console.log("Error: " + err)})
    }

    function getDays(e) {
        day.push(e.target.value)
        console.log(day.toString())
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
            
            <fieldset 
                onChange={(e)=>{
                    getDays(e)
                }
            }>
                <legend>Days :</legend>
                <div className="champs">
                    <div>
                        <input type="checkbox" id="1" name="Day" value="LUNDI" 
                            
                        />
                        <label htmlFor="1">LUNDI</label>
                    </div>
                    <div>
                        <input type="checkbox" id="2" name="Day" value="MARDI" 
                            onChecked={(e)=>{
                                console.log(e)
                            }}
                        />
                        <label htmlFor="2">MARDI</label>
                    </div>
                    <div>
                        <input type="checkbox" id="3" name="Day" value="MERCREDI" 
                            onChecked={(e)=>{
                                console.log(e)
                            }}
                        />
                        <label htmlFor="3">MERCREDI</label>
                    </div>
                    <div>
                        <input type="checkbox" id="4" name="Day" value="JEUDI" 
                            onChecked={(e)=>{
                                console.log(e)
                            }}
                        />
                        <label htmlFor="4">JEUDI</label>
                    </div>
                    <div>
                        <input type="checkbox" id="5" name="Day" value="VENDREDI" 
                            onChecked={(e)=>{
                                console.log(e)
                            }}
                        />
                        <label htmlFor="5">VENDREDI</label>
                    </div>
                    <div>
                        <input type="checkbox" id="6" name="Day" value="SAMEDI" 
                            onChecked={(e)=>{
                                console.log(e)
                            }}
                        />
                        <label htmlFor="6">SAMEDI</label>
                    </div>
                    <div>
                        <input type="checkbox" id="7" name="Day" value="DIMANCHE" 
                            onChecked={(e)=>{
                                console.log(e)
                            }}
                        />
                        <label htmlFor="7">DIMANCHE</label>
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
                onChange={(e)=>{ setHour(e.target.value) }}
            />
            <button className="addBtn">ADD</button>
        </form>
    )
}