import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Avatar } from "@mui/material";
import React, { useState } from "react";
import "./Reel.css";  
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import TelegramIcon from "@mui/icons-material/Telegram";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useUserContext } from "../../userContext/userContext";

function Reel({ user, postImage, initialLikes, timestamp }) {
    const { user: currentUser } = useUserContext();
    const [likes, setLikes] = useState(initialLikes);
    const [liked, setLiked] = useState(false);
        
    // Lógica para manejar me gusta
    const handleLikeClick = () => {
        if (!liked) {
            setLikes(likes + 1);
            setLiked(true);
        } else {
            setLikes(likes - 1);
            setLiked(false);
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
                        <FavoriteBorderIcon className="reelIcon" />
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