import axios from 'axios';
import React from 'react';
import { useEffect,useState } from 'react';
import ProductUpdate from './ProductUpdate';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';



function Product(){

    const [ products, setProduct ]=useState([])

    //fetching data
    async function p(){
        const response= await axios.get('http://127.0.0.1:8000');
        setProduct(response.data);
    }


    useEffect(()=>{ p();  } ,  []);
    
    //delete
   async function productdelete(e,id){
    console.log(id)
    e.preventDefault();
    try{
        await axios.delete(`http://127.0.0.1:8000/delete/${id}`)
        var leftoverproduct=products.filter(item=>{
            if (item.id!==id){
                return item;
            }
        })
        setProduct(leftoverproduct) /////without reloading

     }
    catch(error){

    }
    }
      
    //updateeeeeeeeeeeee

    //modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
   
        
         
//--------------------------------------------------------------------------------------------


//update

    const [updateproduct,setUpdateProduct]=useState({
        title:'',
        price:'',
        quantity:'',
        description:'',

    })

    useEffect(()=>{
        async function getproduct(){
            try{
                const response=await axios.get(`http://127.0.0.1:8000/detail/${ updateproduct.id }`);
                console.log(response.data)

            }
            catch(error){

            }
        }
        getproduct();//calling the async function

    },[])

    function field_update(e){
        setUpdateProduct({...updateproduct,[e.target.name]:e.target.value})
        console.log(updateproduct)
    }

    async function submit_update(e,id){
        e.preventDefault();
        try{
            await axios.put(`http://127.0.0.1:8000/update/${id}`,updateproduct)

        }
        catch(error){

        }

    }
    //----------------------------------------------------


    return(
        <>
<div className="col-6">    
    <table className="table">
    <thead>
        <tr>
        <th scope="col">ID</th>
        <th scope="col">Title</th>
        <th scope="col">Price</th>
        <th scope="col">Quantity</th>
        <th>Status</th>
        </tr>
    </thead>
    <tbody>
            {
                products.map( (product)=>{
                    return(
                    <tr key={product.id }>
                    <th scope="row">{ product.id }</th>
                    <td>{ product.title }</td>
                    <td>{ product.price }</td>
                    <td>{ product.quantity }</td>
                    <td>{ product.status }</td>

                    <td>
                    <Button variant="primary" onClick={handleShow}>
                        Update
                    </Button>

                                <Modal show={show} onHide={handleClose}>
                                <Modal.Header closeButton>
                                <Modal.Title>Update Product</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form method='put'>
                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Title:</Form.Label>
                                                <Form.Control 
                                                type="text" 
                                                value={ updateproduct.title } 
                                                onChange={(e)=>field_update(e)}
                                                name='title'/>
                                                
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Price:</Form.Label>
                                                <Form.Control 
                                                type="number" 
                                                value={ updateproduct.price }
                                                onChange={(e)=>field_update(e)} 
                                                name='price'/>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                                <Form.Label>Quantity:</Form.Label>
                                                <Form.Control 
                                                type="number"
                                                name='quantity'
                                                value={updateproduct.quantity} 
                                                onChange={(e)=>field_update(e)}/>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Description:</Form.Label>
                                                <Form.Control 
                                                type="text"
                                                value={ updateproduct.description } 
                                                name='description'
                                                onChange={(e)=>field_update(e)}
                                                 />
                                            
                                            </Form.Group>

                                            <Button variant="primary" type="submit" onClick={(e)=>submit_update(e,product.id)}>
                                                Submit
                                            </Button>

                                    </Form>

                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                               
                                </Modal.Footer>
                                </Modal>
            
                                </td>






                    <td><button className="btn btn-danger" onClick={ (e)=>productdelete(e,product.id) }>Delete</button></td>
                    </tr>
                    )
                })
            }
    
    </tbody>
    </table>

    
</div>   
       
        </>
    )
   
}
export default Product;