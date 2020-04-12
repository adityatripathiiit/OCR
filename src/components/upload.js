import React, { Component } from 'react';
import  { Button, Form, FormGroup,Label, FormText, Input } from 'reactstrap';
import FileBase64 from 'react-file-base64';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import './upload.css';
export class upload extends Component {
    constructor(props) {
        super(props);

    this.state = {
        confirmantion: '',
        isLoading: '',
        files: '',
        Invoice: '',
        Amount: '',
        Date: '',
        Vendor: '',
        Description: '',
        name: '',

    };
    this.handleChange = this.handleChange.bind(this);
}

    handleChange(event){
        event.preventDefault();
        const target = event.target;
        const value=target.value; 

        this.setState({name:value});

    }
    
    async handleSubmit(event) {
        event.preventDefault();
        this.setState({confirmantion : "uploading"});
    };
    async getFiles(files){
        this.setState({ isLoading : "Extractnig Data ",files: files})
        const UID = Math.round(1+ Math.random()*(1000000-1));
        var data = {
        fileExt:"png",
        imageID:UID,
        folder:UID,
        img:this.state.files[0].base64
    };
        await fetch("https://dkts5jxk01.execute-api.us-west-1.amazonaws.com/prod", {
        method: "POST",
        headers: {
            Accept: "application/json",
            'Content-Type': 'application.json'},
        body: JSON.stringify(data)
    }
    )
    let targetImage = UID+".png";
    const response = await fetch("https://dkts5jxk01.execute-api.us-west-1.amazonaws.com/prod/ocr", {
        method: "POST",
        headers: {
            Accept: "application/json",
            'Content-Type': 'application.json'},
        body: JSON.stringify(targetImage)
    }
    )
    
    const ocr = await response.json();
    console.log(ocr);
    this.setState({ Amount: ocr.body[0]});
    this.setState({Invoice: ocr.body[1]});
    this.setState({date: ocr.body[2]});
    };
    
    render() {
        const processing = "Processing";
        return (
            <div className="row over">
                <div className = "col-6 offset-3">
                    <Form onSubmit = {this.handleSubmit}>
                        <FormGroup>    
                            <h3 className = "text-danger"> {processing} </h3>
                            <h6> Upload Invoice</h6>
                            <FormText color="muted" > PNG,JPG</FormText>
                        
                            <div className="form-group files color">
                                <FileBase64 multiple={true} onDone = {this.getFiles.bind(this)} />
                            </div>
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                <h6>Invoice</h6>
                            </Label>
                            <Input type="text" name="Invoice" id = "Invoice" required  value= {this.state.Invoice} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                <h6> Amount ($)</h6>
                                <Input type="text" name="Amount" id = "Amount" required value= {this.state.Amount} onChange={this.handleChange} />
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                <h6> Date</h6>
                                <Input type="text" name="Date" id = "Date"  required value= {this.state.Date} onChange={this.handleChange} />
                            </Label>
                        </FormGroup>
                        <FormGroup>
                            <Label>
                                <h6> Vendor</h6>
                                <Input type="text" name="Vendor" id = "Vendor" required value= {this.state.Vendor} onChange={this.handleChange} />
                            </Label>
                        </FormGroup>

                        <FormGroup>
                            <Label>
                                <h6>Discription</h6>
                            </Label>
                            <Input type="text" name="Description" id = "Description" required value= {this.state.Description} onChange={this.handleChange} />
                        </FormGroup>

                    <Button className="btn btn-lg btn-block btn-success" > Submit </Button>
                    </Form>
                </div>
            </div>
        )
    }
}

export default upload
