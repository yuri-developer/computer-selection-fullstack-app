import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Fact } from '@/types/api'

interface FactProps {
  facts: Fact[]
}

export default function Facts({ facts }: FactProps) {
  return (
    <div className=''>
      <Table>
        <TableCaption>Список автомобилей</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Автомобили</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {facts &&
            facts.map((item) => (
              <TableRow key={item.id}>
                <TableCell className='font-medium'>{item.content}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  )
}
