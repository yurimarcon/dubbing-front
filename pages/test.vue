<template>
  <div>
    <input type="file" @change="onFileChange" />
    <button @click="uploadFile">Upload</button>
  </div>
</template>
  
<script setup>
import {ref} from 'vue'

const selectedFile = ref(null);
const uploadUrl = ref("");

const onFileChange = async (event) => {

  selectedFile.value = event.target.files[0];

  const response = await $fetch(
    "https://pky434u1q7.execute-api.us-east-1.amazonaws.com/Prod/api/storage/Get-GetPreSignedUrlRequest-Url?fileName=" + selectedFile.value.name + "&userName=admin"
  );

  uploadUrl.value = response;
  console.log(uploadUrl.value)
};
const uploadFile = async () => {
  if (!selectedFile.value || !uploadUrl.value) return;
  
  console.log(selectedFile.value)

  try {
    const response = await $fetch(uploadUrl.value, {
      method: "PUT",
      body: selectedFile.value,
    });

    if (response.status === 200) {
      console.log("File uploaded successfully");
    } else {
      console.error("Failed to upload file", response.status);
    }
  } catch (error) {
    console.error("Error during file upload:", error);
  }
};
</script>
  