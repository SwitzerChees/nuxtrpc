<template>
  <Toast :position="isMobile ? 'top-center' : 'top-right'" group="notification">
    <template #container="{ message }">
      <div class="flex items-center gap-2 p-2">
        <Icon name="material-symbols:error" class="flex-shrink-0" size="1.5rem" />
        <div class="flex flex-col gap-2">
          <span class="font-semibold">{{ $t(message.summary) }}</span>
          <span>{{ message.detail }}</span>
        </div>
      </div>
    </template>
  </Toast>
</template>

<script setup lang="ts">
  import type { ToastMessageOptions } from 'primevue/toast'

  const toast = useToast()
  const nuxtApp = useNuxtApp()
  const { isMobile } = useDevice()

  nuxtApp.hooks.hook('api:error' as any, (e: Error) => {
    const { message, detail } = useFormatedError(e)
    toast.add({
      severity: 'error',
      life: 5000,
      summary: message,
      detail,
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
