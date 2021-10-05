import styles from '../styles/hero.module.css'
import { NavLink } from 'react-router-dom'
import { AiOutlineArrowRight, AiFillCar } from "react-icons/ai"
import { FaHistory, FaGrinWink } from "react-icons/fa"

const Hero = () => {
    return (
        <>
            <div className={styles.heroContainer}>
                <div className={styles.boxCall}>
                    <h1 className={styles.heroH1}>Si tenés <span className={styles.spanRed}>miCocina,</span> tenés <span className={styles.spanGrey}>todo.</span></h1>
                    <h3 className={styles.heroH3}>Disfrutá tu comida favorita desde la comodidad de tu casa.</h3>
                    <h4 className={styles.heroH4}>Vos pedis y nosotros nos encargamos del resto!</h4>
                    <NavLink to='/' className={styles.button}>Ver más categorias</NavLink>
                </div>
                <div className={styles.categoriesBox}>
                    <div className={styles.categoriesRow}>
                        <NavLink to='/' className={styles.categoryBox}>
                            <img src='https://i.postimg.cc/pr9w1gTY/hamburguesas.webp' alt='hamburguesas' />
                            <p className={styles.categoryName}>categoria <AiOutlineArrowRight style={{ color: '#fe6849', fontSize: '1.5em', marginLeft: '5%' }} /></p>
                        </NavLink>
                        <NavLink to='/' className={styles.categoryBox}>
                            <img src='https://i.postimg.cc/13zjWkjg/pizza.webp' alt='pizzas' />
                            <p className={styles.categoryName}>categoria <AiOutlineArrowRight style={{ color: '#fe6849', fontSize: '1.5em', marginLeft: '5%' }} /></p>
                        </NavLink>
                    </div>
                    <div className={styles.categoriesRow}>
                        <NavLink to='/' className={styles.categoryBox}>
                            <img src='https://i.postimg.cc/wTwWsWj9/saludable.webp' alt='saludable' />
                            <p className={styles.categoryName}>categoria <AiOutlineArrowRight style={{ color: '#fe6849', fontSize: '1.5em', marginLeft: '5%' }} /></p>
                        </NavLink>
                        <NavLink to='/' className={styles.categoryBox}>
                            <img src='https://i.postimg.cc/HsdnRzHD/milanesas.webp' alt='minutas' />
                            <p className={styles.categoryName}>categoria <AiOutlineArrowRight style={{ color: '#fe6849', fontSize: '1.5em', marginLeft: '5%' }} /></p>
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className={styles.heroBanner}>
                <div className={styles.bannerBox}>
                    <div className={styles.circle}><FaHistory style={{ color: '#fe6849', fontSize: '3rem' }} /></div>
                    <hr className={styles.line}></hr>
                    <div className={styles.circle}><AiFillCar style={{ color: '#fe6849', fontSize: '3rem' }} /></div>
                    <hr className={styles.line}></hr>
                    <div className={styles.circle}><FaGrinWink style={{ color: '#fe6849', fontSize: '3rem' }} /></div>
                </div>
                <div className={styles.mainText}>
                    <div className={styles.textBox}>
                        <p className={styles.bannerTitle}>¡Ahorrá tiempo!</p>
                        <p className={styles.bannerText}>Ya no tenés que perder tiempo cocinando. Pensá qué querés comer hoy y hacé tu pedido.</p>
                    </div>
                    <div className={styles.textBox}>
                        <p className={styles.bannerTitle}>Te lo llevamos a tu casa</p>
                        <p className={styles.bannerText}>Te hacemos la vida más facil y te llevamos tu plato a tu casa</p>
                    </div>
                    <div className={styles.textBox}>
                        <p className={styles.bannerTitle}>¡Se feliz!</p>
                        <p className={styles.bannerText}>Listo! Ahora disfrutá de tus comidas favoritas rápido, fácil y rico!</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Hero