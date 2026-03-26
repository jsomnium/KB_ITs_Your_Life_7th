<template>
  <div style="background-color: #f0f0f0; padding: 10px;">
    <h4>Theme Display</h4>
    <p>적용된 테마: {{ theme }}</p>
  </div>
</template>

<script>
export default {
  inject: ['theme']
}
</script>