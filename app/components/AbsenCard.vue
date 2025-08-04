<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200">
    <div class="p-6 pb-4">
      <h2 class="text-lg font-semibold text-center text-gray-900 mb-4">
        Ambil Foto untuk Absen
      </h2>
    </div>
    <div class="px-6 pb-6 space-y-4">
      <div v-if="error" class="bg-red-50 border border-red-200 rounded-lg p-3">
        <div class="flex items-center space-x-2">
          <Icon name="lucide:alert-circle" class="h-4 w-4 text-red-600" />
          <span class="text-sm text-red-800">{{ error }}</span>
        </div>
      </div>

      <PhotoCard
        :photo="photo"
        :is-capturing="isCapturing"
        @capture-photo="$emit('capture-photo')"
        @retake-photo="$emit('retake-photo')"
        @file-change="$emit('file-change', $event)" />

      <LocationStatus v-if="location" :location="location" />

      <SubmitButton
        v-if="photo && location"
        :is-submitting="isSubmitting"
        @submit="$emit('submit-attendance')" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
}

interface Props {
  photo: string | null;
  location: LocationData | null;
  error: string | null;
  isCapturing: boolean;
  isSubmitting: boolean;
}

defineProps<Props>();

defineEmits<{
  "capture-photo": [];
  "retake-photo": [];
  "file-change": [file: File];
  "submit-attendance": [];
}>();
</script>

<style></style>
