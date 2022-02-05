export const validate = (data, type) => {
  const errors = {};

  if (!data.email) {
    errors.email = "Email required!";
  } else if (!/\S+@\S+\.\S/.test(data.email)) {
    errors.email = "Email is invalid!";
  } else {
    delete errors.email;
  }

  if (!data.password) {
    errors.password = "Password required!";
  } else if (data.password.length < 6) {
    errors.password = "Password need to be 6 characted or more!";
  } else {
    delete errors.password;
  }

  if (type === "signup") {
    if (!data.name.trim()) {
      errors.name = "Name required!";
    } else {
      delete errors.name;
    }

    if (!data.confirmPassword) {
      errors.confirmPassword = "Confirm your password";
    } else if (data.confirmPassword !== data.password) {
      errors.confirmPassword = "Password do not match";
    } else {
      delete errors.confirmPassword;
    }

    if (!data.isAccepted) {
      errors.isAccepted = "Please accept our rules";
    } else {
      delete errors.isAccepted;
    }
  }

  return errors;
};
