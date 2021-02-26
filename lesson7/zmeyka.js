var FIELD_SIZE_X = 20;
var FIELD_SIZE_Y = 20;
var SNAKE_SPEED = 200;      
var FOOD_SPEED = 5000;     
var PROBLEM_SPEED = 5000;   
var snake = [];             
var direction = 'y+';        
var gameIsRunning = false;  
var snake_timer;            
var food_timer;             
var problem_timer;          
var score = 0;              
var btnStart =  document.getElementsByClassName('snake-start')[0];  
var btnRenew = document.getElementsByClassName('snake-renew')[0];  
var points = document.getElementsByClassName('score-point')[0];     

function init() {
    prepareGameField(); 
    points.innerHTML = score;
    var wrap = document.getElementsByClassName('wrap')[0];   
    if (16 * (FIELD_SIZE_X + 1) < 380) {
        wrap.style.width = '380px';
    }                                                                   
    else {
        wrap.style.width = (16 * (FIELD_SIZE_X + 1)).toString() + 'px';
    }    
    btnStart.addEventListener('click', startGame);
    btnRenew.addEventListener('click', refreshGame);
    addEventListener('keydown', changeDirection);
}

function prepareGameField() {   
    var game_table = document.createElement('table');
    game_table.setAttribute('class', 'game-table');  
    for (var i = 0; i < FIELD_SIZE_Y; i++) {      
        var row = document.createElement('tr');
        row.className = 'game-table-row row-' + i;
        for (var j = 0; j < FIELD_SIZE_X; j++) {            
            var cell = document.createElement('td');
            cell.className = 'game-table-cell cell-' + i + '-' + j;
            row.appendChild(cell);         }
        game_table.appendChild(row); 
        }
    document.getElementById('snake-field').appendChild(game_table); 
}
function startGame() {
    if (!gameIsRunning) {
        gameIsRunning = true;
        btnStart.className = "snake-start-nonactive";
        createFood();
        respawn();
        snake_timer = setInterval(move, SNAKE_SPEED);
        food_timer = setInterval(createFood, FOOD_SPEED);
        problem_timer = setInterval(createProblem, PROBLEM_SPEED);
    }
}
function respawn() {  
    var start_coord_x = Math.floor(FIELD_SIZE_X / 2);
    var start_coord_y = Math.floor(FIELD_SIZE_Y / 2);   
    var snake_head = document.getElementsByClassName('cell-' + start_coord_y + '-' + start_coord_x)[0];
    snake_head.setAttribute('class', snake_head.getAttribute('class') + ' snake-unit');    
    var snake_tail = document.getElementsByClassName('cell-' + (start_coord_y - 1) + '-' + start_coord_x)[0];
    snake_tail.setAttribute('class', snake_tail.getAttribute('class') + ' snake-unit');
    snake.push(snake_head);
    snake.push(snake_tail);
    points.innerHTML = score;
}
function move() {
    var snake_head_classes = snake[snake.length - 1].getAttribute('class').split(' ');   
    var new_unit;
    var snake_coords = snake_head_classes[1].split('-');
    var coord_y = parseInt(snake_coords[1]);
    var coord_x = parseInt(snake_coords[2]);
    if (direction == 'x-') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x - 1))[0];
    }
    else if (direction == 'x+') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (coord_x + 1))[0];
    }
    else if (direction == 'y+') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y - 1) + '-' + (coord_x))[0];
    }
    else if (direction == 'y-') {
        new_unit = document.getElementsByClassName('cell-' + (coord_y + 1) + '-' + (coord_x))[0];
    }

    if (new_unit === undefined) {
        new_unit = headTeleport(coord_y, coord_x);
    }

    if (!haveFood(new_unit)) {       
        var removed = snake.splice(0, 1)[0];
        var classes = removed.getAttribute('class').split(' ');
        removed.setAttribute('class', classes[0] + ' ' + classes[1]);
    }
    else {
        if (SNAKE_SPEED > 50) {
            SNAKE_SPEED -= 20;
            clearInterval(snake_timer);
            snake_timer = setInterval(move, SNAKE_SPEED);
        }
    }   
    if (!isSnakeUnit(new_unit) && pathClear(new_unit)) {        
        new_unit.setAttribute('class', new_unit.getAttribute('class') + ' snake-unit');
        snake.push(new_unit);
       
    }
    else {
        finishTheGame();
    }
}

