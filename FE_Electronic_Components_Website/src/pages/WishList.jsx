import {React} from 'react';

import WishListItiem from '../components/WishListItiem/WishListItiem'
import Footer from '../components//UI/Footer/index';


const  WishList = () => {
    return(
        <div style={{marginTop:'4.75rem'}}>
            <WishListItiem/>
            <Footer/>
        </div>
    );
}
export default WishList;