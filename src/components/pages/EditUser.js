import React from 'react';
import {Form,FormGroup,Label,Input,Button} from 'reactstrap';
import {Link} from 'react-router-dom';
const EditUser =()=>{
    return(
        <Form>
            <FormGroup>
                <Label>Name</Label>
                <Input type='text' placeholder='Enter Name'></Input>
            </FormGroup>
            <Button type='submit'>Edit</Button>
            <Link to="/userlist" className="btn btn-danger m1-2">Cancel</Link> 
        </Form>
    )
}
 
export default EditUser;