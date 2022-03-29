import React,{useState,useEffect} from 'react';

const TestingAPI =()=>{
    const [data,setData] = useState();
    const API_URL = `${process.env.REACT_APP_SECRET_APIPATH}api/fishpond/query`;
    useEffect(() => {
        const fetchItems = async()=>{
            try{
                const response = await fetch(API_URL);
                const listItems = await response.json();
                setData(listItems);
                console.log(listItems);
            }catch(err){
                console.log(err.stack);
            }
            
        }
        (async()=> await fetchItems())();
    }, []);
    return(
        <>

        </>
    );
}

export default TestingAPI;