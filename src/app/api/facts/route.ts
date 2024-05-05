import { AddRequest } from '@/api/facts'
import { NextResponse } from 'next/server'
import { facts } from './facts'

export async function GET(req: Request) {
  return NextResponse.json(facts)
}

export async function POST(req: Request) {
  const id = facts.length
  const data: AddRequest = await req.json()
  const points = 0

  facts.push({ id, points, ...data })

  return NextResponse.json(facts[id])
}
