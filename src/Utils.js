const TOKEN_NAME = "token";

// 將 token 存到 localStorage
export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_NAME, token);
};

// 從 localStorage 讀取 token
export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_NAME);
};

export const refreshToken =async ()=>{

  try{
    const response = await fetch(`${process.env.REACT_APP_SECRET_APIPATH}api/auth/refresh`,{method:"GET",credentials:'include'}).then(res=>res.json());

  
    if(response.ok==1) {setAuthToken(response.newToken);}
    else{setAuthToken('');};
  }
  catch(error){
    console.log(error);
  }

}