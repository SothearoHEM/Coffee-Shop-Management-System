import { createContext, useEffect } from "react";
import { useState } from "react";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [users] = useState([
        {
        id: '1',
        name: 'Admin',
        email: 'admin@coffee.com',
        password: 'admin123',
        role: 'admin',
        phone: '+1 (555) 100-0001',
        hireDate: new Date('2023-01-15'),
        status: 'active',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        },
        {
        id: '2',
        name: 'Staff',
        email: 'staff@coffee.com',
        password: 'staff123',
        role: 'staff',
        phone: '+1 (555) 100-0002',
        hireDate: new Date('2023-03-22'),
        status: 'active',
        avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
        },
    ]);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const login = (name, password) => {
        const foundUser = users.find((u) => u.name === name && u.password === password);
        if (foundUser) {
            setUser(foundUser);
            setError(null);
            return true;
        } else {
            setError("Invalid email or password");
            return false;
        }
    };

    const logout = () => {
        setUser(null);
    };
  return (
    <AuthContext.Provider value={{ user, setUser, error, setError, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};