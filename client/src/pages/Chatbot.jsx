import React, { useEffect, useRef, useState } from "react";
import ChatbotIcon from "../components/ChatbotIcon";
import Chatform from "../components/Chartform";
import { companyInfo } from "../companyInfo";
import ChatMessage from "../components/ChatMessage";


const Chatbot = () =>{
    const [chatHistory, setChatHistory] = useState([{
        hideInChat: true,
        role: "model",
        text: companyInfo
    }])
    const [showChatbot, setShowChatbot] = useState(false)
    const chatBodyRef = useRef()

    const generateBotResponse = async(history)=>{
        const updateHistory = (text, isError = false) => {
            setChatHistory(prev => [...prev.filter(msg=>msg.text !== "Thinking..."), {role: "model", text,isError}]);
        }
        history = history.map(({role, text})=>(
            {role, parts: [{text}]}
        ));
        const requestOptions = {
            method: "POST",
            headers: {  "Content-Type": "application/json"  },
            body: JSON.stringify({contents: [
                {
                    role: "user",
                    parts:[{text: companyInfo}]
                },
                ...history
            ]})
        }

        try{
            const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
            const data = await response.json();
            if(!response.ok) throw new Error(data.error.message || "Something went wrong!");

            const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
            updateHistory(apiResponseText);

        } catch(error){
            updateHistory(error.message, true);
        }
    }

    useEffect(()=>{
        chatBodyRef.current.scrollTo({top: chatBodyRef.current.scrollHeight, behaviour: "smooth" });
    },[chatHistory])

    return(
        <div className={`container ${showChatbot ? "show-chatbot" : ""}`}>
            <button onClick={()=> setShowChatbot(prev => !prev)} id="chatbot-toggler">
                <span className="material-symbols-rounded">
                    mode_comment
                </span>
                <span className="material-symbols-rounded">
                    close
                </span>
                
            </button>
            <div className="chat-popup">
                {/* Chatbot header */}
                <div className="chat-header">
                    <div className="header-info">
                        <ChatbotIcon/>
                        <h2 className="logo-text">Chatbot</h2>
                    </div>
                    <button onClick={()=> setShowChatbot(prev => !prev)}className="material-symbols-rounded">
                        keyboard_arrow_down
                    </button>
                </div>
                {/* body */}
                <div ref={chatBodyRef} className="chat-body">
                    <div className="message bot-message">
                        <ChatbotIcon/>
                        <p className="message-text">
                            Hey there! <br/>
                            Could not find a buyer/seller?<br/>
                            Want any alternatives for the residue? <br />
                            Tell me how can I help you today?
                        </p>
                        
                    </div>
{/* remember chat history dynamically */}
                    {chatHistory.map((chat, index)=>(
                        <ChatMessage key={index} chat = {chat}/>
                    ))}
                     
                </div>
                {/* footer */}
                <div className="chat-footer">
                    <Chatform chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse}/>
                </div>
            </div>


        </div>
    )
}

export default Chatbot