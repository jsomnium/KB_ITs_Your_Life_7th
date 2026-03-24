<template>
  <div class="row mb-3">
    <div class="col">
      <div class="input-group">
        <input 
          type="text" 
          class="form-control"
          placeholder="할일을 여기에 입력!"
          v-model.trim="todo"
          @keyup.enter="addTodoHandler" 
        />
        <span 
          class="btn btn-primary input-group-addon"
          @click="addTodoHandler"
        >
          추가
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputTodo",
  data() {
    return { 
      todo: "" 
    };
  },
  // 부모에게 보낼 이벤트 이름을 명시적으로 선언 (Vue 3 권장사항)
  emits: ["add-todo"],
  methods: {
    addTodoHandler() {
      // 3글자 이상일 때만 이벤트 발신
      if (this.todo.length >= 3) {
        this.$emit('add-todo', this.todo);
        this.todo = ""; // 입력창 초기화
      }
    }
  },
};
</script>