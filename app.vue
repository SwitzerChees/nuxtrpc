<template>
  <NuxtLayout :name="layout">
    <ErrorToasts />
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
  const route = useRoute()
  const layout = computed(() => {
    if (route.path.startsWith('/login') || route.path.startsWith('/registration')) {
      return 'auth'
    }
    if (route.path.startsWith('/cockpit')) {
      return 'cockpit'
    }
    return 'default'
  })
</script>
```
