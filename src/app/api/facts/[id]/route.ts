import { NextResponse } from 'next/server'
import { factsDB } from '../facts'

export async function DELETE(req: Request, { id }: { id: number }) {
  if (factsDB[id - 1]) {
    factsDB.splice(id - 1, 1)
    factsDB.forEach((elem, index) => {
      elem.id = index + 1
    })
  }
  return NextResponse.json({ facts: factsDB })
}
