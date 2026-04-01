<template>
  <div class="card card-body">
    <h2>Home</h2>
    <p>요청 경로: {{ $route.fullPath }}</p>
  </div>
</template>

<script>
export default {
  name: "Home",
    created() {
    console.log(this.$route);
  }
};
</script>