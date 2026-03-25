<script>
export default {
  name: 'GalleryListItem',
  props: [imgUrl], 
};
</script>

<template>
  <button @click="$emit('imgChanged', { imgUrl })">
    <img alt="dog image" :src=imgUrl width="125" height="125" />
    <div>{{imgUrl}}</div>
  </button>
</template>

<style scoped></style>http://localhost:5173/public/images/dog1.jpg
