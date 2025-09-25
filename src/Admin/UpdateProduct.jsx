import React from 'react'
import '../AdminStyles/UpdateProduct.css'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Pagetitle from  '../components/Pagetitle'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getProductDetail, removeErrors, removeSuccess } from '../features/products/Product.Slice'
import { removeErrors as updateRemoveErrors, removeSuccess as updateRemoveSuccess} from '../features/Admin/adminSlice'
import { ContactSupportOutlined } from '@mui/icons-material'
import { updateProduct } from '../features/Admin/adminSlice'
import { toast } from 'react-toastify'

const UpdateProduct = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [stock, setStock] = useState('')
    const [oldImage, setOldImage] = useState([])
    const [images, setImages] = useState([])
    const [imagePreview, setImagePreviews] = useState([])
    const categories = ['mobile', 'fruits', 'laptop', 'shirt', 'shoes', 'pants', 'glass', 'watch', 'cookie', 'socks', 'bag', 'mouse','headPhone', 'jacket', 'tops']
    const {id} = useParams()
   

    const dispatch = useDispatch()
    const {product, error, success} = useSelector(state=>state.product)

    const {loading:updateloading, success:updateSuccess, error:updateError, product:updatedProduct} = useSelector(state=>state.admin)
    


    useEffect(()=>{
        dispatch(getProductDetail(id))
        if(error){
            dispatch(removeErrors())
        }
        if(success){
            dispatch(removeSuccess())
        }
        
    }, [dispatch, id, error, success])

useEffect(() => {
    if (product) {
        setName(product?.name);
        setPrice(product?.price);
        setDescription(product?.description);
        setCategory(product?.category);
        setStock(product?.stock);
        
        setOldImage(product?.images || []);
    }
}, [product, id]);

    
    

    function handleImageChange(e){
        const files = Array.from(e.target.files)
        setImages(files)

        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);

        

    }

    function handleformSubmit(e){
        e.preventDefault();
         // Validate all fields
        if(!name || !price || !description || !stock || !category){
             toast.error("Please fill all the fields", {autoClose:2000});
            return;
        }

        if(images.length === 0){
            toast.error("Please select at least one image", {autoClose:2000});
             return;
        }

        const myform = new FormData()
        myform.set('name', name)
        myform.set('price', Number(price))
        myform.set('descripiton', description)
        myform.set('stock', Number(stock))
        myform.set('category', category)
       

        images.forEach((file) => {
            myform.append('images', file);
        });

        dispatch(updateProduct({id, formData:myform}));
        
    }

    useEffect(()=>{
        if(updateSuccess){
            toast.success("Product updated Successfully", {autoClose:2000})
            dispatch(updateRemoveSuccess())
            navigate('/admin/products')
        }
        if(updateError){
            toast.error(updateError, {autoClose:2000})
            dispatch(updateRemoveErrors())
            

        }
    })
    
  return (
    <div>
    <Pagetitle title="Update Product"/>
    <Navbar/>

    <div className = 'update-product-wrapper'>
        <h1 className='update-product-title'>Update Product</h1>

        <form className='update-product-form' encType='multipart/form-data' onSubmit={handleformSubmit}>
            <label htmlFor="name">Product Name</label>
            <input type="text"  className="update-product-input"  id='name' required value={name} onChange={e=>setName(e.target.value)}/>

            <label htmlFor="price">Product Price</label>
            <input type="number" className="update-product-input"  id='price' required value={price} onChange={e=>setPrice(e.target.value)}/>

            <label htmlFor="description">Product Description</label>
            <textarea type="text" className="update-product-textarea"  id='description' required value={description} onChange={e=>setDescription(e.target.value)}/>

             <label htmlFor="category">Product Category</label>

            <select name='category' id='category/' className='update-product-select' value={category} onChange={e=>setCategory(e.target.value)} required>
                <option value="">Choose a category</option>
                {categories && categories.map(item=>(
                    <option value={item} key={item}>{item}</option>
                ))}
            
            </select>

             <label htmlFor="stock">Product Stock</label>
            <input type="number" className="update-product-input"  id='stock' name='stock' required value={stock} onChange={e=>setStock(e.target.value)}/>

            <label htmlFor="image">Product Images</label>
           <div className='update-product-file-wrapper'>
            <input type="file" name="image" multiple accept='image/*' className='update-product-file-input' id='image'  onChange={handleImageChange}/>
           </div>

            <div className='update-product-preview-wrapper'>
               {
                imagePreview && imagePreview.map((img, idx)=>(
                     <img src={img} alt="Product preview"  className='update-product-preview-image'  key={idx} />
                ))
               }
           </div>

            <div className='update-product-old-images-wrapper'>
               {oldImage && oldImage.map((img, idx)=>(
                <img src={img.url} alt="old Product preview" className='update-product-old-image' key={idx}/>

               ))} 
           </div>


           <button className='update-product-submit-btn' disabled={updateloading?true:false}>{updateloading?'Updating...':"Update"}</button>




        </form>
    </div>


    <Footer/>
        
      
    </div>
  )
}

export default UpdateProduct
