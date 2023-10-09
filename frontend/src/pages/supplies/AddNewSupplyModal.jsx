import Modal from '@mui/material/Modal'
import * as React from 'react'
import Box from '@mui/material/Box'
import { Typography, Grid, Button, TextField } from '@mui/material'
import { styled } from '@mui/material/styles'
import { FormControl, FormLabel, InputAdornment } from '@mui/material'
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

export default function AddNewSupplyModal({
   open,
   handleClose,
   handelAddSupply,
}) {
   const onCloseClick = (event, reason) => {
      if (reason === 'backdropClick') return
      handleClose()
   }

   const [name, setName] = useLocalStorage('AddNewSupply_Field_Name', '')
   const [description, setDescription] = useLocalStorage(
      'AddNewSupply_Field_Description',
      ''
   )
   const [buyingPrice, setBuyingPrice] = useLocalStorage(
      'AddNewSupply_Field_BuyingPrice',
      0
   )
   const [sellingPrice, setSellingPrice] = useLocalStorage(
      'AddNewSupply_Field_SellingPrice',
      0
   )
   const [stock, setStock] = useLocalStorage('AddNewSupply_Field_Stock', 0)

   const handleSubmit = (e) => {
      e.preventDefault()

      const errors = []

      if (name === '') errors.push('الأسم يجب ان يكون موجود')
      if (description === '') errors.push('الوصف يجب ان يكون موجود')
      if (buyingPrice <= 0) errors.push('سعر الشراء يجب ان يكون اكبر من 0')
      if (sellingPrice <= 0) errors.push('سعر البيع يجب ان يكون اكبر من 0')
      if (stock <= 0) errors.push('الكمية يجب ان تكون اكبر من 0')

      if (buyingPrice >= sellingPrice)
         errors.push('سعر البيع يجب ان يكون اكبر من سعر الشراء')

      // if (errors.length > 0) {
      //    return Swal.fire({
      //       icon: 'error',
      //       title: 'خطأ',
      //       html:`
      //          <ul style="text-align: right; direction: rtl;">
      //             ${errors.map((err) => `<li style="border-bottom: 2px solid red; margin:2px; padding:5px">${err}</li>`).join('')}
      //          </ul>
      //       `
      //    })
      // }

      console.log('submit')
      console.log({
         name,
         description,
         buyingPrice,
         sellingPrice,
         stock,
      })

      handelAddSupply({
         name,
         description,
         buyingPrice,
         sellingPrice,
         stock,
      })
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
                     <h2>اضافة مستلزم</h2>
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
                        //value={email}
                        //error={emailError}
                     />
                     <TextField
                        label="الوصف"
                        onChange={(e) => setDescription(e.target.value)}
                        defaultValue={description}
                        variant="outlined"
                        color="secondary"
                        type="text"
                        sx={{ mb: 3 }}
                        fullWidth
                        //value={email}
                        //error={emailError}
                     />
                     <TextField
                        label="سعر الشراء"
                        onChange={(e) => setBuyingPrice(Number(e.target.value))}
                        defaultValue={buyingPrice}
                        InputProps={{
                           endAdornment: (
                              <InputAdornment position="end">$</InputAdornment>
                           ),
                           inputProps: { min: 0, step: 0.1 },
                           step: 0.01,
                        }}
                        type="number"
                        variant="outlined"
                        color="secondary"
                        sx={{
                           mb: 3,
                           width: '30%',
                           ml: '5%',
                           direction: 'ltr !important',
                        }}
                        required
                     />
                     <TextField
                        label="سعر البيع"
                        onChange={(e) =>
                           setSellingPrice(Number(e.target.value))
                        }
                        defaultValue={sellingPrice}
                        InputProps={{
                           endAdornment: (
                              <InputAdornment position="end">$</InputAdornment>
                           ),
                           inputProps: { min: 0, step: 0.1 },
                        }}
                        type="number"
                        variant="outlined"
                        color="secondary"
                        sx={{
                           mb: 3,
                           width: '30%',
                           ml: '5%',
                           direction: 'ltr !important',
                        }}
                        required
                     />
                     <TextField
                        label="الكمية"
                        onChange={(e) => setStock(Number(e.target.value))}
                        defaultValue={stock}
                        InputProps={{
                           inputProps: { min: 0 },
                        }}
                        type="number"
                        variant="outlined"
                        color="secondary"
                        sx={{
                           mb: 3,
                           width: '30%',
                           direction: 'ltr !important',
                        }}
                        required
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
