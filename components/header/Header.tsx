import React from 'react';
import Link from 'next/link';
import './index.styl';

const Header: React.FC = () => (
	<div className="header-nav">
		<Link href="/">
			<a className="header-nav__item">Home</a>
		</Link>
		<Link href="/about">
			<a className="header-nav__item">About</a>
		</Link>
	</div>
);

export default Header;