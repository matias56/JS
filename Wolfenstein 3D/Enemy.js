function getRandomPosition() {
    const mapWidth = window.innerWidth;
    const mapHeight = window.innerHeight;
    const cubeWidth = 50;
    const cubeHeight = 50;

    const maxX = mapWidth - cubeWidth;
    const maxY = mapHeight - cubeHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    return { x: randomX, y: randomY };
}

for (let i = 0; i < 5; i++) {
    const cube = document.createElement('div');
    cube.className = 'cube';

    const position = getRandomPosition();
    cube.style.left = position.x + 'px';
    cube.style.top = position.y + 'px';

    document.body.appendChild(cube);
}