import { useState } from 'react';

export default function Main(props) {

    const [ message, setMessage ] = useState("");
    const [ file, setFile ] = useState(null);

    // make a different file to build this (import requests from './lib/requests.js')
    function saveMessage() {
        const url = "http://localhost:8067/message";
        const data = { message };
        const init = {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify(data)
        };

        fetch(url, init) 
            .then(response => response.json())
            .then(result => console.log(result))
            .catch(err => console.error("Error while saving message: ", err));
    }

    function handleFileSelect(e) {
        setFile(e.target.files[0]); // .files will always be an array to enable multiple selections
        console.log(e.target.files);
    }

    function saveFile() {
        if (!file) {
            return alert("Select a file first")
        }

        // FormData is built into the browser and does the bundling that normally would be done by the HTML form
        // using JS to built a form
        const formData = new FormData();
        // in the debugger the following line can be found in req.files[0]
        formData.append("selectedFile", file); // .append(<form field>, <value>)
        // in the debugger the following 2 tests can be found in req.body
        // formData.append("test", "this is a test"); // try to send a string
        // formData.append("test2", { foo: "bar"}); // try to send an object as content in the form --> doesn't work, is displayed as [Object object]

        const url = "http://localhost:8067/file";
        const init = {
            method: "POST",
            body: formData // already a string
        }
        fetch(url, init)
            .then(response => response.json())
            .then(result => console.log(result)) 
            // .then(console.log) also works
            .catch(err => console.log("Error while saving file: ", err))
            // .catch(console.error)
    }

    return (
        <div>
            <h2>Welcome to the dschungle, {props.user.email}</h2>
            <button onClick={props.logout}>Logout</button>
            <hr /> 
            <div> 
                <input 
                    type="text" 
                    value={message} 
                    placeholder="message here"
                    onChange={(e) => setMessage(e.target.value)}
                />
                {/* Contacts the backend & saves the message in the database */}
                <button onClick={saveMessage}>Save message</button> 
            </div>
            <hr />
            <div>
                <input 
                    type="file"
                    onChange={handleFileSelect}
                />
                <button onClick={saveFile}>Save file</button>
                <br />
                {file && (
                    <div>
                        <div>File name: {file.name}</div>
                        <div>File type: {file.type}</div>
                        <div>File size: {(file.size / 1024).toFixed(1)} kilobytes</div>
                        <div>Last modified: {file.lastModifiedDate.toISOString()}</div>
                    </div>
                )}
            </div>

        </div>
    )
}