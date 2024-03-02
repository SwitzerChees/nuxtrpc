<template>
  <aside
    class="relative flex flex-col gap-2 p-2 px-4 transition-all duration-300 bg-stone-700"
    :class="{
      'w-20 min-w-20': !sidebarOpen,
      'w-72 min-w-72': sidebarOpen,
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
    <Button
      class="absolute w-10 h-10 right-4 top-2"
      :class="{ 'right-5': !sidebarOpen }"
      rounded
      outlined
      @click="sidebarOpen = !sidebarOpen">
      <Icon name="lets-icons:expand-left" class="flex-shrink-0 -ml-1 transition-all duration-300" :class="{ 'rotate-180': !sidebarOpen }" />
    </Button>
    <ul class="flex flex-col grow">
      <SidebarMenuItem to="/users" title="Users" icon="mdi:users" :expanded="sidebarOpen" />
    </ul>
    <div>
      <div
        class="flex items-center justify-center gap-2 py-8 font-bold text-green-500 truncate grow"
        :class="{
          'flex-col': !sidebarOpen,
        }">
        <Icon name="mdi:account" class="flex-shrink-0" size="2.5rem" />
        <span>{{ userName }}</span>
      </div>
    </div>
    <ul>
      <SidebarMenuItem to="#" title="Logout" icon="tabler:logout-2" :expanded="sidebarOpen" @click="logout()" />
    </ul>
  </aside>
</template>

<script setup lang="ts">
  const sidebarOpen = useCookie('sidebarOpen', {
    default: () => true,
  })

  const { user } = useUser()

  const userName = computed(() => (sidebarOpen.value ? user?.value?.username : user?.value?.username[0]?.toUpperCase()))

  const apiLogout = useAPI(APIRoutes.Auth.Logout, {
    errorToast: true,
    onSuccess: () => {
      location.reload()
    },
    immediate: false,
  })
  const { execute: logout } = apiLogout
</script>
