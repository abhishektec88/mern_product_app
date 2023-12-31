import { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../Context/AuthProvider'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import './style.scss'
import { setProduct, setTotal } from '../../Slicer/productSlice'
import { useMemo } from 'react'
import { useCallback } from 'react';

const Product = () => {
  const [productSort, setProductSort] = useState()

  const dispatch = useDispatch()
  const products = useSelector((state) => state.productApi)

  const { auth } = useContext(AuthContext)

  const getProduct = async () => {
    const url = "http://localhost:9999/api/product"
    const res = await axios.post(url, auth)
    dispatch(setProduct(res.data));
  }

  const getTotal = async () => {
    const url = "http://localhost:9999/api/total"
    const res = await axios.post(url, auth)
    dispatch(setTotal(res.data));
  }

  

  const sortProduct = useMemo(() => {
    return [...products?.product].sort((a,b) => b[productSort] - a[productSort])
  }, [productSort])


    const ProductSorting = useCallback(() => {
      dispatch(setProduct(sortProduct));
    }, [sortProduct, productSort])

    useEffect(() => {
      getProduct();
      getTotal();
    }, [])

    useEffect(() => {
      ProductSorting()
    }, [productSort, sortProduct])

  return (
    <>
    <div className='search_panel'>
        <Autocomplete
          disablePortal
          className='search_slection'
          id="combo-box-demo"
          onInputChange={(e, f) => setProductSort(f)}
          options={[{ label: 'price', value: 'price' },
          { label: 'name', value: 'name' }]}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="sort" />}
        />
      </div>
      <div className="listing-section">
        {products?.product.map(({ 
          name, price, description
        }) => {
          return (
            <div className="product">
              <div className="image-box">
                <img style={{ height: '200px' }} alt='sjsjj' src="data:image/jpeg;base64,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" />
              </div>
              <div className="text-box">
                <h2 className="item">{name}</h2>
                <h3 className="price">Rs. {price}</h3>
                <p className="description">{description}</p>
                {/* <label >Quantity:</label>
                <input onChange={(e) => setProductQnty(e.target.value)} type="text" name="item-1-quantity" id="item-1-quantity" value={productQnty} />
                <button onClick={() => addToCart({ qty: productQnty, productId: _id, userId: userInfo.id })} type="button" name="item-1-button" id="item-1-button">Add to Cart</button> */}
              </div>
            </div>
          );
        })}
      </div>
    </>
  )
}

export default Product
