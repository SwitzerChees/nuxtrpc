<template>
  <aside
    class="relative flex flex-col gap-2 p-2 transition-all duration-300 bg-stone-700"
    :class="{
      'w-20': !sidebarOpen,
      'w-72': sidebarOpen,
      'p-1': !sidebarOpen,
    }">
    <NuxtLink to="/" class="mx-auto mb-4 mt-14">
      <img
        src="~/assets/images/logo.png"
        alt="Logo"
        class="w-24 transition-transform duration-300"
        :class="{
          'scale-75': !sidebarOpen,
        }" />
    </NuxtLink>
    <Button class="absolute w-10 h-10 right-2 top-2" rounded outlined @click="sidebarOpen = !sidebarOpen">
      <Icon name="lets-icons:expand-left" class="flex-shrink-0 -ml-1 transition-all duration-300" :class="{ 'rotate-180': !sidebarOpen }" />
    </Button>
    <ul class="flex flex-col grow">
      <SidebarMenuItem to="/users" title="Users" icon="mdi:users" :expanded="sidebarOpen" />
    </ul>
    <div class="flex items-center gap-2 p-2">
      <Button rounded outlined severity="warning" class="flex-shrink-0 gap-2 transition-all" :disabled="isLoading" @click="logout()">
        <Icon name="tabler:logout-2" class="flex-shrink-0" size="1.3rem" />
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
