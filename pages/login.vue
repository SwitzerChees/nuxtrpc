<template>
  <div class="flex flex-col items-center justify-center gap-2 grow">
    <div class="flex flex-col gap-2 p-8 rounded bg-stone-700 w-80">
      <h1 class="text-lg font-bold text-center">{{ $t('login') }}</h1>
      <img src="~/assets/images/logo.png" alt="Logo" class="w-24 h-24 mx-auto my-2" />
      <div class="flex flex-col gap-2">
        <label for="username" class="font-bold">{{ $t('username') }}</label>
        <InputText id="username" v-model="user.username" aria-describedby="username-help" @keydown.enter="login()" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="password" class="font-bold">{{ $t('password') }}</label>
        <InputText id="password" v-model="user.password" type="password" aria-describedby="password-help" @keydown.enter="login()" />
      </div>
      <Button class="mt-2" :disabled="isLoading" @click="login()"
        ><span class="w-full text-center">{{ $t('login') }}</span></Button
      >
      <small v-if="formatedError?.issues" class="text-center text-red-400"><FormatedIssues :issues="formatedError?.issues" /></small>
      <small class="font-bold text-center">{{ $t('or') }}</small>
      <NuxtLink to="/registration" class="text-sm font-bold text-center text-blue-400">{{ $t('createNewAccount') }}</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'auth',
  })
  const route = useRoute()

  const user = reactive({
    username: (route.query.username as string) || '',
    password: '',
    passwordConfirmation: '',
  })

  const apiLogin = useAPI(APIRoutes.Auth.Login, {
    input: user,
    onSuccess: () => {
      location.reload()
    },
    immediate: false,
  })

  const { isLoading, execute: login, formatedError } = apiLogin
</script>
