export function createBaseClassGettersAndSetters(obj) {
  for (let key in obj.data) {
    let descriptor = Object.getOwnPropertyDescriptor(obj, key) || {};

    if (!descriptor.get) {
      descriptor.get = function() {
        return obj.data[key];
      };
    }

    if (!descriptor.set) {
      descriptor.set = function(value) {
        obj.data[key] = value;
        obj.isUpdated = true;
        obj.data.updatedAt = new Date();
      };
    }

    Object.defineProperty(obj, key, descriptor);
  }

  return obj;
}