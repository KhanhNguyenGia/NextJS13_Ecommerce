'use client';

import { FC, HTMLAttributes } from 'react';

export interface IButtonProps extends HTMLAttributes<HTMLButtonElement> {
	variant?: 'transparent' | 'filled' | 'outlined';
	role?: 'primary' | 'secondary' | 'action';
	type: 'button' | 'submit';
	disabled?: boolean;
}

const BASE_VARIANT =
	'px-3 py-2 r rounded-lg font-semibold transition-all active:opacity-80 disabled:bg-gray-500 disabled:pointer-events-none disabled:select-none';

const BACKGROUND_VARIANTS = {
	primary: 'bg-orange-400',
	secondary: 'bg-yellow-500',
	action: 'bg-red-500',
};

const TEXT_VARIANTS = {
	primary: 'text-orange-400',
	secondary: 'text-yellow-500',
	action: 'text-red-500',
};

const HOVER_VARIANTS = {
	primary: 'hover:bg-orange-300',
	secondary: 'hover:bg-yellow-400',
	action: 'hover:bg-red-400',
};

const TransparentButton: FC<IButtonProps> = ({
	children,
	role = 'primary',
	disabled = false,
	className = '',
	...rest
}) => {
	return (
		<button
			className={`${BASE_VARIANT} ${TEXT_VARIANTS[role]} ${HOVER_VARIANTS[role]} hover:text-white ${className}`}
			disabled={disabled}
			{...rest}
		>
			{children}
		</button>
	);
};

const FilledButton: FC<IButtonProps> = ({
	children,
	role = 'primary',
	disabled = false,
	className = '',

	...rest
}) => {
	return (
		<button
			className={`${BASE_VARIANT} ${BACKGROUND_VARIANTS[role]} ${HOVER_VARIANTS[role]} text-white ${className}`}
			disabled={disabled}
			{...rest}
		>
			{children}
		</button>
	);
};

const OUTLINED_VARIANTS = {
	primary: 'border-orange-400 text-orange-400',
	secondary: 'border-yellow-500 text-yellow-500',
	action: 'border-red-500 text-red-500',
};

const OutlinedButton: FC<IButtonProps> = ({
	children,
	role = 'primary',
	disabled = false,
	className = '',
	...rest
}) => {
	return (
		<button
			className={`${BASE_VARIANT} ${OUTLINED_VARIANTS[role]} ${HOVER_VARIANTS[role]} border-2 hover:text-white ${className}`}
			disabled={disabled}
			{...rest}
		>
			{children}
		</button>
	);
};

const BUTTON_VARIANTS = {
	transparent: TransparentButton,
	filled: FilledButton,
	outlined: OutlinedButton,
};

const Button: FC<IButtonProps> = ({ children, variant = 'filled', role = 'primary', ...rest }) => {
	return BUTTON_VARIANTS[variant]({ children, role, ...rest });
};

export default Button;
