# 26.04.01(수)  DAY 21 - vue-router

[10.1 vue-router를 이용한 라우팅 1.pdf](26%2004%2001(%EC%88%98)%20DAY%2021%20-%20vue-router/10.1_vue-router%E1%84%85%E1%85%B3%E1%86%AF_%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A1%E1%86%AB_%E1%84%85%E1%85%A1%E1%84%8B%E1%85%AE%E1%84%90%E1%85%B5%E1%86%BC_1.pdf)

# 10.1 vue-router를 이용한 라우팅 1

## 1 vue-router란

- **SPA (Single Page Application)**
    
    단일 페이지 안에서 데스크톱 애플리케이션과 유사한 사용자 경험을 제공하며, 화면을 별도로 로딩하지 않고 여러 화면을 구현한다
    
- **라우팅의 필요성**
    
    화면마다 고유의 식별자(URI)를 기반으로 렌더링해야 하며, 요청된 URI 경로에 따라 각기 다른 화면이 나타나도록 `vue-router` 라이브러리를 사용한다
    

## 2 vue-router의 기본 사용법

### createRouter()

- **역할**: `router` 객체를 생성하고 URI 경로와 해당 경로를 처리할 컴포넌트를 매핑한다
- **주요 설정 사항**:
    - `history`: `createWebHistory()` 등을 통해 히스토리 모드를 설정한다
    - `routes`: 경로(`path`)와 컴포넌트(`components`) 정보를 배열 형태로 정의한다
    - **예시 매핑**: `/` → Home, `/about` → About, `/members` → Members 등
- router 객체를 생성
    - URI와 이 경로를 처리할 컴포넌트 매핑
        
        ```jsx
        import { createRouter, createWebHistory } from 'vue-router'
        
        const router = createRouter({
          history: createWebHistory(),
          routes: [
            { 
              path: '/', 
              component: Home
            },
            { 
              path: '/about', 
              component: About
            },
            { 
              path: '/members', 
              component: Members
            },
            { 
              path: '/videos', 
              component: Videos
            },
          ]
        });
        ```
        

### router 객체의 등록

```jsx
const app = createApp(App)
**app.use(router)**
app.mount('#app')
```

- Vue.js 인스턴스에 라우터 기능을 연결하고, 실제 웹 페이지에 연결(마운트)한다
- **`app.use(router)`** → 이 코드가 있어야만 앱 전체에서 `<RouterView>`나 `<RouterLink>` 같은 라우터 전용 컴포넌트들을 사용할 수 있음

### <RouterView>

- 각 경로별 컴포넌트를 렌더링할 위치를 지정하는 컴포넌트
    
    ```jsx
    <template>
    	<div class="container">
    		**<Header />
    		<RouterView/>**
    	</div>
    </template>
    ```
    

### <RouterLink to=”경로”>

- 화면 전환을 위한 링크 생성
    - `<RouterLink>`는 브라우저가 서버에 새 HTML을 요청하는 것을 막고, 내부적으로 URL만 바꾼 뒤 필요한 컴포넌트만 렌더링한다
    - next.js의 <Link> 태그와 같은 역할을 한다

```jsx
<router-link to="[등록시킬 URI 경로]">[링크 텍스트]</router-link>

**<RouterLink to="/">Home</RouterLink>**
```

- SPA에서는, <a href=”#”> 사용 금지
    - <a> 태그는 화면 전체를 리렌더링한다
    - 새로고침 시, state가 초기화된다

### router 실제 예시 1

- 기본 골격
    
    ![image.png](26%2004%2001(%EC%88%98)%20DAY%2021%20-%20vue-router/image.png)
    
    - components: 일반 컴포넌트 (header, footer… )
    - router: vue-router의 설정 파일 index.js (URL 경로, 컴포넌트 매핑 설정)
    - views(pages): 라우터 컴포넌트 (특정 경로 접속 시 렌더링되는 페이지 단위의 라우터 컴포넌트)
- src/router/index.js
    
    ```jsx
    **import { createRouter, createWebHistory } from 'vue-router'**
    import HomeView from '../views/HomeView.vue'
    
    const router = createRouter({
      history: createWebHistory(import.meta.env.BASE_URL),
      routes: [
        {
          path: '/',
          name: 'home',
          **component: HomeView**
        },
        {
          path: '/about',
          name: 'about',
          **component: () => import('../views/AboutView.vue')**
        }
      ]
    })
    
    export default router
    ```
    
    - `component: () => import('../views/AboutView.vue')`
        - 비동기 컴포넌트에서 보던 형태와 동일하다
        - 이 설정은 라우트 방문 시에만 컴포넌트를 로드하는 지연 로딩(lazy-loading)을 적용한다
        
        → about 요청이 최초로 들어왔을 때 로딩한다 (초기 로딩 속도 향상)
        
