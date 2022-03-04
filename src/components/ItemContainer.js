import React from 'react';
import Item from './Item';
const ItemContainer =()=>{
    return(
    <div className='grid grid-cols-1 sm:grid-cols3 lg:grid-cols-4'>
        
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
        <Item/>
    </div>)
}


export default ItemContainer;