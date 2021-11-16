const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let score = 0;

const brickRowCount = 9;
const brickColCount = 5;

//create ball props
const ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    size: 10,
    speed: 4,
    dx: 4,
    dy: -4
}

//create paddle props
const paddle = {
    x: canvas.width/2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0
}

//create brick props
const brickInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX:45,
    offsetY: 60,
    visible: true
}

//create bricks
const bricks = [];
for(let i=0; i<brickRowCount; i++) {
    bricks[i] = [];
    for(let j=0; j<brickColCount; j++){
        const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
        const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
        bricks[i][j] = {x, y, ...brickInfo};
    }
}
//console.log(bricks);

//draw ball on canvas
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI*2);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
}

//draw paddle on canvas
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = '#0095dd';
    ctx.fill();
    ctx.closePath();
}

//draw score on canvas
function drawScore(){
    ctx.font = '20px Arial';
    ctx.fillText(`Score: ${score}`,canvas.width-100,30);
}

//draw bricks on canvas
function drawBricks(){
    bricks.forEach(column=>{
        column.forEach(brick=>{
            ctx.beginPath();
            ctx.rect(brick.x, brick.y, brick.w, brick.h);
            ctx.fillStyle = brick.visible? '#0095dd': 'transparent';
            ctx.fill();
            ctx.closePath();
        });
    });
}

//move paddle on canvas
function movePaddle(){
    paddle.x += paddle.dx;

    //wall detection
    if(paddle.x + paddle.w > canvas.width){
        paddle.x = canvas.width - paddle.w;
    }
    if(paddle.x < 0){
        paddle.x = 0;
    }
}

//move ball on canvas
function moveBall(){
    ball.x += ball.dx;
    ball.y += ball.dy;

    //wall collision (x - right and left)
    if(ball.x + ball.size > canvas.width || ball.x - ball.size < 0){
        ball.dx *= -1;
    }
    //wall collision (y - top and bottom)
    if(ball.y + ball.size > canvas.height || ball.y - ball.size < 0){
        ball.dy *= -1;
    }
}

//draw everything
function draw(){
    //clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
}

//update canvas drawing and animation
function update(){
    movePaddle();
    moveBall();

    //draw everything
    draw();

    requestAnimationFrame(update);
}

update();

//keydown event
function keyDown(e){
    if(e.key === 'Right' || e.key === 'ArrowRight'){
        paddle.dx = paddle.speed;
    }else if(e.key === 'Left' || e.key === 'ArrowLeft'){
        paddle.dx = -paddle.speed;
    }
}

//keyup event
function keyUp(e){
    if(e.key === 'Right' || e.key === 'ArrowRight' || e.key === 'Left' || e.key === 'ArrowLeft'){
        paddle.dx = 0;
    }
}

//keyboard event handlers
document.addEventListener('keydown',keyDown);
document.addEventListener('keyup',keyUp);

//rules and close event handlers
rulesBtn.addEventListener('click', () => {
    rules.classList.add('show');
});
closeBtn.addEventListener('click', () => {
    rules.classList.remove('show');
});