import { Link } from '@mui/material'

export const AdminFooter = () => {
  return (
    <div className='AdminFooter'>
      <Link href='tel:+79490000000' color='inherit'>
        +7(949)000-00-00
      </Link>
      <Link
        href='https://politiquedeconfidentialite.web.app/privacypolicy.pdf'
        color='inherit'
      >
        Privacy Policy
      </Link>
      <Link
        href='https://d1c2gz5q23tkk0.cloudfront.net/assets/uploads/2895795/asset/Example_Terms_of_Use.pdf?1580728293'
        color='inherit'
      >
        Terms of Use
      </Link>
    </div>
  )
}
