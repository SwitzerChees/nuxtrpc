<template>
  <div class="flex w-screen h-screen">
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
        <Button rounded outlined severity="warning" class="flex-shrink-0" :disabled="logoutLoading" @click="logout">Logout</Button>
        <small class="font-bold text-center text-green-500 truncate grow">{{ user?.password }}</small>
      </div>
    </aside>
    <main class="flex grow">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
  const toggleSidebar = ref(true)
  const { trpc, isLoading, onSuccess } = useTRPC()
  const { user } = useUser()

  const logoutMutation = trpc.auth.logout.useMutation()
  const logoutLoading = isLoading(logoutMutation)
  onSuccess(logoutMutation, () => {
    location.reload()
  })
  const logout = async () => {
    await logoutMutation.mutate({})
  }
</script>
