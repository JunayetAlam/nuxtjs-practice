<script setup lang="ts">
import { users } from "~/data/users";

const { id } = useRoute().params;
const user = users.find((user) => user.id === Number(id));

const formattedSalary = computed(() =>
  user
    ? new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: "BDT",
        maximumFractionDigits: 0,
      }).format(user.salary)
    : "",
);

const formattedJoined = computed(() =>
  user
    ? new Date(user.joinedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "",
);

const formattedDob = computed(() =>
  user
    ? new Date(user.dateOfBirth).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "",
);

const roleLabel = computed(() => {
  if (!user) return "";
  return user.role.charAt(0).toUpperCase() + user.role.slice(1);
});
</script>

<template>
  <div class="min-h-[calc(100vh-3rem)] bg-[#e8eef2] px-4 py-8 sm:px-6">
    <div class="mx-auto max-w-3xl">
      <NuxtLink
        to="/users"
        class="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#3a4f5c] transition hover:text-[#12202a]"
      >
        <span aria-hidden="true">←</span>
        Back to users
      </NuxtLink>

      <p
        v-if="!user"
        class="rounded-2xl border border-[#c9d5de] bg-white px-6 py-10 text-center text-[#5a6b76]"
      >
        User not found
      </p>

      <article
        v-else
        class="overflow-hidden rounded-2xl border border-[#c9d5de] bg-white shadow-[0_18px_40px_-28px_rgba(18,32,42,0.45)]"
      >
        <!-- Header band -->
        <div
          class="relative bg-[linear-gradient(135deg,#12202a_0%,#1f4d5c_52%,#3d8a8a_100%)] px-6 pb-16 pt-8 sm:px-8"
        >
          <div
            class="pointer-events-none absolute inset-0 opacity-35"
            style="
              background-image:
                radial-gradient(
                  circle at 16% 22%,
                  rgba(255, 255, 255, 0.28),
                  transparent 40%
                ),
                radial-gradient(
                  circle at 90% 8%,
                  rgba(120, 220, 210, 0.22),
                  transparent 34%
                );
            "
          />

          <div
            class="relative flex flex-wrap items-start justify-between gap-3"
          >
            <div class="flex flex-wrap items-center gap-2">
              <span
                class="rounded-md bg-white/15 px-2.5 py-1 text-xs font-semibold tracking-wide text-white uppercase backdrop-blur-sm"
              >
                {{ roleLabel }}
              </span>
              <span
                class="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold backdrop-blur-sm"
                :class="
                  user.isActive
                    ? 'bg-teal-200/25 text-teal-50'
                    : 'bg-rose-300/25 text-rose-50'
                "
              >
                <span
                  class="size-1.5 rounded-full"
                  :class="user.isActive ? 'bg-teal-200' : 'bg-rose-300'"
                />
                {{ user.isActive ? "Active" : "Inactive" }}
              </span>
            </div>
            <p class="text-sm text-white/75">Joined {{ formattedJoined }}</p>
          </div>
        </div>

        <!-- Identity -->
        <div class="relative px-6 sm:px-8">
          <div class="-mt-12 flex flex-col gap-5 sm:flex-row sm:items-end">
            <NuxtImg
              :src="user.avatar"
              :alt="user.name"
              class="size-24 shrink-0 rounded-2xl border-4 border-white object-cover shadow-md ring-1 ring-[#c9d5de]"
            />
            <div class="min-w-0 flex-1 pb-1">
              <h1
                class="truncate text-2xl font-semibold tracking-tight text-white sm:text-3xl"
              >
                {{ user.name }}
              </h1>
              <p class="mt-0.5 text-gray-600">@{{ user.username }}</p>
              <p class="text-sm font-medium text-[#3a4f5c]">
                {{ user.occupation }}
                <span class="text-[#93a3ae]">·</span>
                {{ user.department }} at {{ user.company }}
              </p>
            </div>
          </div>

          <p class="mt-5 max-w-2xl text-[15px] leading-relaxed text-[#3f4f59]">
            {{ user.bio }}
          </p>

          <!-- Skills -->
          <div class="mt-5 flex flex-wrap gap-2">
            <span
              v-for="skill in user.skills"
              :key="skill"
              class="rounded-lg border border-[#d0dbe3] bg-[#f0f5f8] px-3 py-1 text-xs font-medium text-[#2d4450]"
            >
              {{ skill }}
            </span>
          </div>
        </div>

        <!-- Details grid -->
        <div
          class="mt-8 grid gap-px border-t border-[#dfe7ed] bg-[#dfe7ed] sm:grid-cols-2"
        >
          <section class="bg-white p-6 sm:p-8">
            <h2
              class="text-xs font-semibold tracking-[0.14em] text-[#7a8b96] uppercase"
            >
              Contact
            </h2>
            <dl class="mt-4 space-y-3 text-sm">
              <div>
                <dt class="text-[#7a8b96]">Email</dt>
                <dd class="mt-0.5 font-medium text-[#12202a]">
                  <a :href="`mailto:${user.email}`" class="hover:underline">
                    {{ user.email }}
                  </a>
                </dd>
              </div>
              <div>
                <dt class="text-[#7a8b96]">Phone</dt>
                <dd class="mt-0.5 font-medium text-[#12202a]">
                  <a :href="`tel:${user.contact}`" class="hover:underline">
                    {{ user.contact }}
                  </a>
                </dd>
              </div>
              <div>
                <dt class="text-[#7a8b96]">Website</dt>
                <dd class="mt-0.5 font-medium text-[#12202a]">
                  <a
                    :href="user.website"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="break-all hover:underline"
                  >
                    {{ user.website.replace(/^https?:\/\//, "") }}
                  </a>
                </dd>
              </div>
            </dl>
          </section>

          <section class="bg-white p-6 sm:p-8">
            <h2
              class="text-xs font-semibold tracking-[0.14em] text-[#7a8b96] uppercase"
            >
              Personal
            </h2>
            <dl class="mt-4 space-y-3 text-sm">
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <dt class="text-[#7a8b96]">Gender</dt>
                  <dd class="mt-0.5 font-medium capitalize text-[#12202a]">
                    {{ user.gender }}
                  </dd>
                </div>
                <div>
                  <dt class="text-[#7a8b96]">Age</dt>
                  <dd class="mt-0.5 font-medium text-[#12202a]">
                    {{ user.age }}
                  </dd>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <dt class="text-[#7a8b96]">Date of birth</dt>
                  <dd class="mt-0.5 font-medium text-[#12202a]">
                    {{ formattedDob }}
                  </dd>
                </div>
                <div>
                  <dt class="text-[#7a8b96]">Blood group</dt>
                  <dd class="mt-0.5 font-medium text-[#12202a]">
                    {{ user.bloodGroup }}
                  </dd>
                </div>
              </div>
            </dl>
          </section>

          <section class="bg-white p-6 sm:p-8">
            <h2
              class="text-xs font-semibold tracking-[0.14em] text-[#7a8b96] uppercase"
            >
              Work
            </h2>
            <dl class="mt-4 space-y-3 text-sm">
              <div>
                <dt class="text-[#7a8b96]">Company</dt>
                <dd class="mt-0.5 font-medium text-[#12202a]">
                  {{ user.company }}
                </dd>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <dt class="text-[#7a8b96]">Department</dt>
                  <dd class="mt-0.5 font-medium text-[#12202a]">
                    {{ user.department }}
                  </dd>
                </div>
                <div>
                  <dt class="text-[#7a8b96]">Salary</dt>
                  <dd class="mt-0.5 font-medium text-[#12202a]">
                    {{ formattedSalary }}
                  </dd>
                </div>
              </div>
            </dl>
          </section>

          <section class="bg-white p-6 sm:p-8">
            <h2
              class="text-xs font-semibold tracking-[0.14em] text-[#7a8b96] uppercase"
            >
              Address
            </h2>
            <dl class="mt-4 space-y-3 text-sm">
              <div>
                <dt class="text-[#7a8b96]">Street</dt>
                <dd class="mt-0.5 font-medium text-[#12202a]">
                  {{ user.street }}
                </dd>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <dt class="text-[#7a8b96]">City</dt>
                  <dd class="mt-0.5 font-medium text-[#12202a]">
                    {{ user.city }}
                  </dd>
                </div>
                <div>
                  <dt class="text-[#7a8b96]">Zip</dt>
                  <dd class="mt-0.5 font-medium text-[#12202a]">
                    {{ user.zipCode }}
                  </dd>
                </div>
              </div>
              <div>
                <dt class="text-[#7a8b96]">Country</dt>
                <dd class="mt-0.5 font-medium text-[#12202a]">
                  {{ user.country }}
                </dd>
              </div>
            </dl>
          </section>
        </div>
      </article>
    </div>
  </div>
</template>
