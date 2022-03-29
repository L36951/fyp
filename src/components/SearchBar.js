import React, { useState } from 'react';
import './SearchBar.css'
import { Search } from '@material-ui/icons';
import { useNavigate } from 'react-router-dom';
const SearchBar =({placeholder,data})=>{
    const [text,setText] = useState('')
    const navigate = useNavigate();
    const handleClick=()=>{
        navigate(`/dashboard?id=${text}`)
    }
    return(
     
        <div className='search'>
            <div className='searchInputs'>
                <input type='text' placeholder={placeholder} value={text} onChange={(e)=>setText(e.target.value)}/>
                <div className='searchIcon' onClick={handleClick} style={{cursor:'pointer'}}><Search/></div>
            </div>
            
        </div>
    );
}

export default SearchBar;