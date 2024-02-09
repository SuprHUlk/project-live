import axios from 'axios';

const API_URL = 'https://localhost:3000/auth';

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
