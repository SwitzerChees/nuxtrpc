<template>
  <div class="flex flex-col items-center justify-center gap-2 grow">
    <div v-if="users" class="p-4 rounded bg-slate-700">
      <h1 class="text-2xl font-bold">Users</h1>
      <ul>
        <li v-for="user in users" :key="user.id">
          <h2>{{ user.username }}</h2>
          <ul>
            <li v-for="post in user.posts" :key="post.id">
              <h3>{{ post.content }}</h3>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <Button :disabled="registerPending" @click="register">Register</Button>
    <InputSwitch v-model="userQueryParams.withPosts" />
    <!-- <span>{{ registerMutation?.error.value?.message }}</span> -->
    <span>{{ error?.message }}</span>
  </div>
</template>

<script setup lang="ts">
  const { $client } = useNuxtApp()
  const registerMutation = $client.auth.registration.useMutation()
  const registerPending = computed(() => registerMutation.status.value === 'pending')
  const userQueryParams = reactive({ withPosts: false })
  const usersQuery = $client.user.users.useQuery(userQueryParams, {
    watch: [userQueryParams],
  })
  const users = usersQuery.data
  const error = useError()

  const register = async () => {
    await registerMutation.mutate({
      username: 'username6',
      password: 'password',
      passwordConfirmation: 'password',
    })
  }
</script>
