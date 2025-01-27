import sqlite3 from 'sqlite3';
import { Database } from 'sqlite3';

let dbInstance: Database | null = null;

export async function getDb(): Promise<Database> {
  if (!dbInstance) {
    dbInstance = new sqlite3.Database(':memory:');
    
    // Promisify db.run
    const run = (sql: string, params: any[] = []): Promise<void> => {
      return new Promise((resolve, reject) => {
        dbInstance!.run(sql, params, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    };

    try {
      // Create users table
      await run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE,
          password TEXT
        )
      `);

      // Insert test user if not exists
      await run(`
        INSERT OR IGNORE INTO users (username, password)
        VALUES ('admin', 'password123')
      `);
    } catch (err) {
      console.error('Database initialization error:', err);
      throw err;
    }
  }
  
  return dbInstance;
}

// Utility function to run parameterized queries
export function runQuery(db: Database, sql: string, params: any[] = []): Promise<any> {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}

// Utility function to run raw SQL queries (vulnerable to SQL injection)
export function runRawQuery(db: Database, sql: string): Promise<any> {
  return new Promise((resolve, reject) => {
    db.get(sql, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}
