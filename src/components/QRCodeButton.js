import React, { useState, useRef, useEffect } from 'react';
import QrScanner from 'react-qr-scanner';
import  QrReader  from 'react-qr-reader';
import { QRCode } from 'qrcode';
import './QRCodeButton.css'
import { useNavigate } from 'react-router-dom';
const QRCodeButton = () => {
    const navigate = useNavigate();

    const [scanResultFile, setScanResultFile] = useState('');
    const [scanResultWebCam, setScanResultWebCam] =  useState('');
    const qrRef = useRef(null);
    const [qrcontainerStyle, setQrcontainerStyle] = useState({ position: "absolute", width: "20%", height: "20%", top: "20%", left: "0", display: "none" });
    const handleErrorFile = (error) => {
        console.log(error);
    }
    const handleScanFile = (result) => {
        if (result) {
            setScanResultFile(result);
            navigate(`/dashboard?id=${result}`)
        }
    }
    const onScanFile = () => {
        qrRef.current.openImageDialog();
    }
    const handleErrorWebCam = (error) => {
        console.log(error);
      }
      const handleScanWebCam = (result) => {
        if (result){
            setScanResultWebCam(result);
            console.log(result)
        }
       }
    return (
        <div className='qrcodeContainer'>
            <div className='qrcodeButtonContainer'>

                <button className='qrcodeButton openFile' onClick={onScanFile}><i className="fas fa-qrcode fa-2x"></i></button>

                <div style={qrcontainerStyle}>
                    {scanResultFile}
                    <QrReader
                        ref={qrRef}
                        delay={300}
                        style={{ width: '100%' }}
                        onError={handleErrorFile}
                        onScan={handleScanFile}
                        legacyMode
                    />
                 
                   
                </div>
            </div>
        </div>
    );
}

export default QRCodeButton;