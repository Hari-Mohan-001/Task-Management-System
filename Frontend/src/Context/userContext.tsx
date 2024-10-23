import { createContext, useState, useEffect, useContext } from "react";

interface UserContextType {
  user: any;
  saveUser: (userData: any) => void;
  logoutUser: () => void;
}

// Set up default values for the context
const defaultUserContext: UserContextType = {
  user: null,
  saveUser: () => {},
  logoutUser: () => {},
};

// Create the UserContext with default values
const UserContext = createContext<UserContextType>(defaultUserContext);

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);

  // Load user data from localStorage when the app starts
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Set the user from localStorage
    }
  }, []);

  // Function to save user and persist it in localStorage
  const saveUser = (userData: any) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // Persist user data
  };

  // Function to logout and clear user data from state and localStorage
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove user data from localStorage
  };

  return (
    <UserContext.Provider value={{ user, saveUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
