import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import { Outlet } from 'react-router';


const RootLayout = () => {
    return (
        <div>
           <header>
             <Navbar> </Navbar>
           </header>
              <main> 
                <Outlet> </Outlet>
              </main>
              <footer> 
                
              </footer>
            
            
        </div>
    );
};

export default RootLayout;