import React,{useState, useEffect} from 'react';
import {useInterval} from 'react-use'
import { useSearchParams } from 'react-router-dom';
import { useRowSelect } from 'react-table';
import styled, { keyframes } from 'styled-components';

const AnimatedText =({text})=>{
    const reactArray = text.split("");
 /*   const reactArray2 = "System".split("");
    const [item,setItem] = useState(reactArray);
    const [count,setCount]= useState(0);
    const [play,setPlay] = useState(false);
 
    useInterval(
        ()=>{
            setItem(reactArray);
            setCount(count+1);
            if(count ==1){
                setCount(0);
                setItem(reactArray2);
            }
        },
        play ? 6000:null
    )
    useEffect(()=>{
        const timer = setTimeout(()=>{

            setItem(reactArray2);
            setPlay(true)
        },4000);

        return()=>clearTimeout(timer);
    },[]);
*/
    return(
        <Wrapper>
            {reactArray.map((item,index) => 
                <span key={index}>{item}</span>
            )}
        </Wrapper>
    )

}

const animation = keyframes`
    0%{opacity:0; transform : translateY(-100px) skewY(10deg) skewX(10deg) rotateZ(30deg);filter:blur(10px);}
    100%{opacity:1;transform : translateY(0px) skewY(0deg) skewX(0deg) rotateZ(0deg);filter:blur(0px);}
    `;
const Wrapper = styled.div`
    display:block;
    text-align:center;
    font-size:5vw;
    span{
        display:inline-block;
        opacity:0;
        animation-name:${animation};
        animation-duration:2s;
        animation-fill-mode:forwards;
        
        animation-timing-function: cubic-bezier (0.075,0.82,0.165,1);
    }
    span:nth-child(1){
        animation-delay:0.1s;
    }
    span:nth-child(2){
        animation-delay:0.2s;
    }
    span:nth-child(3){
        animation-delay:0.3s;
    }
    span:nth-child(4){
        animation-delay:0.4s;
    }
    span:nth-child(5){
        animation-delay:0.5s;
    }
    span:nth-child(6){
        animation-delay:0.6s;
    }
    span:nth-child(7){
        animation-delay:0.7s;
    }
    span:nth-child(8){
        animation-delay:0.8s;
    }
    span:nth-child(9){
        animation-delay:0.9s;
    }
    span:nth-child(10){
        animation-delay:1s;
    }
    
`;

export default AnimatedText;