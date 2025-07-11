import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [isLoading, setIsLoading] = useState(false);

  const betterSetUser = (user) => {
    if (user) {
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      setUser(null);
      localStorage.removeItem("user");
    }
  };

  const logoutUser = async () => {
    try {
      await axios.post("/api/users/logout");
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const contextValue = {
    user,
    isLoading,
    betterSetUser,
    setIsLoading,
    logoutUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, useUserContext };
