'use client'

import { FactService } from '@/api'
import { AddRequest } from '@/api/facts'
import SelectOptions from '@/components/my/SelectOptions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Fact } from '@/types/api'
import { CostsFact, RefuelFact, SpeedFact, StatusFact, TypeFact } from '@/types/api/facts'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { factsDB } from '../api/facts/facts'
import Facts from '../cars/page'

export default function CarsLayout({ children }: { children: React.ReactNode }) {
  const [facts, setFacts] = useState<Fact[]>([])
  const [content, setContent] = useState<string>('')
  const [costs, setCosts] = useState<CostsFact>()
  const [status, setStatus] = useState<StatusFact>()
  const [type, setType] = useState<TypeFact>()
  const [speed, setSpeed] = useState<SpeedFact>()
  const [refuel, setRefuel] = useState<RefuelFact>()
  const [carName, setCarName] = useState<string>('')

  const formData: AddRequest = { content, costs, status, type, speed, refuel }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await FactService.getAll()
        setFacts(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const handleAddFact = (newFact: Fact) => {
    setFacts((prevFacts) => [...prevFacts, newFact])
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
                <h4 className='font-medium leading-none'>Добавить автомобиль</h4>
                <p className='text-sm text-muted-foreground'>
                  Выберите соответствующие характеристики
                </p>
              </div>
              <div className='grid grid-cols-3 items-center gap-4'>
                <Label htmlFor='width'>Название</Label>
                <Input
                  id='width'
                  defaultValue='auto'
                  className='col-span-2 h-8'
                  onChange={(event) => {
                    setContent(event.target.value)
                  }}
                />
              </div>
              <div className='grid gap-2'>
                <div className='grid grid-cols-3 items-center gap-4'>
                  <SelectOptions
                    placeholder='Cтоимость'
                    items={[
                      { propValue: 'expensive', value: 'Дорого' },
                      { propValue: 'medium', value: 'Средне' },
                      { propValue: 'cheap', value: 'Дешево' },
                    ]}
                    onChange={(selectedOption: string) => {
                      setCosts(selectedOption as CostsFact)
                    }}
                  />
                </div>
                <div className='grid grid-cols-3 items-center gap-4'>
                  <SelectOptions
                    placeholder='Статус авто'
                    items={[
                      { propValue: 'family', value: 'Семейный' },
                      { propValue: 'sport', value: 'Спортивный' },
                      { propValue: 'compact', value: 'Компактный' },
                      { propValue: 'premium', value: 'Премиальный' },
                      { propValue: 'off-road', value: 'Внедорожный' },
                    ]}
                    onChange={(selectedOption: string) => {
                      setStatus(selectedOption as StatusFact)
                    }}
                  />
                </div>
                <div className='grid grid-cols-3 items-center gap-4'>
                  <SelectOptions
                    placeholder='Скорость'
                    items={[
                      { propValue: 'fast', value: 'Быстрая' },
                      { propValue: 'medium', value: 'Средняя' },
                      { propValue: 'slow', value: 'Медленная' },
                    ]}
                    onChange={(selectedOption: string) => {
                      setSpeed(selectedOption as SpeedFact)
                    }}
                  />
                </div>
                <div className='grid grid-cols-3 items-center gap-4'>
                  <SelectOptions
                    placeholder='Тип авто'
                    items={[
                      { propValue: 'sedan', value: 'Седан' },
                      { propValue: 'jeep', value: 'Джип' },
                      { propValue: 'crossover', value: 'Кроссовер' },
                    ]}
                    onChange={(selectedOption: string) => {
                      setType(selectedOption as TypeFact)
                    }}
                  />
                </div>
                <div className='grid grid-cols-3 items-center gap-4'>
                  <SelectOptions
                    placeholder='Тип топлива'
                    items={[
                      { propValue: 'fuel', value: 'Бензин' },
                      { propValue: 'electrical energy', value: 'Электричество' },
                    ]}
                    onChange={(selectedOption: string) => {
                      setRefuel(selectedOption as RefuelFact)
                    }}
                  />
                </div>
              </div>
              <Button
                variant={'default'}
                className='pt-[10px]'
                onClick={() => {
                  FactService.add(formData)
                  handleAddFact({
                    id: facts.length,
                    points: 0,
                    ...formData,
                  })
                  toast('Автомобиль успешно добавлен', {
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
              placeholder='Автомобиль'
              items={facts.map((elem) => ({ propValue: elem.content, value: elem.content }))}
              onChange={(selectedOption: string) => {
                setCarName(selectedOption)
              }}
            />
            <Button
              variant={'destructive'}
              className='mt-[15px]'
              onClick={() => {
                const index = facts.findIndex((elem) => {
                  elem.content === carName
                })
                if (index) {
                  FactService.deleteById(index)
                  setFacts(factsDB)
                  toast('Автомобиль успешно удален', {
                    description: `${String(new Date().getDate()).padStart(2, '0')}-${String(
                      new Date().getMonth() + 1
                    ).padStart(2, '0')}-${new Date().getFullYear()}`,
                    action: {
                      label: 'Скрыть',
                      onClick: () => console.log('Скрыть'),
                    },
                  })
                } else {
                  toast('Автомобиль не удалось удалить', {
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
        <Facts facts={facts} />
      </div>
    </>
  )
}
