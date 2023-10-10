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
}) {
   const onCloseClick = (event, reason) => {
      if (reason === 'backdropClick') return
      handleClose()
   }

   const [change, setChange] = useLocalStorage(
      'EditSupplyModal_change_field',
      0
   )

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
               {/* <Typography
                  variant="h6"
                  component="h2"
                  align="center"
                  gutterBottom
               >
                 
               </Typography> */}
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

               {/* 2 buttom 1 for add stock and one for use stock */}

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
                     mb: '10px',
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
                        mb: '20px',
                     }}
                  >
                     <form autoComplete="off">
                        <TextField
                           label="الأسم"
                           defaultValue={supply.name}
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
                           defaultValue={supply.description}
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
                        />
                        <TextField
                           label="سعر البيع"
                           defaultValue={supply.sellingPrice}
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
                                 width: '100%',
                                 //   ml: '2%',
                              }}
                           >
                              حفظ
                           </Button>
                        </div>
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
