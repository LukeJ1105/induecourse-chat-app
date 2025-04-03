import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import CorseIcon from '../assets/corseicon.gif'
import {LogOut, User} from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore';

const HomeLayout = () => {

    const {authUser, logout} = useAuthStore();

    return (
        <div>
            <div className='bg-tier2 border-b border-tier3 fixed w-full top-0 z-40
            backdrop-blur-lg bg-black-700/80 mb-5'>
                <div className='container mx-auto px-4 h-16'>
                    <div className='flex items-center justify-between h-full'>
                        <div className='flex items-center gap-8'>
                            <Link to='/' className="flex items-center gap-2.5 hover:opacity-60
                            transition-all">
                                <div className='w-12 h-12 rounded-lg flex items-center justify-center'>
                                    <img src={CorseIcon} alt="" className='w-12 h-12' />
                                </div>
                                <h1 className='text-lg font-bold'>In Due Course...</h1>
                            </Link>
                        </div>
                        {authUser &&(
                            <div className='flex items-center gap-2'>
                                <Link to='/profile'>
                                <User className='size-10'/>
                                <span className='hidden sm-inline'>Profile</span>
                                </Link>
                                <button onClick={logout}>
                                    <LogOut className='size-10'/>
                                    <span className='hidden sm-inline'>Log out</span>
                                </button>
                            </div>
                        )}
                        {!authUser &&(
                            <div className='flex items-center gap-2'>
                                <Link to='/login'>
                                <User className='size-10'/>
                                <span className='hidden sm-inline'>Login</span>
                                </Link>
                                <Link to='/signup'>
                                <User className='size-10'/>
                                <span className='hidden sm-inline'>Sign-up</span>
                                </Link>
                            </div>
                        )}
                        
                    </div>
                </div>
            </div>
            <Outlet/>
        </div>
    )
}

export default HomeLayout
