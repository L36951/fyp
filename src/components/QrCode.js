import  QRCode  from "qrcode";
import { useEffect,useState } from "react";

const QrCode = ({text})=>{
    const [src,setSrc] =useState('');
    useEffect(()=>{
        QRCode.toDataURL(text).then((data)=>{
            setSrc(data);
        })
    },[])
    return(
    <div>
        <img src={src}/>
    </div>
    )
}