import React, { useState } from "react";
import { useUserContext } from "../userContext/userContext";
import "./Login.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { logInUserService } from "../app/axiosConfig";

// Función para hacer solicitud de login
function Login({onSuccess}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { betterSetUser } = useUserContext();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('/api/users/login', { email, password });
            const data = await logInUserService({ email, password })

            betterSetUser(data);
            navigate("/home");

        } catch (error) {
            alert(error.message);
        }
    };
    
    const isFormIncomplete = !email || !password;

    return (
        <div className="login">
            <img 
                src="https://www.pngkey.com/png/full/828-8286178_mackeys-work-needs-no-elaborate-presentation-or-distracting.png" 
                alt="" 
            />
            <input 
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
            />
            <input 
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"  
            />
            <button onClick={handleLogin} disabled={isFormIncomplete}>
                Log in
            </button>
        </div>
    );
}

export default Login;
