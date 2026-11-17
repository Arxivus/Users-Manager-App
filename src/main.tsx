import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { UsersProvider } from './contexts/usersContext.tsx'

createRoot(document.getElementById('root')!).render(
    <UsersProvider>
        <App />
    </UsersProvider>
)
