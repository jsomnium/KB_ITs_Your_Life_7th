<template>
  <div>
    <h1>사용자 설정 관리</h1>
    <p>현재 사용자: {{ username }}</p>
    <UserPanel v-model:username="username" />
    <hr />
    <ThemeDisplay />
  </div>
</template>

<script>
import UserPanel from './components/UserPanel.vue'
import ThemeDisplay from './components/ThemeDisplay.vue'

export default {
  components: { UserPanel, ThemeDisplay },
  data() {
    return {
      username: '홍길동',
      theme: 'Light Mode'
    }
  },
  provide() {
    return {
      theme: this.theme,
      username: this.name
    }
  }
}
</script>