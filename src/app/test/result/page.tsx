'use client'

import { factsDB } from '@/app/api/facts/facts'
import { FC } from 'react'

const Result: FC = () => {
  const maxObject = factsDB.reduce((max, obj) => (obj.points > max.points ? obj : max))

  const result =
    maxObject.points > 0 ? maxObject : { content: 'Не возможно определить подходящий автомобиль' }

  return (
    <div className='flex flex-col justify-center items-center pt-[150px]'>
      <p className='text-xl font-bold m-[20px]'>Больше всего вам подходит:</p>
      <p className='m-[20px]'>{result?.content}</p>
    </div>
  )
}

export default Result
