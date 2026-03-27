<template>
  <div class="container">
    <h1 class="text-center">Todo List App</h1>
    <InputTodo @add-todo="addTodo" />
    <TodoList 
      :todoList="state.todoList" 
      @delete-todo="deleteTodo" 
      @toggle-completed="toggleCompleted" 
    />
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import InputTodo from './components/InputTodo.vue';
import TodoList from './components/TodoList.vue';

const state = reactive({ todoList: [] });

onMounted(() => {
  const ts = new Date().getTime();
  state.todoList.push({ id: ts, todo: '자전거 타기', completed: false });
  state.todoList.push({ id: ts + 1, todo: '딸과 공원 산책', completed: true });
  state.todoList.push({ id: ts + 2, todo: '일요일 애견 카페', completed: false });
  state.todoList.push({ id: ts + 3, todo: 'Vue 원고 집필', completed: false });
});

const addTodo = (todo) => {
  if (todo.length >= 2) {
    state.todoList.push({
      id: new Date().getTime(),
      todo: todo,
      completed: false,
    });
  }
};

const deleteTodo = (id) => {
  const index = state.todoList.findIndex((item) => id === item.id);
  state.todoList.splice(index, 1);
};

const toggleCompleted = (id) => {
  const index = state.todoList.findIndex((item) => id === item.id);
  state.todoList[index].completed = !state.todoList[index].completed;
};
</script>