export const notFoundError = (resource) => {
    throw {
        httpStatus: 404,
        code: 'RESOURCE_NOT_FOUND',
        message: `El recurso requerido '${ resource }' no existe`,
    };
};

export const userAlreadyRegisteredError = () => {
    throw {
        httpStatus: 409,// conflicto
        code: 'USER_ALREADY_REGISTERED',
        message: `El nombre de usuario ya se encuentra registrado`,
    };
};

export const emailAlreadyRegisteredError = () => {
    throw {
        httpStatus: 409, // conflicto
        code: 'EMAIL_ALREADY_REGISTERED',
        message: `El email ya se encuentra registrado`,
    };
};

export const invalidCredentialsError = () => {
    throw {
        httpStatus: 401, // no autorizado
        code: 'INVALID_CREDENTIALS',
        message: `Credenciales inválidas`,
    };
};

export const sendMailError = () => {
    throw {
        httpStatus: 500, // no autorizado
        code: 'SEND_MAIL_FAILED',
        message: `Error al enviar email`,
    };
};

export const pendignActivationError = () => {
    throw {
        httpStatus: 403, // pendiente de activar
        code: 'PENDING_ACTIVATION',
        message: 
        "Usuario pendiente de activación. Verifique su cuenta antes de continuar",
    };
};

export const notAuthenticatedError = () => {
    throw {
        httpStatus: 401, // autenticacion
        code: 'NOT_AUTHENTICATED',
        message: `Debes enviar un token en el header 'Authorization'`,
    };
};

export const saveFileError = () => {
    throw {
        httpStatus: 500,
        code: 'FILE_SAVE_FAILED',
        message: 'Error al guardar la imagen',
    };
};

export const deleteFileError = () => {
    throw {
        httpStatus: 409, 
        code: 'FILE_DELETED_FAILED',
        message: 'Error al eliminar la imagen',
    };
};

export const likeAlreadyExistsError = () => {
    throw {
        httpStatus: 409,
        code: 'LIKE_ALREADY_ERROR',
        message: 'No se puede dar like más de una vez',
    };
};

export const unauthorizedUserError = () => {
    throw {
        httpStatus: 409, 
        code: 'UNAUTHORIZED',
        message: 'El usuario no está autorizado para realizar esta operación',
    };
};

export const photoLimitError = () => {
    throw {
        httpStatus: 409, 
        code: 'PHOTO_LIMIT_ERROR',
        message: 'Se alcanzó el límite de tres fotos en la entrada',
    };
};

export const recoveryCodeError = () => {
    throw new Error ({
        httpStatus: 401,
        code: 'INVALID_RECOVER_CODE',
        message: 'Código de recuperación incorrecto',
    });
};

export const commentNotFoundError = () => {
    throw {
        httpStatus: 404,
        code: 'COMMENT_NOT_FOUND',
        message: 'Comentario no encontrado',
    };
};

export const unauthorizedCommentDeletionError = () => {
    throw {
        httpStatus: 403, 
        code: 'UNAUTHORIZED_COMMENT_DELETION',
        message: 'No tienes permisos para eliminar este comentario',
    };
};

export const likeDoesNotExistError = () => {
    throw {
        httpStatus: 404,
        code: 'LIKE_DOES_NOT_EXIST',
        message: 'El like no existe',
    };
};

export const cannotlikeOwnReelError = () => {
    throw {
        httpStatus: 403, // Forbidden
        code: 'CANNOT_LIKE_OWN_REEL',
        message: 'No puedes dar me gusta a tu propio reel',
    };
  };
  
  export const adminOnlyError = () => {
    throw {
      httpStatus: 403,
      code: "UNAUTHORIZED",
      message:
        "Solo el administrador puede cambiar role de usuario, contacte a admin por favor",
    };
  };

  export const pendingActivationError = () => {
    throw {
        httpStatus: 403,
        code: 'PENDING_ACTIVATION',
        message: "Usuario pendiente de activación. Verifique su cuenta antes de continuar",
    };
};