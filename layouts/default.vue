<template>
  <div class="flex flex-col items-center w-screen h-screen">
    <header class="flex items-center justify-center w-full h-16 bg-stone-700">
      <nav class="max-w-[80rem] w-[80rem] flex">
        <NuxtLink to="/" class="flex items-center gap-4">
          <img class="h-8" src="~/assets/images/logo.png" alt="Kebap Guide" />
          <h1 class="text-xl font-bold">Kebap Guide</h1>
        </NuxtLink>
        <ul class="flex items-center px-4 grow">
          <li>
            <NuxtLink to="/cockpit/users">Users</NuxtLink>
          </li>
        </ul>
      </nav>
    </header>
    <main class="flex grow max-w-[80rem]">
      <slot />
    </main>
    <footer class="flex items-center justify-center w-full h-16 pb-8">Kebap Guide created for 🥙 with a lot of ☕️ and ❤️.</footer>
  </div>
</template>
