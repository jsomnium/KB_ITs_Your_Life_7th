<script>
export default {
  name: 'GalleryBig',
  props: ['imgUrl']
}
</script>

<template>
  <img alt="bigImg" :src=imgUrl width="300" height="300" />
  <br/>
</template>