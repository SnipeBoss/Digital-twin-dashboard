<script setup>
import { ref, onMounted } from "vue";
import ThemeToggle from "@/components/ThemeToggleComponent.vue";
import { RouterLink, useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

// Define Pages
const menus = [
  {
    name: "Dashboard",
    routeName: "dashboard",
  },
  {
    name: "History",
    routeName: "history",
  },
  {
    name: "AnomalyDetection",
    routeName: "anomaly-detection",
  },
  {
    name: "TimeSeriesForecast",
    routeName: "time-series-forecast",
  },
  {
    name: "Chat",
    routeName: "chat",
  },
];

// Function to navigate programmatically (optional)
const navigateTo = (routeName) => {
  router.push({ name: routeName });
};

const props = defineProps({
  heading: { type: String },
});
</script>

<template>
  <div>
    <!-- NAV BAR (light mode only, but you can leave dark classes if you plan to toggle) -->
    <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-300">
      <div class="px-3 py-3 lg:px-5 lg:pl-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center justify-start rtl:justify-end">
            <a href="https://flowbite.com" class="flex ms-2 md:me-24">
              <img
                src="D:\capstone\digital-twin-dashboard\frontend\public\AUTO_LOGO.png"
                class="h-9 me-3"
                alt="KMITL Logo"
              />
            </a>
          </div>
          <div class="flex items-center">
            <div class="flex items-center">
              <!-- Theme Toggle (remove if you don't want dark/light toggling) -->
              <ThemeToggle />

              <!-- Profile -->
              <div>
                <button
                  type="button"
                  class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  aria-expanded="false"
                  data-dropdown-toggle="dropdown-user"
                >
                  <span class="sr-only">Open user menu</span>
                  <img
                    class="w-8 h-8 rounded-full"
                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    alt="user photo"
                  />
                </button>
              </div>
              <div
                class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-sm shadow-sm dark:bg-gray-700 dark:divide-gray-600"
                id="dropdown-user"
              >
                <div class="px-4 py-3" role="none">
                  <p class="text-sm text-gray-900 dark:text-white" role="none">
                    Neil Sims
                  </p>
                  <p
                    class="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                    role="none"
                  >
                    neil.sims@flowbite.com
                  </p>
                </div>
                <ul class="py-1" role="none">
                  <li>
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                      >Dashboard</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                      >Settings</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                      >Earnings</a
                    >
                  </li>
                  <li>
                    <a
                      href="#"
                      class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                      role="menuitem"
                      >Sign out</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- SIDE BAR -->
    <aside
      id="logo-sidebar"
      class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 flex flex-col"
      aria-label="Sidebar"
    >
      <div class="flex-1 px-3 pb-4 overflow-y-auto">
        <ul class="space-y-2 font-normal text-sm">
          <li v-for="menu in menus" :key="menu.routeName">
            <!-- group class for hover states on children -->
            <RouterLink
              :to="{ name: menu.routeName }"
              :class="[
                'group flex items-center p-2 transition-colors duration-300 ease-in-out',
                route.name === menu.routeName
                  ? 'text-[#f16322]'
                  : 'text-gray-500',
              ]"
            >
              <!-- ICON: conditionally #f16322 if active, else gray-500 + group-hover -->
              <svg
                class="w-5 transition-colors duration-300 ease-in-out"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                :class="[
                  route.name === menu.routeName
                    ? 'text-[#f16322]'
                    : 'text-gray-500 group-hover:text-[#f16322]',
                ]"
              >
                <!-- Your icon path here. Example for "Dashboard": -->
                <path
                  v-if="menu.routeName === 'dashboard'"
                  fill-rule="evenodd"
                  d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
                  clip-rule="evenodd"
                />
                <!-- History Icon Path -->
                <path
                  v-else-if="menu.routeName === 'history'"
                  d="M12 7.205c4.418 0 8-1.165 8-2.602C20 3.165 16.418 2 12 2S4 3.165 4 4.603c0 1.437 3.582 2.602 8 2.602ZM12 22c4.963 0 8-1.686 8-2.603v-4.404c-.052.032-.112.06-.165.09a7.75 7.75 0 0 1-.745.387c-.193.088-.394.173-.6.253-.063.024-.124.05-.189.073a18.934 18.934 0 0 1-6.3.998c-2.135.027-4.26-.31-6.3-.998-.065-.024-.126-.05-.189-.073a10.143 10.143 0 0 1-.852-.373 7.75 7.75 0 0 1-.493-.267c-.053-.03-.113-.058-.165-.09v4.404C4 20.315 7.037 22 12 22Zm7.09-13.928a9.91 9.91 0 0 1-.6.253c-.063.025-.124.05-.189.074a18.935 18.935 0 0 1-6.3.998c-2.135.027-4.26-.31-6.3-.998-.065-.024-.126-.05-.189-.074a10.163 10.163 0 0 1-.852-.372 7.816 7.816 0 0 1-.493-.268c-.055-.03-.115-.058-.167-.09V12c0 .917 3.037 2.603 8 2.603s8-1.686 8-2.603V7.596c-.052.031-.112.059-.165.09a7.816 7.816 0 0 1-.745.386Z"
                />
                <!-- Anomaly Detection Icon Path -->
                <path
                  v-else-if="menu.routeName === 'anomaly-detection'"

                  fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                />
                <!-- Time-series Forecast Icon Path -->
                <path
                  v-else-if="menu.routeName === 'time-series-forecast'"
                  fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                  d="M3 15v4m6-6v6m6-4v4m6-6v6M3 11l6-5 6 5 5.5-5.5"
                />
                <!-- Chat Icon Path -->
                <path
                  v-else-if="menu.routeName === 'chat'"
                  fill-rule="evenodd"
                  d="M3 5.983C3 4.888 3.895 4 5 4h14c1.105 0 2 .888 2 1.983v8.923a1.992 1.992 0 0 1-2 1.983h-6.6l-2.867 2.7c-.955.899-2.533.228-2.533-1.08v-1.62H5c-1.105 0-2-.888-2-1.983V5.983Zm5.706 3.809a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Zm2.585.002a1 1 0 1 1 .003 1.414 1 1 0 0 1-.003-1.414Zm5.415-.002a1 1 0 1 0-1.412 1.417 1 1 0 1 0 1.412-1.417Z"
                  clip-rule="evenodd"
                />
              </svg>

              <!-- MENU TEXT -->
              <span
                class="ms-3 transition-colors duration-300 ease-in-out"
                :class="[
                  route.name === menu.routeName
                    ? 'text-[#f16322]'
                    : 'text-gray-500 group-hover:text-[#f16322]',
                ]"
              >
                {{ menu.name }}
              </span>
            </RouterLink>
          </li>
        </ul>
      </div>

      <!-- Bottom -->
      <footer class="mt-auto bg-[#f16322] text-white text-center p-2 text-xs">
        Sponsored by KMITL, Automation Engineer
      </footer>
    </aside>

    <!-- MAIN CONTENT -->
    <div>
      <div class="p-9 sm:ml-64 bg-[#fafafb]">
        <h1 class="mt-16 mb-7 text-2xl font-bold text-[#f16322]">
          {{ heading }}
        </h1>
        <slot>
          <!-- Render child components in the slot -->
        </slot>
      </div>
    </div>
  </div>
</template>
