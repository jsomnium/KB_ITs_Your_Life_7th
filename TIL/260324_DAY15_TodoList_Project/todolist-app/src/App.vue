<script>
import TodoList from './components/TodoList.vue';
import InputTodo from './components/InputTodo.vue';

let ts = new Date().getTime();

export default {
  name: "App",
  components: { 
    InputTodo, 
    TodoList 
  },
  data() {
    return {
      todoList: [
        { id: ts, todo: "자전거 타기", completed: false },
        { id: ts + 1, todo: "딸과 공원 산책", completed: true },
        { id: ts + 2, todo: "일요일 애견 카페", completed: false },
        { id: ts + 3, todo: "Vue 원고 집필", completed: false },
      ]
    };
  },
  methods: {
    // 할 일 추가
    addTodo(todo) {
      if (todo.length >= 2) {
        this.todoList.push({ 
          id: new Date().getTime(), 
          todo: todo, 
          completed: false 
        });
      }
    },
    // 할 일 삭제
    deleteTodo(id) {
      let index = this.todoList.findIndex((item) => id === item.id);
      this.todoList.splice(index, 1);
    },
    // 완료 여부 토글
    toggleCompleted(id) {
      let index = this.todoList.findIndex((item) => id === item.id);
      this.todoList[index].completed = !this.todoList[index].completed;
    }
  }
};
</script>

<template>
  <div id="app" class="container">
    <div class="card card-body bg-light">
      <div class="title">:: Todolist App</div>
    </div>

    <div class="card card-default card-borderless">
      <div class="card-body">
        <InputTodo @add-todo="addTodo" />
        <TodoList 
          :todoList="todoList" 
          @delete-todo="deleteTodo" 
          @toggle-completed="toggleCompleted" 
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
  .logo {
    margin: 0 2rem 0 0;
  }
  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>