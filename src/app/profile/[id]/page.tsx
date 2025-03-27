import React from 'react'

const userProfile = ({params}:any) => {
  return (
    <div className='flex justify-center items-center min-h-screen py-2'>userProfile {params.id}</div>
  )
}

export default userProfile