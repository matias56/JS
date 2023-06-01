
window.onload = function(){
 const square = document.createElement('div');
 square.style.width = '100px';
 square.style.height = '100px';
 square.style.backgroundImage = "url('D:/Programming/JS/Wolfenstein 3D/Assets/Hand.png')";
 square.style.backgroundSize = 'cover';
 square.style.position = 'absolute';
 square.style.left = '49%';
 square.style.bottom = '160px';
 document.body.appendChild(square);


   

    const canvas = document.getElementById('screen');
    const context = canvas.getContext('2d');
    const WIDTH = 300, HALF_WIDTH = 150;
    const HEIGHT = 200, HALF_HEIGHT = 100;

    const FPS = 60;
    const cycleDelay = Math.floor(1000 / FPS);
    var oldCycleTime = 0;
    var cycleCount = 0;
    var fps_rate = '...';

    const MAP_SIZE = 32;
    const MAP_SCALE = 64;
    const MAP_RANGE = MAP_SCALE * MAP_SIZE;
    const MAP_SPEED = (MAP_SCALE / 2) / 10;
   
   
    

    var map = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 2,
        1, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 2, 14, 2, 0, 0, 0, 0, 0, 0, 0, 2, 14, 2, 0, 0, 0, 0, 2,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2,
        1, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 2, 14, 2, 0, 0, 0, 0, 0, 0, 0, 2, 14, 2, 0, 0, 0, 0, 2,
        1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 2,
        1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 2, 2,
        1, 1, 1, 1, 15, 0, 15, 1, 1, 1, 1, 15, 0, 15, 1, 1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 15, 0, 15, 2,
        1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 0, 2, 2, 0, 2, 2,
        1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 2, 0, 2, 2,
        1, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 2, 2, 2, 0, 2, 2,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 2, 2,
        1, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 2, 2,
        1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 2, 2, 2, 2, 2,
        1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2,
        1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15, 0, 15, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        1, 0, 0, 0, 1, 0, 0, 0, 1, 11, 11, 14, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 0, 0, 0, 1, 0, 0, 0, 1, 12, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 1, 0, 0, 0, 1, 11, 11, 14, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 15, 0, 15, 1, 15, 0, 15, 1, 1, 1, 15, 0, 15, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 15, 0, 15, 1, 1, 1,
        6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 1,
        9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 14, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 14, 0, 0, 0, 0, 0, 0, 0, 1,
        6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 14, 3, 3, 0, 3, 0, 0, 1, 0, 0, 0, 1, 15, 0, 15, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 1, 0, 3, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 3, 1,
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 1,
        1, 1, 1, 1, 7, 1, 6, 1, 9, 1, 6, 1, 7, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 1,
    ];
   
    var playerX = MAP_SCALE + 20;
    var playerY = MAP_SCALE + 20;
    
    var playerAngle = Math.PI / 3;
    

const character={
    x:0,
    y:0,
}
var characterAngle = 0;

let groundLevel = -10000;

    const playerHeight = 2;

for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
            const tile = map[y][x];
        if (tile.y < groundLevel) {
                groundLevel = tile.y;
        }
    }
}

    
const playerZ = groundLevel + playerHeight;

document.onkeydown = function (event) {
    switch (event.keyCode) {
        case 38: character.x = 1; character.y = 1; break;         
        case 40: character.x = -1; character.y = -1; break;      
        case 37: characterAngle = 1; break;                     
        case 39: characterAngle = -1; break;                    
                                  
    }
}

