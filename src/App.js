import { useState } from 'react';
import Login from './components/Login.jsx';
import Main from './components/Main.jsx';
import './App.css';

const userFromStorage = localStorage.getItem("user");
const defaultUser = userFromStorage ? JSON.parse(userFromStorage) : null; // you turn the string from localStorage back into JSON

function App() {
    
    const [ user, setUser ] = useState(defaultUser); // with this you can open a new window and go to the same address and still be logged in

    // TODO: move this to Login component later
    function login(email, password) {
        const url = "http://localhost:8067/login";
        const data = { email, password };
        const init = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        };
        // TODO: make a seperate request function and put it into a libs folder
        fetch(url, init)
            .then(response => response.json())
            .then(result => {
                // console.log(result);
                if (!result.user) {
                    return alert("Login failed, check inputs")
                }
                console.log("SUCCESS ", result) // returns user & token
                localStorage.setItem("token", result.token);
                localStorage.setItem("user", JSON.stringify(result.user)); // user is an object, localStorage can only save strings
                setUser(result.user); 
            }) 
            .catch((err) => console.log("Error while fetching ", err));
    }

    // move this to Main component later
    function logout() {
        localStorage.clear();
        setUser(null);
    }

    // not needed anymore, done w/conditional rendering in return statement when Main component was created
    // if (user) {
    //     return (
    //         <Main user={user} logout={logout} />
    //     )
    // }

  return (
    <div className="App">
      <header className="App-header">
        {user ? 
            <Main user={user} logout={logout} /> 
        :
            <Login login={login} />
        }
      </header>
    </div>
  );
}

export default App;
