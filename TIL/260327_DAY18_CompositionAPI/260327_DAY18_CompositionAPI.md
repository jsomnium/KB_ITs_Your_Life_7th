# 26.03.27(금) DAY 18 - Composition API, vue-router

- 오늘의 학습 내용
    - 09.1 Composition API
    - 09.2 TodoList App 리팩토링 (Composition API)
    - 10.1 vue-router를 이용한 라우팅 1

---

# 09.1 Composition API

## 1 Composition API란?

### Composition API

- Vue 3에서 새롭게 도입된 함수 기반의 API
- 대규모 애플리케이션에서 컴포넌트의 로직을 더욱 효과적으로 구성하고 재사용할 수 있도록 설계됨

### Options API 방식

- 논리적 관심사 코드가 분리됨
- 로직 재사용의 불편함

## 2 setup 메서드를 이용한 초기화

### setup() 메서드

- data, methods, computed 옵션이 사라짐
- 옵션을 구분하지 않고 **초기화 작업을 전부 setup()에서 정의**함
- beforeCreate, created 단계에서 setup() 메서드가 호출됨

### 프로젝트 예시

- src/components/Calc.vue
    
    ```jsx
    <template>
      <div>
        X: <input type="text" v-model.number="x" /><br />
        Y: <input type="text" v-model.number="y" /><br />
      </div>
    </template>
    
    <script>
    import { ref } from 'vue';
    
    export default {
      name: 'Calc',
      setup() {
        const x = ref(10);
        const y = ref(20);
    
        return { x, y };
      },
    };
    </script>
    ```
    
    - `return {x, y};`
        - template에서 사용할 것만 모아서 객체로 return함
    - `const x = ref(10);`
        - `ref()` → 반응형 핵심
        - Vue가 해당 변수를 관찰 대상으로 등록하여, 값이 변할 때마다 **화면을 자동으로 업데이트해줌**
- src/App.vue
    
    ```jsx
    <template>
      <div>
        <Calc />
      </div>
    </template>
    
    <script>
    import Calc from './components/Calc.vue';
    
    export default {
      name: "App",
      components: {
        Calc
      },
    }
    </script>
    ```
    

### setup() 메서드의 매개변수

- 두 개의 인자
    - 부모 컴포넌트로부터 전달받는 속성 (props)
    - 컴포넌트 컨텍스트
        - 기존 옵션 API에서 this에 해당
        - vue 인스턴스의 속성에 접근 가능 (예, emit())

## 3 반응성을 가진 상태 데이터

### ref() 함수를 이용한 상태 데이터 생성

- 기본 데이터 타입(Number, Bool, String…)에 대한 반응성 데이터 생성

### reactive()를 이용한 상태

- **참조 데이터 타입(**객체, 배열)에 대한 반응성 데이터 생성

### ref()

- 해당 데이터를 **script에서 사용할 때는 `x.value`로 접근**해야 함
    - .value를 사용하지 않고 바로 값을 대입하면 반응성을 잃어 버림
    - 예시)
        
        ```jsx
        // ❌ error 또는 반응성 상실
        // ref 객체 자체를 숫자 20으로 덮어씌워 버림
        const x = ref(10);
        x = 20;
        ```
        
        ```jsx
        // ✅ ref 객체 내부의 값만 변경하여 반응성 유지
        const x = ref(10);
        x.value = 20;
        ```
        
- 프로젝트 예시 - 개선 버전
    - src/components/Calc2.vue
        
        ```jsx
        <template>
          <div>
            X : <input type="text" v-model.number="x" /><br />
            Y : <input type="text" v-model.number="y" /><br />
            <button @click="calcAdd">계산</button><br />
            <div>결과 : {{ result }}</div>
          </div>
        </template>
        
        <script>
        import { ref } from 'vue';
        
        export default {
          name: 'Calc2',
          setup() {
            const x = ref(10);
            const y = ref(20);
            const result = ref(30);
        
            // 이벤트 핸들러 - 계산 로직 정의
            const calcAdd = () => {
              result.value = x.value + y.value;
            };
        
            return { x, y, result, calcAdd };
          },
        };
        </script>
        ```
        
        - 왜 const를 사용했을까?
            - x = 20의 대입을 사전에 차단한다
        - closure
            - setup()함수 호출 시 생성되는 ctx scope는
            **setup()이 종료돼도 calcAdd 덕분에 저장**된다

### reactive()

- 프로젝트 예시 - 개선 버전
    - src/components/Calc3.vue
        
        ```jsx
        <template>
          <div>
            X : <input type="text" v-model.number="state.x" /><br />
            Y : <input type="text" v-model.number="state.y" /><br />
            <button @click="calcAdd">계산</button><br />
            <div>결과 : {{ state.result }}</div>
          </div>
        </template>
        
        <script>
        import { reactive } from 'vue';
        
        export default {
          name: 'Calc2',
            setup() {
            const state = reactive({ x: 10, y: 20, result: 30 });
        
            const calcAdd = () => {
                state.result = state.x + state.y;
            };
        
            return { state, calcAdd };
          },
        };
        </script>
        ```
        
        - 객체의 멤버를 수정했는데 반응한다
        - 그런데 **계산하는 값이니, 그냥 computed() 쓰는게 낫지 않나?**

