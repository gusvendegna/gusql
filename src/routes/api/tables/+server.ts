// src/routes/api/tables.ts
import { pool } from '$lib/pool';

interface Table {
  table_name: string;
}


export async function GET() {
  try {
    const result = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
    const tables: Table[] = result.rows.map(table => table.table_name);  // Type the result as an array of Table objects
    // console.log(tables)
    // Return a Response object (SvelteKit will automatically handle the conversion)
    return new Response(JSON.stringify(tables), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Error fetching tables' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
