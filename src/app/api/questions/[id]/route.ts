import { NextResponse } from 'next/server'
import { questions } from '../questions'

export async function DELETE(req: Request, { id }: { id: number }) {
  if (questions[id - 1]) {
    questions.splice(id - 1, 1)
    questions.forEach((elem, index) => {
      elem.id = index + 1
    })
  }
  return NextResponse.json({ questions })
}
