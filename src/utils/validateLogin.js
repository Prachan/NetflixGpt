export const validateLogon = (userName, password) => {
    const usernameRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  
    const errors = {};
  
    if (!userName || !usernameRegex.test(userName)) {
      errors.userName = "Username must start with a letter and be 3-16 characters long. Only letters, numbers, and underscores allowed.";
    }
  
    if (!password || !passwordRegex.test(password)) {
      errors.password =
        "Password must be at least 8 characters, include uppercase, lowercase, and a number.";
    }
  
    const isValid = Object.keys(errors).length === 0;
  
    return { isValid, errors };
  };