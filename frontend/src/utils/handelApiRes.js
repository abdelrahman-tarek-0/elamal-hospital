import Swal from 'sweetalert2'

const handelApiData = (resData) => {
   if (resData?.status === 'fail') {
      Swal.fire({
         icon: 'warning',
         title: 'تحذير',
         text: `${resData?.message}`,
      })
      return null
   }

   if (resData?.status === 'error') {
      Swal.fire({
         icon: 'error',
         title: 'خطأ',
         text: `${resData?.message}`,
      })
      return null
   }

   if (resData?.status !== 'success') {
      Swal.fire({
         icon: 'error',
         title: 'خطأ',
         text: `${resData?.message}`,
      })
      return null
   }

   if (resData.statusCode >= 400 && resData.statusCode < 500) {
      Swal.fire({
         icon: 'warning',
         title: 'تحذير',
         text: `${resData?.message}`,
      })
      return null
   }

   if (resData.statusCode >= 500) {
      Swal.fire({
         icon: 'error',
         title: 'خطأ',
         text: `${resData?.message}`,
      })
      return null
   }

   return resData
}

export default handelApiData
