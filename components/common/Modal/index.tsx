import clsx from 'clsx';
import { FC, ReactNode } from 'react';
import ReactModal from 'react-modal';
import { AiOutlineClose } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
import H2 from '@/components/common/Text/H2';
import H3 from '@/components/common/Text/H3';

interface IProps {
  isOpen: boolean;
  title: ReactNode;
  titleSize?: 'sm' | 'lg';
  description?: string;
  children: ReactNode;
  size?: 'sm' | 'lg' | 'xl';
  modalWidth?: string;
  disableOverflow?: boolean;
  disableClose?: boolean;
  onClose: () => void;
  titleClass?: string;
}

const Modal: FC<IProps> = ({
  isOpen,
  title,
  titleSize = 'sm',
  description,
  children,
  size = 'sm',
  modalWidth,
  disableOverflow,
  disableClose = true,
  onClose,
  titleClass,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      ariaHideApp={false}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick
      style={{
        overlay: {
          backgroundColor: 'rgba(0,0,0,0.75)',
          zIndex: 50,
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '90%',
          maxHeight: '95vh',
          paddingBottom: disableClose ? '20px' : 0,
          paddingTop: disableClose ? '20px' : 0,
          width: modalWidth ? modalWidth : size === 'sm' ? '30rem' : size === 'lg' ? '40rem' : '90%',
          overflow: !disableOverflow ? 'auto' : 'visible',
          borderRadius: '16px',
        },
      }}
    >
      <div
        className={clsx('flex justify-between items-center', {
          '': !description,
        })}
      >
        <H3>{title}</H3>
        {disableClose && (
          <button title="button" className="text-xl focus:outline-none" onClick={onClose}>
            <IoClose size={26} />
          </button>
        )}
      </div>
      {description && <div className="mt-2 mb-4 text-sm text-neutral-400">{description}</div>}
      <div className={clsx({ 'overflow-auto': !disableOverflow })}>{children}</div>
    </ReactModal>
  );
};

export default Modal;
