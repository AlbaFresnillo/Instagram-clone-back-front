import React, { useState } from "react";
import { useUserContext } from "../features/userContext";
import "./Login.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
// import { loginUser } from "../app/firebaseConfig";

// Función para hacer solicitud de login
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUser } = useUserContext();
    const navigate = useNavigate();

    const handleLogin = async () => {
        // CON AXIOS
        try {
            const response = await axios.post('/api/users/login', { email, password });
            const user = response.data;

            setUser(user);
            navigate("/home");
        } catch (error) {
            alert(error.message);
        }
    };
    
        /* CON FIREBASE
        try {
            // Usa la función de inicio de sesión de Firebase
            const user = await loginUser(email, password);

            // Usuario autenticado exitosamente
            setUser(user);
            navigate("/home");
        } catch (error) {
            alert(error.message);
        }
    }; */
    
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
