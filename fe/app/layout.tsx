import NavBar from '@components/navbar/navbar.component';

import '../styles/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html>
			<head />
			<body>
				<NavBar />
				{children}
			</body>
		</html>
	);
}
