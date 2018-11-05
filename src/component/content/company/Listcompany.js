import React from 'react'
import API from '../../../helpers/API';
import apiconfig from '../../../configs/apiconfig'
import axios from 'axios';
import { Link } from 'react-router-dom'
import EditCompany from './editCompany';
import CreateCompany from './Createcompany';
import { Alert } from 'reactstrap'
import DeleteCompany from './deleteCompany'
import ViewCompany from './viewCompany'
import $ from 'jquery'



class ListCompany extends React.Component {
    constructor(props){
      
        super(props)
        this.state={
            // formdata:{
            //     no:1,
            //     code:'',
            //     name:'',
            // },
            showCreateCompany:false,
            company:[], 
            currentCompany:{},
            alertData: {
                status: 0,
                message: ''
            }
            // unit:[]
        }
        this.showHandler=this.showHandler.bind(this)
        this.submitHandler=this.submitHandler.bind(this)
        // this.changeHandler=this.changeHandler.bind(this)
        this.unitHandler=this.unitHandler.bind(this)
        this.closeModalHandler = this.closeModalHandler.bind(this)
        this.closeHandler=this.closeHandler.bind(this)
        this.deleteHandler=this.deleteHandler.bind(this)
        this.deleteModalHandler = this.deleteModalHandler.bind(this)
        this.viewModalHandler = this.viewModalHandler.bind(this)
        this.editModalHandler = this.editModalHandler.bind(this)
        this.modalStatus = this.modalStatus.bind(this)
    }

    deleteModalHandler(companyid) {
        let tmp = {}
        this.state.company.map((ele) => {
            if (companyid == ele._id) {
                tmp = ele
            }
        })
        this.setState({
            currentCompany : tmp,
            deleteCompany : true
        })
    }
    
    

    viewModalHandler(companyid) {
        let tmp = {}
        this.state.company.map((ele) => {
            if (companyid == ele._id) {
                tmp = ele
            }
        })
        this.setState({
            currentCompany : tmp,
            viewCompany : true
        })
    }

    editModalHandler(companyid) {
        let tmp = {}
    
        this.state.company.map((ele) => {
            if (companyid == ele._id) {
                tmp =({_id:ele._id,code:ele.code,nameku:ele.name,phone:ele.phone,email:ele.email,address:ele.address})
            }
        })
        this.setState({                      
            currentCompany : tmp,
            editCompany : true
        })
        //alert(JSON.stringify(this.state.currentCompany))
    }

    closeModalHandler() {
        this.setState({
            viewCompany : false,
            editCompany : false,
            deleteCompany : false    
        })
    }

    showHandler(){
        this.setState({showCreateCompany:true})
    }

    closeHandler(){
        this.setState({showCreateCompany:false})
    }

    // changeHandler(e){
    //     let tmp=this.state.formdata
    //     tmp[e.target.name]=e.target.value
    //     this.setState({
    //         formdata:tmp
    //     })
    // }
    
