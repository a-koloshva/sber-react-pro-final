import { ButtonHTMLAttributes, forwardRef } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(props, ref) => {
		return <button ref={ref} {...props} />;
	}
);

Button.displayName = 'Button';
