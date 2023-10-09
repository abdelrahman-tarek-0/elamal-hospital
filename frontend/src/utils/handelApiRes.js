import Swal from 'sweetalert2'

const handelApiData = (resData) => {
   if (resData?.status === 'fail') {
      let errors = resData?.data
         ?.map(
            (err) =>
               `<span style='color:red'>${err?.msg} <br/></span>`
         )
         .join('\n') || ''

      Swal.fire({
         icon: 'warning',
         title: 'تحذير',
         html: `
            <h3 style="margin-bottom:20px">${resData?.message}</h3>
            ${errors}
         `,
      })
      return null
   }

   if (resData?.status === 'error') {
      let errors = resData?.data
      ?.map(
         (err) =>
            `<span style='color:red'>${err?.msg} <br/></span>`
      )
      .join('\n') || ''

      Swal.fire({
         icon: 'error',
         title: 'خطأ',
         html: `
            <h3 style="margin-bottom:20px">${resData?.message}</h3>
            ${errors}
         `,
      })
      return null
   }

   if (resData?.status !== 'success') {
      let errors = resData?.data
      ?.map(
         (err) =>
            `<span style='color:red'>${err?.msg} <br/></span>`
      )
      .join('\n') || ''

      Swal.fire({
         icon: 'error',
         title: 'خطأ',
         html: `
            <h3 style="margin-bottom:20px">${resData?.message}</h3>
            ${errors}
         `,
      })
      return null
   }

   return resData
}

export default handelApiData
