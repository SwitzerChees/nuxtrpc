<template>
  <Toast :position="isMobile ? 'top-center' : 'top-right'" group="notification" />
</template>

<script setup lang="ts">
  import type { ToastMessageOptions } from 'primevue/toast'

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
  nuxtApp.hooks.hook('api:success' as any, (success?: ToastMessageOptions) => {
    if (!success) return
    const successDefaults: ToastMessageOptions = {
      severity: 'success',
      life: 5000,
      group: 'notification',
      ...success,
    }
    toast.add(successDefaults)
  })
</script>
