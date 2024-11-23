<script>
    import { onMount } from "svelte";
    import { fetchTables } from "$lib/api";
    import '../app.css'
    import Table from "$lib/components/Table.svelte";

    let tables = [];
    let selectedTable = null;
    let rows = [];

    // Fetch tables when the component is mounted
    onMount(async () => {
        tables = await fetchTables();
    });

    // Function to fetch rows for the selected table
    async function fetchRows(table) {
        const response = await fetch(`/api/tables/${table}`);
        rows = await response.json();
        selectedTable = table;
    }
</script>

<div class="flex">
    <!-- Sidebar -->
    <aside class="w-48 bg-gray-800 text-white flex-col p-4 h-screen sticky top-0">
        <h1 class="text-2xl font-bold border-b pb-2 border-gray-700">gusql</h1>
        <div>
            {#each tables as table}
                <button
                    class="cursor-pointer p-1 hover:bg-gray-700 rounded w-full text-left truncate"
                    on:click={() => fetchRows(table)}
                >
                    {table}
                </button>
            {/each}
        </div>
    </aside>

    <!-- Main Content -->
    <main class="w-full overflow-y-auto h-screen">
        {#if selectedTable}
            <h2 class="text-2xl font-semibold m-4">Table: {selectedTable}</h2>
            <Table tableData={rows}/>
        {:else}
            <p class="text-gray-600 m-4">Select a table to view its content.</p>
        {/if}
    </main>
</div>

