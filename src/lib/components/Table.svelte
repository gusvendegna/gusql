<script lang="ts">

    interface Field {
        name: string;
        format: string;
    }

    let { tableData } = $props();
    let fields: Field[] = $derived(tableData.fields);
    let rows = $derived(tableData.rows);
    console.log(tableData);
</script>

<!-- svelte-ignore component_name_lowercase -->
<table class="table-auto w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
    <thead class="bg-gray-200 text-gray-700">
        <tr>
            {#each fields as field}
                <th class="py-3 px-4 text-left font-semibold uppercase">{field.name}</th>
            {/each}
        </tr>
    </thead>
    <tbody class="text-gray-700">
        {#each rows as row}
            <tr class="border-b border-gray-300 hover:bg-gray-100">
                {#each fields as field}
                    <td class="py-2 px-4 text-sm">{row[field.name]}</td>
                {/each}
            </tr>
        {/each}
    </tbody>
</table>

