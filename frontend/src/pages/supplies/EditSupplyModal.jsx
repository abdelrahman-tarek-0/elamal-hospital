import Modal from '@mui/material/Modal'
import * as React from 'react'
import Box from '@mui/material/Box'
import { Button } from '@mui/material'
import { Typography, Divider, TextField } from '@mui/material'
import { FormControl, FormLabel, InputAdornment, Chip } from '@mui/material'
import Paper from '@mui/material/Paper'
import Fade from '@mui/material/Fade'
import useLocalStorage from '../../hooks/useLocalStorage'
import Swal from 'sweetalert2'

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   minWidth: '400px',
   bgcolor: 'background.paper',
   // border: '2px solid #000',
   boxShadow: 24,
   p: 4,
   direction: 'rtl !important',
   hight: '100%',
}

export default function EditSupplyModal({
   open,
   handleClose,
   supply,
   handelChangeSupplyStock,
   handelEditSupply,
}) {
   const onCloseClick = (event, reason) => {
      handleClose()
   }

   const [change, setChange] = useLocalStorage(
      'EditSupplyModal_change_field',
      0
   )

   const [name, setName] = React.useState('')
   const [description, setDescription] = React.useState('')
   const [buyingPrice, setBuyingPrice] = React.useState(0)
   const [sellingPrice, setSellingPrice] = React.useState(0)

   React.useEffect(() => {
      setName(supply.name)
      setDescription(supply.description)
      setBuyingPrice(supply.buyingPrice)
      setSellingPrice(supply.sellingPrice)
   }, [supply])

   const handelChangeStockAdd = async () => {
      const price = supply.buyingPrice * change

      Swal.fire({
         title: 'هل انت متأكد؟',
         text: `سيتم اضافة ${change} من ${supply.name} بتكلفة شراء ${price}$`,
         icon: 'warning',
         showCancelButton: true,
         confirmButtonText: 'نعم',
         cancelButtonText: 'لا',
         reverseButtons: true,
         allowOutsideClick: false,
      }).then(async (result) => {
         if (result.isConfirmed) {
            handelChangeSupplyStock(supply.id, change)
         }
      })
   }

   const handelChangeStockUse = async () => {
      const price = supply.sellingPrice * change

      Swal.fire({
         title: 'هل انت متأكد؟',
         text: `سيتم استخدام ${change} من ${supply.name} بسعر بيع ${price}$`,
         icon: 'warning',
         showCancelButton: true,
         confirmButtonText: 'نعم',
         cancelButtonText: 'لا',
         reverseButtons: true,
         allowOutsideClick: false,
      }).then(async (result) => {
         if (result.isConfirmed) {
            handelChangeSupplyStock(supply.id, -change)
         }
      })
   }

   const handelEditSupplySubmit = (e) => {
      e.preventDefault()

      console.log({
         name,
         description,
         buyingPrice,
         sellingPrice,
      })
      const errors = []

      if (name === '') errors.push('الأسم يجب ان يكون موجود')
      // if (description === '') errors.push('الوصف يجب ان يكون موجود')
      if (buyingPrice <= 0) errors.push('سعر الشراء يجب ان يكون اكبر من 0')
      if (sellingPrice <= 0) errors.push('سعر البيع يجب ان يكون اكبر من 0')
      if (buyingPrice >= sellingPrice)
         errors.push('سعر البيع يجب ان يكون اكبر من سعر الشراء')

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

      handelEditSupply(supply?.id, {
         name,
         description,
         buyingPrice,
         sellingPrice,
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
               <Divider
                  sx={{
                     mb: '10px',
                  }}
                  variant="middle"
               >
                  <Chip
                     label={`تعديل الكمية`}
                     sx={{
                        fontSize: '1.2rem',
                     }}
                  />
               </Divider>

               <Box>
                  <Typography
                     sx={{
                        mb: '10px',
                        width: '100%',
                     }}
                  >
                     <Typography
                        variant="span"
                        component="span"
                        sx={{
                           width: '30%',
                           ml: '5%',
                        }}
                     >
                        الكمية المتوفرة: {supply.stock}
                     </Typography>
                     <Typography
                        variant="span"
                        component="span"
                        sx={{
                           width: '30%',
                           ml: '5%',
                        }}
                     >
                        سعر الشراء: {supply.buyingPrice}$
                     </Typography>
                     <Typography
                        variant="span"
                        component="span"
                        sx={{
                           width: '30%',
                        }}
                     >
                        سعر البيع: {supply.sellingPrice}$
                     </Typography>
                  </Typography>
                  <TextField
                     id="outlined-basic"
                     label="عدد"
                     variant="outlined"
                     type="number"
                     fullWidth
                     sx={{
                        mb: '10px',
                     }}
                     inputProps={{
                        min: 0,
                     }}
                     defaultValue={change}
                     onChange={(e) => setChange(Number(e.target.value))}
                  />

                  <Button
                     variant="outlined"
                     color="info"
                     type="button"
                     sx={{
                        width: '49%',
                        ml: '2%',
                        mb: '10px',
                        fontSize: '1.2rem',
                     }}
                     onClick={handelChangeStockAdd}
                  >
                     اضافة
                  </Button>
                  <Button
                     variant="outlined"
                     color="warning"
                     type="button"
                     sx={{
                        width: '49%',
                        mb: '10px',
                        fontSize: '1.2rem',
                     }}
                     onClick={handelChangeStockUse}
                  >
                     استخدام
                  </Button>
               </Box>

               <Divider
                  sx={{
                     mt: '20px',
                     //  mb: '10px',
                  }}
                  variant="middle"
               >
                  <Chip
                     label={`تعديل البيانات`}
                     sx={{
                        fontSize: '1.2rem',
                     }}
                  />
               </Divider>

               <Paper
                  elevation={4}
                  sx={{
                     p: '20px',
                     mb: '20px',
                  }}
               >
                  <Box
                     sx={{
                        mb: '10px',
                     }}
                  >
                     <form autoComplete="off" onSubmit={handelEditSupplySubmit}>
                        <TextField
                           label="الأسم"
                           defaultValue={supply.name}
                           onChange={(e) => setName(e.target.value)}
                           variant="outlined"
                           color="secondary"
                           type="text"
                           sx={{ mb: 3, mt: 3 }}
                           fullWidth
                           required
                           //value={email}
                           //error={emailError}
                        />
                        <TextField
                           label="الوصف"
                           defaultValue={supply.description}
                           onChange={(e) => setDescription(e.target.value)}
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
                           defaultValue={supply.buyingPrice}
                           onChange={(e) =>
                              setBuyingPrice(Number(e.target.value))
                           }
                           InputProps={{
                              endAdornment: (
                                 <InputAdornment position="end">
                                    $
                                 </InputAdornment>
                              ),
                              inputProps: { min: 0, step: 0.1 },
                              step: 0.01,
                           }}
                           type="number"
                           variant="outlined"
                           color="secondary"
                           sx={{
                              mb: 3,
                              width: '49%',
                              ml: '2%',
                              direction: 'ltr !important',
                           }}
                           required
                        />
                        <TextField
                           label="سعر البيع"
                           defaultValue={supply.sellingPrice}
                           onChange={(e) =>
                              setSellingPrice(Number(e.target.value))
                           }
                           InputProps={{
                              endAdornment: (
                                 <InputAdornment position="end">
                                    $
                                 </InputAdornment>
                              ),
                              inputProps: { min: 0, step: 0.1 },
                           }}
                           type="number"
                           variant="outlined"
                           color="secondary"
                           sx={{
                              mb: 3,
                              width: '49%',
                              // ml: '5%',
                              direction: 'ltr !important',
                           }}
                           required
                        />

                        <Button
                           variant="outlined"
                           color="secondary"
                           type="submit"
                           sx={{
                              width: '100%',
                              //   ml: '2%',
                           }}
                        >
                           حفظ
                        </Button>
                     </form>
                  </Box>
               </Paper>

               <Button
                  variant="contained"
                  color="error"
                  type="button"
                  onClick={onCloseClick}
                  fullWidth
               >
                  اغلاق
               </Button>
            </Box>
         </Fade>
      </Modal>
   )
}
