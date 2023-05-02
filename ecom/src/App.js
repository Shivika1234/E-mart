import logo from './logo.svg';
import './App.css';
import Home from './Cart/Home';
import Cart from './Cart/cart';
import {CartProvider} from 'react-use-cart'
import  Headers from './Headers'
import {Routes ,Route} from 'react-router-dom'
import PaymentSuccess from './Cart/PaymentSuccess';
function App() {
  return (
    <div >
<Headers/>
      <CartProvider>
      <Routes>
     
        <Route path='/' element={   <Home/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        </Routes>
      </CartProvider>
    </div>
  );
}

export default App;
