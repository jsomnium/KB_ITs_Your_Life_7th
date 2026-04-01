<script>

/*

[실습 주제 2]
Composition API를 이용해
input에 입력받은 값의 합을 반응형으로 즉각 계산하기

*/

import { ref, computed } from 'vue';

export default {
    setup() {
        const korScore = ref(0);
        const EngScore = ref(0);
        const mathScore = ref(0);

        const scoreSum = computed(() => {
            return korScore.value + EngScore.value + mathScore.value;
        })
        
        return {
            korScore, EngScore, mathScore, scoreSum
        }
    }
}
</script>

<template>
  <div>
     <p>
        korScore: 
     <input v-model.number="score.korScore">
        EngScore: 
     <input v-model.number="EngScore">
        mathScore: 
     <input v-model.number="mathScore">
     </p>
     <p>총합: {{ scoreSum }}</p>
  </div>
</template>

<style scoped></style>
