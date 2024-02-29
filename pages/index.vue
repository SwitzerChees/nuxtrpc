<template>
  <div class="flex flex-col items-center justify-center gap-2 grow">
    <div v-if="users" class="p-4 rounded bg-slate-700">
      <h1 class="text-2xl font-bold">Users {{ pending || helloData?.hello || error }}</h1>
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
    <InputSwitch v-model="userQueryParams.withPosts" />
    <Button :disabled="pending" @click="reactiveInput.name = new Date().toISOString()">Refresh</Button>
  </div>
</template>

<script setup lang="ts">
  import { APIRoutes } from '~/types'

  const { $client } = useNuxtApp()
  const userQueryParams = reactive({ withPosts: false })
  const usersQuery = $client.user.users.useQuery(userQueryParams, {
    watch: [userQueryParams],
  })
  const users = usersQuery.data

  const reactiveInput = reactive({ name: 'World' })

  const {
    data: helloData,
    pending,
    error,
    onSuccess,
    onError,
  } = await useAPI(APIRoutes.HelloPost, {
    input: reactiveInput,
    watchInput: {
      debounce: 1000,
    },
  })
  // eslint-disable-next-line no-console
  onSuccess(() => console.log('HelloPost onSuccess'))
  // eslint-disable-next-line no-console
  onError((error) => console.error(error?.name))
</script>
