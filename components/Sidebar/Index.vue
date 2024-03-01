<template>
  <aside
    class="flex flex-col p-2 transition-all duration-300 bg-slate-700"
    :class="{
      'w-20': !sidebarOpen,
      'w-72': sidebarOpen,
    }">
    <ul class="relative flex grow">
      <Button class="absolute right-0 w-10 h-10" rounded outlined @click="sidebarOpen = !sidebarOpen">
        <Icon
          name="fluent:ios-arrow-24-filled"
          class="flex-shrink-0 -ml-1 transition-all duration-300"
          :class="{ 'rotate-180': !sidebarOpen }" />
      </Button>
    </ul>
    <div class="flex items-center gap-2 p-2">
      <Button rounded outlined severity="warning" class="flex-shrink-0 gap-2 transition-all" :disabled="isLoading" @click="logout()">
        <Icon name="tabler:logout-2" class="flex-shrink-0" size="1.5rem" />
        <span v-if="sidebarOpen">Logout</span></Button
      >
      <small class="font-bold text-center text-green-500 truncate grow">{{ user?.username }}</small>
    </div>
  </aside>
</template>

<script setup lang="ts">
  import { APIRoutes } from '~/types'

  const sidebarOpen = ref(true)
  const { user } = useUser()

  const apiLogout = useAPI(APIRoutes.Auth.Logout, {
    errorToast: true,
    onSuccess: () => {
      location.reload()
    },
    immediate: false,
  })
  const { isLoading, execute: logout } = apiLogout
</script>
