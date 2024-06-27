//cursor
const coords = {
    x: 0,
    y: 0
};
const circles = document.querySelectorAll(".circle");
const svg = document.querySelector(".cursor img")
let timer;

svg.style.visibility = "hidden";

circles.forEach((circle, index) => {
    //console.log(circle)
    circle.x = 0;
    circle.y = 0;
})

// 🌟 마우스를 움직일때 svg 파일은 숨기고, 원들은 보이게 한다.
// 어느 시간이 지나면 원들은 사라지고 svg파일은 보인다.
// 즉, 마우스를 움직이면 svg 파일이 돌고, 가만히 있으면 꾸물거리는 효과
window.addEventListener("mousemove", function (e) {
    coords.x = e.clientX - 12;
    coords.y = e.clientY - 12;

    clearTimeout(timer)

    svg.style.visibility = "hidden";
    circles.forEach((circle) => {
        circle.style.display = 'block';
    })


    // setTimeout(()=>{},시간) : 지정한 시간만큼 지나면 할일이 '한번' 실행된다.
    //setTimeout(function(){},
    timer = setTimeout(function () {
        circles.forEach((circle) => {
            circle.style.display = 'none';
            svg.style.visibility = "visible";
            svg.style.display = "block"
        })
    }, 500)
})

// 🌟 무한반복 실행시키기 위해 쓰는 명령어
// animateCircles 실행 > 변수부터 다시 읽어내려옴 > requestAnimationFrame으로 다시 animateCircles 실행 > 무한반복
function animateCircles() {
    let x = coords.x;
    let y = coords.y;

    circles.forEach((circle, index) => {
        circle.style.left = x + "px";
        circle.style.top = y + "px";

        let len = circles.length * 2;
        circle.style.scale = ((len - index) / len) * window.innerWidth / 1400;


        circle.x = x;
        circle.y = y;

        // circles[index + 1] || circles[0] 👉 예를 들어, circles(배열)안의 첫번째 아이템이 +1되어 2번이 작업, 그 다음엔 3번이 작업 ...... 계속 반복하여 ++이 된다.
        // 마지막 번호 다음엔 circles[0]이 실행되어 nextCircle은 계속해서 반복적으로 ++ 실행된다. 
        // || : '또는'을 사용하여 둘중 하나만 true여도, 실행이 된다.
        let nextCircle = circles[index + 1] || circles[0]


        // 🌟 거리값 계산하기
        x += (nextCircle.x - x) * 0.1;
        y += (nextCircle.y - y) * 0.1;
        // console.log(y)
    })

    // requestAnimationFrame : 함수 무한반복 실행 
    requestAnimationFrame(animateCircles)
}
animateCircles()

// 100  200
// x = (nextCircle.x - x) * 0.1 + x
// x = (100 - 200) * 0.1 + 200 = 190

// Theme Changer
// document에 높이 값이 없는 ("#theme-changer")를 주어 그 위치를 기준으로 아래,위로 배경 색이 바뀐다.
let themeChanger = () => {
    // 본인이 가지고 있는 위치값
    let offsets = document.querySelector("#theme-changer").getBoundingClientRect();
    // console.log(offsets)
    document.body.style.backgroundColor = offsets.top < 0 ? "#FFF" : "#0e0e0e";
}
window.addEventListener("scroll", themeChanger)
// 화면이 모두 구성됐을때, 실행해라. : load
window.addEventListener("load", themeChanger)

// Video
// <iframe src="" frameborder="0" autoplay muted loop></iframe>
// allow="autoplay;" : allow는 iframe 콘텐츠에 특정 기능을 허용하는 역할
let video = document.querySelector(".video");
video.addEventListener("click", () => {
    video.innerHTML = `<iframe src="https://player.vimeo.com/video/764513434?color=ffffff&badge=0&title=0&byline=0&portrait=0&loop=1&autoplay=1&api=1" frameborder="0" allow="autoplay;" allowfullscreen></iframe>`
    video.classList.add("video-added")
})


// 전체 화면에 애니메이션 주기
// animation
const hiddenElement = document.querySelectorAll("p");
const hiddenElement1 = document.querySelectorAll("h1");
const hiddenElement2 = document.querySelectorAll("h2");
const hiddenElement3 = document.querySelectorAll("h3");
const hiddenElement4 = document.querySelectorAll("a");
const hiddenElement5 = document.querySelectorAll("button");

let observer = new IntersectionObserver((entries) => {
    // console.log(entries)
    entries.forEach((entry) => {
        if (entry.isIntersecting) { // 화면에 나타났다면 true, 없으면 false.
            entry.target.classList.add("show")
        } else {
            entry.target.classList.remove("show")
        }
    })
})

// 관찰대상 등록
hiddenElement.forEach((el) => observer.observe(el))
hiddenElement1.forEach((el) => observer.observe(el))
hiddenElement2.forEach((el) => observer.observe(el))
hiddenElement3.forEach((el) => observer.observe(el))
hiddenElement4.forEach((el) => observer.observe(el))
hiddenElement5.forEach((el) => observer.observe(el))

// -----------------------------------------------------------

const nav = document.querySelector("nav");
const hero = document.querySelector(".hero");
const partners = document.querySelector(".partners");
const skills = document.querySelector(".skills");
const feelOurVibe = document.querySelector(".feelOurVibe");
const mission = document.querySelector(".mission");
const feelTheReel = document.querySelector(".feelTheReel");
const experts = document.querySelector(".experts");
const footer = document.querySelector("footer");
const menuButton = document.querySelector(".menuButton");

