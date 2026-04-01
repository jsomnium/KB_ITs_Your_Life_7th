<script>

/*

[실습 주제 1]
Composition API를 이용해 간단한 정수 증가 프로그램 만들기

*/

import { ref } from 'vue';

export default {
    setup() {
        const count = ref(0);
        const increament = () => { count.value++; }
        // 오답 주의: count++;
        // .value를 통해서 값에 접근해야 한다

        return {
            count, increament
        }
    }
}
</script>

<template>
  <div>
    <!-- 증가와 감소 버튼 작성 -->
     <p>
        count : {{ count }}
     </p>
     <button @click="increament">증가</button>
  </div>
</template>

<style scoped></style>
