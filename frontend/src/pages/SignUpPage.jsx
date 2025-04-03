import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import CorseIcon from '../assets/corseicon.gif'
import { Cat, Loader2, Lock, Mail, User } from 'lucide-react';
import InputLabel from '../components/InputLabel';
import ShowHideInput from '../components/ShowHideInput';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const SignUpPage = () => {


    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        displayName: "",
    });

    const { signup, isSigningUp } = useAuthStore();

    const validateForm = () => {
        if (!formData.fullName.trim()) return toast.error("Full name required!");
        if (!formData.email.trim()) return toast.error("Email is required!");
        if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid Email!");
        if (!formData.password) return toast.error("Password is required!");
        if (formData.password.length < 8) return toast.error("Password needs to be atleast 8 characters!")

        return true;
    };
    const handleSubmit = (event) => {
        event.preventDefault();

        const success = validateForm();
        if (success === true) signup(formData);
    }



    return (
        <div className='min-h-screen min-w-full grid lg:grid-cols-2'>

            <div className="flex flex-col justify-center items-center p-6 ">
                <div className='w-full max-w-md space-y-8 bg-tier2'>
                    <div className='flex flex-col items-center gap-2 group'>
                        <div className="text-xs rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <img src={CorseIcon} alt="" />

                        </div>
                        <h1 className='text-2x1 font-bold mt-2'>Create Account</h1>
                        <p className='text-base-content/60'>Enter the wastelands</p>
                    </div>
                    <form onSubmit={handleSubmit} className='space-y-8 flex flex-col justify-center items-center'>
                        <InputLabel
                            name="Full Name"
                            placeholder="Full Name"
                            icon={User}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                            type="text"
                            value={formData.fullName} />
                        <InputLabel
                            name="Display Name"
                            placeholder="Display Name"
                            icon={Cat}
                            onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                            type="text"
                            value={formData.displayName} />
                        <InputLabel
                            name="Email"
                            placeholder="Email"
                            icon={Mail}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            type="email"
                            value={formData.email} />
                        <ShowHideInput
                            name="Password"
                            placeholder="Password"
                            icon={Lock}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            value={formData.password} />
                        <button
                            
                            className='bg-transparent hover:bg-tier1 text-tier1 font-semibold hover:text-white py-2 px-4 border border-white-500 hover:border-transparent rounded'
                            disabled={isSigningUp}>
                            {isSigningUp ? (
                                <>
                                    <Loader2 className='size-5 anime-spin' />
                                    ...Loading
                                </>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>
                    <div className='text-center'>
                        <p className='text-base-content/60'>
                            Already due Course?
                            <Link to="/login" className='text-tier4'>
                                Return to the fray
                            </Link>
                        </p>
                    </div>
                </div>
            </div>


            <div className="flex flex-col justify-center items-center p-6 ">
                <div className='w-full max-w-md space-y-8 bg-tier2'>
                    <div className='flex flex-col items-center gap-2 group'>

                        <h1 className='text-[48px] font-bold mt-2 font-mono font-stretch-expanded tracking-wide motion-safe:animate-pulse' >In Due Course...</h1>
                        <div className="text-xs rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <img src={CorseIcon} alt="" />

                        </div>
                        <p className='text-base-content/60 motion-safe:animate-bounce'>Live Chat and RPG Experience</p>

                    </div>

                </div>
            </div>


        </div>
    )
}

export default SignUpPage
