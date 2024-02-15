<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <p>{{ greeting?.greeting }}</p>
    <p>{{ date?.now?.getDate() ?? error ?? pending }}</p>
    <h1>Test</h1>
    <Button>Refetch</Button>
  </div>
</template>

<script setup lang="ts">
  const { $client } = useNuxtApp()

  const { data: greeting } = await $client.hello.hello.useQuery({
    text: 'Patrick',
  })
  const { data: date, pending, error } = await $client.hello.thedate.useLazyQuery()
</script>
