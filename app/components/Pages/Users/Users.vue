<script setup lang="ts">
const route = useRoute();
const router = useRouter();
const limit = computed(() => Number(route.query.limit) || 6);
const search = computed({
  get: () => String(route.query.search ?? ""),
  set: (value: string) => {
    router.replace({
      query: {
        ...route.query,
        search: value || undefined,
      },
    });
  },
});

const { data } = await useFetch(`/api/users`, {
  query: {
    search: search,
    limit: limit,
  },
});
const users = computed(() => data.value?.data || []);
const showAll = ref(false);
</script>

<template>
  <div class="flex gap-5">
    <h1>Filter</h1>
    <input
      class="border mb-2 px-3 py-2"
      type="text"
      placeholder="Search"
      v-model="search"
    />
    <select
      class="border mb-2 px-3 py-2"
      name="limit"
      :value="limit"
      @change="
        router.replace({
          query: {
            ...route.query,
            limit: ($event.target as HTMLSelectElement).value || undefined,
          },
        })
      "
      id=""
    >
      <option>6</option>
      <option>10</option>
    </select>
  </div>
  <table>
    <thead>
      <tr>
        <th>User</th>
        <th>Contact Info</th>
        <th>Gender</th>
        <th>Date Of Birth</th>
        <th>Salary</th>
        <th>Address</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in users" :key="index">
        <td>
          <div class="flex gap-5">
            <NuxtImg :src="item.avatar" class="size-14 rounded-full" alt="" />
            <div>
              <h2 class="text-xl font-medium">{{ item.name }}</h2>
              <p>{{ item.username }}</p>
            </div>
          </div>
        </td>
        <td>
          <div>
            <p>{{ item.email }}</p>
            <p>{{ item.contact }}</p>
          </div>
        </td>
        <td>{{ item.gender }}</td>
        <td>{{ item.dateOfBirth }}</td>
        <td>{{ item.salary }} BDT</td>
        <td>
          <div>
            <p class="max-w-62.5">
              {{ item.company }}, {{ item.street }}, {{ item.city }},
              {{ item.country }}, {{ item.zipCode }}
            </p>
          </div>
        </td>
        <td>
          <NuxtLink
            :to="`/users/details/${item.id}`"
            class="font-medium underline cursor-pointer"
            >Details</NuxtLink
          >
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style>
td,
th {
  border: 1px black solid;
  padding: 2px 8px;
  text-align: left;
}
</style>
