import React from 'react'
import Navbar from '../components/Navbar'
import { DrawerWithForm } from '../components/Drawer'
import QuestionsContainer from '../components/QuestionsContainer'


const page = () => {
  return (
    <div className='h-screen fixed overflow-y-auto w-full bg-blue-50'>
      <Navbar/>
      <h2 className='text-black text-center mt-3 mb-5'>Discussion Section</h2>
      <DrawerWithForm/>
      <QuestionsContainer/>
    </div>
  )
}

export default page