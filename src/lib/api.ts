// src/lib/api.js

export async function fetchTables() {
  const response = await fetch('/api/tables');
  const tables = await response.json();
  return tables;
}
