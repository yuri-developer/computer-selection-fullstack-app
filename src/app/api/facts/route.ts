import { AddRequest } from '@/api/facts'
import { NextResponse } from 'next/server'
import { factsDB } from './facts'

export async function GET(req: Request) {
  return NextResponse.json(factsDB)
}

export async function POST(req: Request) {
  const id = factsDB.length
  const data: AddRequest = await req.json()
  const points = 0

  factsDB.push({ id, points, ...data })

  return NextResponse.json(factsDB[id])
}
