'use client'

import { QuestionsService } from '@/api'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Question } from '@/types/api'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import { factsDB } from '../api/facts/facts'

const Testing: FC = () => {
  const [progress, setProgress] = useState<number>(0)
  const [count, setCount] = useState<number>(0)
  const [questions, setQuestions] = useState<Question[]>([])
  const [answer, setAnswer] = useState<string>('yes')

  const { replace } = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await QuestionsService.getAll()
        setQuestions(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div className='flex justify-center'>
      <Card className='w-[800px] m-[50px]'>
        <CardHeader>
          <CardTitle>Выбор подходящего автомобиля</CardTitle>
          <CardDescription>Отвечайте честно, чтобы результаты были правдивыми.</CardDescription>
        </CardHeader>
        <Progress value={progress} className='w-[80%] ml-[23px] mb-[30px]' />
        <CardContent>
          <form>
            <div className='grid w-full items-center gap-4'>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='name' className='font-bold text-md'>
                  Вопрос
                </Label>
                <p>{questions[count]?.content}</p>
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='framework' className='font-bold text-md'>
                  Ответ
                </Label>
                <RadioGroup className='flex self-center gap-10'>
                  <div className='items-center space-x-2'>
                    <RadioGroupItem
                      value='Yes'
                      id='r1'
                      onClick={() => {
                        setAnswer('Yes')
                      }}
                    />
                    <Label htmlFor='r1'>Да</Label>
                  </div>
                  <div className='items-center space-x-2'>
                    <RadioGroupItem
                      value='No'
                      id='r2'
                      onClick={() => {
                        setAnswer('No')
                      }}
                    />
                    <Label htmlFor='r2'>Нет</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className='flex justify-between'>
          <Button
            variant='outline'
            onClick={() => {
              if (count >= 0) {
                setProgress((count * 100) / questions.length)
                setCount((prevCount) => prevCount - 1)
              }
            }}
          >
            Назад
          </Button>
          <Button
            onClick={() => {
              if (answer === 'Yes')
                factsDB.forEach((elem) => {
                  if (questions[count]?.costs === elem?.costs) elem.points++
                  if (questions[count]?.status === elem?.status) elem.points++
                  if (questions[count]?.type === elem?.type) elem.points++
                  if (questions[count]?.speed === elem?.speed) elem.points++
                  if (questions[count]?.refuel === elem?.refuel) elem.points++
                })
              if (count + 1 <= questions.length - 1) {
                setProgress(((count + 1) * 100) / questions.length)
                setCount((prevCount) => prevCount + 1)
              } else {
                replace('/test/result')
              }
            }}
          >
            Далее
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Testing
