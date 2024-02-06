import selectUserByIdModel from "../../models/users/selectUserByIdModel.js";
import updateUserAvatarModel from '../../models/users/updateUserAvatarModel.js';
import validateSchemaUtil from '../../util/validateSchemaUtil.js';
import editUserAvatarSchema from '../../schemas/users/editUserAvatarSchema.js';
import { deletePhotoService, savePhotoService } from "../../services/photoService.js";

const editUserAvatarController = async (req, res, next) => {
    try {
        const user = await selectUserByIdModel(req.user.id);

        if (user.avatar) await deletePhotoService(user.avatar);

        const avatarName = await savePhotoService(req.files.avatar, 100);

        await updateUserAvatarModel(avatarName, req.user.id);

        res.send({
            status: 'ok',
            message: 'Avatar actualizado correctamente',
        });

    } catch (error) {
        next(error);
    }
}

export default editUserAvatarController;