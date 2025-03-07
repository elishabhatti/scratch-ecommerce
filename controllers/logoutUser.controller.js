export const logoutUser = (req, res) => {
  res.clearCookie("token").redirect("/");
};
