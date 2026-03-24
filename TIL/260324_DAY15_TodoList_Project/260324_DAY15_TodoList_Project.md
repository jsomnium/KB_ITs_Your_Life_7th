# 26.03.24(화) DAY 15 - 컴포넌트 분리

# 오전 수업

[07.1 단일 파일 컴포넌트를 이용한 Vue 애플리케이션 개발.pdf](26%2003%2024(%ED%99%94)%20DAY%2015%20-%20%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%20%EB%B6%84%EB%A6%AC/07.1_%E1%84%83%E1%85%A1%E1%86%AB%E1%84%8B%E1%85%B5%E1%86%AF_%E1%84%91%E1%85%A1%E1%84%8B%E1%85%B5%E1%86%AF_%E1%84%8F%E1%85%A5%E1%86%B7%E1%84%91%E1%85%A9%E1%84%82%E1%85%A5%E1%86%AB%E1%84%90%E1%85%B3%E1%84%85%E1%85%B3%E1%86%AF_%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A1%E1%86%AB_Vue_%E1%84%8B%E1%85%A2%E1%84%91%E1%85%B3%E1%86%AF%E1%84%85%E1%85%B5%E1%84%8F%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%89%E1%85%A7%E1%86%AB_%E1%84%80%E1%85%A2%E1%84%87%E1%85%A1%E1%86%AF.pdf)

- 컴포넌트 생성
- 컴포넌트 간 정보 전달 방법

### 컴포넌트의 조합

- 컴포넌트의 tree 구조가 만들어진다

### 컴포넌트간 정보 전달 ⭐⭐⭐

예를 들어, v-bind: 단방향, v-model: 양방향

여기서 단방향은 부모→자식 관계 또는 자식→부모 관계를 말한다

부모→자식 관계와 자식→부모 관계를 묶어서 양방향이라고 한다.

- 부모 → 자식
    - 속성 (props)
- 자식 → 부모
    - 이벤트 발신 (emit)
    - 부모의 이벤트 핸들러에서 정보 처리
    - 이벤트 발생을 부모에 전달하고, 처리해달라고 요청한다

## 5. 속성

### 속성을 이용한 정보 전달

- 자식 컴포넌트: props 옵션으로 속성 정의
- 부모 컴포넌트: v-bind를 이용해 자식 컴포넌트의 속성에 정보 전달
- **주의 사항**
    - 읽기 전용: 속성으로 전달받은 데이터는 변경 불가 (자식이 정보 수정 불가)
        
        ⇒ 즉, 속성은 부모만 바꿀 수 있다
        
    - 부모에서 속성 값을 변경 시, 자식은 자동으로 리렌더링 됨

### src/components/CheckboxItem.vue - props 전달

```html
<template>
  <li>
    <input 
      type="checkbox" 
      **:checked="checked"** 
    />
    {{ name }}
  </li>
</template>

<script>
export default {
  name: 'CheckboxItem',
  **props: ['name', 'checked'],** 
};
</script>
```

```html
<template>
  <div>
    <h2>관심있는 K-POP 가수?</h2>
    <hr />
    <ul>
      **<CheckboxItem 
        v-for="idol in idols" 
        :key="idol.id" 
        :name="idol.name" 
        :checked="idol.checked" 
      />**
    </ul>
  </div>
</template>

<script>
**import CheckboxItem from './components/CheckboxItem.vue';**

export default {
  name: 'App',
  **components: { CheckboxItem },**
  data() {
    return {
      **idols: [
        { id: 1, name: 'BTS', checked: true },
        { id: 2, name: 'Black Pink', checked: false },
        { id: 3, name: 'EXO', checked: false },
        { id: 4, name: 'ITZY', checked: false },
      ],**
    };
  },
};
</script>
```

- 프롭스
    - `props: ['name', 'checked']`
- 동작 방식
    - 부모 컴포넌트에서 이 자식 컴포넌트를 부를 때 아래와 같이 값을 넘겨줌
    - `<CheckboxItem name="장보기" :checked="true" />`
        
        → 넘기는 속성 수가 많은 경우, 객체 통째로 넘기는 경우가 있다
        

### 속성 변경

1) 자식 컴포넌트에서 일반 속성 수정 시

- 상황
    - 부모가 `props: ['name']`으로 "BTS"를 전달
    - 자식 내부에서 `this.name = 'EXO'`로 변경 시도
- 결과
    - 에러 발생
    - Vue가 "부모 데이터를 직접 수정하지 마라"며 경고함

