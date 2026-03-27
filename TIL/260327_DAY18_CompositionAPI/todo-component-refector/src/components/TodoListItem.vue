<template>
  <li
    class="list-group-item d-flex justify-content-between align-items-center"
    :class="{ 'list-group-item-success': todoItem.completed }"
    @click="emit('toggle-completed', todoItem.id)"
    style="cursor: pointer"
  >
    <span :class="{ 'text-decoration-line-through text-muted': todoItem.completed }">
      {{ todoItem.todo }} {{ todoItem.completed ? '(완료)' : '' }}
    </span>
    <span
      class="badge bg-secondary pointer"
      @click.stop="emit('delete-todo', todoItem.id)"
    >삭제</span>
  </li>
</template>

<script setup>
const props = defineProps({
  todoItem: { type: Object, required: true },
});

const emit = defineEmits(['delete-todo', 'toggle-completed']);
</script>