import { showModal } from './modal.js'

export function showWinnerModal(fighter) {
  // call showModal function 
  const title = fighter.name + ' winner!';
  const bodyElement = ' Click cross to start new game.';
  const onClose = () => window.location.reload();
  showModal({ title, bodyElement, onClose })
}
