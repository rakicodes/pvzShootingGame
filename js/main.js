let regZombie = document.querySelector("#regularZombie").addEventListener('click', killZombie);
let regZombieImg = document.querySelector("#regularZombieImg").addEventListener('click', killZombie);

let mjZombie = document.querySelector('#mjZombie').addEventListener('click', killZombie);
let mjZombieImg = document.querySelector('#mjZombieImg').addEventListener('click', killZombie);


let jumpingZombie = document.querySelector('#jumpingZombie').addEventListener('click', killZombie);
let jumpingZombieImg = document.querySelector('#jumpingZombieImg').addEventListener('click', killZombie);


let peashooter = document.querySelector('#peashooter').addEventListener('click', selectPlant);
let threepeater = document.querySelector('#threepeater').addEventListener('click', selectPlant);
let snowpea = document.querySelector('#snowpea').addEventListener('click', selectPlant);

let totalZombieKilled = 0;
let plantReady = false;
let typeOfPlant;

function checkIsReady(plant) {
    return plant.contains('selected');
}

function selectPlant(plant) {
    let id = plant.target.id;
    typeOfPlant = id;

    const plants = document.querySelectorAll('.plant');
    Array.from(plants)
        .filter(p => p.id !== `${id}Container`)
        .forEach(p => p.classList.remove('selected'));

    const gifs = document.querySelectorAll('.gif');
    Array.from(gifs)
        .filter(g => g.id !== `${id}Moving`)
        .forEach(g => g.classList.add('hidden'))


    document.querySelector(`#${id}Moving`).classList.toggle('hidden');
    document.querySelector(`#${id}Container`).classList.toggle('selected');

    let parentNode = plant.path[1].classList;
    plantReady = checkIsReady(parentNode);

    if (plantReady && id==='peashooter') {
        hideTargets();
        document.querySelector('.zombies').classList.remove('blueTargetCursor');
        document.querySelector('.zombies').classList.add('redTargetCursor');
    } else if (plantReady && id==='threepeater') {
        document.querySelector('.zombies').classList.remove('blueTargetCursor');
        document.querySelector('.zombies').classList.add('redTargetCursor');
        useThreepeater();
    }  else if (plantReady && id==='snowpea') {
        hideTargets();
        document.querySelector('.zombies').classList.remove('redTargetCursor');
        document.querySelector('.zombies').classList.add('blueTargetCursor');
    } else if (!plantReady) {
        document.querySelector('.zombies').classList.remove('redTargetCursor');
        document.querySelector('.zombies').classList.remove('blueTargetCursor');
        hideTargets();
    }
    
}

function killZombie(zombie) {
    if (!plantReady) return;

    let id = zombie.target.id;

    if (typeOfPlant === 'peashooter') {
        useRegPeashooter(id);
    } else if (typeOfPlant === 'snowpea') {
        useSnowpea(id);
    }


    if (totalZombieKilled >= 3) {
        gameOver();
    }

}

function useRegPeashooter(id) {
    document.querySelector(`#${id}`).classList.add('hidden');
    totalZombieKilled += 1;
}

function useThreepeater() {
    document.querySelector('#aim').addEventListener('click', shoot);
    let shots = document.querySelectorAll('.target')
    Array.from(shots).forEach(s => s.classList.remove('hidden'));   
}

function shoot() {
    let zombies = document.querySelectorAll('.zombie');
    Array.from(zombies).forEach(s => s.classList.add('hidden'));

    hideTargets();

    totalZombieKilled += 3;
    gameOver();
}

function hideTargets() {
    let shots = document.querySelectorAll('.target');
    Array.from(shots).forEach(s => s.classList.add('hidden'));

}

function useSnowpea(id) {
    document.querySelector(`#${id}Img`).classList.add('frozen');
    document.querySelector(`#${id}Img`).classList.remove('hidden');
    document.querySelector(`#${id}`).classList.add('hidden');

}

function gameOver() {
    document.querySelector('#status').innerText = 'YOU WIN!!!';
    document.querySelector('.zombies').style = 'display: flex; justify-content: center; align-items: center';
}