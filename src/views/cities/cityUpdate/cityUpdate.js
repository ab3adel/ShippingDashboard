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
import './cityUpdate.scss'

import { CAlert } from '@coreui/react'
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import '../../../globalVar'
// import { set } from 'core-js/core/dict'
// import MIN_SAFE_INTEGER from 'core-js/fn/number/min-safe-integer'
const CityUpdate = ({match}) => {
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
    country_id: '',
   

  })
  const { name_en,name_ar,country_id
  } = upData;

  useEffect(async () => {
    const  getCity=async(id)=>{
  
      try {
        const responsee = await fetch(
          `${global.apiUrl}/super/cities?country=${match.params.CountryId}&paginate=0`,
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
          setUpData({
            name_en: response.payload.filter(item=>item.id==id)[0].name_en,
            name_ar: response.payload.filter(item=>item.id==id)[0].name_ar,
            country_id: response.payload.filter(item=>item.id==id)[0].country_id,
          
           
          })
   
        }
      } catch (err) {
        console.log(err);
       
      }
    }
    const fetchCountries = async (e) => {
      try {
        const responsee = await fetch(
          `${global.apiUrl}/super/countries?paginate=0`,
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
          setfetchedData(response.payload)
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

 


    await getCity(match.params.id)
    await fetchCountries()
  }, [refresh])



  const handleData = (e) => {
    setUpData({ ...upData, [e.target.name]: e.target.value })

    setErrorMessage('')
    setSuccessAdd('')
  }
 


  const handleUpdate= async (e) => {
    e.preventDefault()
    setLoading(true)

    setErrorMessage('')
    setSuccessAdd('')

    try {
      const responsee = await fetch(
        `${global.apiUrl}/super/cities/${match.params.id}`,
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
           
             name_en,name_ar,country_id
   
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
        setSuccessAdd(i18n.language == 'ar' ? "???? ?????????? ?????????? ??????????" : "City Updated Successfuly")

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





  console.log('data', upData)
  return (
    <div className="c-app c-default-layout flex-row align-items-center register-cont">

      <CContainer>


        <CCard className="">



          <CCardHeader>
            <CRow className=" row-gap-15">

              <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
                <strong>{i18n.language == 'ar' ? "?????????? ????????" : "Update Country"}</strong>
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
              <CForm onSubmit={(e) => { handleUpdate(e) }}>
                <CCardBody>
                  <CCard>
                    <CCardBody>
                      <CRow >
                     

                      <CCol md='12'> <strong>{i18n.language == 'ar' ? `?????????????? ???????????? :` : `Country Informations :`}</strong></CCol>
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
                                onChange={handleData}
                                placeholder={i18n.language == 'ar' ? `?????????? ????????????` : `Arabic Name`}
                                value={upData.name_ar} />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md="6" lg="6" xl="6">

<CFormGroup row>
  <CCol md="12">
    <CLabel htmlFor="text-input">
      {i18n.language == 'ar' ? "????????????" : "Country"}
    </CLabel>
  </CCol>
  <CCol xs="12" md="12">
    <CSelect custom name="country_id"
      required value={upData.country_id} onChange={(e) => handleData(e)}>
      <option value='' >
        {i18n.language == 'ar' ? "???????? ????????" : "Select Country"}
      </option>
      {fetchedData.length > 0 && fetchedData.map((country) => {
        return (<option value={country.id} key={country.id}>
          {i18n.language == 'ar' ? country.name_ar : country.name_en}
        </option>)
      })}

    </CSelect>
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

export default CityUpdate
