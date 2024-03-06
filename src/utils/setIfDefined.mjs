export function setIfDefined(target, key, value) {
  if (value !== undefined) {
    target[key] = value;
  }
}
