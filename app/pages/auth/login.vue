<template>
  <div class="flex justify-center items-center h-screen px-6 bg-red-100">
    
    <div
      class="absolute top-30 sm:top-36 text-7xl font-extrabold text-red-500 opacity-10 select-none pointer-events-none  z-0"
    >
      ABSENSI
    </div>
    <form
      action=""
      class="flex flex-col gap-6 bg-red-400 rounded-xl w-full max-w-md p-8 shadow-2xl z-10"
      @submit.prevent="handleLogin"
    >
      <div class="flex flex-col items-center gap-2 text-center">
        <img src="../../assets/images/LogoPenus.webp" alt="Logo" class="w-14" />
        <h1 class="font-bold text-3xl text-amber-50">Masuk</h1>
        <p class="text-amber-50 text-sm00000000000000000">
          Masukkan kredensial untuk masuk ke akun Anda
        </p>
      </div>

      <div class="flex flex-col gap-2 text-amber-50">
        <label for="noInduk" class="text-sm font-medium">No Induk</label>
        <input
          class="bg-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-500 text-black"
          type="text"
          id="noInduk"
          name="noInduk"
          v-model="state.no_induk"
          required
        />
      </div>

      <div class="flex flex-col gap-2 text-amber-50">
        <label for="password" class="text-sm font-medium">Kata Sandi</label>
        <input
          class="bg-white rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-red-500 text-black"
          type="password"
          id="password"
          name="password"
          v-model="state.password"
          required
        />
      </div>

      <button
        class="bg-amber-50 text-red-600 font-semibold rounded-md py-3 mt-2 hover:bg-white transition-all duration-200 shadow-lg cursor-pointer"
        type="submit"
      >
        Masuk
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { UseAuth } from "~/composables/useAuth";

const { Login } = UseAuth();

const state = ref({
  no_induk: "",
  password: "",
});

const handleLogin = async () => {
  try {
    await Login(state.value);
  } catch (error) {
    console.log("Gagal login:", error);
    // Tampilkan pesan error ke user jika perlu
  }
}

// const handleLogin = async () => {
//   try {
//     await Login(login);
//   } catch (error) {
//     console.log("faile to Login💔", error);
//     return 
//   }

</script>

<style></style>
