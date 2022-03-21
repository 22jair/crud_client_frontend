import Dashboard from './components/dashboard'
import { BrowserRouter } from "react-router-dom";
import Router from "./navigation/Router";
import { Provider } from 'react-redux'
import store from './store/store'

const ClientApp = () => {
  return (              
    <div className="app">
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard >
            <Router />
          </Dashboard>
        </BrowserRouter>
      </Provider> 
    </div>    
  )
}

export default ClientApp;