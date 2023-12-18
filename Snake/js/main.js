{
    var can = document.getElementById("canvas")//画布
    can.width = 500  //设置默认长宽
    can.height = 500
    var interval //定义定时器
    var fenshu = 0 //分数
    var setFenshu = document.getElementById('fenshu')
    var fenshubeishu = 1//分数倍数
    var cxt = can.getContext("2d") //设置画布为2D
    var time = 500
    var size = 20  //设置大小
    var food = 0 //食物
    var foodArr = []
    var renshu = 1//玩家人数
    var num1 = 0
    var run = 0 //运行状态 0 暂停 1开始
    var snake = {//定义蛇类集合
        key: 0, //前进方向 
        x: 0, // 坐标
        y: 0,
        snakeArr: [], //蛇身体数组
        arrX: [],
        arrY: [],
        len: 0 //蛇身长度
    }
    var snake1 = {//创建集合snake1
        key: 68, //玩家一 W A S D 控制方向
        x: 100,
        y: 100,
        snakeArr: [],
        arrX: [],
        arrY: [],
        len: 5
    }
    var snake2 = {//创建集合snake2
        key: 37, //玩家二 ↓ ↑ ← → 控制方向
        x: 400,
        y: 400,
        snakeArr: [],
        arrX: [],
        arrY: [],
        len: 5
    }
}


function nandu(sudu, beishu, nandu) { //设置难度
    fenshubeishu = beishu //设置难度和分数倍数
    time = 300 * sudu  //使用基础速度 * 难度倍数 代表每多少毫秒前进一次
    console.log('已选择' + nandu + '难度' + time)
}

function foodFn() {//生成食物方法
    if (food == 0) { //生成食物
        // var ran = Math.floor(Math.random()*49)*10 //生成随机数
        food = 1
        var snake = []
        var foodX = Math.floor(Math.random() * 25) * 20
        var foodY = Math.floor(Math.random() * 25) * 20
        foodArr.unshift(foodX + ',' + foodY)

        for (var i = 0; i < snake1.snakeArr.length; i++) { //判断生成的食物是否在蛇身上，是的话重新生成
            if (foodArr[0] == snake1.snakeArr[i]) {
                foodArr.pop()
                foodFn()
                return
            }
        }
        if (ren == 2) {
            for (var i = 0; i < snake2.snakeArr.length; i++) {//判断生成的食物是否在蛇身上，是的话重新生成
                if (foodArr[0] == snake2.snakeArr[i]) {
                    foodArr.pop()
                    foodFn()
                    return
                }
            }
        }
        console.log('生成食物' + foodX, foodY)
        cxt.fillStyle = 'red'
        cxt.fillRect(foodX, foodY, size, size)


    }
}

function go(player, snake) {//移动判断
    var x = snake.x
    var y = snake.y
    var snakeArr = snake.snakeArr
    var color
    if (player == 1) {
        color = 'green'
    } else (
        color = 'yellow'
    )
    if (snake.snakeArr.length == snake.len) { //判断长度，等于蛇身长度就将尾巴去掉
        // console.log('x' + arrX[len - 1])
        // console.log('y' + arrY[len - 1])
        cxt.fillStyle = 'white'//删除尾巴
        cxt.fillRect(snake.arrX.pop(), snake.arrY.pop(), size, size)
        snake.snakeArr.pop()
    }
    cxt.fillStyle = color//前进
    cxt.fillRect(x, y, size, size)
    snake.arrX.unshift(x)//保存数据 unshift向数组开头添加数据
    snake.arrY.unshift(y)
    snake.snakeArr.unshift(x + ',' + y)


    if (renshu == 2) { //判断是否碰到同伴
        switch (player) {
            case 1: var newSnake = snake2.snakeArr; break
            default: var newSnake = snake1.snakeArr; break
        }
        for (i = 0; i < snakeArr.length; i++) {
            if (snakeArr[0] == newSnake[i]) {
                return true

            }
        }
    }
    for (var i = 1; i < snakeArr.length; i++) {//判断是否碰到蛇身
        if (snakeArr[0] == snakeArr[i]) {
            return true
        }
    }
    if (x >= 500 || x < 0) {//判断是否撞墙
        return true
    } else if (y >= 500 || y < 0) {
        return true
    }
    if (snakeArr[0] == foodArr[0]) {//判断是否吃到食物
        myAudio(3)//播放音效
        var fenshu1 = 10 * fenshubeishu
        fenshu += fenshu1
        setFenshu.innerHTML = fenshu
        console.log(fenshu + ',' + fenshubeishu)
        num1 += 1
        foodArr.pop()
        food = 0 //重置食物
        if (player == 1) {//判断是哪个玩家吃到的
            snake1.len += 1
        } else (
            snake2.len += 1
        )
        foodFn()
        if (time > 100) { //设置最大速度
            if (num1 == 5) {//每吃到5个食物就加速
                console.log('加速')
                num1 = 0 //复位
                time *= 0.95
                clearInterval(this.interval)//加大难度重新调用
                interval = setInterval(fun, time)//
            }
        }
    }
    if (player == 1) {
        snake1 = snake
    } else (
        snake2 = snake
    )
}

