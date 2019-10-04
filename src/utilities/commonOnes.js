export const collectIdsAndNames = doc => {
  return { id: doc.id, ...doc.data() };
};
