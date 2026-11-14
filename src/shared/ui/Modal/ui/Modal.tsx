import { ReactNode, useLayoutEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '../../Button';
import s from './Modal.module.css';

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
	className?: string;
};

export const Modal = ({ isOpen, onClose, children, className }: ModalProps) => {
	const closeButtonRef = useRef<HTMLButtonElement>(null);

	useLayoutEffect(() => {
		if (!isOpen) {
			return;
		}

		const triggerElement = document.activeElement as HTMLElement | null;
		closeButtonRef.current?.focus();

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			if (triggerElement?.isConnected) {
				triggerElement.focus();
			}
		};
	}, [isOpen, onClose]);

	if (!isOpen) {
		return null;
	}

	const modalRoot = document.getElementById('modal-root');
	if (!modalRoot) {
		throw new Error('Modal root element "#modal-root" was not found.');
	}

	return createPortal(
		<div className={s.overlay}>
			<Button
				className={s.backdrop}
				type='button'
				tabIndex={-1}
				aria-label='Close modal'
				onClick={onClose}
			/>
			<div
				className={[s.modal, className].filter(Boolean).join(' ')}
				role='dialog'
				aria-modal='true'>
				<Button
					ref={closeButtonRef}
					className={s.closeButton}
					type='button'
					aria-label='Close modal'
					onClick={onClose}>
					<svg aria-hidden='true' viewBox='0 0 24 24' width='24' height='24'>
						<path d='M18 6 6 18M6 6l12 12' />
					</svg>
				</Button>
				{children}
			</div>
		</div>,
		modalRoot
	);
};