/**
 * Функция переноса змейки на другую сторону
 * @param coord_y
 * @param coord_x
 * @returns {*}
 */
function headTeleport(coord_y, coord_x) {
    var unit;
    if (direction == 'x-') {
        unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (FIELD_SIZE_X-1  ))[0];
    }
    else if (direction == 'x+') {
        unit = document.getElementsByClassName('cell-' + (coord_y) + '-' + (0))[0];
    }
    else if (direction == 'y+') {
        unit = document.getElementsByClassName('cell-' + (FIELD_SIZE_Y-1) + '-' + (coord_x))[0];
    }
    else if (direction == 'y-') {
        unit = document.getElementsByClassName('cell-' + (0) + '-' + (coord_x))[0];
    }
    return unit;
}
 
function pathClear(unit) {
    var check = false;

    var unit_classes = unit.getAttribute('class').split(' ');
    if (!unit_classes.includes('problem-unit')) {
        check = true;
    }
    return check;
}

function isSnakeUnit(unit) {
    var check = false;

    if (snake.includes(unit)) {
        check = true;
    }
    return check;
}
function haveFood(unit) {
    var check = false;
    var unit_classes = unit.getAttribute('class').split(' ');   
    if (unit_classes.includes('food-unit')) {
        check = true;
        createFood();
        score++;
        points.innerHTML = score;
    }
    return check;
}
function createFood() {
    var foodCreated = false;

    while (!foodCreated) {
       
        var food_x = Math.floor(Math.random() * FIELD_SIZE_X);
        var food_y = Math.floor(Math.random() * FIELD_SIZE_Y);
        var food_cell = document.getElementsByClassName('cell-' + food_y + '-' + food_x)[0];
        var food_cell_classes = food_cell.getAttribute('class').split(' ');       
        if (!food_cell_classes.includes('snake-unit') && !food_cell_classes.includes('problem-unit')) {
            var classes = '';
            for (var i = 0; i < food_cell_classes.length; i++) {
                classes += food_cell_classes[i] + ' ';
            }

            food_cell.setAttribute('class', classes + 'food-unit');
            foodCreated = true;
        }
    }
}
function createProblem() {
    var problemCreated = false;

    while (!problemCreated) {        
        var problem_x = Math.floor(Math.random() * FIELD_SIZE_X);
        var problem_y = Math.floor(Math.random() * FIELD_SIZE_Y);

        var problem_cell = document.getElementsByClassName('cell-' + problem_y + '-' + problem_x)[0];
        var problem_cell_classes = problem_cell.getAttribute('class').split(' ');
        if (!problem_cell_classes.includes('snake-unit') && !problem_cell_classes.includes('food-unit')) {
            var classes = '';
            for (var i = 0; i < problem_cell_classes.length; i++) {
                classes += problem_cell_classes[i] + ' ';
            }
            problem_cell.setAttribute('class', classes + 'problem-unit');
            problemCreated = true;
        }
    }
}

/**
 * Изменение направления движения змейки
 * @param e - событие
 */
function changeDirection(e) {
    switch (e.keyCode) {
        case 37: // Клавиша влево
            if (direction != 'x+') {
                direction = 'x-'
            }
            break;
        case 38: // Клавиша вверх
            if (direction != 'y-') {
                direction = 'y+'
            }
            break;
        case 39: // Клавиша вправо
            if (direction != 'x-') {
                direction = 'x+'
            }
            break;
        case 40: // Клавиша вниз
            if (direction != 'y+') {
                direction = 'y-'
            }
            break;
    }
}
function finishTheGame() {
    gameIsRunning = false;
    clearInterval(snake_timer);
    clearInterval(food_timer);
    clearInterval(problem_timer);
    alert('Вы проиграли! Ваш результат: ' + score.toString());
}
function refreshGame() {
    location.reload();
}
window.onload = init;