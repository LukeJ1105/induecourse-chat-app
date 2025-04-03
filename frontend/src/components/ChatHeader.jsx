import React from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore';
import { X } from 'lucide-react';

const ChatHeader = () => {

    const {selectedUser, setSelectedUser} = useChatStore();
    const {onlineUsers} = useAuthStore();

  return (
    <div className='p-2.5 border-b'>
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
                <div className='avatar'>
                    <div className='size-10 rounded-full relative'>
                        <img src={selectedUser.profileImage} alt={selectedUser.displayName} />
                    </div>
                </div>

                <div>
                    <h3 className='font-medium'>{selectedUser.displayName}</h3>
                    <p className='text-sm'>{onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}</p>
                </div>

            </div>

            <button onClick={() => setSelectedUser(null)}>
                <X/>
            </button>

        </div>
    </div>
  )
}

export default ChatHeader
