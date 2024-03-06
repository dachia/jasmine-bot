export function getNextState(currentState, states) {
  const stateOrder = Object.values(states);
  if (currentState === null || currentState === undefined) {
    return stateOrder[0]; // Return the first state if currentState is null or undefined
  }

  const currentIndex = stateOrder.indexOf(currentState);
  if (currentIndex === -1 || currentIndex === stateOrder.length - 1) {
    return null; // Return null if currentState is not found or it's the last state
  }

  return stateOrder[currentIndex + 1]; // Return the next state
}