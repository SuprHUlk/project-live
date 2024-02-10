import axios from "axios";

export const idToken = async (): Promise<boolean> => {
    try {
        const res = await axios.post('http://localhost:3000/verify/idToken', { idToken: localStorage.getItem('idToken')});
        return res.data.status;
        
    }
    catch(err) {
        console.log(err);
        return false;
    }
}