import { useState } from "react"
import "./profile.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Profile(){
    const [name,setName] = useState("")
    const [surName,setSurName] = useState("")
    const [email,setEmail] = useState(localStorage.getItem("email"))
    const navigate = useNavigate()


    axios.get(`https://taskflow-back.onrender.com/api/getprofile?email=${email}`)
    .then(user=>{
        setName(user.data.data.name)
        setSurName(user.data.data.surname)
    })
    .catch(err=>{
        //console.log({Error: err})
    })

    function delAccount() {
        axios.delete(`https://taskflow-back.onrender.com/api/delUser?email=${email}`)
        .then(succes=>{
            localStorage.removeItem("email")
            localStorage.removeItem("profile")
            setTimeout(() => {
                navigate("/login")
            }, 2500);
        })
        .catch(err=>{
            console.log({Error: err})
        })
    }

    return (
        <div className="Profile">
            <h2>Account Informations</h2>
            <p>
                <label htmlFor="">NAME: </label><input type="text" value={name}/>
            </p>
            <p>
                <label htmlFor="">SURNAME: </label><input type="text" value={surName}/>
            </p>
            <p>
                <label htmlFor="">EMAIL: </label><input type="text" value={email}/>
            </p>
            <div className="buttons">
                <button onClick={()=> delAccount() }>
                    <img src="/delete.svg" alt="delete" />
                    <span>DELETE</span>
                </button>
                <button>
                    <img src="/edit-2.svg" alt="modify" />
                    <span>MODIFY</span>
                </button>
            </div>
        </div>
    )

}