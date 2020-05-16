import { controls } from '../../constants/controls';





export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    // resolve the promise with the winner when fight is over
    firstFighter.attack = firstFighter.attack ? firstFighter.attack : firstFighter.power;
    secondFighter.attack = secondFighter.attack ? secondFighter.attack : secondFighter.power;

    let isFirstPlayer = false;
    let isSecondPlayer = false;
    let firstPlayer = {};
    let secondPlayer = {};
    const firstFighterHealth = firstFighter.health;
    const secondFighterHealth = secondFighter.health;

    const setFirstFighterCriticalKeys = () => new Set(controls.PlayerOneCriticalHitCombination);
    let firstFighterCriticalKeys = setFirstFighterCriticalKeys();
    let isFirstTimeoutCriticalKeys = false;

    const setSecondFighterCriticalKeys = () => new Set(controls.PlayerTwoCriticalHitCombination);
    let secondFighterCriticalKeys = setSecondFighterCriticalKeys();
    let isSecondTimeoutCriticalKeys = false;
    
    document.addEventListener('keydown', function (event) {

      if (!isFirstPlayer) {
        if (controls.PlayerOneCriticalHitCombination.includes(event.code) && !isFirstTimeoutCriticalKeys) {
          firstFighterCriticalKeys.delete(event.code);
        }
        if (firstFighterCriticalKeys.size === 0 && !isFirstTimeoutCriticalKeys) {
          firstFighter.attack = firstFighter.attack * 2;
          firstPlayer.attack = getHitPower(firstFighter);
          firstFighter.attack = firstFighter.attack / 2;
          firstPlayer.isCriticalAttack = true;
          isFirstPlayer = true;
          isFirstTimeoutCriticalKeys = true;
          firstFighterCriticalKeys = setFirstFighterCriticalKeys();
          setTimeout(() => { isFirstTimeoutCriticalKeys = false; }, 10000);
        }

        if (event.code === controls.PlayerOneAttack) firstPlayer.attack = getHitPower(firstFighter);
        if (event.code === controls.PlayerOneBlock) firstPlayer.defense = getBlockPower(firstFighter);
        isFirstPlayer = !!(Object.keys(firstPlayer).length > 0);
      }

      if (!isSecondPlayer) {
        if (controls.PlayerTwoCriticalHitCombination.includes(event.code) && !isSecondTimeoutCriticalKeys) {
          secondFighterCriticalKeys.delete(event.code);
        }
        if (secondFighterCriticalKeys.size === 0 && !isSecondTimeoutCriticalKeys) {
          secondFighter.attack = secondFighter.attack * 2;
          secondPlayer.attack = getHitPower(secondFighter);
          secondFighter.attack = secondFighter.attack / 2;
          secondPlayer.isCriticalAttack = true;
          isSecondPlayer = true;
          isSecondTimeoutCriticalKeys = true;
          secondFighterCriticalKeys = setSecondFighterCriticalKeys();
          setTimeout(() => { isSecondTimeoutCriticalKeys = false; }, 10000);
        }

        if (event.code === controls.PlayerTwoAttack) secondPlayer.attack = getHitPower(secondFighter);
        if (event.code === controls.PlayerTwoBlock) secondPlayer.defense = getBlockPower(secondFighter);
        isSecondPlayer = !!(Object.keys(secondPlayer).length > 0);
      }

      if (isFirstPlayer && isSecondPlayer) {
        if(firstPlayer.isCriticalAttack) secondPlayer.defense = 0;
        if(secondPlayer.isCriticalAttack) firstPlayer.defense = 0;
        firstFighter.health = firstFighter.health - getDamage(secondPlayer.attack, firstPlayer.defense);
        secondFighter.health = secondFighter.health - getDamage(firstPlayer.attack, secondPlayer.defense);
        firstFighterCriticalKeys = setFirstFighterCriticalKeys();
        secondFighterCriticalKeys = setSecondFighterCriticalKeys();
        isFirstPlayer = false;
        isSecondPlayer = false;
        console.log('/nfirstFighter attack:', firstPlayer.attack, ' defense:', firstPlayer.defense, ' health:', firstFighter.health);
        console.log('secondFighter attack:', secondPlayer.attack, ' defense:', secondPlayer.defense, ' health:', secondFighter.health);
        firstPlayer = {};
        secondPlayer = {};
        
        //console.log('firstFighter', firstFighter.name, ' ', firstFighter.health);
        //console.log('secondFighter', secondFighter.name, ' ', secondFighter.health);
        const leftIndicator = (100 * firstFighter.health) / firstFighterHealth;
        const rightIndicator = (100 * secondFighter.health) / secondFighterHealth;
        document.getElementById('left-fighter-indicator').style.width = `${leftIndicator}%`;
        document.getElementById('right-fighter-indicator').style.width = `${rightIndicator}%`;

        if (firstFighter.health <= 0) resolve(secondFighter);
        if (secondFighter.health <= 0) resolve(firstFighter);
      }
    });
  });
}

export function getDamage(attacker = 0, defender = 0) {
  // return damage
  const damage = attacker - defender;
  return damage >= 0 ? damage : 0;
}

export function getHitPower(fighter) {
  // return hit power
  const criticalHitChance = 1 + Math.random();
  return fighter.attack * criticalHitChance;
}

export function getBlockPower(fighter) {
  // return block power
  const dodgeChance = 1 + Math.random();
  return fighter.defense * dodgeChance;
}
