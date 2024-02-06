import selectUserByIdModel from "../../models/users/selectUserByIdModel.js";

const getOwnUserController = async (req,res,next) => {
    try {
        const { id } = req.user;

        const user = await selectUserByIdModel(id);

        if (!user) {
            return res.status(404).send({
                status: "error",
                message: "El recurso requerido 'usuario' no existe",
            });
        }

        res.send({
            status: 'ok',
            data: {
                user,
            },
        });
    } catch (error) {
        next(error);
    }
};

export default getOwnUserController;