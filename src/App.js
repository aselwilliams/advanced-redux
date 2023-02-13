import { useSelector, useDispatch } from 'react-redux';
import {useEffect, Fragment} from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { uiActions } from './store/ui-slice';
import Notification from './components/UI/Notification';
import { sendCartData, fetchCartData } from './store/cart-actions';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible );
  const cart = useSelector(state => state.cart)
  const notification = useSelector(state => state.ui.notification);

  useEffect(()=> {
    dispatch(fetchCartData)
  }, [dispatch])

  useEffect(()=> {
    if(isInitial) {
      isInitial = false;
      return;
    }
    if(cart.changed) {
      dispatch(sendCartData(cart))
    }
  }, [cart, dispatch])

  return (
    <Fragment>
      {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;

//one option to keep this logic in comp instead of slice
  // useEffect(()=> {
  //   const sendCartData = async()=> {
  //     dispatch(
  //       uiActions.showNotification({
  //         status: 'pending',
  //         title: 'Sending...',
  //         message: 'Sending cart data!'
  //       })
  //     )
  
      // const res = await fetch('https://advanced-redux-8e805-default-rtdb.firebaseio.com/cart.json', {
      //   method: 'PUT',
      //   body: JSON.stringify(cart),
      // })
      // if(!res.ok){
      //   throw new Error('Sending cart data failed.')
      // }
      // dispatch(
      //   uiActions.showNotification({
      //     status: 'success',
      //     title: 'Success!',
      //     message: 'Sent cart data successfully!'
      //   })
      // )
  //   }

  //   if (isInitial) {
  //     isInitial = false;
  //     return;
  //   }
  //   sendCartData().catch(err=> {
  //     dispatch(
  //       uiActions.showNotification({
  //         status: 'error',
  //         title: 'Error!',
  //         message: 'Sending cart data failed!'
  //       })
  //     )
  //   })
   
  // },[cart, dispatch]);