document.onkeyup = function (event) {
    switch (event.keyCode) {
        case 38:
        case 40: character.x = 0; character.y = 0; break;
        case 37:
        case 39: characterAngle = 0; break;
        
    }
} 

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    const DOUBLE_PI = 2 * Math.PI;
    const FOV = Math.PI / 3;
    const HALF_FOV = FOV / 2;
    const STEP_ANGLE = FOV / WIDTH;

    const WALLS = [];

   
    const SS = new Image();
    SS.src = 'Assets/SS.png';
  

    for (var filename = 0; filename < 14; filename++) {
        var image = document.createElement('img');
        image.src = 'assets/walls/' + filename + '.png';
        WALLS.push(image);
    }

   
    
    function drawEnemies(enemies)
   {
       

    
        for (let i = 0; i < enemies.length; i++) {
            const enemy = enemies[i];

            const relativeX = enemy.x - playerX;
            const relativeY = enemy.y - playerY;
            const relativeZ = enemy.z - playerZ;

            const rotatedX = relativeX * Math.cos(playerAngle) - relativeY * Math.sin(playerAngle);
            const rotatedY = relativeX * Math.sin(playerAngle) + relativeY * Math.cos(playerAngle);

            const distance = Math.sqrt(rotatedX * rotatedX + rotatedY * rotatedY);
            const correctedZ = relativeZ * Math.cos(playerAngle) - distance * Math.sin(playerAngle);

            const scaleFactor = (HEIGHT / (correctedZ || 0.1)) * MAP_SIZE;
            const screenX = (WIDTH / 2) + (rotatedX * scaleFactor / distance) - (scaleFactor / 2);
            const screenY = HEIGHT - (screenHeight / 2) - (rotatedY * scaleFactor / distance) - (scaleFactor / 2);

            context.drawImage(SS, screenX, screenY, scaleFactor, scaleFactor);
        }

        
      
           
    }
   
   
    function createEnemies() {
    
        const enemies = [];
      
        for (let i = 0; i < 4; i++) {
            const enemy = {
                x: 84,
                y: 84,
                z: 0, 
            };

            enemies.push(enemy);
        }
        
        return enemies;
        
    }
 

    function gameLoop() {

      
     
        cycleCount++;
        if (cycleCount >= 60) cycleCount = 0;
        var startTime = Date.now();
        var cycleTime = startTime - oldCycleTime;
        oldCycleTime = startTime;
        if (cycleCount % 60 == 0) fps_rate = Math.floor(1000 / cycleTime);


        canvas.width = window.innerWidth * 0.3;
        canvas.height = window.innerHeight * 0.3;


        var playerOffsetX = Math.sin(playerAngle) * MAP_SPEED;
        var playerOffsetY = Math.cos(playerAngle) * MAP_SPEED;
        var mapTargetX = Math.floor(playerY / MAP_SCALE) * MAP_SIZE + Math.floor((playerX + playerOffsetX * character.x * 10) / MAP_SCALE);
        var mapTargetY = Math.floor((playerY + playerOffsetY * character.y * 10) / MAP_SCALE) * MAP_SIZE + Math.floor(playerX / MAP_SCALE);

        if (character.x && map[mapTargetX] == 0) playerX += playerOffsetX * character.x;
        if (character.y && map[mapTargetY] == 0) playerY += playerOffsetY * character.y;
        if (characterAngle) playerAngle += 0.03 * characterAngle;
        drawEnemies();

        //console.log(playerX, playerY, playerAngle);
        var mapOffsetX = Math.floor(canvas.width / 2) - HALF_WIDTH;
        var mapOffsetY = Math.floor(canvas.height / 2) - HALF_HEIGHT;
       

        context.drawImage(WALLS[0], canvas.width / 2 - HALF_WIDTH, canvas.height / 2 - HALF_HEIGHT);

       

       
        

        var currentAngle = playerAngle + HALF_FOV;
        var rayStartX = Math.floor(playerX / MAP_SCALE) * MAP_SCALE;
        var rayStartY = Math.floor(playerY / MAP_SCALE) * MAP_SCALE;

        for (var ray = 0; ray < WIDTH; ray++) {

            var currentSin = Math.sin(currentAngle); currentSin = currentSin ? currentSin : 0.000001;
            var currentCos = Math.cos(currentAngle); currentCos = currentCos ? currentCos : 0.000001;


            var rayEndX, rayEndY, rayDirectionX, verticalDepth, textureEndY, textureY;
            if (currentSin > 0) { rayEndX = rayStartX + MAP_SCALE; rayDirectionX = 1 }
            else { rayEndX = rayStartX; rayDirectionX = -1 }
            for (var offset = 0; offset < MAP_RANGE; offset += MAP_SCALE) {
                verticalDepth = (rayEndX - playerX) / currentSin;
                rayEndY = playerY + verticalDepth * currentCos;
                var mapTargetX = Math.floor(rayEndX / MAP_SCALE);
                var mapTargetY = Math.floor(rayEndY / MAP_SCALE);
                if (currentSin <= 0) mapTargetX += rayDirectionX;
                var targetSquare = mapTargetY * MAP_SIZE + mapTargetX;
                if (targetSquare < 0 || targetSquare > map.length - 1) break;
                if (map[targetSquare] != 0) {
                    textureY = map[targetSquare];
                    if (map[targetSquare] == 14) textureY = 1;
                    if (map[targetSquare] == 15) textureY = 5;
                    break;
                }
                rayEndX += rayDirectionX * MAP_SCALE;
            } textureEndY = rayEndY;


            var rayEndY, rayEndX, rayDirectionY, horizontalDepth, textureEndX, textureX;
            if (currentCos > 0) { rayEndY = rayStartY + MAP_SCALE; rayDirectionY = 1 }
            else { rayEndY = rayStartY; rayDirectionY = -1 }
            for (var offset = 0; offset < MAP_RANGE; offset += MAP_SCALE) {
                horizontalDepth = (rayEndY - playerY) / currentCos;
                rayEndX = playerX + horizontalDepth * currentSin;
                var mapTargetX = Math.floor(rayEndX / MAP_SCALE);
                var mapTargetY = Math.floor(rayEndY / MAP_SCALE);
                if (currentCos <= 0) mapTargetY += rayDirectionY;
                var targetSquare = mapTargetY * MAP_SIZE + mapTargetX;
                if (targetSquare < 0 || targetSquare > map.length - 1) break;
                if (map[targetSquare] != 0) {
                    textureX = map[targetSquare];
                    if (map[targetSquare] == 14) textureX = 5;
                    if (map[targetSquare] == 15) textureX = 1;
                    break;
                }
                rayEndY += rayDirectionY * MAP_SCALE;
            } textureEndX = rayEndX;

            

            var depth = verticalDepth < horizontalDepth ? verticalDepth : horizontalDepth;
            var textureImage = verticalDepth < horizontalDepth ? textureY : textureX;
            var textureOffset = verticalDepth < horizontalDepth ? textureEndY : textureEndX;
            textureOffset = Math.floor(textureOffset - Math.floor(textureOffset / MAP_SCALE) * MAP_SCALE);
            depth *= Math.cos(playerAngle - currentAngle);
            var wallHeight = Math.min(Math.floor(MAP_SCALE * 280 / (depth + 0.0001)), 50000);


            context.drawImage(WALLS[textureImage], textureOffset, 0, 1, 64, mapOffsetX + ray, mapOffsetY + (HALF_HEIGHT - Math.floor(wallHeight / 2)), 1, wallHeight);


            currentAngle -= STEP_ANGLE;

           
       
            
        }

        

        
        context.fillStyle = 'White';
        context.fillRect(0, 0, canvas.width, mapOffsetY);
        context.fillRect(0, mapOffsetY + 200, canvas.width, canvas.width - mapOffsetY + 200);


        setTimeout(gameLoop, cycleDelay);


        context.fillStyle = 'Black';
        context.font = '10px Monospace';
        context.fillText('FPS: ' + fps_rate, 0, 20);


        
    } 
   
   

    function draw()
    {
        gameLoop();
        

    }

    

    SS.onload = function () {
        draw();
    };
   
    
};