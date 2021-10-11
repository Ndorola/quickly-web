import React, { useState } from 'react'
import Card from './CARD'
import styles from '../styles/personalData.module.css'
import { BsTrash } from 'react-icons/bs'
import userActions from '../redux/actions/userActions'
import { connect } from 'react-redux'
import toastConfirm from './ToastConfirm'

const PaymentCard = ({ updateUser, card, id, setActive, active, index }) => {
  return (
    <div className={active ? styles.activeCard : styles.paymentCard}>
      <span>
        Tarjeta {card?.brand.toUpperCase()} ...{card?.last4}
      </span>
      {setActive && !active && (
        <span onClick={() => setActive({ ...active, card: index })} style={{ cursor: 'pointer' }}>
          Seleccionar
        </span>
      )}
      <BsTrash onClick={() => toastConfirm(() => updateUser({ action: 'deletePaymentCard', paymentCardId: id }))} />
    </div>
  )
}
const Payment = ({ userData, updateUser, setActive, active }) => {
  return (
    <div className={styles.mainPayment}>
      <div className={styles.boxCard}>
        {userData?.paymentCards?.map((payment) => (
          <PaymentCard
            updateUser={updateUser}
            card={payment.card}
            id={payment.id}
            key={payment.id}
            index={index}
            active={active.card === index}
            setActive={setActive}
          />
        ))}
      </div>
      <Card />
      {/* Payment
      <Cards /> */}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    userData: state.users.userData,
  }
}
const mapDispatchToProps = {
  updateUser: userActions.updateUser,
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment)
