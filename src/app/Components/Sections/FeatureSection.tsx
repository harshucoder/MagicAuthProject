import React from 'react'
import Cards from '../UI/Cards'

const FeatureSection = () => {
  return (
    <div className='bg-[#0B0121] w-full h-auto flex items-center justify-center  gap-8'>
        <div className="cards flex flex-wrap gap-8 justify-center mt-5">
            <Cards
               icon="/locked.png"
               Heading='Passwordless Login'
               description='One-click sign-in experience for your users. Say goodbye to password resets, forgotten credentials, and login frustration. MagicAuth makes login as simple as clicking a link in your inbox — ultra secure, zero hassle. Great for user retention and conversion'
            />
            <Cards
               icon="/time.png"
               Heading='Quick Integration'
               description='One-click sign-in experience for your users. Say goodbye to password resets, forgotten credentials, and login frustration. MagicAuth makes login as simple as clicking a link in your inbox — ultra secure, zero hassle. Great for user retention and conversion'
            />
            <Cards
               icon="/database.png"
               Heading='Bring Your own Database'
               description='One-click sign-in experience for your users. Say goodbye to password resets, forgotten credentials, and login frustration. MagicAuth makes login as simple as clicking a link in your inbox — ultra secure, zero hassle. Great for user retention and conversion'
            />
            <Cards
               icon="/mail.png"
               Heading='Custom SMTP'
               description='One-click sign-in experience for your users. Say goodbye to password resets, forgotten credentials, and login frustration. MagicAuth makes login as simple as clicking a link in your inbox — ultra secure, zero hassle. Great for user retention and conversion'
            />
        </div>
    </div>
  )
}

export default FeatureSection