import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination,
  CButton,
  CForm,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormGroup, 
CLabel,
CSelect,
CInput,
CInputGroup,
CInputGroupPrepend,
CInputGroupText,
CCardFooter
} from '@coreui/react'
import {CAlert} from '@coreui/react'
import '../../../globalVar'
import './users.scss'

import { useTranslation } from 'react-i18next';



const Users = () => {
  const history = useHistory()
  const [t, i18n] = useTranslation();

  const [modal, setModal] = useState(true)
  const [small, setSmall] = useState(false)
  const [large, setLarge] = useState(false)
   const [danger, setDanger] = useState(false)
  const [data,setData]=useState('')
  const [refresh, setRefresh] = useState(false)
  const [errorMessage, setErrorMessage] = useState();
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState()
  const[succesAdd,setSuccessAdd]=useState()
  const[loading,setLoading]=useState('')
  const [pageStatus,setPageStatus]=useState(0)
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  const[amount,setAmount]=useState('')
  const [visible, setVisible] = useState(10)
 const [companies,setCompanies]=useState('')
const[company,setCompany]=useState('')
const[depts,setDepts]=useState([])
const[dept,setDept]=useState('')
const[extNumber,setExtNumber]=useState('')
  useEffect(async()=>{
    const fetchUsers=async(e)=>{
    try {
      const responsee = await fetch(
        `${global.apiUrl}/admin/users?paginate=0`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + userToken,
            Accept: "application/json",
          },

        }
      );
      const response = await responsee.json();
      // console.log('response',response);
      console.log('faqs',response);
    if(response.success){
     setData(response.payload)
    //  setTotalPages(response.payload.last_page)
    if(activeUser.id){setActiveUser(response.payload.filter(item=>item.id==activeUser.id)[0])}
  
    }
      if(response.message&&response.message=="Unauthenticated."){
      localStorage.removeItem("token");
      localStorage.clear()
   
    history.push("/login");
      }
     
    } catch (err) {
      console.log(err);
     
    }

    
    
    }
  
    fetchUsers()
  },[currentPage,refresh])

  useEffect(async()=>{
    const fetchDepts = async (e) => {
      try {
        const responsee = await fetch(
          `${global.apiUrl}/admin/departments?paginat=0`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + userToken,

              Accept: "application/json",
            },
          }
        );
        const response = await responsee.json();
        console.log(response);

        if (response.success) {
          setDepts(response.payload)
        }


        if (response.message && response.message == "Unauthenticated.") {
          localStorage.removeItem("token");
          localStorage.clear()

          history.push("/login");
        }

      } catch (err) {
        console.log(err);

      }

      // setLoading(false)


    }

    fetchDepts()
  },[i18n.language])
  
 const [activeUser,setActiveUser]=useState('')
 const[charge,setCharge]=useState([])
const[nocharge,setNoCharge]=useState(false)
 const handleShow=(item)=>{
  //  setActiveUser(item)
   getUser(item.id)
   setExtNumber(item.extension_number?item.extension_number.slice(4,7):'')
   setPageStatus(1)
 }

 const handleBack=(item)=>{
  setActiveUser('')
  setPageStatus(0)
  setAmount('')
  setCharge([])
  setCompany('')
  setDept('')
  setExtNumber('')
  setNoCharge(false)
}

const handleAddToDept=async(e)=>{
  e.preventDefault()
  setLoading(true)
  setVisible(7)
  setErrorMessage('')
  setSuccessAdd('')
if(activeUser.id){
  const data = new FormData();
  dept&& data.append('department_id', dept);
  
  !activeUser.extension_number&&data.append('extension_number', extNumber);
  // JSON.stringify({
  //   "department_id" : dept,
  //   "extension_number": extNumber
  // })
  try {
    const responsee = await fetch(
      `${global.apiUrl}/admin/attach/users/${activeUser.id}/departments`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + userToken,
          //  "Content-Type": "application/json",
          // 'Access-Control-Allow-Origin': 'https://localhost:3000',
          // 'Access-Control-Allow-Credentials': 'true',
          Accept: "application/json",
        },
        body: data
        ,
    
      }
    );
    const response = await responsee.json();
    console.log('response',response);
    console.log(response);
    if(response.success){
     
      setSuccessAdd(i18n.language == 'ar' ? "?????? ?????????? ???????????? ?????? ?????????? ??????????" 
      : "Employee has been added to department successfully")
    // setRefresh(!refresh)
    // setAmount('')
    // getAmount(activeUser.id)
  // setUpData({api_key:''})
   setVisible(7)
    }
    else{
     
      setVisible(7)
    setErrorMessage(response.messages)
    }
   
  } catch (err) {
    console.log(err);
   
  }
  
  setLoading(false)

}

}


