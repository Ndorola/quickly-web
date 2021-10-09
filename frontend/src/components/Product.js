import styles from '../styles/product.module.css'
import { connect } from 'react-redux'
import productActions from '../redux/actions/productActions'
import { ImCancelCircle } from 'react-icons/im'
import { useEffect, useState } from 'react'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

const Product = ({ product, setMod, user, manageCart, ...props }) => {
  const sizeFries = [
    { size: 'Chicas', cost: 0 },
    { size: 'Medianas', cost: 10 },
    { size: 'Grandes', cost: 20 },
  ] //debería venir de props y si no existe debe ser []
  const extrasChoices = [
    { type: 'Carne', cost: 20 },
    { type: 'Queso', cost: 10 },
    { type: 'Cebolla', cost: 5 },
    { type: 'Gaseosa 500cc', cost: 35 },
  ] //debería venir de props y estar siempre (aunque sea una gaseosa)

  const [fries, setFries] = useState('Chicas')
  const [aclaraciones, setAclaraciones] = useState('')
  const [extras, setExtras] = useState([])
  const [extrasCost, setExtrasCost] = useState(0)
  const [totalAmount, setTotalAmount] = useState(1)
  const [unitaryPrice, setUnitaryPrice] = useState(product.price)
  const [totalPrice, setTotalPrice] = useState(product.price)

  const amount = (operation) => {
    if (operation === 'sum') {
      if (totalAmount < product.stock) {
        setTotalAmount(totalAmount + 1)
      } else {
        alert('ha llegado al límite de este producto')
      }
    } else {
      if (totalAmount > 1) setTotalAmount(totalAmount - 1)
    }
  }

  const addFries = (fries) => {
    setFries(fries)
  }

  const addExtras = (extra) => {
    if (!extras.includes(extra)) {
      setExtras([...extras, extra])
    } else {
      setExtras(extras.filter((e) => e !== extra))
    }
  }

  useEffect(() => {
    let amount = 0
    extrasChoices.forEach((extra) => {
      if (extras.includes(extra.type)) amount = amount + extra.cost
    })
    setExtrasCost(amount)
  }, [extras])

  useEffect(() => {
    let friesCost = sizeFries.find((size) => size.size === fries).cost
    setUnitaryPrice(product.price + friesCost + extrasCost)
  }, [sizeFries, extrasCost])

  useEffect(() => {
    setTotalPrice(unitaryPrice * totalAmount)
  }, [unitaryPrice, totalAmount])

  const addToCart = () => {
    console.log({ papas: sizeFries.find((frie) => frie.size === fries) })
    console.log(extras)
    console.log(aclaraciones)
    console.log(totalAmount)
    console.log(unitaryPrice)
    console.log(totalPrice)
    // manageCart()
    //alert toast
    setMod(false)
  }

  return (
    <main data-modal='closeModal' className={styles.main}>
      <div className={styles.card}>
        <ImCancelCircle className={styles.exit} onClick={() => setMod(false)} />

        <div className={styles.product}>
          <div className={styles.cardInfo}>
            <div className={styles.title}>
              <h1>{product.name}</h1>
              <Stack className={styles.calification} spacing={1}>
                {user ? (
                  <Rating
                    className={styles.rating}
                    style={{ backgroundColor: 'yelow' }}
                    name='half-rating'
                    defaultValue={product.score}
                    precision={0.5}
                  />
                ) : (
                  <Rating
                    name='half-rating-read'
                    defaultValue={product.score}
                    precision={0.5}
                    readOnly
                  />
                )}
              </Stack>
            </div>

            <div className={styles.title}>
              <h3>Descripcion:</h3>
              <p>{product.description}</p>
            </div>

            <div className={styles.order}>
              <div className={styles.amount}>
                <p
                  className={styles.amountButton}
                  onClick={() => amount('res')}
                >
                  -
                </p>
                <p>{totalAmount}</p>
                <p
                  className={styles.amountButton}
                  onClick={() => amount('sum')}
                >
                  +
                </p>
              </div>
              <p className={styles.addToCart} onClick={addToCart}>
                Agregar a mi orden
              </p>
            </div>
          </div>

          <img className={styles.cardPicture} src={product.img} />

          <div className={styles.cardPrice}>
            <div className={styles.choices}>
              {product.papas && (
                <div>
                  <h3 className={styles.h3}>Tamaño papas</h3>
                  {sizeFries.map((size, index) => (
                    <div key={index}>
                      <input
                        type='radio'
                        name='extras'
                        value={size.size}
                        id={size.size}
                        onClick={() => addFries(size.size)}
                        defaultChecked={size.cost === 0 && 'checked'}
                      />

                      <label className={styles.input} htmlFor={size.size}>
                        {size.size}
                        {size.cost !== 0 && (
                          <span className={styles.span}>
                            {' '}
                            (USD {size.cost})
                          </span>
                        )}
                      </label>
                    </div>
                  ))}
                </div>
              )}
              <div>
                {product.extras && (
                  <>
                    <h3 className={styles.h3}>Extras</h3>
                    {extrasChoices.map((extra, index) => (
                      <div key={index}>
                        <input
                          type='checkbox'
                          name='extras'
                          value={extra.type}
                          id={extra.type}
                          onClick={() => addExtras(extra.type)}
                        />

                        <label className={styles.input} htmlFor={extra.type}>
                          {extra.type}{' '}
                          <span className={styles.span}>
                            (USD {extra.cost})
                          </span>
                        </label>
                      </div>
                    ))}
                  </>
                )}
              </div>
              <Box
                component='form'
                sx={{
                  '& .MuiTextField-root': {
                    m: 1,
                    width: '25ch',
                    minHeight: '15ch',
                  },
                }}
                noValidate
                autoComplete='off'
              >
                <TextField
                  id='outlined-multiline-flexible'
                  label='Aclaraciones'
                  multiline
                  maxRows={4}
                  rows={4}
                  value={aclaraciones}
                  onChange={(e) => setAclaraciones(e.target.value)}
                />
              </Box>
            </div>
            <div>
              <h4>Unidad: $ {unitaryPrice}</h4>
              <h2>Total: $ {totalPrice}</h2>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
  }
}
const mapDispachToProps = {
  getProd: productActions.getProducts,
  manageCart: productActions.manageCart,
}

export default connect(mapStateToProps, mapDispachToProps)(Product)
