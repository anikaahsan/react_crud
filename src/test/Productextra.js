import { useState ,useEffect } from 'react';
import { ListGroup,Card,Button,Form ,Modal} from 'react-bootstrap';

import axios from "axios";


function Product(){

    const [ products,setProducts ]=useState([])


    //for creating product
    const[ product,setProduct ]=useState(
        {
            title:'',
            price:'',
            quantity:'',
            description:'',
        }
    )

    useEffect(  ()=>{ p();}  ,  [])
    
     
    //retrieve
    //fetching data from backend
    async function p(){
        const response=await axios.get('http://127.0.0.1:8000')
        setProducts(response.data)
       

    }

    //storing the input field values in product object
    function input(e){
       setProduct({...product,[e.target.name]:e.target.value})
    }

     //create
    //calling the post method of backend and adding the form input  to backend 
    async function submit(e){
        e.preventDefault();
       
        await axios.post('http://127.0.0.1:8000',product);
        setProduct({
            title:'',
            price:'',
            quantity:'',
            description:''
        })//clears the form
        p();//fetches all data from backend 
    }


    //delete
    async function productdelete(e,id){
        e.preventDefault();
        try{
        await axios.delete(`http://127.0.0.1:8000/detail/${id}`);
        }
        catch(error){

        }
        p();

    }

    //update
    //modal
    const [show,setShow]=useState(false)

    const [productforupdate,setProductforupdate]=useState(
        {
            title:'',
            price:'',
            quantity:'',
            description:''
        }

    )
    ///showing the update form with existing data
    async function modalShow(e,id){
        setShow(true);
        const response= await axios.get(`http://127.0.0.1:8000/detail/${id}`);
        setProductforupdate(response.data);
 
     }
    const modalClose=()=>{
        setShow(false);
    }
   ///updated values are stored in backend
    async function update(e,id){
       e.preventDefault();//while submitting
       try{
        
        await axios.put(`http://127.0.0.1:8000/detail/${id}`,productforupdate);
        setShow(false);
        
       }
      
       catch(error){
          console.log(error)
       }
       p();
    }
    //storing th input field value in object
    function field_update(e){
        setProductforupdate({...productforupdate,[e.target.name]:e.target.value});
    

    }
    


    return (
        <>
        <div className="container mt-5">
          <div className="row">

         
            <div className="col-md-5">
              
           <div className='card' style={{ display: 'flex' ,padding:'50px',justifyContent: 'center',}}>
            <h3 className="" style={{ display: 'flex',alignItems: 'center',justifyContent: 'center',}}>Add a Product</h3>

{/* --------------------------add product form-------------------------- */}
            
              <Form onSubmit={ submit} className="mt-4">
                <Form.Group className="mb-3" >
                  <Form.Label>Title:</Form.Label>
                  <Form.Control
                    type="text"
                    name='title'
                    value={ product.title }
                    onChange={(e)=>input(e)}
                  />
                </Form.Group>
    
                <Form.Group className="mb-3">
                  <Form.Label>Price:</Form.Label>
                  <Form.Control
                    type="number"
                    name='price'
                    value={ product.price}
                    onChange={(e)=>input(e)}
                  />
                </Form.Group>
    
                <Form.Group className="mb-3" >
                  <Form.Label>Quantity:</Form.Label>
                  <Form.Control
                    type="number"
                    name='quantity'
                    value={product.quantity}
                    onChange={(e)=>input(e)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" >
                  <Form.Label>Description:</Form.Label>
                  <Form.Control
                    type="text"
                    name='description'
                    value={product.description }
                    onChange={(e)=>input(e)}
                  />
                </Form.Group>
    
                <div className="float-right">
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={(e)=>submit(e)}
                    className="mx-2"
                  >
                    Save
                  </Button>
                
                </div>
               </Form>
               </div>
               
{/* ----------------------------------------------------------------------------------------- */}
            </div>

            
            <div className="col-md-7 m">
            <div className='card' style={{ display: 'flex' ,padding:'50px',justifyContent: 'center',}}>
            <h3 className="" style={{ display: 'flex',alignItems: 'center',justifyContent: 'center',}}>All Products</h3>
            
              <table className="table">
                <thead >
                  <tr className="table-dark">
                  
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Status</th>
                    <th scope="col">Delete</th>
                    <th scope="col">Update</th>

                  </tr>
                </thead>
                <tbody>
{/*--------------------- showing fetched data in table -----------------------------*/}
                    {
                        products.map(
                            (product)=>{
                                return(
                                    <tr key={ product.id }>
                                        <td>{ product.title }</td>
                                        <td>{ product.price }</td>
                                        <td>{ product.quantity }</td>
                                        <td>{ product.status }</td>
                                        <td>
                                        <button 
                                        type='submit'
                                        className="btn btn-danger" 
                                        onClick={(e)=>productdelete(e,product.id)  }>
                                            Delete
                                        </button>
                                        </td>

                                        <td>
                                        <Button 
                                        variant="primary" 
                                        onClick={ (e)=>modalShow(e,product.id) }>
                                            Update
                                        </Button>
                                        </td>
                                    </tr>
                                )
                            })
                    }
{/* -------------------------------------------------------------------- ----------------------*/}
                </tbody>
              </table>
            </div>
          </div>
        </div>
       </div>


{/* // ---------------------------------------modal--------------------------------------------------// */}


    <Modal show={show} onHide={modalClose}>
    <Modal.Header closeButton>
    <Modal.Title>Update Product</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form method='put'>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Title:</Form.Label>
                    <Form.Control 
                    type="text" 
                    value={productforupdate.title } 
                    onChange={(e)=>field_update(e)}
                    name='title'/>
                    
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Price:</Form.Label>
                    <Form.Control 
                    type="number" 
                    value={ productforupdate.price }
                    onChange={(e)=>field_update(e)} 
                    name='price'/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Quantity:</Form.Label>
                    <Form.Control 
                    type="number"
                    name='quantity'
                    value={productforupdate.quantity} 
                    onChange={(e)=>field_update(e)}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Description:</Form.Label>
                    <Form.Control 
                    type="text"
                    value={ productforupdate.description } 
                    name='description'
                    onChange={(e)=>field_update(e)}
                    />
                
                </Form.Group>

                <Button variant="primary"
                type="submit" 
                onClick={(e)=>update(e,productforupdate.id)}>
                    Submit
                </Button>

        </Form>

    </Modal.Body>
    <Modal.Footer>
    <Button variant="secondary" onClick={modalClose}>
        Close
    </Button>

    </Modal.Footer>
    </Modal>
  {/* ----------  ------------------------------------------------------------------------------ */}
    </>
);


}
export default Product;