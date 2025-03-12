export const renderCartPage = async (req, res) => {
    let user = req.user
    res.render("cart", { user})
}