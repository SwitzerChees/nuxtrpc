<template>
  <div class="flex flex-col items-center justify-center gap-2 grow">
    <div class="flex flex-col gap-2 p-8 rounded bg-stone-700 w-80">
      <h1 class="text-lg font-bold text-center">Registrations</h1>
      <img src="~/assets/images/logo.png" alt="Logo" class="w-24 h-24 mx-auto my-2" />
      <div class="flex flex-col gap-2">
        <label for="username" class="font-bold">Username</label>
        <InputText id="username" v-model="user.username" aria-describedby="username-help" @keydown.enter="registration()" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="password" class="font-bold">Password</label>
        <InputText id="password" v-model="user.password" type="password" aria-describedby="password-help" @keydown.enter="registration()" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="passwordConfirmation" class="font-bold">Password Confirmation</label>
        <InputText
          id="passwordConfirmation"
          v-model="user.passwordConfirmation"
          type="password"
          aria-describedby="passwordconfirm-help"
          @keydown.enter="registration()" />
      </div>
      <Button class="mt-2" :disabled="isLoading" @click="registration()"><span class="w-full text-center">Create Account</span></Button>
      <small class="text-red-400">{{ formatedError }}</small>
      <small class="font-bold text-center">or</small>
      <NuxtLink to="/login" class="text-sm font-bold text-center text-blue-400">To Login</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { APIRoutes } from '~/types'

  const user = reactive({
    username: '',
    password: '',
    passwordConfirmation: '',
  })

  const apiRegistration = useAPI(APIRoutes.Auth.Registration, {
    input: user,
    errorToast: true,
    onSuccess: () => {
      navigateTo(`/login?username=${user.username}`, { replace: true })
    },
    immediate: false,
  })

  const { isLoading, execute: registration, formatedError } = apiRegistration
</script>
