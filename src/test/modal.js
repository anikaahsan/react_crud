

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


function App(){
  const [product,setProduct ]=useState([])
  useEffect(
    ()=>{
      setProduct(
        [ {
          title:'Billions',
          price: 30.22,
          quantity: 50,
        },
        {
          title:'Sarafina',
          price: 90.22,
          quantity: 950,
        },])
    }
  )
  return(
    <div className='App'>
      { product.map(
        (product,index)=>{
          return(
            <div className='products'>
              <h2>{ product.title }</h2>
              <h3>{ product.price }</h3>
              <h4>{ product.quantity }</h4>
            </div>
          )
        }
      )}
    </div>

  )
}

