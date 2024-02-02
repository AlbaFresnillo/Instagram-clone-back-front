import React from "react";
import "./Sidenav.css";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar } from "@mui/material";
import { useUserContext } from "../features/userContext";
import axios from "axios";
// import { logoutUser } from "../app/firebaseConfig";


// Función para hacer la solicitud de logout
function Sidenav() {
    const { user, logoutUser } = useUserContext();

    // CON AXIOS
    const handleLogout = async () => {
        try {
            // Obtener el token del almacenamiento local
            const token = localStorage.getItem('authToken');
            console.log('Token en Sidenav:', token);
            
            // Si no hay token
            if (!token) {
                console.error('No hay un token de autenticación');
                return;
            }

            // Hacer la solicitud de cierre de sesión con el token
            await axios.post('http://localhost:3001/api/users/logout',{}, {
                headers: {
                    Authorization: token,
                },
            });

            // Limpiar el token del contexto del usuario
            logoutUser();

            // Limpiar el token del almacenamiento local
            localStorage.removeItem('authToken');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    /* CON FIREBASE
    const handleLogout = async () => {
        try {
            // Usa la función de logout de Firebase
            await logoutUser();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }; */
    
    // Verifica si 'user' es no nulo antes de acceder a sus propiedades
    const username = user ? user.username : "Anónimo";
    const firstLetter = username ? username.charAt(0).toUpperCase() : "";

    return (
        <div className="sidenav">
            <img className="sidenav__logo"
                src="https://www.pngkey.com/png/full/828-8286178_mackeys-work-needs-no-elaborate-presentation-or-distracting.png"
                alt="Instagram Logo" />

            <div className="sidenav__buttons">
                <button className="sidenav__button">
                    <HomeIcon />
                    <span>Home</span>
                </button>

                <button className="sidenav__button">
                    <SearchIcon />
                    <span>Search</span>
                </button>

                <button className="sidenav__button">
                    <ExploreIcon />
                    <span>Explore</span>
                </button>

                <button className="sidenav__button">
                    <SlideshowIcon />
                    <span>Reels</span>
                </button>

                <button className="sidenav__button">
                    <ChatIcon />
                    <span>Messages</span>
                </button>

                <button className="sidenav__button">
                    <FavoriteBorderIcon />
                    <span>Notifications</span>
                </button>

                <button className="sidenav__button">
                    <AddCircleOutlineIcon />
                    <span>Create</span>
                </button>

                <div className="sidenav__button">
                    <Avatar>
                        {user.username ? user.username.charAt(0).toUpperCase() : "A"}
                    </Avatar>
                    <span>{user.username}{" "}</span>
                    <button onClick={handleLogout} className="logout__button">Logout</button>
                </div>
            </div>

            <div className="sidenav__more">
                <button className="sidenav__button">
                    <MenuIcon />
                    <span className="sidenav__buttonText">More</span>
                </button>
            </div>
        </div>
    );
}

export default Sidenav;
