import axios from 'axios';
import React from 'react';
;


const axiosSecure = axios.create({
    baseURL: "http://localhost:3000",
})
const useAxiosSecure = () => {
//    const {user , logOut} = useAuth();


   return axiosSecure;
};

export default useAxiosSecure;