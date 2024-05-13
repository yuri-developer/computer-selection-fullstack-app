import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <main className='flex flex-col items-center justify-center p-24'>
      <header className='my-[50px] font-bold text-[30px]'>
        Добро пожаловать на самый лучший в мире сайт по подбору автомобиля
      </header>
      <div className='mt-[50px]'>
        <Button variant={'default'} size={'lg'}>
          <Link href={'/test'}>Начать тестирование</Link>
        </Button>
      </div>
    </main>
  )
}
