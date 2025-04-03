import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import CorseIcon from '../assets/corseicon.gif'
import { Camera, Mail, User } from 'lucide-react';


const ProfilePage = () => {

  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Img = reader.result;
      setSelectedImg(base64Img);
      await updateProfile({ profileImage: base64Img })
    }
  }

  return (
    <div className='h-screen pt-20'>
      <div className='max-w-max mx-auto p-4 py-8  bg-tier2'>
        <div className='text-center'>
          <h1 className='text-2x1 font-semibold'>Profile</h1>
          <p className='mt-2'>Profile Info</p>
        </div>
        <div className='flex flex-col items-center gap-4'>
          <div className='relative'>
            <img src={selectedImg || authUser.profileImage || CorseIcon} alt="" className='size-32 rounded-full
            object-cover border-4'/>
            <label htmlFor="profile-image"
              className={` absolute bottom-0 right-0 hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}>
              <Camera className='w-5 h-5 text-blue-500' />
              <input type="file" id='profile-image' className='hidden' onChange={handleImageUpload} disabled={isUpdatingProfile} />
            </label>
          </div>
          <p className='text-sm'>{isUpdatingProfile ? "Uploading..." : "Click on the camera to update image"} </p>
        </div>

        <div className='space-y-6'>
          <div className='space-y-1.5'>
            <div className='text-sm flex items-center gap-2'>
              <User className='w-6 h-6' />
              Full Name
            </div>
            <p className='px-4 py-2.5 rounded-lg border'>
              {authUser?.fullName}
            </p>
          </div>
          <div className='space-y-1.5'>
            <div className='text-sm flex items-center gap-2'>
              <Mail className='w-6 h-6' />
              Email Address
            </div>
            <p className='px-4 py-2.5 rounded-lg border'>
              {authUser?.email}
            </p>
          </div>
          <div className='space-y-1.5'>
            <div className='text-sm flex items-center gap-2'>
              <Mail className='w-6 h-6' />
              Display Name
            </div>
            <p className='px-4 py-2.5 rounded-lg border'>
              {authUser?.displayName}
            </p>
          </div>
        </div>
        <div className='mt-6 rounded-x1 p-6'>
          <h2 className='text-lg font-medium mb-4'>Account Information</h2>
          <div className='flex items-center justify-between py-2 border-b border-tier1'>
            <span>Member since</span>
            <span>{authUser.createdAt?.split("T")[0]}</span>
          </div>
          <div className='flex items-center justify-between py-2'>
            <span>Account Status</span>
            <span className='text-green-500'>Active</span>
          </div>
        </div>
      </div>
    </div>

  )
}

export default ProfilePage
