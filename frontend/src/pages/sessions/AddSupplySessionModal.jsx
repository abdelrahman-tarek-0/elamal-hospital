import Modal from '@mui/material/Modal'
import * as React from 'react'
import Box from '@mui/material/Box'
import { Button, TextField } from '@mui/material'

import Fade from '@mui/material/Fade'
import Swal from 'sweetalert2'
import Select from '@mui/material/Select'

import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'

import useLocalStorage from '../../hooks/useLocalStorage'

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

export default function AddSupplySessionModal({
   open,
   handleClose,
   session,
   handelAddSupply,
}) {
   const onCloseClick = (event, reason) => {
      handleClose()
   }

   const [supplies, setSupplies] = React.useState([])
   const [supplyId, setSupplyId] = React.useState(null)

   React.useEffect(() => {
      const sup = JSON.parse(localStorage.getItem('supplies'))
      const sessionSupplies = session?.Supplies

      const filteredSupplies = sup.filter((s) => {
         const isExist = sessionSupplies?.find((ss) => ss.id === s.id)
         return !isExist
      })

      setSupplies(filteredSupplies)
      setSupplyId(null)
   }, [session])


   const [quantity, setQuantity] = useLocalStorage(
      'AddSupplySession_Field_Quantity',
      ''
   )

   const handleSubmit = (e) => {
      e.preventDefault()
      console.log('suup',supplyId)

      const errors = []

      if (supplyId === '' || !supplyId) errors.push('يجب اختيار المستلزم')
      if (Number(quantity) <= 0) errors.push('الكمية يجب ان تكون اكبر من 0')

      if (errors.length > 0) {
         return Swal.fire({
            icon: 'error',
            title: 'خطأ',
            html: `
               <ul style="text-align: right; direction: rtl;">
                  ${errors
                     ?.map(
                        (err) =>
                           `<li style="border-bottom: 2px solid red; margin:2px; padding:5px; color:red;">${err}</li>`
                     )
                     .join('')}
               </ul>
            `,
         })
      }

      handelAddSupply(session?.id, supplyId, Number(quantity))
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
                     <h2>اضافة مستلزم للجلسة</h2>

                     <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={supplyId}
                        label="المستلزم"
                        onChange={(e) => setSupplyId(e.target.value)}
                        sx={{
                           width: '100%',
                           marginBottom: '20px',
                           marginTop: '20px',
                        }}
                     >
                        {supplies?.map((s, i) => (
                           <MenuItem value={s.id} key={i}>
                              {s.name}
                           </MenuItem>
                        ))}
                     </Select>

                     <TextField
                        label="الكمية"
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        defaultValue={quantity}
                        InputProps={{
                           inputProps: { min: 0 },
                        }}
                        type="number"
                        variant="outlined"
                        color="secondary"
                        sx={{
                           width: '100%',
                           marginBottom: '20px',
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
