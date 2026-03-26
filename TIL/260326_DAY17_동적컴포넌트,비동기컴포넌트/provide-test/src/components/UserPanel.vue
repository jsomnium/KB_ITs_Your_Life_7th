<template>
  <div style="border: 1px solid blue; padding: 10px;">
    <h3>User Panel (중간 컴포넌트)</h3>
    <UserForm 
      @update:username="$emit('update:username', $event)" 
    />
  </div>
</template>

<script>
import UserForm from './UserForm.vue'

export default {
  components: { UserForm },
  emits: ['update:username'],
}
</script>