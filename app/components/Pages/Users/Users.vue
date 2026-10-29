<script setup lang="ts">
import { users } from "~/data/users";

const showAll = ref(false);
</script>

<template>
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
