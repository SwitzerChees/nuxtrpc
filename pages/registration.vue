<template>
  <div class="flex flex-col items-center justify-center gap-2 grow">
    <div class="flex flex-col gap-2 p-8 rounded bg-stone-700 w-80">
      <h1 class="text-lg font-bold text-center">{{ $t('createAccount') }}</h1>
      <img src="~/assets/images/logo.png" alt="Logo" class="w-24 h-24 mx-auto my-2" />
      <div class="flex flex-col gap-2">
        <label for="username" class="font-bold">{{ $t('username') }}</label>
        <InputText id="username" v-model="user.username" aria-describedby="username-help" @keydown.enter="registration()" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="password" class="font-bold">{{ $t('password') }}</label>
        <InputText id="password" v-model="user.password" type="password" aria-describedby="password-help" @keydown.enter="registration()" />
      </div>
      <div class="flex flex-col gap-2">
        <label for="passwordConfirmation" class="font-bold">{{ $t('passwordConfirmation') }}</label>
        <InputText
          id="passwordConfirmation"
          v-model="user.passwordConfirmation"
          type="password"
          aria-describedby="passwordconfirm-help"
          @keydown.enter="registration()" />
      </div>
      <Button class="mt-2" :disabled="isLoading" @click="registration()"
        ><span class="w-full text-center">{{ $t('createAccount') }}</span></Button
      >
      <small v-if="formatedError?.issues" class="text-center text-red-400"><FormatedIssues :issues="formatedError?.issues" /></small>
      <small class="font-bold text-center">{{ $t('or') }}</small>
      <NuxtLink to="/login" class="text-sm font-bold text-center text-blue-400">{{ $t('toLogin') }}</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'auth',
  })
  const user = reactive({
    username: '',
    password: '',
    passwordConfirmation: '',
  })

  const apiRegistration = useAPI(APIRoutes.Auth.Registration, {
    input: user,
    onSuccess: () => {
      navigateTo(`/login?username=${user.username}`, { replace: true })
    },
    immediate: false,
  })

  const { isLoading, execute: registration, formatedError } = apiRegistration
</script>
