export const login = ({ email, password }) => {
  if (email === "admin@demo.com" && password === "admin123") {
    return {
      success: true,
      user: {
        id: 1,
        name: "Admin User",
        role: "admin",
        email,
      },
      token: "mock-jwt-token",
    };
  }

  return {
    success: false,
    message: "Invalid email or password",
  };
};

export const logout = () => {
  localStorage.removeItem("auth");
  localStorage.removeItem("token");
};

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

export const getCurrentUser = () => {
  const auth = localStorage.getItem("auth");
  return auth ? JSON.parse(auth) : null;
};
