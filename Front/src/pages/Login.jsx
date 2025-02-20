import "./login.css"


export default function Login() {
    
    return (
        <div className="Login">
            <form action="">
                <h1>Login</h1>
                <input type="email" name="email" id="email" placeholder="Email" required/>
                <input type="password" name="password" id="password" placeholder="Password" required/>
                <div className="errors">
                    {/* Lorem ipsum dolor sit amet
                    consectetur adipisicing elit.
                    Expedita, facilis! */}
                </div>
                <input type="submit" value="Login" className="submit"/>
                <div className="already">
                    <span>Don't have account ? </span>
                    <a href="">Sign In</a>
                </div>
            </form>
        </div>
    )

}