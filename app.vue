<template>
  <div class="flex items-center justify-center w-screen h-screen">
    <p>{{ greeting?.greeting }}</p>
    <p>{{ hello?.hello }}</p>
    <Button>Refetch</Button>
  </div>
</template>

<script setup lang="ts">
  const { $client } = useNuxtApp()

  const { data: greeting } = await $client.hello.greeting.useQuery({
    text: 'Patrick',
  })

  const { data: hello } = await $client.hello.hello.useQuery({
    text: 'Kurt',
  })
</script>
