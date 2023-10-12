import Modal from '@mui/material/Modal'
import * as React from 'react'
import Box from '@mui/material/Box'
import { Button, TextField } from '@mui/material'

import Fade from '@mui/material/Fade'
import useLocalStorage from '../../hooks/useLocalStorage'
import Swal from 'sweetalert2'

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   // width: 400,
   bgcolor: 'background.paper',
   // border: '2px solid #000',
   boxShadow: 24,
   p: 4,
   direction: 'rtl !important',
   hight: '100%',
}

export default function CreateSessionModal({
   open,
   handleClose,
   handelCreateSession,
}) {
   const onCloseClick = (event, reason) => {
      handleClose()
   }

   const [name, setName] = useLocalStorage('AddNewSession_Field_Name', '')

   const handleSubmit = (e) => {
      e.preventDefault()

      const errors = []

      if (name === '') errors.push('الأسم يجب ان يكون موجود')

      if (errors.length > 0) {
         return Swal.fire({
            icon: 'error',
            title: 'خطأ',
            html: `
               <ul style="text-align: right; direction: rtl;">
                  ${errors
                     .map(
                        (err) =>
                           `<li style="border-bottom: 2px solid red; margin:2px; padding:5px; color:red;">${err}</li>`
                     )
                     .join('')}
               </ul>
            `,
         })
      }

      handelAddSupply(name)
   }

   return (
      <Modal
         open={open}
         onClose={onCloseClick}
         aria-labelledby="modal-modal-title"
         aria-describedby="modal-modal-description"
         sx={{
            direction: 'rtl !important',
         }}
      >
         <Fade in={open}>
            <Box sx={style}>
               <React.Fragment>
                  <form autoComplete="off" onSubmit={handleSubmit}>
                     <h2>اضافة جلسة</h2>
                     <TextField
                        label="الأسم"
                        onChange={(e) => setName(e.target.value)}
                        defaultValue={name}
                        required
                        variant="outlined"
                        color="secondary"
                        type="text"
                        sx={{ mb: 3, mt: 3 }}
                        fullWidth
                     />

                     <div
                        style={{
                           direction: 'ltr !important',
                           width: '100%',
                        }}
                     >
                        <Button
                           variant="outlined"
                           color="secondary"
                           type="submit"
                           sx={{
                              width: '49%',
                              ml: '2%',
                           }}
                        >
                           حفظ
                        </Button>
                        <Button
                           variant="contained"
                           color="error"
                           type="button"
                           onClick={onCloseClick}
                           sx={{
                              width: '49%',
                           }}
                        >
                           الغاء
                        </Button>
                     </div>
                  </form>
               </React.Fragment>
            </Box>
         </Fade>
      </Modal>
   )
}
