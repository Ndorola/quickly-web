const Product = require('../../models/Product')
const User = require('../../models/User')

const productControllers = {
  getProducts: async (req, res) => {
    try {
      let products = await Product.find()
      res.json({ success: true, response: products })
    } catch (error) {
      res.json({ success: false, error: error.message })
    }
  },
  favHandler: async (req, res) => {
    const { action, _id } = req.body
    // return console.log(req.body)
    let operation =
      action === 'addFav'
        ? { $push: { favs: req.user._id } }
        : action === 'deleteFav'
        ? { $pull: { favs: req.user._id } }
        : null

    try {
      await Product.findOneAndUpdate({ _id }, operation, { new: true })
      let products = await Product.find()
      res.json({ success: true, response: products })
    } catch (error) {
      console.log(error)
      res.json({ succes: false, error: error.message })
    }
  },
  keepCart: async (req, res) => {
    const { cart, _id } = req.body
    console.log(cart)
    try {
      let user = await User.findOneAndUpdate(
        { _id },
        { $set: { cart } },
        { new: true }
      ).populate({
        path: 'cart.productId',
        model: 'product',
      })
      res.json({ success: true, user })
    } catch (err) {
      console.log(err.message)
      res.json({ success: false, error: err.message })
    }
  },
  manageCart: async (req, res) => {
    const { cartItem, action, _id } = req.body
    console.log(cartItem)
    let searchOption =
      action === 'editCartItem' ? { 'cart._id': cartItem._id } : { _id }
    let operation =
      action === 'add'
        ? { $push: { cart: cartItem } }
        : action === 'delete'
        ? { $pull: { cart: { _id: cartItem._id } } }
        : action === 'editCartItem'
        ? { $set: { 'cart.$': cartItem } }
        : { $set: { cart: [] } }
    let options = { new: true }

    let operationProd = {
      $inc: {
        stock:
          action === 'add'
            ? -cartItem.totalAmount
            : action === 'delete'
            ? cartItem.totalAmount
            : req.body.dif,
      },
    }
    let searchOptionProd = {
      _id: action === 'add' ? cartItem.productId : cartItem.productId._id,
    }

    try {
      await Product.findOneAndUpdate(searchOptionProd, operationProd)
      let products = await Product.find()
      let user = await User.findOneAndUpdate(
        searchOption,
        operation,
        options
      ).populate({ path: 'cart.productId', model: 'product' })
      res.json({
        success: true,
        userData: user,
        products,
      })
    } catch (error) {
      console.log(error)
      res.json({ success: false, error: error.message })
    }
  },
}

module.exports = productControllers
