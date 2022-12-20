import Link from 'next/link';
import Button from '../button/button.component';

const NavBar = () => {
	return (
		<div className='navbar__container w-full'>
			<nav className='max-w-7xl py-2 m-auto flex justify-between items-center px-5'>
				<div className='text-orange-400 font-bold text-2xl'>
					<Link href='/'>Logo</Link>
				</div>
				<div className='flex gap-10 text-orange-400 font-semibold'>
					<Link
						className='relative before:absolute before:h-[2px] before:top-full before:scale-0 hover:before:scale-100 before:transition-transform before:w-full before:bg-orange-400'
						href='/about'
					>
						About
					</Link>
					<Link
						className='relative before:absolute before:h-[2px] before:top-full before:scale-0 hover:before:scale-100 before:transition-transform before:w-full before:bg-orange-400'
						href='/products'
					>
						Products
					</Link>
					<Link
						className='relative before:absolute before:h-[2px] before:top-full before:scale-0 hover:before:scale-100 before:transition-transform before:w-full before:bg-orange-400'
						href='/'
					>
						Link
					</Link>
				</div>
				<div className='flex'>
					<div>Profile</div>
					<Link href='/register'>
						<Button type='button'>Sign up</Button>
					</Link>
				</div>
			</nav>
		</div>
	);
};
export default NavBar;
