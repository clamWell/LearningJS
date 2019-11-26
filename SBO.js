

/******* Javascript 표준내장객체(SBO) *********/

// Object 객체 
// Function 함수
// Array 배열
// String 문자열
// Boolean 불린형(참과거짓)
// Number 넘버
// Math 수학적 계산 관련 기능들
// date 날짜 관련
// RegExp



// 이제 표준 내장객체를 이용해서 여러가지 기능을 사용해보자

// 배열을 만들쟈
var arr = new Array('seoul','new york','ladarkh','pusan', 'Tsukuba'); 

function getRdValue(array){
    var index = Math.floor(array.length*Math.random()); // 이렇게 하면 0부터 배열의 요소 개수 중 랜덤하게 숫자가 지정된다
    return array[index]; // 이 함수는 랜덤하게 지정된 숫자를 순서 값으로 배열의 특정 요소를 반환한다.
}

getRdValue(arr); 


// 이렇게도 쓸수 있지만 더 세련된 방법이 있다면 
// 배열 자체에 getRdValue 함수가 내장되도록 만드는 것이다.

// 생성자함수 Array의 프로토타입에 .rand 함수를 추가해준다.
Array.prototype.rand = function(){
    var index = Math.floor(this.length*Math.random());
    return this[index];
}
// 생성자 안에서 this 는 그 생성자가 만든 객체를 가리키게 된다. 
// rand 함수안에서 this는 즉 이 rand 함수를 상속받아 생성되는 인스턴스들, 객체 자체가 된다. 
// 여기서는 arr2, arr3 가 this가 된다.

var arr2 = new Array('seoul','new york','ladarkh','pusan', 'Tsukuba');
arr2.rand();

var arr3 = new Array('a','b', 'c','d','e');
arr3.rand();


// Obejct의 프로퍼티, 메소드들
// Object.keys(); 인자로 받은 오브젝트의 속성 키들을...값이 아니라 Key 를 반환함
// .toString(); 은 객체의 value 값이나 또는 그 객체의상태를 문자열(사람이 보기 쉬운 형태)로 반환해준다.
// 이 두 메소드의 차이는?
// Object.keys(); 는 인자로 객체를 받고,
// .toString(); 는 앞에 객체를 받아서 기능을 수행한다

// 왜냐하면  .toString();는 사실 Object.prototype.toString(); 으로 오브젝트 객체의 프로토타입 속성 이기 때문이다.
// 그래서 오브젝트 객체를 상속받은..대부분의 모든 객체들은 
// .toString 이라는 메소드를 마치 자신 객체의 메소드 처럼 사용할 수 있게 된다.



/******* Javascript 표준내장객체 확장하기 *********/

//SBO 객체인 오브젝트의 프로토타입에 contain 메소드를 추가해준다
Object.prototype.contain = function(some){
	for(var name in this){
		if( this[name] == some) return true;	
	}
	return false; 
}

//객체 o
var o = {'name':'egoing', 'city':'seoul'}
console.log(o.contain('egoing'));

//배열 a
var a = ['egoing','leezche','grapittie'];
console.log(a.contain('leezche'));


// a.hasOwnProperty(name); true 혹은 false 로 반환
