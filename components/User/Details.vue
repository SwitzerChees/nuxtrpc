<template>
  <div class="flex flex-col gap-2">
    <h2 class="font-semibold truncate">User Details</h2>
    <UserSessions v-if="userId" :user-id="userId" />
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    userId?: string
  }>()
</script>
