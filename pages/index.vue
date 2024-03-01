<template>
  <div class="flex flex-col items-center justify-center gap-2 grow">
    <div v-if="users" class="p-4 rounded bg-slate-700">
      <h1 class="text-2xl font-bold">Users {{ isLoading || helloData?.hello }}</h1>
      <ul>
        <li v-for="user in users" :key="user.id">
          <h2>{{ user.username }}</h2>
          <ul>
            <!-- <li v-for="post in user.posts" :key="post.id">
              <h3>{{ post.content }}</h3>
            </li> -->
          </ul>
        </li>
      </ul>
    </div>
    <InputSwitch v-model="userQueryParams.withPosts" />
    <Button :disabled="isLoading" @click="reactiveInput.name = new Date().toISOString()">Refresh</Button>
  </div>
</template>

<script setup lang="ts">
  import { APIRoutes } from '~/types'

  const userQueryParams = reactive({ withPosts: false })
  const fetchUsers = useAPI(APIRoutes.User.Get, {
    errorToast: true,
    input: userQueryParams,
    watch: [userQueryParams],
  })
  const { data: users } = fetchUsers

  const reactiveInput = reactive({ name: 'World', timestamp: new Date(), person: { age: 26 }, hobbies: new Set(['coding', 'gaming']) })

  const fetchPost = useAPI(APIRoutes.Hello.ByName, {
    input: reactiveInput,
    errorToast: true,
    onSuccess: (data) => {
      // eslint-disable-next-line no-console
      console.log('onSuccess', data)
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error('onError', error)
    },
    watch: [reactiveInput],
    watchDebounce: 300,
    headers: {
      'X-Custom-Header': 'hello',
    },
  })
  const { isLoading, data: helloData } = fetchPost
</script>
