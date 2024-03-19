import axios from 'axios'
import apiURL from '../../../apiURL';
import api from '../../api/api';
 const Logout = async() => {

    try{
        const response = await api.post(`${apiURL}/user/logout`);

        
        console.log('user delogat?',response);
        localStorage.clear();
        if(response.data.success){
          
        window.location.reload();
        console.log('user delogat');
        }
        
    }

    catch(error){
        console.log(error);
    }
  
}

export default Logout;


