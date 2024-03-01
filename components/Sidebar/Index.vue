<template>
  <aside
    class="flex flex-col p-2 transition-all bg-slate-700"
    :class="{
      'w-20': !toggleSidebar,
      'w-72': toggleSidebar,
    }">
    <ul class="flex grow">
      <div>
        <Button rounded outlined @click="toggleSidebar = !toggleSidebar">❓</Button>
      </div>
    </ul>
    <div class="flex items-center gap-2 p-2">
      <Button rounded outlined severity="warning" class="flex-shrink-0" :disabled="isLoading" @click="logout()">Logout</Button>
      <small class="font-bold text-center text-green-500 truncate grow">{{ user?.username }}</small>
    </div>
  </aside>
</template>

<script setup lang="ts">
  import { APIRoutes } from '~/types'

  const toggleSidebar = ref(true)
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
