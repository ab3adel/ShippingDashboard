import React, { useState, useEffect,useRef } from 'react'
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
import '../../globalVar'
import './Tickets.scss'

import { useTranslation } from 'react-i18next';
import { PDFExport, savePDF } from '@progress/kendo-react-pdf';
// import html2PDF from 'jspdf-html2canvas';html2canvas
import { jsPDF } from "jspdf";
import Html2Pdf from "js-html2pdf";
import html2canvas from 'html2canvas';
const Tickets = () => {
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
 
  const[succesAdd,setSuccessAdd]=useState()
  const[loading,setLoading]=useState('')
  const [pageStatus,setPageStatus]=useState(0)
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);

  const [visible, setVisible] = useState(10)





  useEffect(async()=>{
    const fetchTickets=async(e)=>{
    try {
      const responsee = await fetch(
        `${global.apiUrl}/super/tickets?paginate=0&name=`,
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
    if(activeUser.id){getTicket(activeUser.id)}
  
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
  
    fetchTickets()
   
  },[currentPage,i18n.language,refresh])

 
  
 const [activeUser,setActiveUser]=useState('')

 const handleShow=(item)=>{
  //  setActiveUser(item)
   getTicket(item.id)
   
   setPageStatus(1)
 }

 const handleBack=(item)=>{
  setActiveUser('')
  setPageStatus(0)
}



const  getTicket=async(id)=>{
  
  try {
    const responsee = await fetch(
      `${global.apiUrl}/super/tickets/${id}`,
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
const contentArea = useRef(null);
const  handleExportWithFunction  = (event) => {

  // document.getElementById('page').style.fontFamily = 'Almarai';
  const options = {
    margin: [10, 12, 10, 12],
    filename: `ticket ${activeUser.name}.pdf`,
    image: { type: 'png' },
    // output: './pdf/generate.pdf',
    html2canvas: { logging: true },
    jsPDF: {format: 'a4',
    orientation: 'p',
  }
  };
  let exporter = new Html2Pdf(document.getElementById('page'), options);
  exporter.getPdf(true).then(pdf => {
    // this.$emit('success');
});   

}

  return (
    
    <CRow>
      {pageStatus==0&&
       <CCol xl={12}>
       <CCard>
         <CCardHeader>
           
           {i18n.language == 'ar' ? "????????????????" : "Tickets"}
         </CCardHeader>
         <CCardBody className='usersTabel'>
      { data&&  <CDataTable
           items={data}
           fields={['id','name','description','next_action_date','customer','type','status','priority',
           'company',
           'department','actions']}
           hover
           striped
           pagination
    
           sorter
itemsPerPage={12}
 columnFilter
          //  clickableRows
          //  onRowClick={(item) => handleShow(item)}
           scopedSlots = {{
         
             
               'actions':
               (item)=>(
                 <td>
             
                     <CBadge className="p-1  m-1 badg-click" color="info"  onClick={()=>handleShow(item)}  >
                     {i18n.language == 'ar' ? "?????? ....." : "Show...."}</CBadge> 
                  
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
            {activeUser.name}
            </CCol>
            <CCol md="6" lg="6" xl="6" className=" row-gap-15 col-gap-15 ">
            <CButton color="info"  className='col-lg-4  col-md-4col-sm-12 col-xs-12 updatebtn'
           onClick={(e)=>handleExportWithFunction(e)} >{i18n.language == 'ar' ? `?????????? PDF` : `Export PDF`}
                  </CButton>
                  <CButton color="success"  className='col-lg-4  col-md-4col-sm-12 col-xs-12 updatebtn'
           onClick={()=>handleBack()} >{i18n.language == 'ar' ? `????????` : `Back`}
                  </CButton>
         
            </CCol>
            </CRow>
      
          </CCardHeader>
          <div   ref={contentArea} id="page">  
          <CCardBody className=''>
     
        
         
          <CRow>
            <CCol md='12'><strong>{i18n.language == 'ar' ? `?????????????? ??????????????` : `Ticket Informations`}</strong></CCol>
       {  activeUser.description&&   <CCol className=' p-1'  md='12'>
          {/* <ul className=" card list-group list-group-flush"> */}
<li className="list-group-item"><strong
style={{color:activeUser.ticket_priority.color}}>
{i18n.language == 'ar' ? "??????????" : "Description"}
   {' '}</strong><strong>:</strong>{activeUser.description}</li>
   {/* </ul> */}
   </CCol>}
 
   {  activeUser.reopen_reason&&   <CCol className=' p-1'  md='12'>
          {/* <ul className=" card list-group list-group-flush"> */}
<li className="list-group-item"><strong
style={{color:activeUser.ticket_priority.color}}>
{i18n.language == 'ar' ? "?????? ?????????? ??????????" : "Reopen Reason"}
   {' '}</strong><strong>:</strong>{activeUser.reopen_reason}</li>
   {/* </ul> */}
   </CCol>}
            <CCol className=' p-1' md='6' >

{/* <ul className=" card list-group list-group-flush"> */}
<li className="list-group-item"><strong
style={{color:activeUser.ticket_priority.color}}>{i18n.language == 'ar' ? `????????????` :   `Id`}{' '}</strong>
{' '}<strong>:</strong>{activeUser.id}</li>
<li className="list-group-item"><strong
style={{color:activeUser.ticket_priority.color}}>{i18n.language == 'ar' ? `??????????` :   `Name`}
 {' '}</strong><strong>:</strong> {activeUser.name}</li>

   <li className="list-group-item"><strong
   style={{color:activeUser.ticket_priority.color}}>{i18n.language == 'ar' ? `???????? ??????????????` :   `Ticket Status`}
 {' '}</strong><strong>:</strong> {i18n.language == 'ar' ?activeUser.ticket_status.name_ar : activeUser.ticket_status.name_en  }</li>
 <li className="list-group-item"><strong
 style={{color:activeUser.ticket_priority.color}}>{i18n.language == 'ar' ? `???????????? ??????????????` :   `Ticket Priority`}
 {' '}</strong><strong>:</strong> {i18n.language == 'ar' ?activeUser.ticket_priority.name_ar : activeUser.ticket_priority.name_en  }</li>
{/* </ul> */}


          </CCol>
          <CCol className=' p-1' md='6' >

{/* <ul className=" card list-group list-group-flush"> */}
<li className="list-group-item"><strong
style={{color:activeUser.ticket_priority.color}}>{i18n.language == 'ar' ? `?????? ??????????????` :   `Ticket Type`}
 {' '}</strong> <strong>:</strong> {i18n.language == 'ar' ?activeUser.ticket_type.name_ar : activeUser.ticket_type.name_en  }</li>

 <li className="list-group-item"><strong
 style={{color:activeUser.ticket_priority.color}}>
{i18n.language == 'ar' ? `?????????? ?????????????? ????????????` :   `Next Action Date`}
   {' '}</strong><strong>:</strong>{activeUser.next_action_date}</li>
<li className="list-group-item"><strong
style={{color:activeUser.ticket_priority.color}}>{i18n.language == 'ar' ? `????????????` :   `Company`} {' '}
</strong><strong>:</strong>{activeUser.company?activeUser.company:'-'}</li>

<li className="list-group-item"><strong
style={{color:activeUser.ticket_priority.color}}>{i18n.language == 'ar' ? `??????????` :   `Department`} {' '}
</strong><strong>:</strong>{i18n.language == 'ar' ?activeUser.department.name_ar : activeUser.department.name_en  }</li>
  {/* </ul> */}


          </CCol>




    </CRow>  

    <CRow>
            <CCol md='12'><strong>{i18n.language == 'ar' ? `?????????????? ????????????????` : `Priority Informations`}</strong></CCol>

  
            <CCol className=' p-1' md='6' >

{/* <ul className=" card list-group list-group-flush"> */}
<li className="list-group-item"><strong>{i18n.language == 'ar' ? `???????????? ??????????????` :   `Ticket Priority`}
 {' '}</strong> <strong>:</strong> {i18n.language == 'ar' ?activeUser.ticket_priority.name_ar : activeUser.ticket_priority.name_en  }</li>

<li className="list-group-item"><strong>{i18n.language == 'ar' ? `??????????` :   `Color`}
 {' '} <strong>:</strong></strong>   <span className='colDiv' style={{backgroundColor:activeUser.ticket_priority.color}}></span>
 {activeUser.ticket_priority.color}</li>

{/* </ul> */}


          </CCol>
          <CCol className=' p-1' md='6' >

{/* <ul className=" card list-group list-group-flush"> */}
<li className="list-group-item"><strong>{i18n.language == 'ar' ? `???????????? ?????????????? ????????????????` :   `Days To Resolve`}
 {' '}</strong><strong>:</strong> {activeUser.ticket_priority.days_to_resolve }</li>


<li className="list-group-item"><strong>{i18n.language == 'ar' ? `?????????? ???????????? ????????????????` :   `Time To Resolve`}
 {' '}</strong><strong>:</strong> {activeUser.ticket_priority.time_to_resolve&&activeUser.ticket_priority.time_to_resolve.slice(0,5) }</li>


  {/* </ul> */}


          </CCol>




    </CRow>  



    <CRow>
            <CCol md='12'><strong>{i18n.language == 'ar' ? `?????????????? ????????????` : `Customer Informations`}</strong></CCol>
            
            <CCol className=' p-1' md='6' >

{/* <ul className=" card list-group list-group-flush"> */}
<li className="list-group-item"><strong
style={{color:activeUser.ticket_priority.color}}>{i18n.language == 'ar' ? `????????????` :   `Id`}{' '}</strong>
{' '}<strong>:</strong>{' '}{activeUser.customer.id}</li>
<li className="list-group-item"><strong
style={{color:activeUser.ticket_priority.color}}>{i18n.language == 'ar' ? `??????????` :   `Name`}
 {' '}</strong><strong>:</strong>{' '} {activeUser.customer.name}</li>
<li className="list-group-item"><strong
style={{color:activeUser.ticket_priority.color}}>
{i18n.language == 'ar' ? `?????? ???????????? ??????????????` :   `Civil Id`}
   {' '}</strong><strong>:</strong>{' '}{activeUser.customer.civil_id}</li>
   <li className="list-group-item"><strong
   style={{color:activeUser.ticket_priority.color}}>{i18n.language == 'ar' ? `???????????? ????????????????????` :   `Email `}
   {' '}</strong><strong>:</strong>{' '}{activeUser.customer.email}</li>
<li className="list-group-item"><strong
style={{color:activeUser.ticket_priority.color}}>{i18n.language == 'ar' ? `???????? ????????????` :   `Company Id`}{' '}
</strong><strong>:</strong>{' '}{activeUser.customer.company_id}</li>
<li className="list-group-item"><strong
style={{color:activeUser.ticket_priority.color}}>{i18n.language == 'ar' ? `?????? ????????????` :   `Company Name`}{' '}
</strong><strong>:</strong>{' '}{activeUser.customer.company_name}</li>

<li className="list-group-item"><strong
style={{color:activeUser.ticket_priority.color}}>{i18n.language == 'ar' ? `??????????` :   `Phones`} {' '}</strong>
<strong>:</strong>{' '}{activeUser.customer.phones.lenght>0?
<>{'/ '}{
  activeUser.customer.phones.map((phone,index)=>{ 
    return(<React.Fragment key={index}>{phone.number+' / '}</React.Fragment>)
  })
}
</>

:
            '-'
            }</li>
{/* </ul> */}


          </CCol>
          <CCol className=' p-1' md='6' >

{/* <ul className=" card list-group list-group-flush"> */}
<li className="list-group-item"><strong
 style={{color:activeUser.ticket_priority.color}}>{i18n.language == 'ar' ? `????????????` :   `Avenue`} {' '}
</strong> {' '}<strong>:</strong>{' '}{activeUser.customer.avenue?activeUser.customer.avenue:'-'}</li>
<li className="list-group-item"><strong 
  style={{color:activeUser.ticket_priority.color}}>{i18n.language == 'ar' ? `????????????` :   `Street`} {' '}
</strong> {' '}<strong>:</strong>{' '}{activeUser.customer.street?activeUser.customer.street:'-'}</li>
<li className="list-group-item"><strong 
style={{color:activeUser.ticket_priority.color}}>
{i18n.language == 'ar' ? `????????????` :   `Block`}
   {' '}</strong> {' '}<strong>:</strong>{' '}{activeUser.customer.block?activeUser.customer.block:'-'}</li>
<li className="list-group-item"><strong 
style={{color:activeUser.ticket_priority.color}}>{i18n.language == 'ar' ? `????????????` :   `Building`} {' '}
</strong> {' '}<strong>:</strong>{' '}{activeUser.customer.building?activeUser.customer.building:'-'}</li>
<li className="list-group-item"><strong 
style={{color:activeUser.ticket_priority.color}}>{i18n.language == 'ar' ? `????????????` :   `Floor`} {' '}
</strong> {' '}<strong>:</strong>{' '}{activeUser.customer.floor?activeUser.customer.floor:'-'}</li>
<li className="list-group-item"><strong 
style={{color:activeUser.ticket_priority.color}}>{i18n.language == 'ar' ? `??????????` :   `Flat`} {' '}
</strong> {' '}<strong>:</strong>{' '}{activeUser.customer.flat?activeUser.customer.flat:'-'}</li>
<li className="list-group-item"><strong
style={{color:activeUser.ticket_priority.color}}
>{i18n.language == 'ar' ? `???????? ??????????????` :   `Area Id`}
 {' '}</strong> {' '}<strong>:</strong>{' '} {activeUser.customer.area_id}</li>

  {/* </ul> */}


          </CCol>
          {activeUser.customer.notes &&
          <CCol className=' p-1'  md='12'>
          {/* <ul className=" card list-group list-group-flush"> */}
<li className="list-group-item"><strong style={{color:activeUser.ticket_priority.color}}>
{i18n.language == 'ar' ? "??????????????" : "Notes"}
   {' '}</strong>{activeUser.customer.notes}</li>



{/* </ul> */}
          </CCol>}
    {activeUser.customer.blocking_reason &&
          <CCol className=' p-1'  md='12'>
          {/* <ul className=" card list-group list-group-flush"> */}
<li className="list-group-item"><strong  style={{color:activeUser.ticket_priority.color}}>
{i18n.language == 'ar' ? " ?????? ??????????" : " Block Reason"}
   {' '}</strong> {' '}<strong>:</strong>{' '}{activeUser.customer.blocking_reason}</li>



{/* </ul> */}
          </CCol>}
    </CRow>  
          </CCardBody>
          </div>
        </CCard>
      </CCol>


      }
       {/* <CModal 
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
            </CModal> */}
     
    </CRow>
  )
}

export default Tickets
