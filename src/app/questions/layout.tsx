'use client'

import { QuestionsService } from '@/api'
import SelectOptions from '@/components/my/SelectOptions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Question } from '@/types/api'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { questionsDB } from '../api/questions/questions'
import Questions from './page'

export default function CarsLayout({ children }: { children: React.ReactNode }) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [content, setContent] = useState<string>('')
  const [carName, setCarName] = useState<string>('')

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

  const handleAddQuestion = (newQuestion: Question) => {
    setQuestions((prevQuestion) => [...prevQuestion, newQuestion])
  }

  return (
    <>
      <div className='flex mx-[500px] my-[30px]'>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant='default' className='m-[10px]'>
              Добавить
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <div className='grid gap-4'>
              <div className='space-y-2'>
                <h4 className='font-medium leading-none'>Добавить вопрос</h4>
                <p className='text-sm text-muted-foreground'>Введите вопрос</p>
              </div>
              <div className='grid grid-cols-3 items-center gap-4'>
                <Label htmlFor='width'>Вопрос</Label>
                <Input
                  id='width'
                  defaultValue='question'
                  className='col-span-2 h-8'
                  onChange={(event) => {
                    setContent(event.target.value)
                  }}
                />
              </div>
              <Button
                variant={'default'}
                className='pt-[10px]'
                onClick={() => {
                  QuestionsService.add(content)
                  handleAddQuestion({
                    id: questions.length,
                    content: content,
                  })
                  toast('Вопрос успешно добавлен', {
                    description: `${String(new Date().getDate()).padStart(2, '0')}-${String(
                      new Date().getMonth() + 1
                    ).padStart(2, '0')}-${new Date().getFullYear()}`,
                    action: {
                      label: 'Скрыть',
                      onClick: () => console.log('Скрыть'),
                    },
                  })
                }}
              >
                Добавить
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant='destructive' className='m-[10px]'>
              Удалить
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <SelectOptions
              placeholder='Вопросы'
              items={questions.map((elem) => ({ propValue: elem.content, value: elem.content }))}
              onChange={(selectedOption: string) => {
                setCarName(selectedOption)
              }}
            />
            <Button
              variant={'destructive'}
              className='mt-[15px]'
              onClick={() => {
                const index = questions.findIndex((elem) => {
                  elem.content === carName
                })
                if (index) {
                  QuestionsService.deleteById(index)
                  setQuestions(questionsDB)
                  toast('Вопрос успешно добавлен', {
                    description: `${String(new Date().getDate()).padStart(2, '0')}-${String(
                      new Date().getMonth() + 1
                    ).padStart(2, '0')}-${new Date().getFullYear()}`,
                    action: {
                      label: 'Скрыть',
                      onClick: () => console.log('Скрыть'),
                    },
                  })
                } else {
                  toast('Вопрос не удалось удалить', {
                    description: `${String(new Date().getDate()).padStart(2, '0')}-${String(
                      new Date().getMonth() + 1
                    ).padStart(2, '0')}-${new Date().getFullYear()}`,
                    action: {
                      label: 'Скрыть',
                      onClick: () => console.log('Скрыть'),
                    },
                  })
                }
              }}
            >
              Удалить
            </Button>
          </PopoverContent>
        </Popover>
      </div>
      <div className='mx-[500px]'>
        <Questions questions={questions} />
      </div>
    </>
  )
}