## 4 computed()

### computed()

- 옵션 API에서 computed() 옵션에 해당한다
- **Composition API에서 계산된 속성을 만들 때 사용한다**
- 프로젝트 예시 - 개선 버전
    - src/components/Calc4.vue
        
        ```jsx
        <template>
          <div>
            X : <input type="text" v-model.number="state.x" /><br />
            Y : <input type="text" v-model.number="state.y" /><br />
            <div>결과 : {{ result }}</div>
          </div>
        </template>
        
        <script>
        import { reactive, computed } from 'vue';
        
        export default {
          name: 'Calc4',
          setup() {
            const state = reactive({ x: 10, y: 20 });
        
            const result = computed(() => {
              return state.x + state.y;
            });
        
            return { 
              state, 
              result 
            };
          },
        };
        </script>
        ```
        
        - computed()
            - 기존의 addCalc를 대체했다
            - state에서 별도로 선언하던 **result 대신, 계산된 값을 사용**한다

## 5 watch와 watchEffect

### watch

- watch()함수를 통해서 제공한다
- 형식
    
    ```jsx
    watch(data, (current, old) => {
      // 처리하려는 연산 로직
    })
    ```
    
    - 첫 번째 인자, data : 감시하려는 대상 반응성 데이터, 속성, 계산된 속성
    - 두 번째 인자: 핸들러 함수
        - current: 변경된 값
        - old: 변경되기 전 값
            
            **→ current, old는 ref객체가 아닌 ref.value에 해당하는 값 주의**
            
- 프로젝트 예시 - 개선 버전
    - src/components/Calc5.vue
        
        ```jsx
        <template>
          <div>
            x : <input type="text" v-model.number="x" />
            <br />
            결과 : {{ result }}
          </div>
        </template>
        
        <script>
        import { ref, watch } from 'vue';
        
        export default {
          name: "Calc5",
          
          setup() {
            const x = ref(0);
            const result = ref(0);
        
            // watch(감시할 대상, (새로운 값, 이전 값)) => {}
            watch(x, (current, old) => {
              console.log(`${old} -> ${current}`);
              result.value = current * 2;
            });
        
            return { x, result };
          }
        }
        </script>
        ```
        
    - src/components/Calc6.vue
        
        ```jsx
        <template>
          <div>
            x : <input type="text" v-model.number="state.x" />
            <br />
            결과 : {{ state.result }}
          </div>
        </template>
        
        <script>
        import { reactive, watch } from 'vue';
        
        export default {
          name: 'Calc6',
          setup() {
            // 여러 상태를 하나의 객체로 묶어서 관리
            const state = reactive({ 
              x: 0, 
              result: 0 
            });
        
            // reactive 객체의 특정 속성을 감시할 때는 'Getter 함수'(() => state.x) 형태를 써야 합니다.
            watch(
              () => state.x,
              (current, old) => {
                console.log(`${old} -> ${current}`);
                state.result = current * 2;
              }
            );
        
            return { state };
          },
        };
        </script>
        ```
        
        - reactive
            - ref: 단일 값 추적시 사용, `.value` 붙여야 함
            - reactive: 여러 개의 데이터가 연결된 경우 사용, `state.x`처럼 일반 객체로 사용
        - **watch ( ()⇒ state.x , … ){}
        ⇒ watch의 첫 번째 인자가 `() ⇒ state.x` 인 이유**
            - watch는 기본적으로 "변화하는 대상" 자체를 인자로 받길 원한다
            - ref는 변수 자체가 객체 형태라 `watch(x, ...)`라고 써도 된다
            - 하지만 `reactive` 안의 `state.x`는 그냥 숫자 값(0)일 뿐이다
            - 그래서 `() => state.x` (Getter 함수)를 전달해서, Vue가 그 값이 바뀔 때마다 실행하며 체크하게 만드는 것이다
- watch와 computed의 차이점
    - **computed**
        - 기존 데이터를 가공해서 **새로운 값을 계산**해 낼 때 (선언적, 결과 중심)
    - **watch**
        - **데이터 변화에 반응하여 특정 로직(API 호출, 타이머 설정, 로그 기록 등)을 실행**할 때 (명령적, 과정 중심)
        - 일반적인 경우, input에 입력된 값에 따라 서버에서 데이터를 새로 받아와야 할 때 (API 호출) 가장 많이 쓰인다

### watchEffect

| **구분** | **watch** | **watchEffect** |
| --- | --- | --- |
| 감시대상(의존성) 지정 | **필요함.** 지정된 감시 대상 데이터가 변경되면 핸들러 함수가 실행됨 | **불필요함.** 핸들러 함수 내부에서 이용하는 반응성 데이터가 변경되면 함수가 실행됨 |
| 변경전 값 | **이용가능.** 핸들러 함수의 두 번째 인자값을 이용함. | **이용 불가.** 핸들러 함수의 인자 없음 |
| 감시자 설정 후 즉시 실행 여부 | 즉시 실행되지 않음 | **즉시 실행** |
- Vue3에서 반응성 데이터 의존성을 추적하는 기능을 제공하는 새로운 방법
- 기본 형식
    
    ```jsx
    watchEffect(
      () => { // 반응성 데이터를 사용하는 코드 작성}
    )
    ```
    