2) 참조(객체/배열) 자체를 수정 시

- 상황
    - 부모가 `idol` 객체 `{id:1, name:'BTS'}`를 전달
    - 자식이 `this.idol = {id:2, name:'ITZY'}`처럼 객체 통째를 교체 시도
- 결과
    - 에러 발생
    - 메모리 주소(참조값) 자체가 바뀌는 것을 Vue가 감지하고 차단함

3) 참조 객체의 내부 속성값 변경

- 상황
    - 전달받은 객체 내부의 특정 값만 수정 (`this.idol.checked = true`)
- 결과
    - 에러 미발생
    - 자바스크립트 특성상 객체 내부의 값만 바꾸는 것은
    '참조 주소'가 변한 것이 아니기에 Vue가 변경을 감지하지 못함

⇒ 절대 비권장, 에러가 안 난다고 해서 사용하면 안 됨

4) 결론

- 비권장 이유: 데이터가 어디서 바뀌었는지 추적이 불가능해져 유지보수가 매우 힘들어짐
- 해결책 ($emit): 자식은 부모에게 이벤트($emit)를 발신하여 수정을 요청함
    - 실제 데이터 수정은 해당 데이터를 소유한 **부모 컴포넌트**에서 처리함
    - 참고) $가 붙으면 vue자체의 내장 기능

### 속성의 유효성 검증

- 위의 이유에 따라, 속성에 대한 엄격한 유효성 검증 필요 시
    
    → 배열이 아닌 객체 형태로 속성을 정의
    
    ```jsx
    export default {
      ......
      props : {
        // 1. 단일 타입 지정
        속성명1 : 타입명,
    
        // 2. 여러 타입 허용 (배열로 지정)
        속성명2 : [타입명1, 타입명2],
    
        // 3. 상세 옵션 설정 (객체로 지정)
        속성명3 : {
          type : 타입명,
          required : [true/false, 기본값:false],
          default : [기본값 또는 기본값을 리턴하는 함수, 기본값:undefined]
        },
        ......
      }
    }
    ```
    
    속성명3 처럼 객체로 구체화 가능하다
    
- type에 생성자 함수 지정
    - string, number, boolean, array, object … 등등

### src/components/CheckboxItem.vue - 컴포넌트 생성 예시

```html
<template>
  <li>
    <input 
      type="checkbox" 
      :checked="checked" 
    />
    {{ id }} - {{ name }}
  </li>
</template>

<script>
export default {
  name: 'CheckboxItem',
  **props: {
    id: [Number, String], // Number 또는 String 타입
    name: String, 
    
    // checked: 상세 설정 (타입, 필수여부, 기본값)
    checked: {
      type: Boolean,
      required: false, // 옵션
      default: false, // 생략시, 기본값은 false
    },**
  },
};
</script>
```

## 6. 사용자 정의 이벤트

### 사용자 정의 이벤트를 이용한 정보 전달

- 이벤트
    - 자식 → 부모 컴포넌트로 정보를 전달하는 방법
- 자식 컴포넌트가 이벤트를 발신 (emit events)
    - 컴포넌트 인스턴스의 $emit() 메서드 이용
        
        `$emit(’이벤트명’, [값])`
        
- 부모 컴포넌트는 v-on 디렉티브로 이벤트 수신

### 자식 → 부모

1. 자식 컴포넌트에서 (이벤트 발신)

자식 컴포넌트 내부의 로직에서 `$emit`을 호출하여 부모에게 알림

```jsx
this.$emit('event-name', eventArgs1, eventArgs2, ...)
```

2. 부모 컴포넌트에서 (이벤트 수신 및 처리)

부모는 템플릿에서 이벤트를 듣고(`@`), 해당 이벤트를 처리할 메서드를 연결

- **템플릿 영역:**
    
    ```jsx
    <child-component @event-name="handlerMethod" />
    ```
    
- **스크립트 영역 (Methods):**
    
    ```jsx
    methods: {
      handlerMethod(eventArgs1, eventArgs2, ...) {
        // 자식으로부터 전달받은 아규먼트(인자값)로 처리할 코드 작성
      }
    }
    ```
    

### 예시 코드

```html
src/components/InputName.vue (자식컴포넌트)

<template>
  <div style="border: solid 1px gray; padding: 5px">
    이름: 
    <input 
      type="text" 
      v-model="name" 
    />
    <button **@click="$emit('nameChanged', { name })"**>
      이벤트 발신
    </button>
  </div>
</template>

<script>
export default {
  **name: 'InputName',
  data() {
    return { 
      name: '' 
    };
  },**
};
</script>
```

