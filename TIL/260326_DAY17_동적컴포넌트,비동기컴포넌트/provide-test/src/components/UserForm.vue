<template>
  <div style="border: 1px solid green; padding: 10px;">
    <h4>User Form</h4>
    <input 
      type="text"
      @input="$emit('update:username', $event.target.value)" 
    />
  </div>
</template>

<script>
export default {
  emits: ['update:username'],
  inject: ['username']
}
</script>