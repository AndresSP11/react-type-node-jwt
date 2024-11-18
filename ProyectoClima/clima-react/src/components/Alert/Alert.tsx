import React, { ReactNode } from 'react'
import styles from './Alert.module.css'



/* Definicion de la clase por  parte del children */
export default function Alert( {children} : {children:ReactNode}) {
  return (
    <div className={styles.alert}>{children}</div>
  )
}
