import React, { useState, useEffect } from 'react';
import SocialCard from './SocialCard';

import './DashboardBox.css'
const DasboardBox = (props) => {
    const [users, setUsers] = useState([]);
    const [allUsers,setAllUsers] = useState([]);
    useEffect(() => {
        (async () => {
            let userData;
            try {
                const response = await fetch("https://randomuser.me/api/?results=10");
                userData = await response.json();
            } catch (error) {
                console.log(error);
                userData = [];
            }
            setAllUsers(userData.results);
            setUsers(userData.results);
        })();
    }, []);

    const filterCard = event =>{
        const value=event.target.value.toLowerCase();
        const filteredUsers = allUsers.filter(
            user=>(`${user.name.first} ${user.name.last}`
            .toLowerCase()
            .includes(value)
            )
        );
        setUsers(filteredUsers);
    };
    return (
        <div className='DashboardBox'>
            <h1>SocialCard</h1>
            <input className='search-box' placeholder='Search...' onInput={filterCard}/>
            <div className="cards-container">

                {users.map((user, index) => (
                    <SocialCard key={index} userData={user} />
                ))}
            </div>
         </div>

    );


}

export default DasboardBox;