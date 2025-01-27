import { NextResponse } from 'next/server';
import { getDb, runQuery } from '../../../lib/db';

interface User {
  id: number;
  username: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    const db = await getDb();

    // SECURE: Using parameterized query with placeholders
    const query = `
      SELECT * FROM users 
      WHERE username = ? AND password = ?
    `;

    try {
      const row = await runQuery(db, query, [username, password]);
      
      if (row) {
        return NextResponse.json({
          message: 'Login successful! (Using secure parameterized query)'
        });
      } else {
        return NextResponse.json(
          { message: 'Invalid credentials' },
          { status: 401 }
        );
      }
    } catch (err) {
      console.error('Database error:', err);
      return NextResponse.json(
        { message: 'Database error' },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'Invalid request' },
      { status: 400 }
    );
  }
}
