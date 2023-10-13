import {React} from 'react';
import classes from './WishListItiem.module.css'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AddButton from '../UI/Button/AddButton';
import Table from 'react-bootstrap/Table';
import {Link} from 'react-router-dom'
import { useState,useEffect } from 'react';
import api from '../../apiRequest/axios'
//import "bootstrap/dist/css/bootstrap.min.css";
import {ToastContainer, toast} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


const WishListItiem = () => {
    const token = localStorage.getItem('token')
    const quantity = {quantity: 1}
    const [wishLists,setWishLists] = useState([])
    const [value, setValue] = useState(1);
    const navigate = useNavigate();
  const getData = async() => {
    const res = await api.get("/wishlist",{
      headers:{
        access_token: token
      }
    })
    return res
  }
  
  console.log(wishLists.length)
  const handleAddToCart = async (id_item) => {
    api.post(`cart/add/${id_item}`,quantity,
    {
        headers: {
            access_token: token
        }
    })
    .then(function (res) {
        console.log(res)
        setValue(value + 1)
        toast.success('Thêm vào giỏ hàng thành công', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
      }); 
    })
    .catch(function (res) {
        console.log(res)
        toast.warn('Thao tác thất bại', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
      });
    });
  }
  const handleWishList = async (id_item) => {
    api.post(`wishlist/${id_item}`,{},
    {
        headers: {
            access_token: token
        }
    })
    .then(function (res) {
        console.log(res)
        setValue(value + 1)
        toast.success('Đã xoá khỏi danh sách yêu thích', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        }); 
    })
    .catch(function (res) {
        console.log(res)
        toast.warn('Thao tác thất bại', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    });
    }

    useEffect(() => {
    
        getData().then((res) => {
          setWishLists(res.data)
          
        })
        getData().catch((err) => {
          console.log(err)
        })
    },[value])
    return(
        <div>
            <div className={classes['main-content']}>
                <div style={{margin:'auto'}}>
                <h1 className='display-5  text-center align-baseline'>WishList</h1>
                <p className="text-center "><Link to='/' style={{color:'var(--grey-dark)'}}>Home</Link><ChevronRightIcon/>WishList</p>
                </div>
            </div>
            <div className='container'>
                <Table  //</div>className='table table-striped table-bordered table-hover align-middle'
                    striped bordered hover
                    style={{marginBottom:'6rem'}}
                > 
                    <tbody>
                        {wishLists.map((wishList =>{
                            return (
                                <tr key={wishList.id_item}>
                                    <td className={classes['column-image']}><Link to="product-detail/${wishList}" ><img src={wishList.image} alt="food image" width="90px" height="90px"></img></Link></td>
                                    <td className={classes['column-des']}>
                                        <div><p className={classes['name-itiem']} onClick={() => navigate(`/product-detail/${wishList.id_item}`)} >{wishList.name}</p></div>
                                        <div>Giá: {wishList.price}</div>
                                        <div>20-11-2021</div>
                                    </td>
                                    <td className='align-middle'>
                                        <AddButton onClick={() => handleAddToCart(wishList.id_item)}>Add To Card</AddButton>
                                        <AddButton onClick={() => handleWishList(wishList.id_item)}>Xoá khỏi danh sách</AddButton>
                                    </td>
                                </tr>
                            )
                        }))}
                    </tbody>
                </Table>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    )
};

export default WishListItiem