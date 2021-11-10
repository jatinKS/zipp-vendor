import React from 'react';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Main from './Main';
import { store } from './app/store'
import { Provider as StoreProvider } from 'react-redux'

const theme = {
        ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'blue',
        accent: 'yellow',
        background: '#eaeaea',
        surface: '#fff',
        text: '#333333'
    },
};

export default function App() {
	return (
        <StoreProvider store={store}>
            <PaperProvider theme={theme}>
                <Main />
            </PaperProvider>
        </StoreProvider>
	);
}