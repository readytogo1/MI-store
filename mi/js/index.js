const imgArr = Array.from(document.querySelectorAll('.img-list li'))
const dots = Array.from(document.querySelectorAll(".pointer a"))
document.addEventListener("click",(event)=>{
    const index = dots.indexOf(event.target)
    if(index != -1){
        // 切换图片
        changeImg(index)
    }
})

/* 
    自动切换图片
    
    闭包，防止timer被其他函数访问  (匿名立即执行函数，将函数作为返回值)
*/
const toggleChange = (function(){
    let timer = null
    return ()=>{
        if(timer === null){
            timer = setTimeout(function auto(){
                changeImg('next')
                timer = setTimeout(auto,3000)
            },3000)
        }else{
            clearTimeout(timer)
            timer = null
        }
    }
})()
toggleChange()

// 获取outer
const outer = document.getElementsByClassName('banner')[0]
outer.onmouseenter = ()=>{
    toggleChange()
}
outer.onmouseleave = ()=>{
    toggleChange()
}


/* 
    点击按钮 切换图片
*/

const prev = document.getElementsByClassName("prev")[0]
const next = document.getElementsByClassName("next")[0]

prev.onclick = function(){
    changeImg("prev")
}

next.onclick = function (){
    changeImg("next")
}

/* 
    changeImg 用来切换图片
        参数：
            dir 切换图片方向
                next
                prev
*/
function changeImg(dir){
    // 获取当前显示图片
    const current = document.querySelector(".img-list .current") 
    let next
    if(dir === 'prev'){
        next = current.previousElementSibling || imgArr.at(-1)
    }else if(dir === 'next'){
        next = current.nextElementSibling || imgArr[0]
    }else if(typeof dir === 'number' ){
        next = imgArr[dir]
    }
    // 获取接下来显示图片索引
    const index = imgArr.indexOf(next)
    // 切换图片
    current.classList.remove("current")
    next.classList.add("current")
    // // 切换active小点
    const currentActive = document.querySelector(".active")
    currentActive.classList.remove("active")
    dots[index].classList.add("active")
}