const _cursor = document.querySelector(".cursor");

// Menubar
let close = document.querySelector(".close")
let closeWrapper = document.querySelector(".closeWrapper")

let closeHandler = () => {
    nav.style.right = "-100%";
    closeWrapper.style.display = "none";
    // document.documentElement : html 자체를 부른다.
    document.documentElement.style.overflow = "auto"
}
let openHandler = () => {
    nav.style.right = 0;
    closeWrapper.style.display = "block";
    document.documentElement.style.overflow = "hidden"
}

// 👀 클릭하면, 마우스를 갖다대면... 등 행위의 뒤에 일어나는 함수를 '콜백함수'라고 한다.
// 클릭한뒤에 일어난다고 핸들러라고도 표현한다. 
// close.addEventListener("click",()=>{
//     closeHandler()
// }) => 를 아래와같이 줄일 수 있다.
close.addEventListener("click", closeHandler)
menuButton.addEventListener("click", openHandler)
closeWrapper.addEventListener("click", closeHandler)

nav.querySelectorAll("*").forEach((ele) => {
    ele.addEventListener("click", closeHandler)
})

// **** Responsive ****
// JS로 반응형 맞추기
const responsive = () => {
    const _innerWidth = window.innerWidth;

    if (_innerWidth <= 640) {
        nav.style.zoom = 1;
        hero.style.zoom = _innerWidth / 640;
        partners.style.zoom = _innerWidth / 640;
        skills.style.zoom = (_innerWidth / 640) * 1.5;
        feelOurVibe.style.zoom = (_innerWidth / 640) * 1.5;
        mission.style.zoom = (_innerWidth / 640) * 1.5;
        feelTheReel.style.zoom = (_innerWidth / 640);
        experts.style.zoom = (_innerWidth / 640) * 1.6;
        footer.style.zoom = (_innerWidth / 640) * 1.3;
        menuButton.style.zoom = (_innerWidth / 640) * 1.3;

        _cursor.style.display = "none";
    } else if (_innerWidth < 900) {
        //  900 > case < 640
        nav.style.zoom = _innerWidth / 900;
        hero.style.zoom = 1;
        partners.style.zoom = 1;
        skills.style.zoom = _innerWidth / 900;
        feelOurVibe.style.zoom = (_innerWidth / 900) * 1.2;
        mission.style.zoom = _innerWidth / 900;
        feelTheReel.style.zoom = _innerWidth / 900;
        experts.style.zoom = _innerWidth / 900;
        footer.style.zoom = _innerWidth / 900;

        _cursor.style.display = "block";
    } else if (_innerWidth <= 1200) {
        //  1200 > case < 900
        nav.style.zoom = _innerWidth / 1200 + 0.3;
        hero.style.zoom = (_innerWidth / 1200) * 1.4;
        partners.style.zoom = (_innerWidth / 1200) * 1.4;
        skills.style.zoom = (_innerWidth / 1200) * 1.4;
        feelOurVibe.style.zoom = (_innerWidth / 1200) * 1.6;
        mission.style.zoom = (_innerWidth / 1200) * 1.4;
        feelTheReel.style.zoom = _innerWidth / 1200;
        experts.style.zoom = _innerWidth / 1200 * 1.4;
        footer.style.zoom = _innerWidth / 1200 * 1.3;

        _cursor.style.display = "block";
    } else if (_innerWidth <= 1400) {
        //  1400 > case < 1200
        nav.style.zoom = _innerWidth / 1400;
        hero.style.zoom = _innerWidth / 1400 - 0.1;
        partners.style.zoom = _innerWidth / 1400 - 0.1;
        skills.style.zoom = _innerWidth / 1400;
        feelOurVibe.style.zoom = _innerWidth / 1400;
        mission.style.zoom = _innerWidth / 1400;
        feelTheReel.style.zoom = _innerWidth / 1400;
        experts.style.zoom = _innerWidth / 1400;
        footer.style.zoom = _innerWidth / 1400;

        _cursor.style.display = "block";
    } else {
        // over 1400 px
        nav.style.zoom = _innerWidth / 1400;
        hero.style.zoom = (_innerWidth / 1400) * 0.9;
        partners.style.zoom = _innerWidth / 1400;
        skills.style.zoom = _innerWidth / 1400;
        feelOurVibe.style.zoom = _innerWidth / 1400;
        mission.style.zoom = _innerWidth / 1400;
        feelTheReel.style.zoom = _innerWidth / 1400;
        experts.style.zoom = _innerWidth / 1400;
        footer.style.zoom = _innerWidth / 1400;

        _cursor.style.display = "block";
    }
};

window.addEventListener("resize", () => {
    responsive()
    closeHandler()
});
window.addEventListener("load", responsive);

// svg 애니, 페이지 하단 svg 파일에 마우스를 올렸을때 애니메이션이 재생
const pics = document.querySelectorAll(".animation_wrapper img");
const play = (elem, _class) => elem.classList.add(_class);
const stop = (elem) => elem.classList.add("end");
const reset = (elem, _class) => elem.classList.remove("end", _class);

const stopHandler = (elem, i) => {
    stop(elem);
    elem.addEventListener(
        "animationend", // 애니메이션이 끝나면
        () => {
            reset(elem, `move${i}`);
        },
    );
};

pics.forEach((ele, i) => {
    ele.addEventListener("mouseenter", () => {
        play(ele, `move${i}`)
    })
    ele.addEventListener("mouseleave", () => {
        stopHandler(ele, i)
    })
})