- src/main.js
    
    ```jsx
    import './assets/main.css'
    import { createApp } from 'vue'
    import App from './App.vue'
    **import router from './router'**
    
    const app = createApp(App)
    
    **app.use(router)**
    app.mount('#app')
    ```
    
- src/App.vue
    
    ```jsx
    <script setup>
    **import { RouterLink, RouterView } from 'vue-router'**
    import HelloWorld from './components/HelloWorld.vue'
    </script>
    
    <template>
      <header>
        <img 
          alt="Vue logo" 
          class="logo" 
          src="@/assets/logo.svg" 
          width="125" 
          height="125" 
        />
    
        <div class="wrapper">
          <HelloWorld msg="You did it!" />
    
          <nav>
            **<RouterLink to="/">Home</RouterLink>
            <RouterLink to="/about">About</RouterLink>**
          </nav>
        </div>
      </header>
    
      **<RouterView />**
    </template>
    
    <style scoped>
    </style>
    ```
    

### router 실제 예시 2 - 상태 관리

- page 컴포넌트 정의
    - src/pages
        - Home.vue
        - About.vue
        - Memebers.vue
        - Videos.vue
- src/router/index.js
    
    ```jsx
    import { createRouter, createWebHistory } from 'vue-router'
    import Home from '@/pages/Home.vue'
    import About from '@/pages/About.vue'
    import Members from '@/pages/Members.vue'
    import Videos from '@/pages/Videos.vue'
    
    const router = createRouter({
      history: createWebHistory(),
      **routes: [
        { path: '/', component: Home },
        { path: '/about', component: About },
        { path: '/members', component: Members },
        { path: '/videos', component: Videos },
      ]**
    })
    
    export default router;
    ```
    
- src/main.js
    
    ```jsx
    import { createApp } from 'vue'
    import 'bootstrap/dist/css/bootstrap.css'
    import App from './App.vue'
    import router from './router'
    
    const app = createApp(App)
    
    **app.use(router) // 라우터 등록**
    app.mount('#app') // 앱 마운트
    ```
    
- src/components/Header.vue
    
    ```jsx
    <template>
      <nav class="navbar navbar-expand-md bg-dark navbar-dark mt-2">
        <span class="navbar-brand">이날치(LeeNalChi)</span>
    
        <button class="navbar-toggler" type="button" @click="changeIsNavShow">
          <span class="navbar-toggler-icon"></span>
        </button>
    
        <div :class="navClass">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/">홈</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/about">소개</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/members">멤버</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/videos">영상</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </template>
    
    <script>
    import { reactive, computed } from 'vue';
    
    export default {
      setup() {
        **const state = reactive({ isNavShow: false });**
    
        **// 상태에 따라 부트스트랩 클래스를 동적으로 변경 
        const navClass = computed(() =>
          state.isNavShow
            ? 'collapse navbar-collapse show' // 펼쳐짐
            : 'collapse navbar-collapse'      // 닫힘
        );**
    
        **const changeIsNavShow = () => { 
          state.isNavShow = !state.isNavShow; 
        };**
    
        return { state, changeIsNavShow, navClass };
      },
    };
    </script>
    ```
    
- src/App.vue
    
    ```jsx
    <template>
      <div class="container">
        <Header />
    
        <router-view></router-view>
      </div>
    </template>
    
    <script>
    **import Header from '@/components/Header.vue'**
    
    export default {
      name: "App",
      **components: { Header },**
    }
    </script>
    
    <style>
    .container {
      text-align: center;
      margin-top: 10px;
    }
    </style>
    ```
    

### <RouterView>의 컴포넌트 마운트 방법

![image.png](26%2004%2001(%EC%88%98)%20DAY%2021%20-%20vue-router/image%201.png)

1. 요청된 경로 확인 (패턴 매칭)
    - **상황**: 사용자가 주소창에 `/about`을 입력하거나 `<router-link to="/about">`을 클릭한다
    - **동작**: 라우터 객체(`this.$router`)가 미리 등록된 `routes` 배열을 훑으며 입력된 주소와 일치하는 **패턴**이 있는지 찾는다
    - **결과**:  `{ path: '/about', component: About }`이라는 라우트 정보를 찾아낸다

