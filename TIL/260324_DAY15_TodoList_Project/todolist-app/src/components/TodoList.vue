<template>
  <div class="row">
    <div class="col">
      <ul class="list-group">
        <TodoListItem
          v-for="todoItem in todoList"
          :key="todoItem.id"
          :todoItem="todoItem"
          @delete-todo="$emit('delete-todo', $event)"
          @toggle-completed="$emit('toggle-completed', $event)"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import TodoListItem from './TodoListItem.vue';

export default {
  name: 'TodoList',
  components: { 
    TodoListItem 
  },
  props: {
    // 부모로부터 받는 할 일 배열 (필수값)
    todoList: { 
      type: Array, 
      required: true 
    },
  },
  // 부모(App.vue)로 다시 보낼 이벤트 정의
  emits: ['delete-todo', 'toggle-completed'],
};
</script>