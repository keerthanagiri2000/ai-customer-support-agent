import { useState, useEffect, useRef } from 'react'
import { CHAT } from '../../config';
import { useNavigate, Link } from "react-router-dom";
import { formatTimestamp } from '../utils/dateFormat';


function Chat() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const token = localStorage.getItem("authToken");
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchChatHistory = async () => {
        try {
            const res = await fetch(CHAT.HISTORY, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await res.json();
            setChatHistory(data.chats || []);
        } catch (error) {
            console.error("Failed to fetch chat history:", error);
        }
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  useEffect(() => {
    fetchChatHistory()
  }, []);

const sendMessage = async (e) => {
    if(!token) {
       navigate("/login")
    }
    e.preventDefault();
    if (!message.trim()) return;

    const tempMsg = {
      _id: Date.now().toString(),  
      role: "user",
      message,
      createdAt: new Date().toISOString(),
   };
   
    setChatHistory((prev) => [...prev, tempMsg]);

    setMessage("");
    setIsTyping(true);

    try {
      const res = await fetch(CHAT.SEND, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();

      if (data.success) {
        await fetchChatHistory();
      } else {
        alert(data.message || "Failed to send message");
      }
    } finally {
      setIsTyping(false);
    }
};

const handleLogout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  navigate("/login");
};


  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 flex-col gap-6'>
      <div className='flex w-full justify-end pr-6 gap-6'>
        {(token && user) ? 
        <>
          <h1>Keerthana</h1>
          <button onClick={handleLogout} className='text-sm bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition'>Logout</button>
        </> : 
        <>
          <Link to='/login'>Login</Link>
        </>
        }
       
      </div>
      
      <div className='w-full max-w-md bg-white shadow-lg rounded-2xl flex flex-col h-[600px]'>
        <div className="px-4 py-3 border-b text-center font-semibold text-lg text-purple-700">
          AI Chat Support
        </div>
        <div className='flex-1 overflow-y-auto p-4 space-y-4'>
          {chatHistory.length === 0 ? (
            <div className='w-full flex items-center justify-center'>
              {token ? <span className='text-gray-500 text-sm'>No history</span> : <span className='text-gray-500 text-sm'>Login to continue chat</span>}
              
            </div>
          ) :  (chatHistory.map((chat) => (
            <div key={chat._id} className={`flex flex-col ${chat.role === 'user' ? "items-end" : "items-start" }`}>
              <div className={`text-sm px-4 py-2 rounded-2xl max-w-[75%]  ${chat.role === "user" ? "bg-purple-600 text-white" : "bg-gray-300 text-gray-800" } break-words whitespace-pre-wrap`}>
                {chat.message}
              </div>
              <span className='text-xs text-gray-500 mt-1'>{formatTimestamp(chat.createdAt)}</span>
            </div>
          )))}

           {isTyping && (
            <div className="flex items-start gap-2 text-sm text-gray-500">
              <div className="px-3 py-2 bg-gray-200 rounded-2xl animate-pulse">
                AI is typing...
              </div>
            </div>
          )}
         
          <div ref={chatEndRef} />
        </div>

        <form className='border-t p-3 flex items-center gap-2' onSubmit={sendMessage}>
          <input type='text' value={message}  onChange={(e) => setMessage(e.target.value)} placeholder='Type your message here...' className='flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400'/>
          <button type='submit' className='bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition'>Send</button>
        </form>
      </div>
    </div>
  )
}

export default Chat;
