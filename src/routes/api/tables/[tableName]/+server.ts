import { pool } from "$lib/pool";

export async function GET({ params }) {
  const { tableName } = params;
  console.log(tableName)
  try {
    const result = await pool.query(`SELECT * FROM ${tableName}`);
    console.log(result)
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    console.log(err)
    return new Response(
      JSON.stringify({ error: 'Error fetching table' }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
