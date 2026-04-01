// closure 실습
// 본래 outer 함수는 실행 후, 스코프가 사라지기 때문에 count에 접근 불가능해야 한다
// 그러나 inner 함수에서 count를 사용하고 있기 때문에 스코프가 사라지지 않는다
// 이처럼, 외부 함수의 변수를 내부 함수에서 계속 접근 가능한 현상을 클로저라고 한다

function outer() {
    let count = 0;

    function inner() {
        count++;
        console.log(count);
    }

    return inner;
}

const counter = outer();

counter();
counter();
counter();