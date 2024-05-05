import { NextResponse } from 'next/server'
import { facts } from '../facts'

export async function DELETE(req: Request, { id }: { id: number }) {
  if (facts[id - 1]) {
    facts.splice(id - 1, 1)
    facts.forEach((elem, index) => {
      elem.id = index + 1
    })
  }
  return NextResponse.json({ facts })
}
