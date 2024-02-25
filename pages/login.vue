<template>
  <div class="flex flex-col items-center justify-center gap-2 grow">
    <div class="flex flex-col gap-2 p-8 rounded bg-stone-700 w-80">
      <h1 class="text-lg font-bold text-center">Login</h1>
      <img src="~/assets/images/logo.png" alt="Logo" class="w-24 h-24 mx-auto my-2" />
      <div class="flex flex-col gap-2">
        <label for="username" class="font-bold">Username</label>
        <InputText id="username" v-model="user.username" aria-describedby="username-help" @keydown.enter="login" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="password" class="font-bold">Password</label>
        <InputText id="password" v-model="user.password" type="password" aria-describedby="password-help" @keydown.enter="login" />
      </div>
      <Button class="mt-2" :disabled="loginLoading" @click="login"><span class="w-full text-center">Login</span></Button>
      <small class="text-center text-red-500">{{ loginErrors }}</small>
      <small class="font-bold text-center">or</small>
      <NuxtLink to="/registration" class="text-sm font-bold text-center text-blue-400">Create New Account</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { trpc, isLoading, onSuccess, formatedErrors } = useTRPC()
  const route = useRoute()

  const user = reactive({
    username: (route.query.username as string) || '',
    password: '',
    passwordConfirmation: '',
  })

  const loginMutation = trpc.auth.login.useMutation()
  const loginLoading = isLoading(loginMutation)
  const loginErrors = formatedErrors(loginMutation)
  onSuccess(loginMutation, () => {
    location.reload()
  })

  const login = async () => {
    await loginMutation.mutate(user)
  }
</script>
