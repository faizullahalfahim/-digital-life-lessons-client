import { useQuery } from '@tanstack/react-query';
import React from 'react';

import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';


const useRole = () => {
    const { user , loading} = useAuth();
    const axiosSecure = useAxiosSecure();

    const { isLoading: roleLoading, data: role } = useQuery({
        queryKey: ['user-role', user?.email],
       enabled: !!user?.email && !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/role`);
            
           return res.data.role;
        }
    })

    return  {role, roleLoading};
};

export default useRole;