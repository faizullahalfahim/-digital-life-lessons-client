import React from 'react';
import Logo from '../components/Logo/Logo';
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <Logo></Logo>
            <div className='flex items-center'>
                <div className='flex-1'>
                    <Outlet></Outlet>
                </div>
                <div className='flex-1'>
                 
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;