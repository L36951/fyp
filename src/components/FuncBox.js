import React from 'react';
import "./FuncBox.css"
const FuncBox=(props)=>{

    return(
        <div className='FuncBox'>
            <div className='FuncboxText' >
                {props.text}
            </div>
        </div>
    );
}

export default FuncBox;