import React, { useEffect, useState } from 'react';
import Banner from './banner';
import PersonalInfo from './personalInfo';
import Sidebar from './sideBar';
import MainProfile from './mainProfile';
import AdditionalInfo from './additionInfo';
import ButtonIcon from '@/components/common/ButtonIcon';
import { MdModeEditOutline } from 'react-icons/md';
import { HiOutlineTrash } from 'react-icons/hi';
import ModalCommon from '@/components/common/ModalCommon/ModalCommon';
import { MODAL_TYPE } from '@/components/pageComponents/profile/enums/modal-type.enum';
import { useDispatch } from 'react-redux';
import { getProfile, selectProfile } from '@/stores/slices/profile/profileSlice';
import { IUserProfile } from '@/stores/slices/profile/interface';
import Loading from '@/components/common/Loading';

export interface IModal {
  isOpen: boolean;
  type: MODAL_TYPE | null;
}

export interface ProfileProps {}

export default function Profile(props: ProfileProps) {
  const dispatch = useDispatch();
  const [modal, setModal] = React.useState<IModal>({
    isOpen: false,
    type: null,
  });
  const [isShowMore, setIsShowMore] = useState<number[]>([]);

  const profile: IUserProfile = selectProfile()!;

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  if (!profile) return <Loading />;
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1050px] px-4 py-8 space-y-8">
        <Banner />
        <div className="w-full h-fit rounded-2xl border flex flex-col justify-between">
          <PersonalInfo setModal={setModal} profile={profile} />
          <div className="flex">
            <Sidebar setModal={setModal} profile={profile} />
            <MainProfile setModal={setModal} profile={profile} />
          </div>
        </div>
        <div className="space-y-8">
          <AdditionalInfo title="Testimonials" subTitle="Endorsements from past clients">
            <div className="space-y-1">
              <p className="text-center">Showcasing client testimonials can strengthen your profile. (+5%)</p>
              <p className="text-center font-semibold text-[color:var(--primary-8)] hover:cursor-pointer">Request a testimonial</p>
            </div>
          </AdditionalInfo>
          <AdditionalInfo title="Certifications">
            <div>
              <p className="text-center text-sm">Listing your certifications can help prove your specific knowledge or abilities. (+10%)</p>
              <p className="text-center text-sm">You can add them manually or import them from Credly</p>
              <div className="space-x-20 flex justify-center mt-1">
                <p className="text-center font-semibold text-[color:var(--primary-8)] hover:cursor-pointer">Add manually</p>
                <p className="text-center font-semibold text-[color:var(--primary-8)] hover:cursor-pointer">Import from Credly</p>
              </div>
            </div>
          </AdditionalInfo>
          <AdditionalInfo title="Employment history">
            <div>
              <div className="py-6 border-b-[1px] border-[color:var(--gray-5)]">
                <div className="flex justify-between mb-2">
                  <h6 className="font-semibold ">Developer | LSSvietnam</h6>
                  <div className="space-x-4">
                    <ButtonIcon icon={<MdModeEditOutline size={21} />} />
                    <ButtonIcon icon={<HiOutlineTrash size={21} />} />
                  </div>
                </div>
                <div className="whitespace-pre-wrap">
                  <p className="text-[color:var(--gray-7)]">August 2022 - February 2023</p>
                  <p className={`whitespace-pre-wrap ${!isShowMore.find((item) => item === 1) && 'truncate-4'}`}>
                    - Project: EB-POS
                    <br />
                    + Member : 3 member (2 front-end, 1 back-end)
                    <br />
                    + Description : a website for booking and managing airline tickets
                    <br />
                    for agents and other stakeholders.
                    <br />
                    + Technology :<br />
                    -Front-end: ReactJS, Typescript, ReduxToolkit, React-query
                    <br />
                    TailwinCSS, Redux-saga, Formik,Yup
                    <br />
                    -Back-end: NestJS
                    <br />
                    + Responsibility :<br />
                    - Chooses and decides the technology for the front-end.
                    <br />
                    - Code
                    <br />
                    - Code half of the interface and all of the logic for the front-end
                    <br />
                    - Fix bug
                    <br />
                  </p>
                  <div
                    className="hover:cursor-pointer text-[color:var(--primary-7)] font-semibold"
                    onClick={() => {
                      isShowMore.find((item) => item === 1)
                        ? setIsShowMore(isShowMore.filter((item) => item !== 1))
                        : setIsShowMore([...isShowMore, 1]);
                    }}
                  >
                    {isShowMore.find((item) => item === 1) ? 'less' : 'more'}
                  </div>
                </div>
              </div>
              <div className="py-6 border-b-[1px] border-[color:var(--gray-5)]">
                <div className="flex justify-between mb-2">
                  <h6 className="font-semibold ">Developer | LSSvietnam</h6>
                  <div className="space-x-4">
                    <ButtonIcon icon={<MdModeEditOutline size={21} />} />
                    <ButtonIcon icon={<HiOutlineTrash size={21} />} />
                  </div>
                </div>
                <div className="whitespace-pre-wrap">
                  <p className="text-[color:var(--gray-7)]">August 2022 - February 2023</p>
                  <p className={`whitespace-pre-wrap ${!isShowMore.find((item) => item === 2) && 'truncate-4'}`}>
                    - Project: EB-POS
                    <br />
                    + Member : 3 member (2 front-end, 1 back-end)
                    <br />
                    + Description : a website for booking and managing airline tickets
                    <br />
                    for agents and other stakeholders.
                    <br />
                    + Technology :<br />
                    -Front-end: ReactJS, Typescript, ReduxToolkit, React-query
                    <br />
                    TailwinCSS, Redux-saga, Formik,Yup
                    <br />
                    -Back-end: NestJS
                    <br />
                    + Responsibility :<br />
                    - Chooses and decides the technology for the front-end.
                    <br />
                    - Code
                    <br />
                    - Code half of the interface and all of the logic for the front-end
                    <br />
                    - Fix bug
                    <br />
                  </p>
                  <div
                    className="hover:cursor-pointer text-[color:var(--primary-7)] font-semibold"
                    onClick={() => {
                      isShowMore.find((item) => item === 2)
                        ? setIsShowMore(isShowMore.filter((item) => item !== 2))
                        : setIsShowMore([...isShowMore, 2]);
                    }}
                  >
                    {isShowMore.find((item) => item === 2) ? 'less' : 'more'}
                  </div>
                </div>
              </div>
              <div className="py-6">
                <div className="flex justify-between mb-2">
                  <h6 className="font-semibold ">Developer | LSSvietnam</h6>
                  <div className="space-x-4">
                    <ButtonIcon icon={<MdModeEditOutline size={21} />} />
                    <ButtonIcon icon={<HiOutlineTrash size={21} />} />
                  </div>
                </div>
                <div className="whitespace-pre-wrap">
                  <p className="text-[color:var(--gray-7)]">August 2022 - February 2023</p>
                  <p className={`whitespace-pre-wrap ${!isShowMore.find((item) => item === 3) && 'truncate-4'}`}>
                    - Project: EB-POS
                    <br />
                    + Member : 3 member (2 front-end, 1 back-end)
                    <br />
                    + Description : a website for booking and managing airline tickets
                    <br />
                    for agents and other stakeholders.
                    <br />
                    + Technology :<br />
                    -Front-end: ReactJS, Typescript, ReduxToolkit, React-query
                    <br />
                    TailwinCSS, Redux-saga, Formik,Yup
                    <br />
                    -Back-end: NestJS
                    <br />
                    + Responsibility :<br />
                    - Chooses and decides the technology for the front-end.
                    <br />
                    - Code
                    <br />
                    - Code half of the interface and all of the logic for the front-end
                    <br />
                    - Fix bug
                    <br />
                  </p>
                  <div
                    className="hover:cursor-pointer text-[color:var(--primary-7)] font-semibold"
                    onClick={() => {
                      isShowMore.find((item) => item === 3)
                        ? setIsShowMore(isShowMore.filter((item) => item !== 3))
                        : setIsShowMore([...isShowMore, 3]);
                    }}
                  >
                    {isShowMore.find((item) => item === 3) ? 'less' : 'more'}
                  </div>
                </div>
              </div>
            </div>
          </AdditionalInfo>
          <AdditionalInfo title="Other Experiences">
            <div className="space-y-1">
              <p className="text-center">Highlighting relevant experiences can boost your visibility in our search results. (+5%)</p>
              <p className="text-center font-semibold text-[color:var(--primary-8)] hover:cursor-pointer">Add an experience</p>
            </div>
          </AdditionalInfo>
        </div>
      </div>

      <ModalCommon modal={modal} setModal={setModal} profile={profile} />
    </div>
  );
}
