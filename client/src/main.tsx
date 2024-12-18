import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { store ,persistor} from './redux/state/store.tsx';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
      <Toaster/>
    </Provider>
  </StrictMode>,
)
