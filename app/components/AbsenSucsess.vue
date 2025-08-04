<template>
  <div
    class="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
    <div
      class="w-full max-w-md bg-white rounded-lg shadow-sm border border-gray-200">
      <div class="p-6">
        <div class="text-center space-y-4">
          <Icon
            name="lucide:check-circle"
            class="w-16 h-16 text-green-500 mx-auto" />
          <h2 class="text-2xl font-bold text-green-700">Absen Berhasil!</h2>
          <p class="text-gray-600">
            Data absen Anda telah berhasil dikirim pada
            {{ formatTime(currentTime) }}
          </p>
          <button
            @click="$emit('reset')"
            class="w-full px-4 py-2 text-base font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Absen Lagi
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  currentTime: Date;
}

defineProps<Props>();

defineEmits<{
  reset: [];
}>();

const formatTime = (date: Date) => {
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};
</script>

<style></style>
