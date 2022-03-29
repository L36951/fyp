import React, {useState,useRef } from 'react';
import { Container,Card,CardContent,makeStyles,Grid,TextField,Button } from '@material-ui/core';
import  QRCode  from 'qrcode';
import  QrReader  from 'react-qr-scanner';

const QRCodeGenerator =()=>{
    const classes = useStyles();
    const [text,setText] = useState('');
    const [imageUrl,setImageUrl] = useState('');
    const qrRef = useRef(null);
    const [scanResultFile,setScanResultFile] = useState('');
    const [scanResultWebCam,setScanResultWebCam] = useState('');
    const generateQrcode = async ()=>{
        try{
            const response = await QRCode.toDataURL(text);
            setImageUrl(response); 
        }
        catch(error){
            console.log(error);
        }
    }

    const handleErrorFile =(error)=>{
        console.log(error);
    }
    const handleScanFile =(result)=>{
        if(result){
            setScanResultFile(result)
        }
    }

    const onScanFile =()=>{
        qrRef.current.openImageDialog();
    }
    const handleErrorWebCam =(error)=>{
        console.log(error);
    }
    const handleScanWebCam =(result) =>{
        console.log(result);
        if(result){
           
            setScanResultWebCam(result.text);
        }
    }

    return(
        <Container className={classes.container}>
            <Card>
                <h2 className={classes.title}>Generate Download & Scan QR code with react.js</h2>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xl={4} lg={5} md={6} sm={12} xs={12}>
                            <TextField label="Enter Text Here" onChange={(e)=>{setText(e.target.value)}}/>
                            <Button className='btn' variant='contained' color="primary" onClick={()=>generateQrcode()}>Generate</Button>
                            {imageUrl ? (<a href={imageUrl} download><img src={imageUrl} alt="img"/></a>):null}
                            
                        </Grid>
                        
                       
                        <Grid item xl={4} lg={5} md={6} sm={12} xs={12}>
                            <h3>Qr Code Scan by Web Cam</h3>
                            <QrReader
                                delay={300}
                                style={{width:'100%'}}
                                onError={handleErrorWebCam}
                                onScan={handleScanWebCam}
                            />
                            <h3>Scanned By WebCam :{scanResultWebCam}</h3>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
}


const useStyles = makeStyles((theme)=>({
    Container:{
        marginTop:10
    },
    title:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        background:'#3f51b5',
        color:'#fff',
        padding:20
    },
    btn:{
        marginTop:10,
        marginBottom:20
    }
}));
export default QRCodeGenerator;