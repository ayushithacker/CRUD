import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { BsPersonFillAdd } from "react-icons/bs";
import { GrDocumentUpdate } from "react-icons/gr";
import { AiFillCloseCircle } from "react-icons/ai";

function App() {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newNumber, setNewNumber] = useState(0);

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const createUser = async () => {
    await addDoc(usersCollectionRef, {
      name: newName,
      email: newEmail,
      number: Number(newNumber),
    });
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  });

  const updateUser = async (id) => {
    const userDoc = doc(db, "users", id);
    const updatedData = {
      name: newName,
      email: newEmail,
      number: Number(newNumber),
    };

    await updateDoc(userDoc, updatedData);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  return (
    <div className="App">
      <input
        placeholder="Name..."
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Email..."
        onChange={(event) => {
          setNewEmail(event.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Number..."
        onChange={(event) => {
          setNewNumber(event.target.value);
        }}
      />

      <button className="add-btn" onClick={createUser}>
        {" "}
        Add User <BsPersonFillAdd />
      </button>
      {users.map((user) => {
        return (
          <div>
            {" "}
            <table align="center">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Number</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.number}</td>
                  <td>
                    {" "}
                    <button
                      className="update-btn"
                      onClick={() => {
                        updateUser(user.id);
                      }}
                    >
                      {" "}
                      Update User
                      <GrDocumentUpdate size="20px" color="white" />
                    </button>
                  </td>
                  <td>
                    {" "}
                    <button
                      className="delete-btn"
                      onClick={() => {
                        deleteUser(user.id);
                      }}
                    >
                      {" "}
                      Delete User
                      <AiFillCloseCircle size="20px" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}

export default App;
