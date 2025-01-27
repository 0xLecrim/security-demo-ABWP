import { NextResponse } from 'next/server';
import { getDb, runRawQuery } from '../../../lib/db';

interface User {
  id: number;
  username: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    const db = await getDb();

    // VULNERABLE: Direct string interpolation in SQL query
    // This makes it vulnerable to SQL injection attacks
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

    try {
      const row = await runRawQuery(db, query);
      
      if (row) {
        return NextResponse.json({
          message: 'Login successful! (But this endpoint is vulnerable to SQL injection)'
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
