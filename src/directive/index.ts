import {App, VNode} from "vue"

type Point = { x: number, y: number }

type DragOptions = {
    x?: boolean
    y?: boolean
    distance?: number,
    isSticky?: boolean
}

const directives: any = {
    drag(el: HTMLElement, binding: any, vnode: VNode) {

        //获取参数
        let options: DragOptions = binding.value

        //初始化默认值
        if (!options) {
            options = {
                x: true,
                y: true,
                distance: -1,
                isSticky: false
            }
        } else {
            if (typeof options === "object") {
                options.x = typeof options.x !== 'undefined' ? options.x : true
                options.y = typeof options.y !== 'undefined' ? options.y : true
                options.distance = typeof options.distance !== "undefined" ? options.distance : -1
                options.isSticky = typeof options.isSticky !== "undefined" ? options.isSticky : false
            } else {
                console.warn("参数传递有误", options)
                return
            }
        }

        //如果禁止了x和y轴的拖动，直接返回
        if (!options.x && !options.y) return

        //元素移动
        function move(el: HTMLElement, x: number, y: number) {
            x = x || 0
            y = y || 0
            el.style.left = x + "px"
            el.style.top = y + "px"
        }

        if (/(iPhone|iPad|iPod|iOS|Android|Linux armv8l|Linux armv7l|Linux aarch64)/i.test(navigator.platform) || /(mobile)/i.test(navigator.userAgent.toLowerCase())) {
            //记录当前的坐标，实时更新
            let currentPoint: Point = {
                x: el.offsetLeft || 0,
                y: el.offsetTop || 0
            }
            //记录刚刚摁下时的坐标
            let startPoint: Point = {
                x: 0,
                y: 0
            }
            //是否移动的标志位
            let isTouchMove: boolean = false
            el.addEventListener('touchstart', (ev: TouchEvent) => {
                    //获取手指位置
                    let touch = ev.changedTouches[0]
                    //记录刚开始的x和y的坐标
                    startPoint.x = touch.pageX
                    startPoint.y = touch.pageY
                    el.style.transition = ""
                }
                ,
                false
            )
            el.addEventListener('touchmove', (ev: TouchEvent) => {
                    // 阻止默认行为
                    ev.preventDefault()
                    //开始移动
                    isTouchMove = true
                    //获取手指位置
                    let touch = ev.changedTouches[0]
                    //记录和刚开始的x和y坐标之差
                    let diffPoint: Point = {
                        x: touch.pageX - startPoint.x,
                        y: touch.pageY - startPoint.y
                    }
                    //记录x和y移动的距离
                    let movePoint: Point = {
                        x: 0,
                        y: 0
                    }
                    // 如果允许x和y轴拖动
                    if (options.x) {
                        movePoint.x = diffPoint.x + currentPoint.x
                    }
                    if (options.y) {
                        movePoint.y = diffPoint.y + currentPoint.y
                    }
                    // 调用
                    move(el, movePoint.x, movePoint.y)
                }
                ,
                false
            )
            el.addEventListener('touchend', (ev: TouchEvent) => {
                    // 如果没有移动
                    if (!isTouchMove) return
                    let touch = ev.changedTouches[0]
                    // 更新当前坐标
                    currentPoint.x += touch.pageX - startPoint.x
                    currentPoint.y += touch.pageY - startPoint.y
                    // 移动结束
                    isTouchMove = false
                    //计算与边框的距离
                    setTimeout(() => {
                            if (options.distance && options.distance >= 0) {
                                el.style.transition = "all .3s"
                                //是否保持间距
                                if (currentPoint.x < options.distance) {
                                    currentPoint.x = options.distance
                                }
                                if (currentPoint.x > window.innerWidth - el.clientWidth - options.distance) {
                                    currentPoint.x = window.innerWidth - el.clientWidth - options.distance
                                }
                                if (currentPoint.y < options.distance) {
                                    currentPoint.y = options.distance
                                }
                                if (currentPoint.y > window.innerHeight - el.clientHeight - options.distance) {
                                    currentPoint.y = window.innerHeight - el.clientHeight - options.distance
                                }
                                //是否吸附
                                if (options.isSticky) {
                                    if (currentPoint.x <= (window.innerWidth - el.clientWidth) / 2) {
                                        currentPoint.x = options.distance
                                    }
                                    if (currentPoint.x > (window.innerWidth - el.clientWidth) / 2) {
                                        currentPoint.x = window.innerWidth - el.clientWidth - options.distance
                                    }
                                    if (currentPoint.y <= el.clientHeight) {
                                        currentPoint.y = options.distance
                                    }
                                    if (currentPoint.y >= window.innerHeight - 2 * el.clientHeight) {
                                        currentPoint.y = window.innerHeight - el.clientHeight - options.distance
                                    }
                                }
                                move(el, currentPoint.x, currentPoint.y)
                            }
                        },
                        15
                    )
                }
                ,
                false
            )
        } else {
            //pc端
            el.onmousedown = (e: MouseEvent) => {
                //算出鼠标相对元素的位置
                let disX = e.clientX - el.offsetLeft
                let disY = e.clientY - el.offsetTop
                document.onmousemove = (e: MouseEvent) => {
                    // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
                    // 有拖拽区域限制的记得在这里计算时加上限制
                    let movePoint: Point = {
                        x: 0,
                        y: 0
                    }
                    //移动当前元素
                    if (options.x) {
                        movePoint.x = e.clientX - disX
                    }
                    if (options.y) {
                        movePoint.y = e.clientY - disY
                    }
                    move(el, movePoint.x, movePoint.y)
                }
                document.onmouseup = (e: MouseEvent) => {
                    //鼠标弹起来的时候不再移动
                    document.onmousemove = null
                    //预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
                    document.onmouseup = null
                }
            }
        }
    }
}

export default {
    install: (app: App) => {
        for (let key in directives) {
            app.directive(key, directives[key])
        }
    }
}
export type {DragOptions, Point}
