import React, {useState, useEffect } from 'react';
import { auth } from '../firebase'; // Make sure to configure Firebase
import {

createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged,
} from 'firebase/auth';

import { AuthContext } from './AuthContextInstance';

export const AuthProvider = ({ children }) => {
const [currentUser, setCurrentUser] = useState(null);
const [loading, setLoading] = useState(true);

const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

const logout = () => {
    return signOut(auth);
};

useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false);
    });

    return unsubscribe;
}, []);

const value = {
    currentUser,
    signup,
    login,
    logout,
};

return (
    <AuthContext.Provider value={value}>
        {!loading && children}
    </AuthContext.Provider>
);
};