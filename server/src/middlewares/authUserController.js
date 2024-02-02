import jwt from "jsonwebtoken";
import { notAuthenticatedError, invalidCredentialsError } from "../services/errorService.js";
import { SECRET } from "../../env.js";

// Función controladora intermedia que desencripta el token y crea la propiedad "req.user".
// Si no hay token lanza un error.
const authUserController = async (req, res, next) => {
  try {
    // Siempre debemos enviar el token a través de la propiedad "Authorization" de los headers.
    // Aunque la propiedad "Authorization" se escriba con "A" mayúscula, en node la recibimos
    // con la "a" minúscula.
    const { authorization } = req.headers;

    if (!authorization) {
      notAuthenticatedError();
    }

    let tokenInfo;

      try {
        // Variable que almacenará la info del token.
        //console.log(SECRET);
        const tokenInfo = jwt.verify(authorization, SECRET);
      } catch (error) {
        invalidCredentialsError();
      }

      // Si hemos llegado hasta aquí quiere decir que el token ya se ha desencriptado.
      // Creamos la propiedad "user" en el objeto "request" (es una propiedad inventada).
      req.user = tokenInfo;
      // Después de asignar req.user
      console.log('Información del usuario:', req.user);

      // Pasamos el control a la siguiente función controladora.
      next();
    } catch (err) {
      console.log('Error al verificar el token:',err);
    }
  };
  
export default authUserController;