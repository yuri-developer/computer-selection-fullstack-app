import { NextResponse } from 'next/server'
import { questionsDB } from '../questions'

export async function DELETE(req: Request, { id }: { id: number }) {
  if (questionsDB[id - 1]) {
    questionsDB.splice(id - 1, 1)
    questionsDB.forEach((elem, index) => {
      elem.id = index + 1
    })
  }
  return NextResponse.json({ questions: questionsDB })
}
