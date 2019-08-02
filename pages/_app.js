import App, { Container } from 'next/app';
import React from 'react';
import withReduxStore from 'store/configureStore';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
	@import url(‘https://fonts.googleapis.com/css?family=Roboto');
	body {
		padding: 0;
		margin: 0;
		font-family: Roboto, sans-serif;
	}

	*,
	*::before,
	*::after {
	box-sizing: border-box;
	}
`;

const theme = {
	colors: {
		red: 'red'
	}
}

class MyApp extends App {
	render () {
		const { Component, pageProps, reduxStore } = this.props;
		return (
			<Container>
				<Normalize />
				<GlobalStyles />
				<ThemeProvider theme={theme}>
					<Provider store={reduxStore}>
						<Component {...pageProps} />
					</Provider>
				</ThemeProvider>
			</Container>
		)
	}
}

export default withReduxStore(MyApp);
