import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkele from './skeles/MessageSkele';
import { useAuthStore } from '../store/useAuthStore';
import { formatMessageTime } from '../lib/utils';

const ChatContainer = () => {

    const {messages, getMessages, isMessagesLoading, selectedUser, subscribeToMessages, unsubscribeToMessages} = useChatStore();
    const {authUser} = useAuthStore();
    const messageEndRef = useRef(null);
    useEffect(() => {
        getMessages(selectedUser._id)

        subscribeToMessages();

        return () => unsubscribeToMessages();

    }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeToMessages])

    useEffect(()=>{
        if(messageEndRef.current && messages){
            messageEndRef.current.scrollIntoView({behavior: "smooth"})}
    },[messageEndRef, messages])

    if(isMessagesLoading) return (
        <div className='flex-1 flex flex-col overflow-auto'>
            <ChatHeader/>
            <MessageSkele/>
            <MessageInput/>
        </div>
    )

  return (
    <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeader />

        <div className='flex-1 overflow-y-auto p-4 space-y-4'>
            {messages.map((message) =>(
                <div key={message._id} className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`} ref={messageEndRef}>
                    <div className='chat-image avatar'>
                        <div className='size-10 rounded-full border'>
                            <img src={message.senderId === authUser._id ? authUser.profileImage : selectedUser.profileImage} alt="profile image" />
                        </div>
                    </div>
                    <div className='chat-header mb-1'>
                        <time className='text-xs opacity-50 ml-1'>{formatMessageTime(message.createdAt)}</time>
                    </div>
                    <div className='chat-bubble chat-bubble-neutral flex flex-col'>
                        {message.image && (
                            <img src={message.image} alt="Attachment" className='sm:max-w-[200px] rounded-md mb-2' />
                        )}
                        {message.text && <p>{message.text}</p>}
                    </div>
                </div>
            ))}
        </div>

        <MessageInput />
    </div>
  )
}

export default ChatContainer
