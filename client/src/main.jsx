import React from 'react';
import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from './state/api';
import globalReducer from './state';
import App from './App';
import { ToastContainer } from 'react-toastify';
import './index.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';
import './components/DataGrid/DataGridToolbar.css';
import './components/Navbar/Navbar.css';
import './components/Sidebar/Sidebar.css';
import './scenes/Administrators/Administrators.css';
import './scenes/AffiliateMetrics/AffiliateMetrics.css';
import './scenes/CustomerDirectory/CustomerDirectory.css';
import './scenes/DailyAnalytics/DailyAnalytics.css';
import './scenes/Dashboard/Dashboard.css';
import './scenes/Demographics/Demographics.css';
import './scenes/Distribution/Distribution.css';
import './scenes/Layout/Layout.css';
import './scenes/MonthlyAnalytics/MonthlyAnalytics.css';
import './scenes/Overview/Overview.css';
import './scenes/ProductCatalogue/ProductCatalogue.css';
import './scenes/TransactionLedger/TransactionLedger.css';
import './scenes/NotFound/NotFound.css';

// Configure Redux store
const store = configureStore({
    reducer: {
        global: globalReducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);

// Render the application
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ToastContainer
                position="bottom-left"
                autoClose={3000}
                limit={3}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition: Slide
            />
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
