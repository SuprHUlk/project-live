import axios from 'axios';
import env from "dotenv";

// const API_URL: string = process.env.REACT_APP_API_URL + '/auth';
const API_URL: string = 'http://localhost:3000/auth';

interface UserData {
    msg: string,
    idToken: string,
    username: string,
}

export const login = async (loginData: {email: string, password: string}): Promise<UserData> => {
    try {
        const res = await axios.post(API_URL + '/login', loginData);
        return res.data;
    }
    catch(err) {
        console.log(err);
        throw new Error('error');
    }
}

export const signup = async (signupData: {username: string, email: string, password: string}): Promise<{msg: string}> => {
    try {
        const res = await axios.post(API_URL + '/signup', signupData);
        return res.data;
    }
    catch(err) {
        console.log(err);
        throw new Error('error');
    }
}
