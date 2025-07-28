<template>
  <div
    class="flex flex-col items-center justify-center bg-primary-dark w-full p-8 h-screen"
  >
    <h1 class="text-secondary-dark text-6xl font-mono font-semibold">
      ABSENSI
    </h1>
    <div
      class="glass-card rounded-2xl p-4 flex flex-col items-center justify-center"
    >
      <div class="flex items-center justify-center gap-1 self-end">
        <span class="rounded-full w-3 h-3 bg-green-500"></span>
        <span class="rounded-full w-3 h-3 bg-yellow-400"></span>
        <span class="rounded-full w-3 h-3 bg-primary-red"></span>
      </div>
      <div>
        <p class="text-primary-light text-2xl font-mono">
          Hii, Selamat Datang {{ userName || "User" }}
        </p>
        <p class="text-secondary-dark text-xl">
          Silahkan absen dengan tepat waktu
        </p>
        <div class="flex flex-col gap-4 mt-4">
          <!-- <p class="text-primary-light">generaate</p> -->
          <div class="mb-6 flex flex-col gap-4">
            <button
              class="hover:bg-primary-red font-mono text-primary-light font-bold border-2 border-primary-light rounded-lg py-3 px-6 text-lg w-full transition-all hover:shadow-none hover:translate-y-[3px]"
              @click="openToogleQr"
            >
              Generate QR Code
            </button>
            <div
              class="overflow-hidden flex flex-col items-center justify-center border-2 border-primary-light rounded-2xl transition-all duration-500 ease-in-out"
              :class="[
                ShowQr ? 'max-h-[350px]' : 'max-h-0',
                ShowQr ? 'p-4' : 'p-0',
              ]"
            >
              <h2 class="font-mono text-xl text-primary-light" v-show="ShowQr">
                QR Code Anda
              </h2>
              <div id="qr-code-container"></div>
            </div>
            <button
              class="hover:bg-primary-red font-mono text-primary-light font-bold border-2 border-primary-light rounded-lg py-3 px-6 text-lg w-full transition-all hover:shadow-none hover:translate-y-[3px]"
              @click="closeToogleQr"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <button class="bg-red-800 hover:bg-primary-red font-mono text-primary-light font-bold border-2 border-primary-light rounded-lg text-md w-1/4 transition-all hover:shadow-none hover:translate-y-[3px]" @click="Logout">LogOut</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: "auth"
})

import { ref } from "vue";

const { Logout } = UseAuth()
const ShowQr = ref(false);

const userName = ref<string | null>(null);


const openToogleQr = async () => {
  ShowQr.value = true;
  await nextTick();
  await GenerateQR();
};

const closeToogleQr = async () => {
  const qrCodeContainer = document.getElementById("qr-code-container");
  ShowQr.value = false;
  await new Promise((resolve) => setTimeout(resolve, 500));
  if (qrCodeContainer) {
    qrCodeContainer.innerHTML = "";
  }
};

const GenerateQR = async () => {
  const user_id = localStorage.getItem("user_id");
  await nextTick();
  const qrCodeContainer = document.getElementById("qr-code-container");
  if (qrCodeContainer) {
    qrCodeContainer.innerHTML = "";
    const { default: QrCreator } = await import("qr-creator");
    QrCreator.render(
      {
        text: user_id || "",
        radius: 0.2,
        size: 300,
        fill: "#f41945",
        ecLevel: "Q",
        background: null,
      },
      qrCodeContainer
    );
  }
};

onMounted(() => {
    userName.value = localStorage.getItem("nama")
})
</script>

<style></style>
