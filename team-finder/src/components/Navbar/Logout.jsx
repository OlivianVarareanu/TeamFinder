import axios from 'axios'

 const Logout = async() => {

    try{
        const response = await axios.post('api/user/logout');

        
        console.log('user delogat?',response.data);

        if(response.data.success){
          
        window.location.reload();
        
        }
        
    }

    catch(error){
        console.log(error);
    }
  
}

export default Logout;


