import React from 'react'

const InputLabel = ({name, icon: Icon, placeholder, type, onChange, value }) => {
  return (
    <div className='form-control'>
                            <label className='label'>
                                <span className='label-text font-md'>{name}</span>
                            </label>
                            <div className='relative'>
                                {Icon && (
                                    <div className='absolute inset-y-0 left-0 pl-3 flex items-center
                            pointer-events-none'>
                                    <Icon className='size-5 text-base-content/40' />
                                </div>
                                )}
                                
                                <input type={type} 
                                    className={`input input-ghost w-full pl-10`}
                                    placeholder={placeholder}
                                    value={value}
                                    onChange={onChange} />
                            </div>
                        </div>
  )
}

export default InputLabel
{}