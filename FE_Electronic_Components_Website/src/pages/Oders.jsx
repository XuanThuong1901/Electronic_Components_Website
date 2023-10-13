import {React} from 'react';
import Footer from '../components//UI/Footer/index';
import ListOders from '../components/ListOrders/ListOrder';

const  Oders = () => {
    return(
        <div style={{marginTop:'4.75rem'}}>
            <ListOders/>
            <Footer/>
        </div>
    );
}
export default Oders;