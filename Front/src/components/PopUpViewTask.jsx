import "./popUpViewTask.css"




export default function PopUpViewTask(props) {
    
    return (
        <div className="PopUpViewTask">
            <div className="tasks">
                <p>Lorem ipsum, dolor sit amet 
                    consectetur adipisicing elit. 
                    Earum, quasi!
                </p>
            </div>
            <div className="details">
                <div className="descriptions">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                    Aliquam est et sed suscipit. Minus, sequi.
                </div>
                <span className="hour"></span>
                <span className="day">Monday</span>
                <button id="update">Update</button> <button id="delete">Delete</button>
            </div>
        </div>
    )

}