    unitHandler(e){
        let tmp=this.state.formdata
        tmp.m_unit_id=e.target.value
        this.setState({
            formdata:tmp
        })
    }
    submitHandler(){
        let token=localStorage.getItem(apiconfig.LS.TOKEN)
        let option={
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.COMPANY,
            method: "post",
            headers:{
                "Authorization": token,
                "Content-Type" : "application/json"
            },
            data: this.state.formdata
        }
        axios(option)
        .then((response)=>{
            if(response.data.code===200){
                alert('Success')
                this.props.history.push('/dashboard')
            } else {
                alert(response.data.message)
            }
        })
        .catch((error)=>{
            console.log(error);            
        })
    }
    getListCompany() {
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.COMPANY,
            method: "get",
            headers: {
                "Authorization": token
            }
        }
        axios(option)
        .then((response)=>{
            this.setState({
                company: response.data.message
                
            })
           
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    
    // componentWillMount(){
    //     //this.loadData();
    //     this.getListCompany()
    // }

    // componentDidMount(){
    //     var self = this;
 	// 	$('#mytable').dataTable({
	// 	  "sPaginationType": "bootstrap",
	// 	  "bAutoWidth": false,
	// 	  "bDestroy": true,		
	// 	  "fnDrawCallback": function() {		  		
    //         	self.forceUpdate();        	
    //       }, 
	// 	});
    // }

    // componentDidUpdate(){
    //     $('#mytable').dataTable({
    //      "sPaginationType": "bootstrap",
    //      "bAutoWidth": false,
    //      "bDestroy": true,	
    //    });
    // }
    componentDidMount(){
        this.getListCompany()
    }
    deleteHandler(param){
        let token = localStorage.getItem(apiconfig.LS.TOKEN)
        let option = {
            url: apiconfig.BASE_URL+apiconfig.ENDPOINTS.COMPANY+'/'+param,
            method: "delete",
            headers: {
                "Authorization": token
            }
        }
        axios(option)
        .then((response)=>{
            let currentindex = -1
            this.state.company.map((ele, idx)=>{
                if(ele._id==param){
                    currentindex=idx
                    this.props.history.goBack()
                }
            })
            let tmp=this.state.company
            tmp.splice(currentindex,1)
            this.setState({
                company: tmp
            })
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    modalStatus(status, message) {
        this.setState({
            alertData : {
                status : status,
                message : message
            },
            viewCompany : false,
            editCompany : false,
            deleteCompany : false    
        })
        this.getListUnit()
    }
     
    render(){
        // const SingleSouvRow=(props)=>{
    
        //     // console.log(this.state.company.length)
        //     // for(n<this.state.company.length;n++)
        //      return(
        //         <tr>
        //             <td>{props.no}</td>
        //             <td>{props.code}</td>
        //             <td>{props.name}</td>
        //             <td>{props.created_date}</td>
        //             <td>{props.created_by}</td>
        //             <td>
        //                 <Link to='#'>
        //                 <span onClick = {() => {props.viewModalHandler(props._id)}} className="fa fa-search" style={{fontSize : '18px', paddingRight : '30px'}} />    
                        
        //                 <span onClick = {() => {props.editModalHandler(props._id)}} class="fa fa-edit" style={{fontSize : '18px', paddingRight : '30px'}} />            
                        
        //                 <span onClick = {() => {props.deleteModalHandler(props._id)}} class="fa fa-trash" style={{fontSize : '18px'}} />
                            
        //                 </Link>
        //             </td>
        //         </tr>
        //     )
        // }
    return (
        <div>
        <ul class="breadcrumb">
            <li><a href="#">Home</a> <span class="divider">/</span></li>
            <li><a href="#">Master</a> <span class="divider">/</span></li>
            <li class="active">List Company</li>
        </ul>
       
        <div class="container">
            <h4>List Company</h4>

             {
                (this.state.alertData.status == 1) ? <Alert color ="success"> {this.state.alertData.message} </Alert>:''
            }
            {
                (this.state.alertData.status == 2) ? <Alert color ="danger"> {this.state.alertData.message} </Alert>: ''
            }


                <button type="button" class="btn btn-primary float-right"
                onClick ={this.showHandler}> Add </button>
                <CreateCompany
                create = {this.state.showCreateCompany}
                closeHandler={this.closeHandler} />
                <ViewCompany
                view = {this.state.viewCompany}
                closeModalHandler = {this.closeModalHandler} 
                company = {this.state.currentCompany}
                />
                <DeleteCompany
                delete = {this.state.deleteCompany}
                company = {this.state.currentCompany}
                closeModalHandler = {this.closeModalHandler}
                modalStatus = {this.modalStatus}
                 />
                <EditCompany
                edit = {this.state.editCompany}
                closeModalHandler = {this.closeModalHandler}
                companytest = {this.state.currentCompany} 
                modalStatus = {this.modalStatus}
                />
                <br/> <br/>
                <form class="form-inline">
                <div class ="container">
                <input type="text" placeholder="Company Code" class="col-sm-3 padding=5px" id="text"/>
                <input type="text" placeholder="Company Name" class="col-sm-3 padding=5px" id="text"/>
                <input type="date" placeholder="Created date" class="col-sm-3 padding=5px datepicker" id="date"/>
                <input type="text" placeholder="Created By" class="col-sm-2 padding=5px" id="text"/>
                
                <button type="button" class="btn btn-warning float-right " 
                onClick ={this.searchHandler}> Search </button>
                </div>
                </form>
                <table id="mytable" class="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>No</th>
                        <th>Company Code</th>    
                        <th>Company Name</th>
                        <th>Created Date</th>
                        <th>Created By</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                       {
                          
                           
                            this.state.company.map((row,x)=>
                                <tr>
                                  <td>{x+1}</td>
                                  <td>{row.code}</td>
                                  <td>{row.name}</td>
                                  <td>{row.created_date}</td>
                                  <td>{row.created_by}</td>
                                  <td>
                                  <Link to='#'>
                       <span onClick = {() => {this.viewModalHandler(row._id)}} className="fa fa-search" style={{fontSize : '18px', paddingRight : '30px'}} />    
                        
                      <span onClick = {() => {this.editModalHandler(row._id)}} class="fa fa-edit" style={{fontSize : '18px', paddingRight : '30px'}} />            
                        
                         <span onClick = {() => {this.deleteModalHandler(row._id)}} class="fa fa-trash" style={{fontSize : '18px'}} />
                            
                      </Link>
                    </td>
                                </tr>
                             
                           
                        
                            )
                       }
                       
                         {/* <tr>
                                                <td>Misc</td>
                                                <td>NetFront 3.1</td>
                                                <td>Embedded devices</td>
                                                <td>-</td>
                                                <td>C</td>
                                            </tr>
                                            <tr>
                                                <td>Misc</td>
                                                <td>NetFront 3.4</td>
                                                <td>Embedded devices</td>
                                                <td>-</td>
                                                <td>A</td>
                                            </tr>
                                            <tr>
                                                <td>Misc</td>
                                                <td>Dillo 0.8</td>
                                                <td>Embedded devices</td>
                                                <td>-</td>
                                                <td>X</td>
                                            </tr> */}
                    </tbody>
                </table>
                </div>
                </div>
        )
    }
}

        
export default ListCompany