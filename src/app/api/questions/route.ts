import { NextResponse } from 'next/server'
import { questions } from './questions'

export async function GET(req: Request) {
  return NextResponse.json(questions)
}

export async function POST(req: Request) {
  const id = questions.length
  const content = await req.json()

  questions.push({ id, content })

  return NextResponse.json(questions[id])
}
