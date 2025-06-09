import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider, updateProfile } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext)
}

// authProvider
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            if (user) {
                localStorage.setItem('authToken', user.accessToken || '');
            } else {
                localStorage.removeItem('authToken');
            }
        });
        return () => unsubscribe();
    }, []);

    // register a user
    const registerUser = async (name, email, password) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        await setDoc(doc(getFirestore(), "users", userCredential.user.uid), {
            uid: userCredential.user.uid,
            name,
            email,
            createdAt: new Date()
        });
        return userCredential;
    }

    // login the user
    const loginUser = async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        setCurrentUser(userCredential.user);
        localStorage.setItem('authToken', userCredential.user.accessToken || '');
        return userCredential.user.accessToken || '';
    }

    // logout the user
    const logout = async () => {
        await signOut(auth);
        setCurrentUser(null);
        localStorage.removeItem('authToken');
    }

    const value = {
        registerUser,
        loginUser,
        logout,
        currentUser
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
