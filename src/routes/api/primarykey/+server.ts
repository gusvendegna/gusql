// src/routes/api/tables.ts
import { pool } from '$lib/pool';

interface Table {
  table_name: string;
}


export async function GET() {
  try {
    // Query to fetch table names and their corresponding primary key columns in one go
    const query = `
      SELECT
        t.table_name,
        kc.column_name AS primary_key
      FROM
        information_schema.tables t
      LEFT JOIN
        information_schema.table_constraints tc
        ON t.table_name = tc.table_name
        AND tc.constraint_type = 'PRIMARY KEY'
      LEFT JOIN
        information_schema.key_column_usage kc
        ON tc.constraint_name = kc.constraint_name
      WHERE
        t.table_schema = 'public'
      ORDER BY
        t.table_name;
    `;

    const result = await pool.query(query);
    const tables: Table[] = result.rows.map(table => ({
      table_name: table.table_name,
      primary_key: table.primary_key || null, // Handle cases where no primary key exists
    }));

    return new Response(JSON.stringify(tables), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: 'Error fetching tables and primary keys' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}