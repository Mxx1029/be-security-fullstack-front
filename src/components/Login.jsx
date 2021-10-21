import { useState } from 'react';


export default function Login( { login }) {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    return (
        <div>
            <input 
                type="text" 
                placeholder="email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input 
                type="password" 
                placeholder="password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            {/* <button onClick={login}>Login</button> */}
            {/* when login was moved here from App.js, uncomment this */}
            <button onClick={() => login(email, password)}>Login</button>
            {/* like this you would call login() if it's not declared here, but in the parent */}
        </div>
    )
}