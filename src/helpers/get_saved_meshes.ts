export const getSavedMeshes = () => {
  const item = localStorage.getItem("meshes");

  if (item) {
    const meshes = JSON.parse(item);
    if (Array.isArray(meshes)) {
      return meshes;
    }
  }
  return [];
};
