import { BsGithub, BsLink45Deg, BsTwitter } from 'react-icons/bs';
import { FaLinkedinIn } from 'react-icons/fa';
import { GrFacebookOption } from 'react-icons/gr';
import { FiGithub } from 'react-icons/fi';
export interface HomeFooterProps {}

export default function HomeFooter(props: HomeFooterProps) {
  return (
    <div className="w-full h-fit flex justify-center my-6">
      <div
        className="w-full mx-[80px] my-[10px] bg-[color:var(--primary-10)]
       text-white rounded-lg flex justify-center items-center py-[45px]"
      >
        <div className="max-w-[1170px] w-full h-fit">
          <div></div>
          <div className="py-3 border-b-[1px] border-b-white flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <p>Follow Us</p>
              <div className="w-[40px] h-[40px] rounded-full border border-white flex justify-center items-center hover:cursor-pointer transition-all hover:bg-[#9aaa97]">
                <GrFacebookOption size={20} />
              </div>
              <div className="w-[40px] h-[40px] rounded-full border border-white flex justify-center items-center hover:cursor-pointer transition-all hover:bg-[#9aaa97]">
                <FiGithub size={20} />
              </div>
              <div className="w-[40px] h-[40px] rounded-full border border-white flex justify-center items-center hover:cursor-pointer transition-all hover:bg-[#9aaa97]">
                <BsTwitter size={20} />
              </div>
              <div className="w-[40px] h-[40px] rounded-full border border-white flex justify-center items-center hover:cursor-pointer transition-all hover:bg-[#9aaa97]">
                <FaLinkedinIn size={20} />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <p>Web Link:</p>
              <BsLink45Deg />
              <a href="http://passgenix.com/">http://passgenix.com/</a>
            </div>
          </div>
          <p className="text-center py-4">copyright (c) LSS all rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
