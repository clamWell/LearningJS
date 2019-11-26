

/******* 상속에 대해서 *********/

// 특정 객체의 속성(변수나, 메소드)를 물려 받아 생성된 자식 객체는
// 부모(원본, 오리지널)객체의 기능에 접근해서 부모 객체의 프로퍼티를 이용 할 수 있다. 
// 더 나아가 자식 객체는 부모 객체의 어떤 기능은 제외하고, 어떤 기능은 추가해서 
// 부모 객체의 로직을 재 활용 할 수있다. 이것이 상속의 기본적인 동작 방법


// 아래는 일반적인 클래스, 인스턴스를 생성하는 방법이다.
function Person(name){
    this.name = name;
    this.introduce = function(){
        return 'My name is '+this.name; 
    }   
}

var p1 = new Person('egoing');
console.log(p1.introduce());


// 이 아래는 상속의 개념을 이용한 방법이다.

// person2라는 생성자(클래스)가 있다.
function Person2(name){
    this.name = name;
}

// prototype 이라는 속성은 미리 약속된 특수한 속성이다.
// 이렇게 작성해주면 person2 함수 객체의 prototype 속성에는 name이라는 속성이 추가된다.
Person2.prototype.name = null; 
Person2.prototype.introduce = function(){ // 마찬가지로 person2 함수 객체의 prototype 속성에 introduce라는 함수 객체가 추가된다.
    return 'My name is '+this.name; 
}

// 이 경우에도 p1은 Person의 속성을 상속받으므로 prototype 속성도 상속받게된다.
// p1.introduce는 p1 의 부모 객체인 person2의 prototype 속성에 introduce라는 함수가 호출된다.
var p1 = new Person2('egoing');
document.write(p1.introduce()+"<br />");


/******* 상속을 구현해보자 *********/


function Human(name){
    this.name = name;
}

// 위와 동일하게 Human 생성사를 생성하고 prototype 속성안에 속성들을 추가해준다.
Human.prototype.name = null; 
Human.prototype.introduce = function(){ 
    return 'My name is '+this.name; 
}

// 새로 만든 객체 Programmer
function Programmer(name){
	this.name = name; 
}
// 객체 Programmer도 Human 객체의 속성들을 사용하고 싶다.
// 이럴 경우 아래의 문법으로 구문을 작성해주면
// 자바스크립트는 생성자 Person 이 prototype 속성을 가지고 있는지를 먼저 체크하고, 
// 그 속성안에 있는 값들(함수나, 변수, 속성 등)을 Programmer 의 prototype 속성에 추가해준다(일종의 복제본)
// 즉 프로토타입 프로퍼티로 부모생성자로 생성된 객체(인스턴스)가 지정되는 것.
Programmer.prototype = new Person();
 
var p1 = new Programmer('egoing'); // 객체 p1은 human 객체를 상속받은 생성자 Programmer 로 생성된 객체다
document.write(p1.introduce()+"<br />");



/******* 상속 응용. 부모의 기능을 물려받고 새로운 기능까지 추가해보자 *********/

// 아래는 위와 코드와 동일하다
function Person(name){
    this.name = name;
}

// 이 경우에도 Person의 생성자 함수안에서 introduce를 쓰지않고
// 굳이 생성자 함수 밖에서 prototype 속성을 이용해 introduce 메소드를 추가해줬는데
// 그 이유는 만약 생성자 함수 안에서 정의하게 되면 이 생성자 함수를 이용해 생성된
// 모든 인스턴스들이 생성될 때 마다 똑같이 .introduce() 함수 속성을 갖게되며
// 이것은 매우 비효율적이기 때문.
// 차라리 prototype 속성값에 할당해줌으로써 공통된 .introduce() 함수 메소드를 사용하게끔 해주는 것.



Person.prototype.introduce = function(){
    return 'My name is '+this.name; 
}
 
function Programmer(name){
    this.name = name;
}
// Person이 아닌 Programmer에만 coding 이라는 기능을 추가해주고 싶으면?
// programmer의 prototype 속성에 coding 프로퍼티를 추가해준다.이 속성은 부모에는 영향을 미치지 않는다. 
Programmer.prototype = new Person();
// Programmer.coding = ~~ 이렇게 하지 않는 이유는
// 이렇게 표기할 겨우 생성자 programmer 가 이미 .coding 메소드를 부여 받은 것 처럼 보이나 실제로는 그런 적이 없기 때문에...
// 객체 생성함수 바깥에서 새로운 메소드나 프로퍼티를 추가해주기 위해서는 prototype 속성을 활용해야 하는 것
Programmer.prototype.coding = function(){
    return "hello world";
}
 
// 이렇게 생성된 객체 p1은 Person의 프로토타입을 상속 받은 생성자 programmer 의 인스턴스가 되며
// prototype 속성에 coding 프로퍼티를 갖고 있는 객체가 된다.
var p1 = new Programmer('egoing');
document.write(p1.introduce()+"<br />");
document.write(p1.coding()+"<br />");


// Designer 객체도 생성해준다
function Designer(name){
    this.name = name;
}

Designer.prototype = new Person();
Designer.prototype.design = function(){
    return "beautiful";
}

var yj = new Designer('youjin');
console.log(yj.design());



/******* prototype 이란 무엇인가 *********/

// prototype은 결국 원본, 틀, 원형이라고 할 수 있다.
// JS는 prototype chaining(프로토타입체이닝)이라는 핵심적인 기술을 통해 상속을 구현한다.

function Ultra(){}
Ultra.prototype.ultraProp = true;
 
function Super(){}
Super.prototype = new Ultra();
 
function Sub(){}
Sub.prototype = new Super();
 
var o = new Sub();
console.log(o.ultraProp); 

// o.ultraProp 를 입력받으면 자바스크립트는 어떠한 동작을 수행할까?
//먼저 객체 o에서 ultraProp를 찾는다.
//없다면 Sub.prototype.ultraProp를 찾는다.
//없다면 Super.prototype.ultraProp를 찾는다.
//없다면 Ultra.prototype.ultraProp를 찾는다.
// 그래서 결론적으로 콘솔에는 'true' 가 찍힌다


