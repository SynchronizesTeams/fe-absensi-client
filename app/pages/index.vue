<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <AbsenSucsess
      v-if="success"
      :current-time="currentTime"
      @reset="resetForm" />

    <template v-else>
      <Header />

      <div class="p-4 space-y-4">
        <TimeCard :current-time="currentTime" />

        <AbsenCard
          :photo="photo"
          :location="location"
          :error="error"
          :is-capturing="isCapturing"
          :is-submitting="isSubmitting"
          @capture-photo="handleCameraCapture"
          @retake-photo="() => setPhoto(null)"
          @submit-attendance="handleSubmitAttendance"
          @file-change="handleFileChange" />

        <InfoCard />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
}

const photo = ref<string | null>(null);
const location = ref<LocationData | null>(null);
const isCapturing = ref(false);
const isSubmitting = ref(false);
const error = ref<string | null>(null);
const success = ref(false);
const currentTime = ref(new Date());

onMounted(() => {
  const timer = setInterval(() => {
    currentTime.value = new Date();
  }, 1000);

  onUnmounted(() => {
    clearInterval(timer);
  });
});

const getCurrentLocation = (): Promise<LocationData> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation tidak didukung oleh browser ini"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      (error) => {
        let errorMessage = "Gagal mendapatkan lokasi";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Akses lokasi ditolak. Mohon izinkan akses lokasi.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Informasi lokasi tidak tersedia.";
            break;
          case error.TIMEOUT:
            errorMessage = "Waktu permintaan lokasi habis.";
            break;
        }
        reject(new Error(errorMessage));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  });
};

const handleCameraCapture = async () => {
  isCapturing.value = true;
  error.value = null;

  try {
    const locationData = await getCurrentLocation();
    location.value = locationData;

    const event = new Event("trigger-camera");
    document.dispatchEvent(event);
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Terjadi kesalahan";
    isCapturing.value = false;
  }
};

const handleFileChange = (file: File) => {
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      photo.value = e.target?.result as string;
      isCapturing.value = false;
    };
    reader.readAsDataURL(file);
  } else {
    isCapturing.value = false;
  }
};

const handleSubmitAttendance = async () => {
  if (!photo.value || !location.value) {
    error.value = "Foto dan lokasi diperlukan untuk absen";
    return;
  }

  isSubmitting.value = true;
  error.value = null;

  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    success.value = true;
    setTimeout(() => {
      resetForm();
    }, 3000);
  } catch (err) {
    error.value = "Gagal mengirim data absen. Silakan coba lagi.";
  } finally {
    isSubmitting.value = false;
  }
};

const resetForm = () => {
  photo.value = null;
  location.value = null;
  error.value = null;
  success.value = false;
};

const setPhoto = (value: string | null) => {
  photo.value = value;
};
</script>
