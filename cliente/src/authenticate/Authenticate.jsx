import React, { useState } from "react";
import "./Authenticate.css";
import Login from "./Login";
import Signup from "./Signup";
import { useUserContext } from "../features/userContext";

function Authenticate() {
    conole.log('Renderizando componente Authenticate...');
    const { loginUser } = useUserContext();
    const [active, setActive] = useState("login");

    const handleChange = () => {
        setActive(active === "login" ? "signup" : "login");
    };

    const handleSuccessfulLogin = async (userData) => {
        // Obtener el token del servidor
        const token = userData.token;
        console.log('Token guardado en el localStorage:', token);

        // Guarda el token en el contexto del usuario
        loginUser (userData);

        // Guarda el token en el almacenamiento local
        localStorage.setItem('authToken', token);

        // Recupera el token
        const storedToken = localStorage.getItem('authToken');
        console.log('Token recuperado del localStorage:', storedToken);
    };

    return (
        <div className="authenticate">
            <div className="auth__left">
                <img 
                    src="https://i.imgur.com/P3Vm1Kq.png" 
                    alt="Instagram Screenshots" 
                />
            </div>
            <div className="auth__right">
                {active === "login" ? <Login /> : <Signup />}

                <div className="auth__more">
                    <span>
                        {active === "login" ? (
                            <>
                                Don't have an account?{" "}
                                <button onClick={handleChange}>Sign Up</button>
                            </>
                        ) : (
                            <>
                                Have an account? <button onClick={handleChange}>Log in</button>
                            </>
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Authenticate;