export const renderProfilePage = async (req, res) => {
    res.render("update-profile", {user: req.user})
}