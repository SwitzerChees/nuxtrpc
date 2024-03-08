<template>
  <div class="flex flex-col items-center justify-center gap-2 grow">
    <h1 class="text-2xl font-bold">Users {{ isLoading || helloData?.hello }}</h1>
    <Button :disabled="isLoading" @click="reactiveInput.name = new Date().toISOString()">Refresh</Button>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'default',
  })
  const { reactiveInput, isLoading, helloData } = useHello()
  function useHello() {
    const reactiveInput = reactive({ name: 'World', timestamp: new Date(), person: { age: 26 }, hobbies: new Set(['coding', 'gaming']) })
    const fetchPost = useAPI(APIRoutes.Hello.Get, {
      input: reactiveInput,
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
    return { isLoading: fetchPost.isLoading, helloData: fetchPost.data, reactiveInput }
  }
</script>
