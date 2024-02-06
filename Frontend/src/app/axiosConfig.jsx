import axios from 'axios';
axios.defaults.baseURL = "http://localhost:3001/";


export const registerUserService = async ({ email, username, password }) => {
  const response = await axios.post(`/api/users/register`, { email, username, password });
  return response.data;
};

export const validateUserRegistrationService = async (registrationCode) => {
  const response = await axios.get(`/api/users/validate/${registrationCode}`);
  return response.data;
};

export const logInUserService = async ({ email, password }) => {
  const response = await axios.post(`/api/users/login`, { email, password });
  return response.data;
};

export const logOutUserService = async () => {
  const response = await axios.post(`/api/users/logout`);
  return response.data;
};

export const getMyDataService = async (token) => {
  const response = await axios.get(`/api/users`, { headers: { Authorization: token } });
  return response.data;
};

export const getUserDataService = async (userId) => {
  const response = await axios.get(`/api/user/${userId}`);
  return response.data;
};

export const updateUserProfileService = async (data, token) => {
  const response = await axios.put(`/api/users/profile`, data, { headers: { Authorization: token } });
  return response.data;
};

export const updateUserRoleService = async ({ userId, role, token }) => {
  const response = await axios.put(`/api/users/${userId}/role`, { role }, { headers: { Authorization: token } });
  return response.data;
};

export const updateUserPasswordService = async ({ currentPassword, newPassword, token }) => {
  const response = await axios.put(`/api/users/password`, { currentPassword, newPassword }, { headers: { Authorization: token } });
  return response.data;
};

export const updateUserAvatarService = async ({ avatar, token }) => {
  const response = await axios.put(`/api/users/avatar`, { avatar }, { headers: { Authorization: token } });
  return response.data;
};

export const recoverPasswordService = async ({ email }) => {
  const response = await axios.post(`/api/users/password/recover`, { email });
  return response.data;
};

export const getAllReelsService = async () => {
  const response = await axios.get(`/api/reel`);
  return response.data;
};

export const getSingleReelService = async (reelId) => {
  const response = await axios.get(`/api/reel/${reelId}`);
  return response.data;
};

export const getReelLikesService = async (reelId) => {
  const response = await axios.get(`/api/reel/${reelId}/likes`);
  return response.data;
};

export const getReelPhotosService = async (reelId) => {
  const response = await axios.get(`/api/reel/${reelId}/photos`);
  return response.data;
};

export const getReelCommentsService = async (reelId) => {
  const response = await axios.get(`/api/reel/${reelId}/comments`);
  return response.data;
};

export const sendReelLikeService = async ({ reelId, token }) => {
  const response = await axios.post(`/api/reel/${reelId}/likes`, {}, { headers: { Authorization: token } });
  return response.data;
};

export const deleteReelLikeService = async ({ reelId, likeId, token }) => {
  const response = await axios.delete(`/api/deleteLike/${reelId}/${likeId}`, { headers: { Authorization: token } });
  return response.data;
};

export const sendReelCommentService = async ({ reelId, comment, token }) => {
  const response = await axios.post(`/api/reel/${reelId}/comments`, { comment }, { headers: { Authorization: token } });
  return response.data;
};

export const deleteReelCommentService = async ({ reelId, commentId, token }) => {
  const response = await axios.delete(`/api/deleteComment/${reelId}/${commentId}`, { headers: { Authorization: token } });
  return response.data;
};
