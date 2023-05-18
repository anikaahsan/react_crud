import axios from 'axios';
import React from 'react';
import { useEffect,useState } from 'react';

import Product  from '../testproduct';
function ProductCreate(){
    
    const [product,setProduct ]=useState({
        title:'',
        price:'',
        quantity:'',
        description:'',

    });
    //take input from fields
    function input(e){
        setProduct({...product,[e.target.name]:e.target.value});
        console.log(product);
    };

    function myfunction(changedValue){
        console.log("my function called")
    }
    
    //fetch all products
    async function getallproduct(){
        const response=await axios.get('http://127.0.0.1:8000/');
        setProduct(response.data);
        console.log(response.data)
        


    };

    async function submit(e){
        e.preventDefault();
        e.p
        try{
            await axios.post('http://127.0.0.1:8000/',product);
            setProduct({   
                title:'',
                price:'',
                quantity:'',
                description:''
                })                     //clears the form
                 getallproduct();//fetch all products
               
        }
        catch(error){
           console.log('error found')
        }

    };

    return(
        <>
        <div  className='col-5'>
            <h2>Add a Product</h2>
            <form method='post'>
                <div className='mb-3'>
                    <label>Title:</label>
                    <input 
                    type="text" 
                    name="title" 
                    className='form-control'
                    value={ product.title }
                    onChange={ e=> input(e) }
                    />
                    
                </div>
                <div className='mb-3'>
                    <label>Price:</label>
                    <input type="number"
                     name="price" 
                     value={ product.price }
                     className='form-control'
                     onChange={ e=>input(e) }/>
                    
                </div>
                
                <div className='mb-3'>
                    <label>Quantity:</label>
                    <input type="number" 
                    name="quantity" 
                    value={ product.quantity }
                    className='form-control'
                    onchange={e=>input(e)}/>
                    
                    {/* // onChange={myfunction}/>
                    // <select onChange={myfunction}>
                    //     <option value="option1" selected> option 1</option>
                    //     <option value="option2"> option 2</option>
                    //     <option value="option3"> option 3</option>
                    // </select> */}
                    
                </div>
                <div className='mb-3'>
                    <label>description:</label>
                    <input type="text" 
                    name="description" 
                    value={ product.description }
                    className='form-control'
                    onChange={e=>input(e)}/>
                    
                </div>


                <button type="submit" 
                
                className="btn btn-primary"
                onClick={ e=>submit(e) } >Submit</button>

            </form>
            <Product/>
        </div>
        </>
    )
}
export default ProductCreate;