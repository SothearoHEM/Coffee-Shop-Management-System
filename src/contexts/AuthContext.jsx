import { createContext, useEffect, useState } from "react";

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
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState(() => {
        const savedCurrentUser = localStorage.getItem('currentUser');
        return savedCurrentUser ? JSON.parse(savedCurrentUser) : null;
    });
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const savedIsLoggedIn = localStorage.getItem('isLoggedIn');
        return savedIsLoggedIn === 'true';
    });

    // Persist authentication state to localStorage
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        } else {
            localStorage.removeItem('currentUser');
        }
    }, [currentUser]);

    useEffect(() => {
        localStorage.setItem('isLoggedIn', isLoggedIn);
    }, [isLoggedIn]);

    const login = (username, password) => {
        const foundUser = users.find((u) => u.name === username && u.password === password && u.status === 'active');  
        if (foundUser) {
            setUser(foundUser);
            setCurrentUser({
                userId: foundUser.id,
                name: foundUser.name,
                role: foundUser.role,
            });
            setIsLoggedIn(true);
            return true;
        } else {
            setError('Invalid username or password');
            setIsLoggedIn(false);
            return false;
        }
    };

    const logout = () => {
        setCurrentUser(null);
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('isLoggedIn');
    };
  return (
    <AuthContext.Provider value={{ users, user, setUser, error, setError, login, logout, currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn}}>
      {children}
    </AuthContext.Provider>
  );
};