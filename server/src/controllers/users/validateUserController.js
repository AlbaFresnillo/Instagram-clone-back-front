import updateUserRegCodeModel from "../../models/users/updateUserRegCodeModel.js";

const validateUserController = async (req, res, next) => {
    try {
        const { registrationCode } = req.params;

        // Actualiza el usuario y obtén el token
        const token = await updateUserRegCodeModel(registrationCode);

        res.send({
            status: "ok",
            message: "Usuario activado",
            data: {
                token,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default validateUserController;
