import React from 'react';
import { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Home from './Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Checkout from './Checkout';
import Login from './Login';
import Payment from './Payment';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useStateValue } from './StateProvider';
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

const promise = loadStripe('pk_test_51NE8FrSJufYFsZRGr2Yn59gABUUP0yDy92Te9Dny56IpCQ7vhOVdogaSTW4uLv3OHKrSbPp4a7jZW6ats6cp0GFj00WGTA323D');

function App() {
  const [{ }, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when app components are loaded

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      console.log('THE USER IS >>>', user);
      if (user) {
        // User is signed in, see docs for a list of available properties
        //const uid = user.uid;
        dispatch({
          type: 'SET_USER',
          user: user
        })
      } else {
        // User is signed out
        dispatch({
          type: 'SET_USER',
          user: null
        })
      }
    });

  }, []);

  return (
    // BEM Convention
    <Router>
      <div className="app">
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/checkout" element={<Component2 />} />
          <Route exact path="/payment" element={<Component3 />} />
          <Route exact path="/" element={<MainComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

const MainComponent = () => (
  <>
    <Header />
    <Home />
  </>
);
const Component2 = () => (
  <>
    <Header />
    <Checkout />
  </>
);
const Component3 = () => (
  <>
    <Header />
    <Elements stripe={promise}>
      <Payment />
    </Elements>
    
  </>
);
export default App;
