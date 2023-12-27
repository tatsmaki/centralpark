export const getSavedObjects = () => {
  const item = localStorage.getItem("objects");

  if (item) {
    const objects = JSON.parse(item);
    if (Array.isArray(objects)) {
      return objects;
    }
  }
  return [];
};
