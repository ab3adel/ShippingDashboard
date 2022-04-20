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
import './AddNewCountry.scss'

import { CAlert } from '@coreui/react'
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import '../../../globalVar'
// import { set } from 'core-js/core/dict'
// import MIN_SAFE_INTEGER from 'core-js/fn/number/min-safe-integer'
const AddNewCountry = () => {
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
    country_name_en: '',
    country_name_ar: '',
    country_symbol: '',
    currency_name_en: '',
    currency_name_ar: '',
    currency_symbol: '',

  })
  const { country_name_en,
    country_name_ar,
    country_symbol,
    currency_name_en,
    currency_name_ar,
    currency_symbol,


  } = upData;




  const handleData = (e) => {
    setUpData({ ...upData, [e.target.name]: e.target.value })

    setErrorMessage('')
    setSuccessAdd('')
  }






  const handleAddCountry = async (e) => {
    e.preventDefault()
    setLoading(true)

    setErrorMessage('')
    setSuccessAdd('')

    try {
      const responsee = await fetch(
        `${global.apiUrl}api/countries`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + userToken,
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': 'https://localhost:3000',
            'Access-Control-Allow-Credentials': 'true',
            Accept: "application/json",
          },
          body: JSON.stringify({
            country_name_en,
            country_name_ar,
            country_symbol,
            currency_name_en,
            currency_name_ar,
            currency_symbol,

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
        setSuccessAdd("تمت اضافة دولة بنجاح")


        setUpData({
          country_name_en: '',
          country_name_ar: '',
          country_symbol: '',
          currency_name_en: '',
          currency_name_ar: '',
          currency_symbol: '',
        })

      }
      else {

        setVisible(10)
        setErrorMessage(response.errors)


      }


    } catch (err) {
      console.log(err);

    }

    setLoading(false)
  }


  return (
    <div className="c-app c-default-layout flex-row align-items-center justify-content-center register-cont">

      <CContainer>


        <CCard className="">



          <CCardHeader>
            <CRow className=" row-gap-15">

              <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
                <strong>إضافة دولة جديدة</strong>
              </CCol>
              <CCol md="6" lg="6" xl="6" className='row-gap-15 col-gap-15'>

                <CButton color="success" className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
                  onClick={() => history.goBack()} >رجوع
                </CButton>

              </CCol>
            </CRow>
          </CCardHeader>

          <CRow>
            <CCol xs="12" sm="12" md="12" className=''>
              <CForm onSubmit={(e) => { handleAddCountry(e) }}>
                <CCardBody>
                  <CCard>
                    <CCardBody>
                      <CRow >







                        {/* className="justify-content-center" */}

                        <CCol md='12'> <strong>معلومات الدولة</strong></CCol>
                        <CCol md="6" lg="6" xl="6">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">الاسم الانكليزي</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="country_name_en"
                                required
                                onChange={handleData}
                                placeholder={`الاسم الانكليزي`}
                                value={upData.country_name_en} />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md="6" lg="6" xl="6">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">{`الاسم العربي`}</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="country_name_ar"
                                required
                                onChange={handleData}
                                placeholder={`الاسم العربي`}
                                value={upData.country_name_ar} />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md="6" lg="6" xl="6">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">{`رمز الدولة`}</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="country_symbol"
                                required
                                onChange={handleData}
                                placeholder={`رمز الدولة`}
                                value={upData.country_symbol} />
                            </CCol>
                          </CFormGroup>
                        </CCol>

                        <CCol md='12'> <strong>معلومات العملة</strong></CCol>
                        <CCol md="6" lg="6" xl="6">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">اسم العملة الانكليزي</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="currency_name_en"
                                required
                                onChange={handleData}
                                placeholder={`اسم العملة الانكليزي`}
                                value={upData.currency_name_en} />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md="6" lg="6" xl="6">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">{`اسم العملة العربي`}</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="currency_name_ar"
                                required
                                onChange={handleData}
                                placeholder={`اسم العملة العربي`}
                                value={upData.currency_name_ar} />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md="6" lg="6" xl="6">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">{`رمز العملة`}</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="currency_symbol"
                                required
                                onChange={handleData}
                                placeholder={`رمز العملة`}
                                value={upData.currency_symbol} />
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
                            {Object.keys(errorMessage).map((item, i) => (

                              <>{errorMessage[item]}<br /></>



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
                            حفظ
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

export default AddNewCountry