2. 매칭된 라우트 정보 추출 (`currentRoute`)

- 패턴 매칭에 성공하면, 현재 활성화된 라우트 정보(경로, 이름, 연결된 컴포넌트 등)가 별도의 객체에 담긴다
- **접근 방법**:
    - **Options API**: `this.$route` 또는 `this.$router.currentRoute`를 통해 접근한다
    - **Composition API**:  `useRoute()` 훅을 사용하여 접근한다

3. `<router-view>`에 컴포넌트 마운트

- 라우터는 찾아낸 정보를 바탕으로 "이 자리에 컴포넌트를 보여줘야겠다"라고 결정한다
- **최종 단계**: `<router-view>` 태그가 위치한 자리에 실제 `About` 컴포넌트의 HTML 내용이 마운트(렌더링)되어 화면에 나타난다

## 3 router 객체와 currentRoute 객체

### 컴포넌트에서 router 객체 접근하기

- this.$router
    - src/router/index.js에서 작성한 router 객체
    - 전체 라우트 정보를 파악할 수 있다
    - push(), replace(), go() 등의 메서드를 이용할 수 있다
- Router 관련 정보 접근
    
    
    | 구분 | Options API | Composition API |
    | --- | --- | --- |
    | 라우터 객체 | this.$router | const router = useRouter()
    → vm인스턴스와 연계된 기능 |
    | 매칭된 라우트 (current Route) | this.$router 또는
    this.$router.currentRoute | const currentRouter = useRouter() |

# 10.2 vue-router를 이용한 라우팅 2

[10.2 vue-router를 이용한 라우팅 2.pdf](26%2004%2001(%EC%88%98)%20DAY%2021%20-%20vue-router/10.2_vue-router%E1%84%85%E1%85%B3%E1%86%AF_%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A1%E1%86%AB_%E1%84%85%E1%85%A1%E1%84%8B%E1%85%AE%E1%84%90%E1%85%B5%E1%86%BC_2.pdf)

## 1 동적 라우트

### 동적 라우트

- 개념: 일정한 패턴의 URI 경로를 하나의 라우트에 연결하는 방식
- 활용: URI 경로의 일부에 실행에 필요한 파라미터 값을 포함하여 컴포넌트에서 이용
- 작성 형식
    
    ```jsx
    { path: '/members/:id', component: MemberInfo }
    ```
    

## 2 중첩 라우트

### 중첩 라우트

![image.png](26%2004%2001(%EC%88%98)%20DAY%2021%20-%20vue-router/image%202.png)

1. 중첩 라우트의 개념 및 구조

- **요청 경로 : `/videos`**: 최상위 `<router-view>`에 `Videos` 컴포넌트가 마운트됩니다. 이 상태에서 `Videos` 컴포넌트 내부에 있는 두 번째 `<router-view>`는 아직 비어 있거나 기본 상태입니다.
- **요청 경로 : `/videos/:id`**: 사용자가 특정 영상 아이디로 접근하면, 부모인 `Videos` 컴포넌트는 유지된 채로 그 내부의 `<router-view>` 자리에 자식 컴포넌트인 `VideoPlayer`가 마운트됩니다.
- **계층 구조**: `App` -> `Videos` -> `VideoPlayer` 순으로 컴포넌트가 중첩되어 렌더링되는 방식입니다.

2. `router` 객체 설정 방법

이미지 속의 코드를 보면 `children` 속성을 사용하여 부모-자식 관계를 정의합니다.

- **부모 라우트**: `path: '/videos'` 경로에 `component: Videos`를 매핑합니다.
- **자식 라우트 (`children`)**: 부모 설정 내부에 `children` 배열을 만들고, 하위 경로인 `:id`와 해당 컴포넌트인 `VideoPlayer`를 등록합니다.
- **경로 주의사항**: 자식의 `path`에 `/`를 붙이지 않고 `:id`만 적으면 부모 경로 뒤에 자동으로 붙어 `/videos/:id`가 됩니다.

## 3 명명된 라우트와 명명된 뷰

### 명명된 라우트

라우트 정보에 특정한 이름을 부여하여 관리하는 방식이다

