'use client'

import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react"

const authContext=createContext<{
    isAuthenticated:Boolean
login:(token:string)=>void
logout:()=>void,
token:string|null
}>({
    isAuthenticated:false,
    login:()=>{},
    logout:()=>{},
    token:null,
   


});

export function Authprovider({ children }:{children:React.ReactNode}){
const router=useRouter();
const [isAuthenticated, setisAuthenticated] = useState(false);
const [token,settoken]=useState<string|null>(null);
//const [userCred,setuserCred]=useState<{name:string,email:string,password:string}>({name:'',email:"",password:''})

useEffect(() => {
const token=localStorage.getItem("authToken");
if (token !==null) {
    setisAuthenticated(true);
    settoken(token);
}
}, [])

const login=(token:string)=>{
    localStorage.setItem("authToken",token)
settoken(token);
setisAuthenticated(true);
router.push("/dashboard");
}

const logout=()=>{
    localStorage.removeItem("authToken");
    settoken(null);
    setisAuthenticated(false);
router.push("/")
}
return(
<authContext.Provider value={{login,logout,isAuthenticated,token}}>{children}</authContext.Provider>
)
}

export function useAuth(){
    return useContext(authContext);
}