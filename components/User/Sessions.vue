<template>
  <DataTable :value="sessions" sort-field="expiresAt" :sort-order="1">
    <template #header>
      <h2 class="text-xl font-bold">Active Sessions</h2>
    </template>
    <template #empty>
      <div class="text-center text-red-400">No active Sessions.</div>
    </template>
    <Column header="Device" class="max-w-20">
      <template #body="{ data: { platform, browser, ip, userAgent } }">
        <div class="flex flex-col">
          <span v-if="platform" class="flex gap-1"
            ><span class="font-semibold">{{ `${$t('platform')}:` }}</span> <span class="truncate">{{ platform }}</span></span
          >
          <span v-if="browser" class="flex gap-1"
            ><span class="font-semibold">{{ `${$t('browser')}:` }}</span> <span class="truncate">{{ browser }}</span></span
          >
          <span v-if="ip" class="flex gap-1"
            ><span class="font-semibold">{{ `${$t('ip')}:` }}</span> <span class="truncate">{{ ip }}</span></span
          >
          <span v-if="userAgent" class="flex gap-1"
            ><span class="font-semibold">{{ `${$t('userAgent')}:` }}</span> <span class="truncate">{{ userAgent }}</span></span
          >
        </div>
      </template>
    </Column>
    <Column field="expiresAt" header="Expires At" sortable class="truncate max-w-10">
      <template #body="{ data: { expiresAt } }">
        <span>{{ formatDate(expiresAt, true) }}</span>
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
  const props = defineProps<{ userId: string }>()

  const { data: sessions } = useAPI(APIRoutes.User.Sessions, {
    input: props,
    watch: [props],
  })
</script>