```html
src/App4.vue (부모컴포넌트)

<template>
  <div>
    <InputName **@nameChanged="nameChangedHandler"** />
    <br />
    
    <h3>App 데이터 : {{ parentName }}</h3>
  </div>
</template>

<script>
**import InputName from './components/InputName.vue';**

export default {
  name: 'App4',
  **components: { 
    InputName 
  },**
  data() {
    return {
      // 자식으로부터 전달받은 이름을 저장할 공간
      parentName: '',
    };
  },
  **methods: {
    // 자식이 $emit으로 보낸 데이터(e)를 매개변수로 받음
    nameChangedHandler(e) {
      this.parentName = e.name;
    },
  },**
};
</script>
```

- **데이터 흐름**:
    1. 자식에서 데이터 발생
    2. `$emit`으로 부모에게 신호와 데이터 전송
    3. 부모의 `methods`에서 데이터를 받아 자신의 `data`에 저장
    4. 화면(Template) 업데이트
- 설명
    
    ① `@nameChanged="nameChangedHandler"`
    
    - `@`: `v-on`의 약자, 이벤트를 듣겠다는 의미
    - 자식 컴포넌트가 `nameChanged`이벤트를 발생시키면,
    부모는 즉시 `nameChangedHandler`메서드 실행
    
    ② `nameChangedHandler(e)`
    
    - `e.name`을 통해 그 값을 꺼낼 수 있음
    
    ③ `this.parentName = e.name`
    
    - 부모가 가진 `parentName` 변수에 자식이 보내준 새로운 이름 저장
    - 그러면 화면의 `<h3>` 태그 안에 있는 이름이 자동으로 바뀜

### 이벤트 처리 과정

![image.png](26%2003%2024(%ED%99%94)%20DAY%2015%20-%20%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%20%EB%B6%84%EB%A6%AC/image.png)

### 부모-자식-손자 컴포넌트 계층 구조에서 이벤트 전송

![image.png](26%2003%2024(%ED%99%94)%20DAY%2015%20-%20%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%20%EB%B6%84%EB%A6%AC/image%201.png)

- TodoListItem → TodoList → App
    - TodoList → 중개하는 역할을 한다

### 이벤트 유효성 검증

- emits 옵션 등록
    - 발신하는 이벤트에 대한 유효성 검사를 수행
        
        ![image.png](26%2003%2024(%ED%99%94)%20DAY%2015%20-%20%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%20%EB%B6%84%EB%A6%AC/image%202.png)
        
        → 이벤트를 발생시켜 데이터를 전달할 것인데, 이 데이터가 유효한지 검증한다
        유효하다면 함수가 true를 리턴, 이벤트 발생 O
        유효하지 않다면 false를 리턴, 이벤트 발생 X
        

## 7. 이벤트 에미터 사용

- 이벤트 에미터?
    - 부모-자식-손자와 같은 많은 계층이 존재할 때, 이벤트 전달은 매우 힘들다
    - 중간에 낀 컴포넌트는 그 데이터가 필요 없는데도 단순히 전달만 하느라 복잡해짐
        
        → 하나의 공유 이벤트 에미터를 만들어 특정 컴포넌트에게 이벤트를 전송한다
        
    - vue3에서는 사라진 문법이므로 매우 권장되지는 않음

---

## TodoList예제 리팩토링

## 1. 컴포넌트 분할과 정의

### 컴포넌트 분할 기준 ⭐

- 한 번에 변경되는 데이터를 렌더링하는 UI 단위로 컴포넌트를 분할
    1. 변경된 데이터만 다시 렌더링
    2. 재사용성이 높은 컴포넌트는 분리한다
    3. 복잡도가 높은 컴포넌트는 재사용성이 낮더라도 분리한다 (기능 단위로 쪼갬)
    
    ![image.png](26%2003%2024(%ED%99%94)%20DAY%2015%20-%20%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%20%EB%B6%84%EB%A6%AC/image%203.png)
    
- TodoList 앱의 경우
    
    ![image.png](26%2003%2024(%ED%99%94)%20DAY%2015%20-%20%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%20%EB%B6%84%EB%A6%AC/image%204.png)
    

### TodoList 만들어보기

https://github.com/jsomnium/KB_ITs_Your_Life_7th/tree/main/TIL/260324_DAY15_TodoList_Project/todolist-app

## 내용 정리

- 프로젝트 구조 파악하기
- props 전달
- emit 이벤트 처리