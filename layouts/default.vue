<template>
  <div class="flex w-screen h-screen">
    <aside
      class="flex flex-col p-2 transition-all bg-slate-700"
      :class="{
        'w-20': !toggleSidebar,
        'w-72': toggleSidebar,
      }">
      <div class="flex justify-end">
        <Button rounded @click="toggleSidebar = !toggleSidebar">ℹ️</Button>
      </div>
    </aside>
    <main class="flex grow">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
  const toggleSidebar = ref(true)
</script>
