import Link from "next/link"

const Footer = () => {
  return (
    <footer className="bg-gray-900 mt-[64px]">

      <div className="container-footer-1 bg-[#a31d1d] pb-[12px] w-full">
        <ul className="lg:flex lg:mx-[302.500px] lg:px-[20px] lg:pb-[30px] xl:gap-[180px] md:gap-[80px]">
          <li className="list-none">
            <p className="px-[16px] mt-[12px] text-[14px] font-semibold leading-[48px] text-[#ecdcbf]">For Travels</p>
            <Link
              href="#"
              className="block pl-[40px] lg:pl-[15px] leading-[23px] mb-[15px] text-[#F7F8FA] text-[14px]"
            >
              Booking
            </Link>
            <Link
              href="#"
              className="block pl-[40px] lg:pl-[15px] leading-[23px] mb-[15px] text-[#F7F8FA] text-[14px]"
            >
              Terms & Conditions
            </Link>
            <Link
              href="#"
              className="block pl-[40px] lg:pl-[15px] leading-[23px] mb-[15px] text-[#F7F8FA] text-[14px]"
            >
              Deals
            </Link>
            <Link
              href="#"
              className="block pl-[40px] lg:pl-[15px] leading-[23px] mb-[15px] text-[#F7F8FA] text-[14px]"
            >
              FAQ
            </Link>
            <Link
              href="#"
              className="block pl-[40px] lg:pl-[15px] leading-[23px] mb-[15px] text-[#F7F8FA] text-[14px]"
            >
              Rewards
            </Link>
          </li>
          
          <li className="list-none">
            <p className="px-[16px] mt-[12px] text-[14px] font-semibold leading-[48px] text-[#ecdcbf] ">
              More
            </p>
            <Link
              href="/about"
              className="block pl-[40px] lg:pl-[15px] leading-[23px] mb-[15px] text-[#F7F8FA] text-[14px]"
            >
              About Travelins
            </Link>
            <Link
              href="#"
              className="block pl-[40px] lg:pl-[15px] leading-[23px] mb-[15px] text-[#F7F8FA] text-[14px]"
            >
              Contact Us
            </Link>
            <Link
              href="#"
              className="block pl-[40px] lg:pl-[15px] leading-[23px] mb-[15px] text-[#F7F8FA] text-[14px]"
            >
              Careers
            </Link>
            
          </li>
          <li className="list-none">
            <p className="px-[16px] mt-[12px] text-[14px] font-semibold leading-[48px] text-[#a31d1d] ">
              Download our App
            </p>
            <Link href="#" className="block pl-[40px] leading-[23px] mb-[15px] ">
              <img
                src="https://static.chope.co/static/mainwebsite5.0/images/ios-footer.svg?date=20250617"
                alt="appstore"
                className="h-[47px]"
                aria-label="Download on the App Store"
              />
            </Link>
            <Link href="#" className="block pl-[40px] leading-[23px] mb-[15px] ">
              <img
                src="https://static.chope.co/static/mainwebsite5.0/images/android-footer.svg?date=20250617"
                alt="googleplay"
                className="h-[47px] max-w-[140px]"
                aria-label="Get it on Google Play"
              />
            </Link>
            <Link href="#" className="block pl-[40px] leading-[23px] mb-[15px]">
              <img
                src="https://static.chope.co/static/mainwebsite5.0/images/huawei-footer-dark.svg?date=20250617"
                alt="appgalery"
                className="h-[47px] max-w-[140px]"
                aria-label="Download on Huawei AppGallery"
              />
            </Link>
          </li>
        </ul>
      </div>
      {/* Footer 2 Mobile */}
      <div className="container-footer-2 bg-[#efefef] mt-[-1px] pb-[24px]">
        <div className="px-[16px] pt-[24px] lg:mx-[302.500px]">
          <div className="lg:hidden">
            <div>
              <span className=" text-[14px]">Follow Us</span>
              <Link href="https://www.facebook.com" aria-label="Facebook">
                <img
                  src="/images/facebook.png"
                  alt="facebook"
                  className="inline max-w-[30px] max-h-[30px] ml-[16px]"
                />
              </Link>
              <Link href="https://instagram.com" aria-label="Instagram">
                <img
                  src="/images/instagram.png"
                  alt="instagram"
                  className="inline max-w-[30px] max-h-[30px] ml-[16px]"
                />
              </Link>
              <Link href="https://linkedin.com" aria-label="linkedin">
                <img
                  src="/images/linkedin.png"
                  alt="linkedin"
                  className="inline max-w-[30px] max-h-[30px] ml-[16px]"
                />
              </Link>
              <Link href="https://tiktok.com" aria-label="tiktok">
                <img
                  src="/images/tiktok.png"
                  alt="tiktok"
                  className="inline max-w-[30px] max-h-[30px] ml-[16px]"
                />
              </Link>
            </div>

            <div className=" text-[14px] pt-[16px] mb-2">
              &copy; 2025
              All Rights Reserved
            </div>
          </div>

{/* Footer 2 Dekstop */}
          <div className="hidden lg:block">
            <div className="lg:flex gap-[10px] h-[50px]  items-center">
              <div className=" text-[14px]">
                &copy; 2025 All Rights Reserved Follow Us
              </div>

             
              <Link href="" >
                <img
                  src="/images/facebook.png"
                  alt="facebook"
                  className=" max-w-[30px] max-h-[30px] ml-[16px] "
                />
              </Link>
              <Link href="">
                <img
                  src="/images/instagram.png"
                  alt="instagram"
                  className="inline max-w-[30px] max-h-[30px] ml-[16px]"
                />
              </Link>
              <Link href="">
                <img
                  src="/images/linkedin.png"
                  alt="linkedin"
                  className="inline max-w-[30px] max-h-[30px] ml-[16px]"
                />
              </Link>
              <Link href="">
                <img
                  src="/images/tiktok.png"
                  alt=""
                  className="inline max-w-[30px] max-h-[30px] ml-[16px]"
                />
              </Link>
            </div>
          </div>

          <div className=" text-[11px]">
            <p className="pb-[8px]">Customer Support Contact</p>
            <span>
              For Customer Support please fill in <a href="###" className="text-[#1565C0]">Contact Form</a> or email support.id@Travelins.co.
            </span>
          </div>

          <br/>

          <div className="text-[11px]">
            <p className="pb-[8px]">
              Service Contact Information for Consumer Complaints
            </p>
            <span className="block">
              Direktorat Jenderal Perlindungan Konsumen dan Tertib Niaga,
              Kementerian Perdagangan, Republik Indonesia
            </span>
            <span>Whatsapp Ditjen PKTN: 0853-1111-1010</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer