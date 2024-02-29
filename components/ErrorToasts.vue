<template>
  <Toast :position="isMobile ? 'top-center' : 'top-right'" group="notification" />
</template>

<script setup lang="ts">
  const toast = useToast()
  const nuxtApp = useNuxtApp()
  const { isMobile } = useDevice()

  nuxtApp.hooks.hook('api:error' as any, (e: Error) => {
    toast.add({
      severity: 'error',
      life: 5000,
      summary: e.message,
      group: 'notification',
    })
  })
</script>
