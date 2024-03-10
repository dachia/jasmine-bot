const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export async function retry(
  fn, 
  retries = 5, 
  interval = 500, 
  exponential = true
) {
  try {
    const result = await fn();
    return result;
  } catch (error) {
    if (retries > 0 && error?.response?.status === 429) {
      await sleep(interval);
      return retry(fn, retries - 1, exponential ? interval * 2 : interval, exponential);
    } else {
      throw error;
    }
  }
}
