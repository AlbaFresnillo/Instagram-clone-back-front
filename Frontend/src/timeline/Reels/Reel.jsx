import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Avatar } from "@mui/material";
import React, { useState, useEffect } from "react";
import "./Reel.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import TelegramIcon from "@mui/icons-material/Telegram";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useUserContext } from "../../userContext/userContext";
import axios from "axios";
import { sendReelLikeService, deleteReelLikeService } from "../../app/axiosConfig";

function Reel({ user, postImage, reelId, initialLikes, timestamp }) {
  const { user: currentUser } = useUserContext();
  const [likeId, setLikeId] = useState(null);
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    // Lógica para cargar el estado de like inicial desde el servidor
    // Solicitud GET al backend para obtener la información de like para este reel
    // Por simplicidad, asumiremos que el backend devuelve si el usuario actual ha dado like a este reel
    axios
      .get(`/api/reel/${reelId}/likes`, {
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
        },
      })
      .then((response) => {
        setLiked(response.data.liked);
        setLikes(response.data.likesCount);
        if (response.data.likeId) {
          setLikeId(response.data.likeId);
        }
      })
      .catch((error) => {
        console.error("Error fetching likes:", error);
      });
  }, [reelId, currentUser.token]);

  // Lógica para manejar me gusta
  const handleLikeClick = () => {
    if (!liked) {
      // Llama a sendReelLikeService para dar el like al reel
      sendReelLikeService({ reelId, token: currentUser.token })
        .then(() => {
          setLikes(likes + 1);
          setLiked(true);
        })
        .catch((error) => {
          console.error("Error liking reel:", error);
        });
    } else {
      if (likeId) {
        // Llama a sendReelLikeService para quitar el like del reel
        deleteReelLikeService({ reelId, likeId, token: currentUser.token })
          .then(() => {
            setLikes(likes - 1);
            setLiked(false);
          })
          .catch((error) => {
            console.error("Error unliking reel:", error);
          });
      } else {
        console.error("No likeId available for deletion");
      }
    }
  };

  return (
    <div className="reel">
      <div className="reel__header">
        <div className="reel__headerAuthor">
          <Avatar style={{ marginRight: "10px" }}>
            {user.charAt(0).toUpperCase()}
          </Avatar>{" "}
          {user} • <span>{timestamp}</span>
        </div>
        <MoreHorizIcon />
      </div>
      <div className="reel__image">
        <img src={postImage} alt="ReelImg" />
      </div>
      <div className="reel__footer">
        <div className="reel__footerIcons">
          <div className="reel__iconsMain">
            <FavoriteBorderIcon
              className="reelIcon"
              onClick={handleLikeClick}
            />
            <ChatBubbleOutlineIcon className="reelIcon" />
            <TelegramIcon className="reelIcon" />
          </div>
          <div className="reel__iconSave">
            <BookmarkBorderIcon className="reelIcon" />
          </div>
        </div>
        Liked by {likes} people.
      </div>
    </div>
  );
}

export default Reel;
