function test(req, res) {
    res.json({ message: 'userControllerNode.js file working!'})
}

module.exports = {
    test: test
}