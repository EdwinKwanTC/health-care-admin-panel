import { NextResponse } from 'next/server'
import shiftData from './data.json'

export async function GET(request: Request) {
    return NextResponse.json(shiftData)
}
