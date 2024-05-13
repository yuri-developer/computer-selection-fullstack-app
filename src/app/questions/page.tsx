import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Question } from '@/types/api'

interface QuestionProps {
  questions: Question[]
}

export default function Questions({ questions }: QuestionProps) {
  return (
    <div className=''>
      <Table>
        <TableCaption>Список вопросов</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Вопросы</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questions &&
            questions.map((item) => (
              <TableRow key={item.id}>
                <TableCell className='font-medium'>{item.content}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}
