function index (req, res) {
    res.json({ message: 'noteControllerNode.js file working!'})
}

module.exports = {
    index: index
}