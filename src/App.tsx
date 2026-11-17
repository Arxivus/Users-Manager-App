import { Route, Routes, BrowserRouter } from 'react-router-dom'
import UserInfo from './pages/UserInfo/UserInfo'
import Main from './pages/Main/Main'
import NotFound from './pages/NotFound/NotFound'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<Main />}/>
        <Route path={'/users/:id'} element={<UserInfo />}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
