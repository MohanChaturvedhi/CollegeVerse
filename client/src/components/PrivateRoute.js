import React,{useContext} from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/SidebarContext';


function PrivateRoute() {
  const {auth}=useContext(AuthContext);
  return auth ?(
       
          <Navigate to='/home' replace/>
      
        )   
      :
        (
         <Navigate to="/login" replace />
        )
  
 
  
}

export default PrivateRoute;