- 장점: 복잡한 URI 경로 대신 이름을 사용해 경로를 전환하므로, 나중에 URL 구조가 바뀌어도 코드 수정을 최소화할 수 있음
- 사용법:
    - 라우터 설정에서 `name: 'home'`과 같이 이름을 지정한다
    - `<router-link>`를 사용할 때 `:to="{ name: 'home' }"` 형식으로 호출한다
- 파라미터/쿼리 전달: 이름을 이용할 때 `params`나 `query` 객체를 함께 전달할 수 있다
    - (예: `:to="{ name: 'members/id', params: { id: 1 } }"` )

### 명명된 뷰

한 번에 여러 개의 `<router-view>`를 화면에 나타내야 할 때, 각 뷰에 이름을 붙여 관리하는 방식이다

- 설정:
    - `<router-view name="left">`와 같이 이름을 부여한다
    - 이름이 없는 뷰는 기본적으로 `default` 뷰가 된다
- 컴포넌트 할당: 라우터 설정의 `components` 속성에서 각 이름에 매칭될 컴포넌트들을 지정한다
    
    ```jsx
    components: {
      default: Members,   // 기본 영역
      left: MembersLeft,  // 왼쪽 사이드바 영역
      footer: MembersFooter // 하단 영역
    }
    ```
    

# 10.3 vue-router를 이용한 라우팅 3

## 1 프로그래밍 방식의 라우팅 제어

### 라우터 객체의 메서드

| **메서드** | **설명** |
| --- | --- |
| `addRoute(parentRouter, route)` | 실행 시에 동적으로 부모 라우트에 새로운 라우트 정보를 추가합니다. |
| `removeRoute(name)` | 실행 시에 동적으로 라우트 정보를 삭제합니다. |
| **`go(n)`** | $n$만큼 브라우저 히스토리를 이용해 이동합니다.
`go(-1)`을 호출하면 이전 방문 경로로 이동합니다. |
| **`back()`** | `go(-1)`과 같습니다. |
| **`forward()`** | `go(1)`과 같습니다. |
| **`push(to)`** | 지정된 경로로 이동하고 **브라우저 히스토리에 이동 경로를 추가**합니다. |
| `replace(to)` | 지정된 경로로 이동하지만 **브라우저 히스토리에 새롭게 추가하지 않고** 현재의 히스토리를 새로운 경로로 교체합니다. |
| `getRoutes()` | 현재 설정된 라우트 정보를 조회할 수 있습니다. |
- push와 replace 비교
    
    ![image.png](26%2004%2001(%EC%88%98)%20DAY%2021%20-%20vue-router/image%203.png)
    
    - push() 메서드
        - 이동 경로를 정적인 문자열을 인자로 전달 가능
        - 경로 정보를 담은 객체를 인자로 전달 가능
            
            ```jsx
            // 1. 문자열 직접 전달
            router.push('/home')
            
            // 2. 객체 정보로 전달
            router.push({ path: '/about' })
            
            // 3. 명명된 라우트 사용
            // 예) /members/1 경로로 이동
            router.push({ **name: 'members/id'**, params: { id: 1 } })
            
            // 4. 쿼리 문자열 전달 
            // 예) /board?pageno=1&pagesize=5 경로로 이동
            router.push({ path: '/board', **query: { pageno: 1, pagesize: 5 }** })
            ```
            

### 내비게이션 가드

- 라우팅이 일어날 때 프로그래밍 방식으로 내비게이션을 취소하거나, 다른 경로로 리디랙션 하는 것
    
    → 내비게이션을 안전하게 보호해주는 기능을 수행한다
    
- 예시
    - 인증 받은 사용자만 해당 페이지 접근 가능한 경우
    - 인증 받지 않은 사용자인 경우 로그인 경로로 이동하는 경우
        
        ⇒ 즉, 라우트하는 경로가 바뀔 때 반응한다
        동일한 경로에서 파라미터나 쿼리 문자열이 변경될 때는 작동하지 않는다
        
- 사용 수준
    - 전역 수준
    - 라우트 수준
    - 컴포넌트 수준
- 코드 예시
    
    ```jsx
    import { createRouter, createWebHistory, isNavigationFailure } from 'vue-router' [cite: 1]
    
    const router = createRouter({ ... })
    
    // 전역 전위 가드: 내비게이션이 시작될 때 호출됩니다
    router.**beforeEach**((to, from) => {
      // 내비게이션을 취소하려면 명시적으로 false를 리턴합니다
      return false
    })
    
    // 전역 후위 가드: 내비게이션이 완료된 후 호출됩니다
    router.**afterEach**((to, from, failure) => {
      // 내비게이션을 실패했을 때 failure 정보를 이용해 실패 처리를 할 수 있습니다
      if (isNavigationFailure(failure)) {
        // 실패 처리 로직 작성
      }
    })
    ```
    

