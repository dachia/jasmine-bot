export const BIRTH_DATE_GREETING = "birth-date-greeting"
export const WAITING_FOR_BIRTH_DATE = "waiting-for-birth-date"
export const WEIGHT_GREETING = "weight-greeting"
export const WAITING_FOR_WEIGHT = "waiting-for-weight"
export const HEIGHT_GREETING = "height-greeting"
export const WAITING_FOR_HEIGHT = "waiting-for-height"
export const GENDER_GREETING = "gender-greeting"
export const WAITING_FOR_GENDER = "waiting-for-gender"
export const ACTIVITY_LEVEL_GREETING = "activity-level-greeting"
export const WAITING_FOR_ACTIVITY_LEVEL = "waiting-for-activity-level"
export const STEPS_GREETING = "steps-greeting"
export const WAITING_FOR_STEPS = "waiting-for-steps"
export const ESTIMATE_BURN_PER_DAY = "estimate-burn-per-day"

export const REGISTRATION_GREETING = "registration-greeting"
export const WAITING_FOR_EMAIL = "waiting-for-email"
export const EMAIL_VALIDATION_GREETING = "email-validation-greeting"
export const WAITING_FOR_EMAIL_VALIDATION = "waiting-for-email-validation"
export const REGISTRATION_FLOW = [
]

export const UPDATE_WEIGHT_FLOW = [
  WEIGHT_GREETING,
  WAITING_FOR_WEIGHT,
  ESTIMATE_BURN_PER_DAY
]

export const ONBOARDING_FLOW = [
  BIRTH_DATE_GREETING,
  WAITING_FOR_BIRTH_DATE,
  WEIGHT_GREETING,
  WAITING_FOR_WEIGHT,
  HEIGHT_GREETING,
  WAITING_FOR_HEIGHT,
  GENDER_GREETING,
  WAITING_FOR_GENDER,
  ACTIVITY_LEVEL_GREETING,
  WAITING_FOR_ACTIVITY_LEVEL,
  STEPS_GREETING,
  WAITING_FOR_STEPS,
  ESTIMATE_BURN_PER_DAY
]

export const WAITING_FOR_FOOD = "waiting-for-food"
export const FOOD_INPUT_GREETING = "food-input-greeting"
export const LOG_FOOD_FLOW = [
  FOOD_INPUT_GREETING,
  WAITING_FOR_FOOD,
]


export const MENTAL_INPUT_GREETING = "mental-input-greeting"
export const WAITING_FOR_MENTAL_INPUT = "waiting-for-mental-input"
export const MENTAL_HEALTH_FLOW = [
  MENTAL_INPUT_GREETING,
  WAITING_FOR_MENTAL_INPUT
]

export const ACTION_BOT = "action-bot"
export const ACTION_USER = "action-user"

export const STATE_CONFIG = {
  [MENTAL_INPUT_GREETING]: {
    action: ACTION_BOT
  },
  [WAITING_FOR_MENTAL_INPUT]: {
    action: ACTION_USER,
    repeat: true
  },
  [WAITING_FOR_FOOD]: {
    action: ACTION_USER,
    repeat: true
  },
  [FOOD_INPUT_GREETING]: {
    action: ACTION_BOT
  },
  [BIRTH_DATE_GREETING]: {
    action: ACTION_BOT
  },
  [WAITING_FOR_BIRTH_DATE]: {
    action: ACTION_USER
  },
  [WEIGHT_GREETING]: {
    action: ACTION_BOT
  },
  [WAITING_FOR_WEIGHT]: {
    action: ACTION_USER
  },
  [HEIGHT_GREETING]: {
    action: ACTION_BOT
  },
  [WAITING_FOR_HEIGHT]: {
    action: ACTION_USER
  },
  [GENDER_GREETING]: {
    action: ACTION_BOT
  },
  [WAITING_FOR_GENDER]: {
    action: ACTION_USER
  },
  [ACTIVITY_LEVEL_GREETING]: {
    action: ACTION_BOT
  },
  [WAITING_FOR_ACTIVITY_LEVEL]: {
    action: ACTION_USER
  },
  [STEPS_GREETING]: {
    action: ACTION_BOT
  },
  [WAITING_FOR_STEPS]: {
    action: ACTION_USER
  },
  [ESTIMATE_BURN_PER_DAY]: {
    action: ACTION_BOT
  },
}

export const DEFAULT_FLOW = LOG_FOOD_FLOW

export function getStateConfig(state) {
  return STATE_CONFIG[state]
}

export function getNextState(currentState, states) {
  const stateConfig = getStateConfig(currentState);
  if (stateConfig?.repeat) {
    return currentState
  }
  
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