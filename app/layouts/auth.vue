<template>
  <div class="flex justify-center items-center min-h-screen w-full">
    <div class="w-full max-w-4xl mx-auto bg-blue-200 rounded-2xl p-20 relative">
      <NuxtLink to="/">
        <button
          class="absolute left-10 top-10 underline font-medium cursor-pointer"
        >
          <-Go Back
        </button>
      </NuxtLink>
      <h2 class="text-2xl font-bold text-center">Welcome</h2>
      <slot />
    </div>
  </div>
</template>