const  getUser=async(id)=>{
  
  try {
    const responsee = await fetch(
      `${global.apiUrl}/admin/users/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + userToken,
                 
          Accept: "application/json",
        },
     }
    );
    if(responsee.status==204){
     
    }
    const response = await responsee.json();
    console.log('response',response);
    console.log(response);
    if(response.success==true){
      setActiveUser(response.payload)
    }
  } catch (err) {
    console.log(err);
   
  }
}

const [itemToDelete,setItemToDelete]=useState('')
const handleShowModal=(item)=>{
  setSmall(!large)
  setItemToDelete(item)
}
const handleDelete=async()=>{
  setErrorMessage('')
  setSuccessAdd('')
  document.getElementById('root').style.opacity=0.75;

try {
  const responsee = await fetch(
    `${global.apiUrl}/admin/users/${itemToDelete.id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + userToken,
       
        Accept: "application/json",
      },
 
  
    }
  );
  const response = await responsee.json();
  console.log('response',response);
  console.log(response);
  if(response.success==true&& response.payload){
    setSmall(!small)
    document.getElementById('root').style.opacity=1;
   
   setRefresh(!refresh)
  
  }
  // else{
  // setErrorMessage(response.errors)
  // }
 
} catch (err) {
  console.log(err);
 
}
document.getElementById('root').style.opacity=1;

}
const handleCompany=(val)=>{
  setCompany(val)
  setDept('')
  if(val==''){
    setDepts('')
  }
  else{
    setDepts(companies.filter(item=>item.id==val)[0].departments)
  }

}
  return (
    
    <CRow>
      {pageStatus==0&&
       <CCol xl={12}>
       <CCard>
         <CCardHeader>
         <CRow className="justify-content-center row-gap-15 ">
            
            <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
            {i18n.language == 'ar' ? "????????????????" : "Employees"}
            </CCol>
            <CCol md="6" lg="6" xl="6" className=" row-gap-15 col-gap-15 ">
            <CButton color="success"  className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
           onClick={()=>history.push('/Admin/Employees/AddNewEmployee')} >
             {i18n.language == 'ar' ? "?????????? ???????? ????????" : "Add New Employee"}
                  </CButton>
         
            </CCol>
            </CRow>
           
         </CCardHeader>
         <CCardBody className='usersTabel'>
      { data&&  <CDataTable
           items={data}
           fields={['id','email','username', 'position','extension_number','user_roles','actions']}
           hover
           striped
           pagination
        
           sorter
itemsPerPage={12}
 columnFilter
           // clickableRows
           // onRowClick={(item) => history.push(`/users/${item.id}`)}
           scopedSlots = {{
     
               'name':
               (item)=>(
                 <td>
                {item.first_name+' '+item.last_name}
                 </td>
               ),
               'actions':
               (item)=>(
                 <td>
              {item.user_roles[0]!='super-admin' && 
              <><CBadge className="p-1 m-1 badg-click" color="danger"
              onClick={() =>handleShowModal(item) }
               >{i18n.language == 'ar' ? "??????" : "Delete"}</CBadge>
                <br/>
              
                   
                     <CBadge className="p-1  m-1 badg-click" color="info"  onClick={()=>handleShow(item)}  >
                     {i18n.language == 'ar' ? "?????? ....." : "Show...."}</CBadge> 
                     </>
              }
                 </td>
               ),

           }}
         />}

         </CCardBody>
       </CCard>
     </CCol>
      }
      {
        pageStatus==1&&activeUser&&
        <CCol xl={12}>
        <CCard>
          <CCardHeader>
          <CRow className="justify-content-center row-gap-15 ">


        

            <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
            {activeUser.username}
            </CCol>
            <CCol md="6" lg="6" xl="6" className=" row-gap-15 col-gap-15 ">
            <CButton color="info"  className='col-lg-4  col-md-4 col-sm-12 col-xs-12 updatebtn'
           onClick={()=>history.push(`/Admin/Employees/Update/${activeUser.id}`)} >{i18n.language == 'ar' ? `??????????` : `Update`}
                  </CButton>
                  <CButton color="success"  className='col-lg-4  col-md-4col-sm-12 col-xs-12 updatebtn'
           onClick={()=>handleBack()} >{i18n.language == 'ar' ? `????????` : `Back`}
                  </CButton>
         
            </CCol>
            </CRow>
      
          </CCardHeader>
          <CCardBody className=''>
     
        {/* <CCard>
            <CCardHeader>
          <CRow className="">

            <CCol md="6" lg="6" xl="6" >
           <strong>{i18n.language == 'ar' ? `?????????? ?????? ??????` : `Add To Department`}</strong>
            </CCol>
       
            </CRow>
      
          </CCardHeader>
          <CCardBody className=''>

          <CForm onSubmit={(e)=>{handleAddToDept(e)}}  >
          <CRow  className="justify-content-center" >  
        
  
<CCol md="4" lg="4" xl="4">

<CFormGroup row>
 
  <CCol xs="12" md="12">
    <CSelect custom name="city_id"
      required value={dept} onChange={(e) => setDept(e.target.value)}>
     
        <option value='' >
        {i18n.language == 'ar' ? "???????? ??????" : "Select Department"}
      </option>
     
    
      {depts.length > 0 && depts.map((dept) => {
        return (<option value={dept.id} key={dept.id}>
          {i18n.language == 'ar' ? dept.name_ar : dept.name_en}
        </option>)
      })}

    </CSelect>
  </CCol>
</CFormGroup>

</CCol>
{ !activeUser.extension_number&& <CCol md="4" lg="4" xl="4">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">{i18n.language == 'ar' ? `?????????? ??????????????` : `Extension Number`}</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="extentionNumber"
                                required
                                onChange={(e)=>setExtNumber(e.target.value)}
                                placeholder={i18n.language == 'ar' ? `?????????? ??????????????` : `Extension Number`}
                                value={extNumber} />
                            </CCol>
                          </CFormGroup>
                        </CCol>
         }
        
                 
                  <CCol md="3" lg="3" xl="3" className='mr-t justify-content-center ' >
            
            <CButton color="success" className='col-12' type='submit'
           >{i18n.language == 'ar' ? `??????????` : `Add`}  {loading&&<>{' '}<i className="fa fa-spinner fa-spin" ></i></>}
          
                  </CButton>
         
            </CCol>

            </CRow>
            </CForm>
          </CCardBody>
        
                <CRow className="justify-content-center">
         
           <CCol md='12' >
           <CCol md='12' >

           { errorMessage&& 

           
                   <CAlert className='col-lg-12  col-md-12 col-sm-12 col-xs-12 '
                   color="danger"
                
                   show={visible}
                  
                   onShowChange={setVisible}
              > 
            {     Object.keys(errorMessage).map((item, i) => (<>{errorMessage[item]}<br/></>  ))}
          </CAlert>
          
          }
          
              
              
              
                { succesAdd&& 
                
                
                <CAlert className='col-lg-12  col-md-12 col-sm-12 col-xs-12 '
                color="success"
                show={visible}
           
                onShowChange={setVisible}
             
              >
            {succesAdd}
              </CAlert>
              
              
              }
           </CCol>
          
           </CCol>
                
                </CRow>
              
           
            </CCard>
          */}
          <CRow>
            <CCol md='12'><strong>{i18n.language == 'ar' ? `?????????? ????????????` : `Profile`}</strong></CCol>
      <CCol lg={6}>
              <table className="table table-striped table-hover">
                <tbody>
                         <tr >
                          <td>ID</td>
                          <td><strong>{activeUser.id}</strong></td>
                        </tr>
                        <tr >
                          <td>{i18n.language == 'ar' ? `??????????` : `Role`}</td>
                          <td><strong>{activeUser.user_roles[0]}</strong></td>
                        </tr>
                        <tr >
                          <td>{i18n.language == 'ar' ? `??????????` : `Name`}</td>
                          <td><strong>{activeUser.name}</strong></td>
                        </tr>
                        <tr >
                          <td>{i18n.language == 'ar' ? `?????? ????????????????` : `User Name`}</td>
                          <td><strong>{activeUser.username}</strong></td>
                        </tr>
                       
                        <tr >
                          <td>{i18n.language == 'ar' ? `???????????? ??????????????` : `Position`}</td>
                          <td><strong>{activeUser.position}</strong></td>
                        </tr>

                  
                </tbody>
              </table>
              </CCol>
              <CCol lg={6}>
              <table className="table table-striped table-hover">
                <tbody>
             
                        <tr >
                          <td>{i18n.language == 'ar' ? `???????????? ????????????????????` : `Email`}</td>
                          <td><strong>{activeUser.email}</strong></td>
                        </tr>
                        <tr >
                          <td>Extension Number</td>
                          <td><strong>{activeUser.extension_number?activeUser.extension_number:'-'}</strong></td>
                        </tr>
                        {/* <tr >
                          <td>Email Verificaton</td>
                          <td><strong>{activeUser.is_email_verified==1?'Verified':'Not Verified'}</strong></td>
                        </tr> */}
                      
                        <tr >
                          <td>{i18n.language == 'ar' ? `?????????? ??????????????` : `Created At`}</td>
                          <td><strong> {activeUser.created_at&&activeUser.created_at.slice(0,10)}</strong></td>
                        </tr>
                        <tr >
                          <td>{i18n.language == 'ar' ? `??????????` : `Language`}</td>
                          <td><strong>{activeUser.locale}</strong></td>
                        </tr>
                        <tr >
                          <td>{i18n.language == 'ar' ? `????????????` : `Status`}</td>
                          <td><strong>{activeUser.active==1?
                          <>
                          {i18n.language == 'ar' ? `????????` : `Active`}
                          </>:
                           <>
                           {i18n.language == 'ar' ? `?????? ????????` : 'Deactive'}
                           </>}</strong></td>
                        </tr>
                        
                </tbody>
              </table>
              </CCol>
    </CRow>  
<CRow>

{ nocharge==true&&activeUser.role=='normal'&& <CCol md='12'>
<CAlert className='col-lg-12  col-md-12 col-sm-12 col-xs-12 '
                   color="info"
                > 
     There is no balance in the account
          </CAlert>
</CCol>
                
          
          }

{charge.length>0&&activeUser.role=='normal'&& <><CCol md='12'>
  <strong>Charging History</strong>
</CCol>
<CCol md='12' className='usersTabel'>
{ charge.length>0&&  <CDataTable
           items={charge}
           fields={['id','user_id','amount', 'method','created_at']}
           hover
           striped
           pagination
        
           sorter
itemsPerPage={12}
//  columnFilter
           // clickableRows
           // onRowClick={(item) => history.push(`/users/${item.id}`)}
           scopedSlots = {{
           
               'created_at':
               (item)=>(
                 <td>
                {item.created_at.slice(0,10)}
                 </td>
               ),
              

           }}
         />}

</CCol>
</>
}
</CRow>

          </CCardBody>
        </CCard>
      </CCol>


      }
       <CModal 
              show={small} 
              onClose={() => setSmall(!small)}
              size="sm"
              color='danger'
            >
              <CModalHeader closeButton>
                <CModalTitle>{i18n.language == 'ar' ? "?????? ????????????" : "Delete User"}</CModalTitle>
              </CModalHeader>
              <CModalBody>
              {i18n.language == 'ar' ? `???? ?????? ?????????? ?????? ???????? ?????? ???????????? (${itemToDelete.username})` 
              : `Are you sure you want to delete a User (${itemToDelete.username})`}
              </CModalBody>
              <CModalFooter>
                <CButton color="danger" onClick={() =>handleDelete()}>{i18n.language == 'ar' ? "??????" : "Delete"}</CButton>{' '}
                <CButton color="secondary" onClick={() => setSmall(!small)}>{i18n.language == 'ar' ? "??????????" : "Cancel"}</CButton>
              </CModalFooter>
            </CModal>
     
    </CRow>
  )
}

export default Users
