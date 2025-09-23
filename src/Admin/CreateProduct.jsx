import React, { useEffect } from 'react'
import '../AdminStyles/CreateProduct.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Pagetitle from '../components/Pagetitle'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct, removeErrors, removeSuccess } from '../features/Admin/adminSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const CreateProduct = () => {
    const {success, error, products, loading} = useSelector(state=>state.admin)
    const  dispatch = useDispatch();
    const navigate = useNavigate()
    const [name, setName] = useState('');
    const [price, setPrice] = useState( "");
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState('');
    const [category, setCategory] = useState('');
    const [images, setImages] = useState([])
    const [imagePreview, setImagePreview] = useState([])

    const categories = ['glass', 'shirt', 'movies', 'tv', 'laptop', 'mobilephone']

    const createProductSubmit = (e)=>{
      e.preventDefault()
      const myForm = new FormData();
      myForm.set('name', name)
      myForm.set('price', Number(price))
      myForm.set('description', description)
      myForm.set('stock', Number(stock))
      myForm.set('category', category)
      images.forEach((img)=>{
        myForm.append('images', img)
      })

      dispatch(createProduct(myForm))
    }

    const createProductImage = (e)=>{
      const files = Array.from(e.target.files);
      
      setImages([])
      setImagePreview([])

      files.forEach(file=>{
        setImages(old=>[...old, file])
        setImagePreview(old=>[...old, URL.createObjectURL(file)])
      })
    }

    useEffect(()=>{
      if(success){
        toast.success(success, {autoClose:2000})
        dispatch(removeSuccess())
        setName("")
        setPrice("")
        setDescription("")
        setCategory("")
        setStock('')
        setImages([])
        setImagePreview([])
        navigate("/admin/products")

      }
      if(error){
        toast.error(error, {autoClose:2000})
        dispatch(removeErrors())
      }

    },[success, error, loading, products])

    


  return (
    <div>
     <Navbar/>
     <Pagetitle title='Create Product'/>
     <div className="create-product-container">
        <h1 className="form-title">Create Product</h1>

        <form className="product-form" encType='multipart/form-data' onSubmit={createProductSubmit}>

        <input type="text" className="form-input" placeholder='Enter Product Name' required name='name' value={name} onChange={(e)=>setName(e.target.value)}/>
        <input type="number" className="form-input" placeholder="Enter Product Price" required  name='price' value={price} onChange={(e)=> setPrice(e.target.value)}/>

        <input type="text" className="form-input" placeholder='Enter Product Description' required name='description' value={description} onChange={e=> setDescription(e.target.value)}/>

        <select name="category" id="" className="form-select" required  value={category}  onChange={(e) => setCategory(e.target.value)} >
            <option value="">Choose a Category</option>
           { categories.map((item, idx)=><option value={item} key={idx}>{item}</option>)
        }
        </select>

        <input type="number" className="form-input" placeholder='Enter Product Stock' required value={stock} onChange={e=> setStock(e.target.value)} />

        <div className="file-input-container">
            <input type="file"  accept='image/*' className="form-input-file" multiple name='image' required onChange={createProductImage}/>
        </div>

        
        <div className="image-preview-container">
           {
            imagePreview.map((img, idx)=>{
              return(
                <img src={img} alt='product preview' key={idx} className='image-preview'/>
              )
            })
           }


        </div>

        <button className="submit-btn" disabled={loading}>{loading?"Creating...":"Create"} </button>
        
        </form>
     </div>

     <Footer/>
    </div>
  )
}

export default CreateProduct
