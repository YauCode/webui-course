/* eslint-disable no-unused-vars */
import '../App.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from "firebase/auth";
import {
    collection,
    getDocs,
    setDoc,
    addDoc,
    deleteDoc,
    doc
} from 'firebase/firestore/lite';
import { auth, db } from '../firebase';


function Banner() {
    return (
        <h1>Todo App with React and Firebase</h1>
    )
}

function ToDoFormAndList() {
    const navigate = useNavigate();
    const [itemText, setItemText] = useState("");
    const [items, setItems] = useState([]);
    // data is loading
    const [loading, setLoading] = useState(true);

    // Logout
    const handleLogout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
            // An error happened.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
    }


    // load todo list items
    useEffect(() => {
        const fetchData = async () => {
            // connect todos collection
            const todosCol = collection(db, 'todos');
            const todoSnapshot = await getDocs(todosCol);
            // todo text and id 
            // document id is unique, so it can be used with deleting todo
            const todos = todoSnapshot.docs.map(doc => {
                return {
                    text: doc.data().text,
                    id: doc.id
                };
            });
            // set states
            //console.log(todos);
            setItems(todos);
            setLoading(false);
        }
        // start loading data
        console.log("fetch data...")
        fetchData();
    }, []); // called only once

    // add todo
    const handleSubmit = async (event) => {
        // prevent normal submit event
        event.preventDefault();
        // add item to Firebase
        let newItem = { text: itemText };
        const docRef = await addDoc(collection(db, "todos"), newItem);
        // get added doc id and set id to newItem
        newItem.id = docRef.id;
        // update states in App
        setItems([...items, newItem]);
        // modify newItem text to ""
        setItemText("")
    }

    // remove todo
    const removeItem = (item) => {
        // delete from firebase
        deleteDoc(doc(db, "todos", item.id));
        // delete from items state and update state
        let filteredArray = items.filter(collectionItem => collectionItem.id !== item.id);
        setItems(filteredArray);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' value={itemText} onChange={event => setItemText(event.target.value)} placeholder="Write a new todo here" />
                <input type='submit' value='Add' />
            </form>
            <ul>
                {loading &&
                    <p>Loading...</p>
                }
                {items.map(item => (
                    <li key={item.id}>
                        {item.text + " "} <span onClick={() => removeItem(item)}> x </span>
                    </li>
                ))}
            </ul>
            <input type='button' value='Logout' onClick={handleLogout} />
        </div>
    )
}

function Home() {

    const navigate = useNavigate();

    // check if Login in
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in
                const uid = user.uid;
                // ...
                console.log("uid", uid)


            } else {
                // User is signed out
                // ...
                navigate("/");
                return (console.log("NEED TO LOGIN"))
            }
        });

    }, [navigate])


    return (
        <div>
            <Banner />
            <ToDoFormAndList />
        </div>
    );
}

export default Home;
