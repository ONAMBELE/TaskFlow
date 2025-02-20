import "./signIn.css"



export default function SignIn() {
    
    return (
        <div className="SignIn">
            <form action="">
                <h1>Sign In</h1>
                <input type="text" name="name" id="name" placeholder="Name" required/>
                <input type="text" name="surname" id="surname" placeholder="Surname" required/>
                <input type="email" name="email" id="email" placeholder="Email" required/>
                <input type="password" name="password" id="password" placeholder="Password" required/>
                <div className="errors">
                    {/* Lorem ipsum dolor sit amet
                    consectetur adipisicing elit.
                    Expedita, facilis! */}
                </div>
                <input type="submit" value="Sign In" className="submit"/>
                <div className="already">
                    <span>Already have account ? </span>
                    <a href="">Login</a>
                </div>
            </form>
        </div>
    )

}