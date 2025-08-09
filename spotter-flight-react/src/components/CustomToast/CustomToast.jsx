'use client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styled from 'styled-components'

const StyledToastContainer = styled(ToastContainer).attrs({
  toastClassName: 'custom-toast'
})`
  .custom-toast {
    border-radius: 16px;
    font-family: var(--font-main);
    font-size: 14px;
    border: 1px solid #fbfbfb;
    box-shadow: 0px 10px 18px -2px #10192812;
  }
`

const CustomToast = () => {
  return (
    <>
      <ToastContainer
        position='top-center'
        autoClose={false}
        hideProgressBar
        closeOnClick
        draggable
        pauseOnHover
        closeButton={false}
        theme='light'
        toastStyle={{
          background: 'transparent',
          boxShadow: 'none',
          padding: 0,
          color: 'inherit',
        }}
      />
    </>
  )
}
export default CustomToast
