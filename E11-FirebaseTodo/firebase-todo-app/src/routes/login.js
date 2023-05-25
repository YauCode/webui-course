import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';


function Banner() {
    return (
        <h1>LOGIN</h1>
    )
}

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                navigate("/home")
                console.log("Login successfully")
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });

    }

    // check if Login in
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                const uid = user.uid;
                // ...
                console.log("uid", uid)
                navigate("/home");
            } else {
                // User is signed out
                // ...
                return (console.log("NEED TO LOGIN"))
            }
        });

    }, [navigate])

    return (
        <div>
            <Banner />
            <form>
                <table>
                    <tbody>
                        <tr>
                            <td>Email:</td>
                            <td><input type='text'
                                placeholder="Email"
                                name="email"
                                autoComplete="email"
                                onChange={event => setEmail(event.target.value)} /></td>
                        </tr>
                        <tr>
                            <td>Password:</td>
                            <td><input type='password'
                                placeholder="Password"
                                name="password"
                                autoComplete="off"
                                onChange={event => setPassword(event.target.value)} /></td>
                        </tr>
                        <tr>
                            <td><input type='button' value='Login' onClick={onLogin} /></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default Login;