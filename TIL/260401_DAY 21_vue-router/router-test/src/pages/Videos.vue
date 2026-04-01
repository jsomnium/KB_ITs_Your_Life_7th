<template>
  <div class="card card-body">
    <h2>Videos</h2>
    <p>요청 경로: {{ $route.fullPath }}</p>
  </div>
</template>

<script>
export default {
  name: "Videos",
    created() {
    console.log(this.$route);
  }
};
</script>