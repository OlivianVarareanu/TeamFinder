import axios from 'axios'
import apiURL from '../../../apiURL';
 const Logout = async() => {

    try{
        const response = await axios.post(`${apiURL}/user/logout`);

        
        console.log('user delogat?',response.data);
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


