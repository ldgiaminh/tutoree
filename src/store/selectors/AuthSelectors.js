export const isAuthenticated = (state) => {
  if (state.auth.auth.accessToken) return true;
  return false;
};

export const isAdmin = (state) => {
  if (state.auth.admin.isSystemAdmin) return true;
  return false;
};
