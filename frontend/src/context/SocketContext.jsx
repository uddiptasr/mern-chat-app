import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider=({children})=>{
    const [socket,setSocket]=useState(null);
    const [onlineUser,setOnlineUsers]=useState([]);
    const {authUser}=useAuthContext();
    
    // http://localhost:5000
    useEffect(()=>{
        if(authUser){
            const socket=io("https://mern-chat-app-prod-2afn.onrender.com/",{
                query:{
                    userId:authUser._id
                },
            });
            setSocket(socket);

            socket.on("getOnlineUsers",(users)=>{
                setOnlineUsers(users);
            });
            return ()=>socket.close();
        }
        else{
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
    },[authUser]);
    return <SocketContext.Provider value={{socket,onlineUser}}>{children}</SocketContext.Provider>
}