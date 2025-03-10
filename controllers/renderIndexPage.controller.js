export const renderIndexPage = (req, res) => {
  let token = req.cookies.token;
  if (token) {
    res.redirect("/shop");
  } else {
    res.render("index");
  }
};