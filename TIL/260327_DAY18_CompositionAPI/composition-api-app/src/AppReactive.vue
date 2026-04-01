<script>

/*

[실습 주제 3]
Composition API의 reactive() 객체를 이용한다

*/

import { reactive, computed } from 'vue';

export default {
    setup() {
        const score = reactive({
            kor: 0,
            eng: 0,
            math: 0
        })

        const total = computed(() => { score.kor + score.eng + score.math })
        
        return {
            score, total
        }
    }
}
</script>

<template>
  <div>
     <p>
        korScore: 
     <input v-model.number="score.kor">
        EngScore: 
     <input v-model.number="score.eng">
        mathScore: 
     <input v-model.number="score.math">
     </p>
     <p>총합: {{ total }}</p>
  </div>
</template>

<style scoped></style>
