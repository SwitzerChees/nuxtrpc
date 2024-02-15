<script setup lang="ts">
const { $client } = useNuxtApp();

const { data: hello } = await $client.hello.useQuery({ text: "Patrick" });
const { data: date } = await $client.thedate.useLazyQuery();
</script>

<template>
  <div>
    <p>{{ hello?.greeting }}</p>
    <p>{{ date?.now?.getDate() }}</p>
    <h1>Test</h1>
  </div>
</template>
