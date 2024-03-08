export function parseFirstJson(response) {
  let stack = [];
  let jsonStart = -1;
  let jsonEnd = -1;

  for (let i = 0; i < response.length; i++) {
    if (response[i] === '{' || response[i] === '[') {
      if (stack.length === 0) {
        jsonStart = i;
      }
      stack.push(response[i]);
    } else if (response[i] === '}' || response[i] === ']') {
      if (stack.length === 0) {
        continue;
      }
      let last = stack.pop();
      if ((last === '{' && response[i] === '}') || (last === '[' && response[i] === ']')) {
        if (stack.length === 0) {
          jsonEnd = i;
          break;
        }
      }
    }
  }

  if (jsonStart !== -1 && jsonEnd !== -1) {
    try {
      return JSON.parse(response.substring(jsonStart, jsonEnd + 1));
    } catch (err) {
      console.error('Failed to parse JSON:', err);
    }
  }

  return null;
}