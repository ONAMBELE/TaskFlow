import { useState } from "react"
import "./profile.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Profile(){
    const [name,setName] = useState("")
    const [surName,setSurName] = useState("")
    const email = localStorage.getItem("email")
    const navigate = useNavigate()
    const [popUpUpdate,setPopUpUpdate] = useState("")

    axios.get(`http://localhost:3000/api/getprofile?email=${email}`)
    .then(user=>{
        setName(user.data.data.name)
        setSurName(user.data.data.surname)
    })
    .catch(err=>{
        console.log({Error: err})
    })

    function delAccount() {
        axios.delete(`http://localhost:3000/api/delUser?email=${email}`)
        .then(succes=>{
            localStorage.removeItem("email")
            localStorage.removeItem("profile")
            setTimeout(() => {
                navigate("/login")
            }, 1500);
        })
        .catch(err=>{
            console.log({Error: err})
        })
    }

    return (
        <div className="Profile">
            {
                popUpUpdate
            }
            <h2>Account Informations</h2>
            <p>
                <label htmlFor="">NAME: </label><input id="name" type="text" value={name}/>
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
                <button onClick={()=>{ setPopUpUpdate(<UpdateUser onClose={()=>{ setPopUpUpdate("") }} />) }} >
                    <img src="/edit-2.svg" alt="modify" />
                    <span>MODIFY</span>
                </button>
            </div>
        </div>
    )

}


function UpdateUser(props){

    const [name,setName] = useState("")
    const [surName,setSurName] = useState("")
    const [email,setEmail] = useState(localStorage.getItem("email"))
    const navigate = useNavigate()

    function updateAccount() {
        axios.put(`http://localhost:3000/api/updateUser?email=${email}`,{
            name: name,
            surname: surName,
            email: email
        })
        .then(user=>{
            localStorage.setItem("email",email)
            localStorage.setItem("profile",name[0]+surName[0])
            setTimeout(() => {
                navigate("/dashboard")
            }, 1500);
        })
        .catch(error=>{
            console.log({Error: error})
        })
    }


    return (
        <div className="updateUser">
            <img src="/close.svg" alt="close" onClick={()=>{props.onClose?.()}}/>
            <form action="" onSubmit={(e)=> e.preventDefault()}>
                <h2>Update informations</h2>
                <input type="text" 
                    onChange={(e)=>{
                        setName(e.target.value)
                    }} 
                placeholder="Name" required/>
                <input type="text" 
                    onChange={(e)=>{
                        setSurName(e.target.value)
                        console.log(surName)
                    }} 
                placeholder="surname" required/>
                <input type="email" 
                    onChange={(e)=>{
                        setEmail(e.target.value)
                    }} 
                placeholder="email" value={email} required/>
                <button 
                    onClick={(e)=>{ updateAccount() }}
                >Update</button>
            </form>
        </div>
    )

}