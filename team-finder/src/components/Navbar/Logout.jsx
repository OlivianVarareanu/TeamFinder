import axios from 'axios'

export const Logout = async() => {
    try{
        const response = await axios.post('api/user/logout');
        localStorage.clear();
        console.log(response);

        return response;
    }
    catch(error){
        console.log(error);
    }
  
}