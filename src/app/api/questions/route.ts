import { NextResponse } from 'next/server'
import { questionsDB } from './questions'

export async function GET(req: Request) {
  return NextResponse.json(questionsDB)
}

export async function POST(req: Request) {
  const id = questionsDB.length
  const content = await req.json()

  questionsDB.push({ id, content })

  return NextResponse.json(questionsDB[id])
}
