import React from 'react'
import lottery from '../assets/lottery.png'

const Category = () => {
  return (
    <div className='w-full h-[80%] overflow-x-auto whitespace-nowrap p-2'>
    <div className='flex gap-4 w-max'>
      {[...Array(5)].map((_, index) => (
        <div key={index} className='flex flex-col items-center min-w-[120px]'>
          <img className='w-[8  0px] h-[80px]' src={lottery} alt="Lottery" />
          <h1 className='text-center mt-2'>Lottery</h1>
        </div>
      ))}
    </div>
  </div>
  )
}

export default Category