function player(r) {//玩家方法
    var snake
    if (r == 1) {
        snake = snake1
    } else {
        snake = snake2
    }
    var x = snake.x
    var y = snake.y
    if (r == 1) {//判断玩家方向
        switch (snake.key) {//方向
            case 65: x = x - size; break;
            case 68: x = x + size; break;
            case 87: y = y - size; break;
            case 83: y = y + size; break;
        }
    } else {
        switch (snake.key) {
            case 37: x = x - size; break;
            case 39: x = x + size; break;
            case 38: y = y - size; break;
            case 40: y = y + size; break;
        }
    }
    snake.x = x
    snake.y = y
    //x、y为下一位置坐标
    if (go(r, snake)) {//判断移动结果

        myAudio(1)
        myAudio(2)
        window.alert('游戏结束')
        var jieshu = document.getElementById('jieshu')
        var c = document.getElementById('can')
        var a = document.getElementById('a')
        a.style.display = "block"
        c.style.display = "none"
        jieshu.innerHTML = "游戏结束<br>你的最终分数为<br>" + fenshu + ' &nbsp;!'
        clearInterval(this.interval)
        chongzhi()
        return
    }

}
document.onkeyup = function (ev) {  //监听按键并修改方向
    var key1 = snake1.key
    var key2 = snake2.key
    var newkey = ev.keyCode  //设置新方向
    switch (newkey) {
        case 65: console.log("玩家一向左"); if (key1 != 68) key1 = newkey; break;
        case 68: console.log("玩家一向右"); if (key1 != 65) key1 = newkey; break;
        case 87: console.log("玩家一向上"); if (key1 != 83) key1 = newkey; break;
        case 83: console.log("玩家一向下"); if (key1 != 87) key1 = newkey; break;

        case 37: console.log("玩家二向左"); if (key2 != 39) key2 = newkey; break;
        case 39: console.log("玩家二向右"); if (key2 != 37) key2 = newkey; break;
        case 38: console.log("玩家二向上"); if (key2 != 40) key2 = newkey; break;
        case 40: console.log("玩家二向下"); if (key2 != 38) key2 = newkey; break;
        default: console.log("其他按键" + newkey)
    }
    snake1.key = key1
    snake2.key = key2
    if (newkey == 13) {//回车键
        if (run == 0) {
            run = 1
            myAudio(0)
            interval = setInterval(fun, time)
        } else {
            window.alert('游戏暂停,回车键游戏继续')
            run = 0
            myAudio(1)
            clearInterval(interval)
        }
    }
}

function fun() {  //主要循环

    // var x1 = x //原点位置
    // var y1 = y
    if (renshu == 1) {
        player(1)
    } else {
        player(1)
        player(2)
    }


}

function myAudio(i) {//音乐方法
    var audio = document.getElementById('audio')
    var audio2 = document.getElementById('audio2')
    var audio3 = document.getElementById('audio3')
    if (i == 0) { //判断播放类型 0:播放 1:暂停 2:失败 3:吃东西
        audio.play()
    } else if (i == 1) {
        audio.pause()
    } else if (i == 2) {//失败音效
        audio2.play()
    } else if (i == 3) {
        audio3.play()
    }
}

function chongzhi() {//游戏结束全部重置
    console.log('重置')
    cxt.fillStyle = 'white';
    cxt.fillRect(0, 0, 500, 500);
    time = 500
    size = 20  //设置大小
    food = 0 //食物
    foodArr = []
    renshu = 1; //玩家人数
    num1 = 0
    fenshu = 0
    fenshubeishu = 1

    snake1 = {//创建集合snake1
        key: 68,
        x: 100,
        y: 100,
        snakeArr: [],
        arrX: [],
        arrY: [],
        len: 5
    }
    snake2 = {//创建集合snake2
        key: 37,
        x: 400,
        y: 400,
        snakeArr: [],
        arrX: [],
        arrY: [],
        len: 5
    }
}

function set() { //设置菜单隐藏
    var btn2 = document.getElementById('btn2')
    btn2.style.display = 'block'
    var btn1 = document.getElementById('btn1')
    btn1.style.display = 'none'
}

function ren(r) { //设置人数
    renshu = r
}

function playgame(r) {//开始
    run = 1 //设置运行状态
    var btn = document.getElementById('btn')
    btn.style.display = 'none'
    var p = document.getElementById('p')
    p.style.display = "block"
    var jieshao = document.getElementById('jieshao')
    jieshao.style.display = "none"
    //开始游戏隐藏菜单
    if (r != null) renshu = r //设置玩家人数
    can.style.display = "block"
    cxt.fillStyle = 'white';
    cxt.fillRect(0, 0, 500, 500);//填充白色画布
    can.style.border = "1px solid #000"
    myAudio(0)//调用音乐方法
    foodFn()//开局生成一次食物
    interval = setInterval(fun, time)//循环执行主体代码
}