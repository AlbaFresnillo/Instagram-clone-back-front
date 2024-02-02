/*
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDmO-ssBfRYY4Bv3E1SMqGFj8hovkTe8gA",
  authDomain: "instahab-b896f.firebaseapp.com",
  projectId: "instahab-b896f",
  storageBucket: "instahab-b896f.appspot.com",
  messagingSenderId: "524930664184",
  appId: "1:524930664184:web:XXX", // Reemplaza XXX con tu appId
};

// Inicializar la aplicación de Firebase con la configuración
const firebaseApp = initializeApp(firebaseConfig);

// Crear instancias de los servicios necesarios
const auth = getAuth(firebaseApp);

// Registrarse
const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Usuario registrado:", user);
    return user;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
};

// Iniciar sesión
const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Usuario autenticado:", user);
    return user;
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};

// Cerrar sesión
const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("Usuario cerró sesión");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    throw error;
  }
};

export { registerUser, loginUser, logoutUser };*/