- 프로젝트 예시 - 개선 버전
    - src/components/Calc8.vue
        
        ```jsx
        <template>
          <div>
            X : <input type="text" v-model.number="x" /><br />
            Y : <input type="text" v-model.number="y" /><br />
            <div>결과 : {{ result }}</div>
          </div>
        </template>
        
        <script>
        import { ref, watchEffect } from 'vue';
        
        export default {
          name: 'Calc8',
          setup() {
            const x = ref(10);
            const y = ref(20);
            const result = ref(30);
        
            // watchEffect는 내부에 사용된 반응형 데이터(x, y)가 변하면 자동으로 재실행됩니다.
            watchEffect(() => {
              result.value = x.value + y.value;
              console.log(`${x.value} + ${y.value} = ${result.value}`);
            });
        
            return { x, y, result };
          },
        };
        </script>
        ```
        
        - 자동 추적
            - 함수 안에 x.value가 있으면 자동으로 인식한다

## 6 생명주기 훅 (Life Cycle Hook)

### Composition API의 생명주기

기존 Opstion API에서 Composition API를 사용하며 진화되었다

![image.png](26%2003%2027(%EA%B8%88)%20DAY%2018%20-%20Composition%20API,%20vue-router/image.png)

- before Create, created 없이, setup에서 이루어진다
- 나머지 훅들은 이름 앞에 **on 접두어**가 붙으며,
실행할 함수를 매개변수로 전달하는 방식으로 바뀌었다
- 부모-자식 간의 실행 순서
    1. 생성 단계
        
        부모 setup → 자식 setup 순으로 시작된다
        
    2. 마운트 단계
        
        자식의 onMounted가 먼저 완료된 후, 부모의 onMounted가 실행된다
        

## 7 <script setup> 사용하기 ⭐⭐

### <script setup>

- 단일 파일 컴포넌트 내부에서 Composition API를 좀 더 편리한 문법적 작성 기능 제공
- setup() 함수 내부 코드로 이용됨
- 기존 방식
    
    ```jsx
    setup(props, context) {
      // 이벤트를 발신할 때
      context.emit('add-todo', todo)
    }
    ```
    
- <script setup> 방식
- 예시
    - 컴포넌트 등록의 간소화
        - 기존에는 자식 컴포넌트를 쓸 때 `import` 하고 `components: { Calc }`처럼 등록하는 과정이 필요했다
        - <script setup>에서는, 그냥 `import`만 하면 끝이다
    - **컴파일 타임 매크로 - defineProps** ⭐
        
        ```jsx
        const props = defineProps({
          todoItem : { type : Object, required : true }
        })
        ```
        
    - **컴파일 타임 매크로 - defineEmits** ⭐ → this.emit이 emit으로 바뀐다
        
        ```jsx
        const emit = defineEmits(['delete-todo', 'toggle-completed'])
        ```
        
    - 코드 예시
    
    ```jsx
    <script setup>
    
    const props = defineProps({
      todoItem: { 
        type: Object, 
        required: true 
      }
    });
    
    const emit = defineEmits(['delete-todo', 'toggle-completed']);
    
    const removeTodo = (id) => {
      emit('delete-todo', id);
    };
    </script>
    ```
    

---

# TodoList App 리팩토링 (Composition API)

## 1 TodoList 앱 리팩토링

1. **Event Bubbling (이벤트 전파):** `TodoListItem`에서 발생한 `delete-todo` 신호가 어떻게 `TodoList`를 거쳐 `App.vue`까지 전달되는지 그 과정을 이해해야 한다 (**Event Emitting**)
2. **Props Down, Events Up:** 데이터는 부모에서 자식으로 내려가고(`props`), 명령은 자식에서 부모로 올라온다(`emit`)는 Vue의 대원칙이다
3. **배열 메서드 (JavaScript):** `findIndex`와 `splice`를 사용하여 반응성 객체(`reactive`)인 배열을 수정하는 방법이다. Vue는 배열이 수정되면 화면을 자동으로 다시 그린다.

---

# 이해를 돕기 위한 정리

1. Vue2 (Options API) → Vue3 (Composition API)
    - **Vue 2 (Options API)**
        
        정해진 서랍에 나눠 담아야 했다
        
        - 데이터: `data`
        - 계산: `computed`
        - 함수: `methods`
    - **Vue 3 (Composition API)**
        - 서랍 구분 없이 관련 있는 로직끼리 자유롭게 모아서 작성
        - `setup()` 메서드
        - 이걸 더 간편하게 줄인 게 `<script setup>` 메서드
        - 변경 방식
            - data() → ref(), reactive()
            - watch → watch(), watchEffect()
            - mounted() → onMounted(() ⇒ {})
