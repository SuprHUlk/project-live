import axios from 'axios';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../resources/firebase-config";
import { NavigateFunction } from 'react-router-dom';

const API_URL: string = 'http://localhost:3000/auth';

export const login = async (loginData: {email: string, password: string}): Promise<any> => {
    try {
        const res = await axios.post(API_URL + '/login', loginData);
        return res.data;
    }
    catch(err: any) {
        return {msg: err.response.data.msg}
    }
}

export const signup = async (signupData: {username: string, email: string, password: string}): Promise<{msg: string}> => {
    try {
        const res = await axios.post(API_URL + '/signup', signupData);
        return res.data;
    }
    catch(err: any) {
        if(err.response.data.error) {
            return {msg: err.response.data.error.name}
        }
        return {msg: err.response.data.msg}
    }
}

export const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
        const googleSignIn = await signInWithPopup(auth, provider);

        return await onSuccessfulGoogleSignIn({username: googleSignIn.user.displayName!, email: googleSignIn.user.email!});
    }
    catch(err) {
        return {msg: 'UnknownError: Try again'};
    }
}

export const logout = (navigate: NavigateFunction) => {
    localStorage.clear();
    navigate("/");
}

const onSuccessfulGoogleSignIn = async (signupData: {username: string, email: string}) => {
    try {
        const res = await axios.post(API_URL + '/google', signupData);
        return res.data;
    }
    catch(err) {
        return {msg: 'UnknownError: Try again'};
    } 
}