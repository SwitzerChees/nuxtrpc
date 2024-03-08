<template>
  <DataTable v-if="sessions && sessions.length > 0" :value="sessions" sort-field="expiresAt" :sort-order="1">
    <template #header>
      <h2 class="text-xl font-bold">Active Sessions</h2>
    </template>
    <Column field="id" header="ID" sortable class="max-w-20"></Column>
    <Column field="expiresAt" header="Expires At" sortable class="max-w-20">
      <template #body="{ data: { expiresAt } }">
        <span>{{ formatDate(expiresAt, true) }}</span>
      </template>
    </Column>
  </DataTable>
  <div v-else class="text-center text-red-400">No active Sessions.</div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    userId: string
  }>()

  const { data: sessions } = useAPI(APIRoutes.User.Sessions, {
    input: {
      userId: props.userId,
    },
  })
</script>