### beforeEach (함수)

- beforeEach란?
    - 내비게이션이 시작될 때 호출되는 함수이다
    - 매개변수
        1. to: 이동할 대상
            
            사용자가 이동하려고 하는 목적지 라우트 객체
            
        2. from: 현재 위치
            
            내비게이션 시작 직전의 현재 라우트 객체
            
        3. next: (선택 사항) 다음 가드로 넘어가거나 내비게이션 승인
- 함수의 리턴값
    - 내비게이션을 정상적으로 진행시, 리턴하지 않거나 true를 리턴한다
    - 내비게이션이 취소되었을 시, false를 리턴한다
    - 리다이렉트하는 경우
        - 이동할 경로 문자열 또는 route 객체를 리턴한다
            1. return ‘/videos/1’
            2. return { path : ‘/’ }
            3. return { name: ‘members/id’, params: {id : 2} }
    - Error throw → router.onError()에 등록된 콜백 함수를 호출한다

### 라우트 수준의 내비게이션 가드 ⭐

- 각 라우트 단위로 설정
    
    ```jsx
    const router = createRouter({
      // ... 
      routes : [
        {
          path: '/members/:id', 
          name: 'members/id', 
          component: MemberInfo,
          
          **beforeEnter : (to, from) => {**
            // 내비게이션을 중단하고 싶을 때 false를 리턴합니다.
            // return false 
          }
        },
      ]
    })
    ```
    
    - 사용 예시
        - 전체 페이지는 누구나 볼 수 있지만 **'멤버 상세 정보'** 페이지는 특정 등급 이상만 들어가게 하고 싶을 때 유용하다
- 여러 개의 함수 등록
    
    ```jsx
    // 첫 번째 검문소
    **const guard1 = (to, from) => {**
      // 로직 작성 (예: 로그인 체크)
    }
    
    // 두 번째 검문소
    **const guard2 = (to, from) => {**
      // 로직 작성 (예: 권한 체크)
    }
    
    const router = createRouter({
      routes : [
        {
          path: '/members/:id',
          name: 'members/id',
          component: MemberInfo,
          
          // 여러 개의 가드를 배열로 등록
          **beforeEnter : [ guard1, guard2 ]**
        },
      ]
    })
    ```
    
    - 동작 방식
        - 배열 형태 사용: **`beforeEnter : [ guard1, guard2 ]`**
        - 실행 순서: 배열에 등록된 순서대로 실행
        - 협력 동작: 어느 하나라도 false 일 시, 내비게이션 중단

### 컴포넌트 수준의 내비게이션 가드

- Options API에서
    
    
    | **내비게이션 가드** | **설명** |
    | --- | --- |
    | **`beforeRouteEnter`** | 컴포넌트가 렌더링하는 경로가 확정되기 전에 호출됩니다. Options API를 사용하는 경우 이 시점에서는 인스턴스가 생성되지 않았기 때문에 `this`를 이용할 수 없습니다. |
    | **`beforeRouteUpdate`** | 컴포넌트를 렌더링하는 경로가 바뀔 때 호출됩니다. 새로운 경로이지만 기존 컴포넌트가 재사용됩니다. (새롭게 마운트되지 않고 업데이트만 됨) 예) `/videos/abc`에서 `/videos/def`로 이동 시 이미 마운트된 `VideoPlayer` 컴포넌트를 재사용하며 이 훅이 실행됩니다. |
    | **`beforeRouteLeave`** | 현재의 경로에서 다른 경로로 벗어날 때 호출됩니다. |
- Composition API에서
    
    
    | **Options API (기존 방식)** | **Composition API (권장 방식)** | **설명** |
    | --- | --- | --- |
    | **`beforeRouteEnter`** | **`setup()` 메서드 내부 코드로 대체** | 컴포넌트가 생성되기 전이므로, `setup()` 안의 로직이 이를 대신합니다. |
    | **`beforeRouteUpdate`** | **`onBeforeRouteUpdate`** | 같은 컴포넌트 내에서 파라미터만 바뀔 때(예: `/members/1` → `/members/2`) 실행됩니다. |
    | **`beforeRouteLeave`** | **`onBeforeRouteLeave`** | 현재 페이지를 떠나기 직전에 실행됩니다. |