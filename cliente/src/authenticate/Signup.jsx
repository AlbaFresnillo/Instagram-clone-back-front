import React, { useState } from "react";
import "./Signup.css";
import axios from 'axios';
// import { registerUser } from "../app/firebaseConfig";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState(null);

    const handleSignUp = async (event) => {
        event.preventDefault();

        // CON AXIOS
        if (!email || !password || !username) {
            setError("All fields are required.");
            return;
        }

        try {
            // Envia la solicitud al servidor Node.js para crear un nuevo usuario
            const response = await axios.post('/api/users/register', {
                email,
                password,
                username,
            });

            // Maneja la respuesta del servidor (puede variar según la implementación)
            if (response.data.success) {
                // Usuario creado exitosamente
                console.log('User created successfully');
            } else {
                // Maneja casos de error del servidor
                setError(response.data.message || 'Signup failed');
            }
        } catch (error) {
            setError(error.message || 'Signup failed');
        }
    };
    

    /* CON FIREBASE
    if (!email || !password || !username) {
        setError("All fields are required.");
        return;
    }

    try {
        // Usa la función de registro de usuario de Firebase
        await registerUser(email, password);

        // Usuario creado exitosamente
        console.log('User created successfully');
    } catch (error) {
        setError(error.message || 'Signup failed');
    }
    }; */

    return (
        <div className="signup">
            <img 
                src="https://www.pngkey.com/png/full/828-8286178_mackeys-work-needs-no-elaborate-presentation-or-distracting.png" 
                alt=""
            />
            <input 
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                value={email}
            />
            <input 
                onChange={(e) => setUsername(e.target.value)}
                type="username"
                placeholder="Username"
                value={username}
            />
            <input 
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                value={password}
            />
            {error && <div className="error-message">{error}</div>}
            <button onClick={handleSignUp}>Sign up</button>
        </div>
    );
}

export default Signup;