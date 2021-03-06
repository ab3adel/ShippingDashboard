import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CPagination,
  CDataTable,
  CSelect,
  CFormText,
  CTextarea,
  CFormGroup,
  CLabel,
  CSwitch,
  CInputFile,
  CLink,
  CFade,
  CCollapse,
  CBadge,
  CRow
} from '@coreui/react'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import CIcon from '@coreui/icons-react'
import './UpdatePriority.scss'

import { CAlert } from '@coreui/react'
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import TimeField from 'react-simple-timefield';
import { ColorPicker, createColor } from "material-ui-color";
import Box from "@material-ui/core/Box";
import '../../../globalVar'
// import { set } from 'core-js/core/dict'
// import MIN_SAFE_INTEGER from 'core-js/fn/number/min-safe-integer'
const UpdatePriority = ({match}) => {
  const [t, i18n] = useTranslation();
  let history = useHistory();
  const [visible, setVisible] = useState(10)

  const [fetchedData, setfetchedData] = useState([])
  const [refresh, setRefresh] = useState('')
  const [errorMessage, setErrorMessage] = useState();

  const [succesAdd, setSuccessAdd] = useState()
  const [loading, setLoading] = useState('')
  const tokenString = localStorage.getItem("token");
  const userToken = JSON.parse(tokenString);
  const [pickedImg, setPickedImg] = useState('')
  // const userId = localStorage.getItem("user_id");
  // const user_id = JSON.parse(userId);

  const [upData, setUpData] = useState({
    name_en: '',
    name_ar: '',
    time_to_resolve:'',
    days_to_resolve:''
    // criteriaDirection: '',
    // criteriaDigits: '',
    // countryId: '',
    // departmentAr: '',
    // departmentEn: '',
    // userName: '',
    // userUserName: '',
    // email: '',
    // extentionNumber: '',
    // password: '',
    // confirmPassword: '',
    // userPosition: '',
    // role: '',
    // address:''


  })
  const { name_en,
    name_ar,
    time_to_resolve,
    days_to_resolve

  } = upData;

  useEffect(async () => {
    const fetchPriorities=async(id)=>{
      try {
        const responsee = await fetch(
          `${global.apiUrl}/super/ticketPriorities?paginate=0`,
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
      //  setData(response.payload)
      //  setTotalPages(response.payload.last_page)
      setUpData({
        name_en: response.payload.filter(item=>item.id==id)[0].name_en,
        name_ar:  response.payload.filter(item=>item.id==id)[0].name_ar,
        time_to_resolve:response.payload.filter(item=>item.id==id)[0].time_to_resolve.slice(0,5),
        days_to_resolve:response.payload.filter(item=>item.id==id)[0].days_to_resolve,}
        )
        setColor(response.payload.filter(item=>item.id==id)[0].color)
     
    
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
    
      fetchPriorities(match.params.id)
  }, [refresh])



  const handleData = (e) => {
    setUpData({ ...upData, [e.target.name]: e.target.value })

    setErrorMessage('')
    setSuccessAdd('')
  }
 


 


  const handleAddPriority = async (e) => {
    e.preventDefault()
    setLoading(true)

    setErrorMessage('')
    setSuccessAdd('')

    try {
      const responsee = await fetch(
        `${global.apiUrl}/super/ticketPriorities/${match.params.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + userToken,
             "Content-Type": "application/json",
            'Access-Control-Allow-Origin': 'https://localhost:3000',
            'Access-Control-Allow-Credentials': 'true',
            Accept: "application/json",
          },
          body: JSON.stringify({
            name_en,
    name_ar,
    time_to_resolve,
    days_to_resolve,
    color
     
          })
          ,

        }
      );
      const response = await responsee.json();
      console.log('response', response);
      console.log(response);
      setVisible(10)
      if (response.success) {
        await setVisible(6)
        setSuccessAdd(i18n.language == 'ar' ? "???? ?????????? ???????????? ??????????" : "Ticket Priority Updated Successfuly")
setRefresh(!refresh)
      }
      else {

        setVisible(10)
        setErrorMessage(response.messages)


      }


    } catch (err) {
      console.log(err);

    }

    setLoading(false)
  }
console.log(upData)
const [color, setColor] = useState('#333');
// createColor("#000")
const handleChange = (value) => {
  console.log("onChange=", value.hex);
  setColor('#'+value.hex);
};
  return (
    <div className="c-app c-default-layout flex-row align-items-center justify-content-center register-cont">

      <CContainer>


        <CCard className="">



          <CCardHeader>
            <CRow className=" row-gap-15">

              <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
                <strong>{i18n.language == 'ar' ? "?????????? ???????????? ??????????" : "Update Ticket Priority"}</strong>
              </CCol>
              <CCol md="6" lg="6" xl="6" className='row-gap-15 col-gap-15'>
          
          <CButton color="success"  className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
         onClick={()=>history.goBack()} >{i18n.language == 'ar' ? `????????` : `Back`}
                </CButton>
             
          </CCol>
            </CRow>
          </CCardHeader>

          <CRow>
            <CCol xs="12" sm="12" md="12" className=''>
              <CForm onSubmit={(e) => { handleAddPriority(e) }}>
                <CCardBody>
                  <CCard>
                    <CCardBody>
                      <CRow >
                     

                        {/* className="justify-content-center" */}
                       
                        <CCol md='12'> <strong>{i18n.language == 'ar' ? `?????????????? ???????????????? :` : `Priority Informations :`}</strong></CCol>
                        <CCol md="6" lg="6" xl="6">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">{i18n.language == 'ar' ? `?????????? ??????????????????` : `English Name`}</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="name_en"
                                required
                                onChange={handleData}
                                placeholder={i18n.language == 'ar' ? `?????????? ??????????????????` : `English Name`}
                                value={upData.name_en} />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md="6" lg="6" xl="6">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">{i18n.language == 'ar' ? `?????????? ????????????` : `Arabic Name`}</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="name_ar"
                                required
                                className='arabic-align'
                                onChange={handleData}
                                placeholder={i18n.language == 'ar' ? `?????????? ????????????` : `Arabic Name`}
                                value={upData.name_ar} />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md="3" lg="3" xl="3">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">{i18n.language == 'ar' ? `?????????? ???????????? ????????????????` : `Time To Resolve`}</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">
                            <TimeField
                            required
                            name="time_to_resolve"
                             className="form-control time_to_resolve "
                              value={upData.time_to_resolve}
                               onChange={handleData}
                              
                              />
                              {/* <CInput name="time_to_resolve"
                                required
                                type='time'
                                onChange={handleData}
                                placeholder={i18n.language == 'ar' ? `?????????? ` : `Arabic Name`}
                                value={upData.time_to_resolve} /> */}
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md="3" lg="3" xl="3">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">{i18n.language == 'ar' ? `???????????? ?????????????? ????????????????` : `Days To Resolve`}</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="days_to_resolve"
                                required
                                type='number'
                                min='0'
                                onChange={handleData}
                                placeholder={i18n.language == 'ar' ? `???????????? ?????????????? ????????????????` : `Days To Resolve`}
                                value={upData.days_to_resolve} />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md="3" lg="3" xl="3">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">{i18n.language == 'ar' ? `??????????` : `Color`}</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">
                            <ColorPicker value={color} onChange={handleChange} disablePlainColor />
                            </CCol>
                          </CFormGroup>
                        </CCol>
          
          

                      </CRow>


                    </CCardBody>
                    <CCardFooter className="p-4">
                      <CRow className="justify-content-center">

                        {errorMessage &&
                          <CAlert className='col-lg-12  col-md-12 col-sm-12 col-xs-12 '
                            color="danger"
                            // closeButton
                            show={visible}
                            // closeButton
                            onShowChange={setVisible}
                          >
      {     Object.keys(errorMessage).map((item, i) => (
        
        <>{errorMessage[item]}<br/></>  
           
                     
               
         ))}
                            {/* {errorMessage && errorMessage.map((item, i) => (

                              <>{errorMessage[i]}<br /></>

                            ))} */}
                          </CAlert>}

                        {succesAdd &&

                          <CAlert className='col-lg-12  col-md-12 col-sm-12 col-xs-12 '
                            color="success"
                            show={visible}
                            // closeButton
                            onShowChange={setVisible}
                          // closeButton
                          >
                            {succesAdd}
                          </CAlert>}

                        <CCol md="6" lg="6" xl="6" xs="12" sm="12" >
                          {<CButton color="success" block type='submit'>
                            {t('Save')}
                            {loading && <>{' '}<i className="fa fa-spinner fa-spin" ></i></>} </CButton>}
                        </CCol>

                      </CRow>
                    </CCardFooter>
                  </CCard>



                </CCardBody>

              </CForm>
            </CCol>
          </CRow>

        </CCard>







      </CContainer>
    </div>
  )
}

export default UpdatePriority
