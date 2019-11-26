

/******* 함수의 THIS 에 대해서*********/

function func(){  // 특정 스코프 없이 그냥 함수를 선언하면 this는 전역객체를 가리키게 된다. 
    if(window === this){ // 즉 window 가 된다.
        console.log("window === this");
    }
}
func(); 


// 이번에는 객체의 메소드에서 this를 호출해보는 것
// 이경우에 this는 메소드가 소속된 객체를 가르킨다. 
var o = {
    ofunc : function(){
        if(o === this){
            console.log("o === this");
        }
    }
}
o.ofunc();   


//그렇다면 생성자 new 를 사용해서 함수를 호출하게 되면 어떻게 될까?

var funcThis = null;  //이 funcThis의 값이 어떻게 바뀌는지 지켜보자
 
function FuncTest(){
    funcThis = this; 
}

//객체 o1에 함수를 호출한 값을 할당했다.
var o1 = FuncTest(); 
console.log(funcThis); // 전역객체 window 가 콘솔에 찍힌다. 

// 이렇게 new를 이용해 생성자를 호출하게 되면
var o2 = new FuncTest(); 
console.log(funcThis); // 객체 o2 가 콘솔에 찍힌다.

//즉 생성자 안에서 this 는 그 생성자가 만든 객체를 가리키게 된다. 



/******* 함수의 메소드 apply 와 call *********/


// 이 두개의 함수 정의 결과는 같다 
// 사실 함수도 객체이기 때문에 후자 처럼 선언해주는게 맞지만, 이 경우 세번째 인자가 길어질 경우 가독성이 떨어지거나
// 문법 작성이 어려워질 수 있다. 그렇기에 전자의 방법 처럼 함수를 선언해주는 방식이 있는 것.
// 이런 것을 '함수 리터럴' 이라고 한다.
// 편리하게 값을 만들어주는 체계를 리터럴이라고 한다.

function sum(x,y) { 
	return x+y; 
}
var a = sum(1,2); // 결과 3 리턴

var sum2 = new Function('x','y', 'return x+y;');
sum2(1,2);

// 함수는 객체이기 때문에 함수가 갖고있는 기본적인 메소드와 프로퍼티가 있다. 
// 이중 apply 와 call을 배워보자

var o = {}
var p = {}

function func(){
    switch(this){
        case o:
            document.write('o<br />');
            break;
        case p:
            document.write('p<br />');
            break;
        case window:
            document.write('window<br />');
            break;          
    }
}

func(); //이 경우에는 this가 window 이므로 세번째 case 구문을 실행한 후 break를 만나 빠져나간다.
func.apply(o); // ECMA에서 지정해놓은 함수 .apply 는 함수의 this 값을 첫 번째 인자값으로 설정해준다. 이경우에는 객체 'o'가 this로 할당된다.
func.apply(p); // 이 경우에는 객체 'p'가 this로 할당된다.


// 일반적인 형태의 객체지향 구문에서 특정 함수 메소드는 특정 객체에 종속되어 있다.
// 극단적으로 비유하자면 객체가 주인(master) 이고 메소드는 노예(slave)가 되는 것.
// 그러나 이렇게 apply를 사용하게 되면 함수 func()는 어떤 맥락에서 호출되느냐에 따라 
// window에 종속되기도 하고, 객체 o나 p에 종속되기도 한다. 

// 결론? THIS는 변화무쌍하다. 
// this는 호출된 함수가 어떤 객체에 소속되느냐, 그 맥락을 파악해야 하는 것.




