import React, { useEffect, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import SidebarSkele from './skeles/SidebarSkele';
import { Users } from 'lucide-react';
import CorseIcon from '../assets/corseicon.gif'
import { useAuthStore } from '../store/useAuthStore';

const Sidebar = () => {
    const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
    const {onlineUsers} = useAuthStore();
    const [showOnlineOnly, setShowOnlineOnly] = useState(false);

   const filteredUsers = showOnlineOnly ? users.filter(user=>onlineUsers.includes(user._id)) : users;

    useEffect(() => {
        getUsers();
    }, [getUsers])

    if (isUsersLoading) return <SidebarSkele />

    return (
        <aside className='h-full w-20 lg:w-72 border-r flex flex-col transition-all duration-200'>
            <div className='border-b w-full p-5'>
                <div className='flex items-center gap-2'>
                    <Users className='size-6' />
                    <span className='font-medium hidden lg:block'>Contacts</span>
                </div>
                {/*Toggle Online Here*/}
                <div className='mt-3 hidden lg:flex items-center gap-2'>
                    <label className='cursor-pointer flex items-center gap-2'>
                        <input type="checkbox" checked={showOnlineOnly} onChange={(e) =>setShowOnlineOnly(e.target.checked)} className='checkbox checkbox-sm checkbox-neutral' />
                        <span className='text-sm btn btn-sm btn-ghost hover:bg-tier1 hover:text-white'>Show online only</span>
                    </label>
                    <span className='text-xs text-zinc-500'>{onlineUsers.length -1} online</span>
                </div>
            </div>

            <div className='overflow-y-auto w-full py-3'>
                {filteredUsers.map((user) => (
                    <button
                        key={user._id}
                        onClick={() => setSelectedUser(user)}
                        className={`w-full p-3 flex flex-col items-center justify-center gap-3 hover:bg-tier4 transition-colors
                    ${selectedUser?._id === user._id ? "bg-tier3 ring-1 ring-red-600" : ""}`}
                    >
                        <div className='relative  flex mx-auto lg:max-0'>
                            <img src={user.profileImage || CorseIcon}
                                alt={user.displayName}
                                className='size-16 object-cover rounded-full pr-2' />
                            {onlineUsers.includes(user._id) && (
                                <span className='absolute bottom-0 right-0 size-3 bg-green-500
                            rounded-full ring-2 ring-zinc-900'/>

                            )}
                            <div className='hidden lg:block text-left min-w-0'>
                                <div className='font-medium truncate'>{user.displayName}</div>
                                <div className='text-sm'>{onlineUsers.includes(user._id) ? "Online"
                                    : "Offline"}</div>
                            </div>
                        </div>


                    </button>
                ))}

                {filteredUsers.length === 0 && (
                    <div className='text-center py-4'>No online users!</div>
                )}

            </div>

        </aside>
    );
};

export default Sidebar
