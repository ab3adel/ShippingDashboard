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
import './countryUpdate.scss'

import { CAlert } from '@coreui/react'
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import '../../../globalVar'
// import { set } from 'core-js/core/dict'
// import MIN_SAFE_INTEGER from 'core-js/fn/number/min-safe-integer'
const CountryUpdate = ({ match }) => {
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
    country_code: '',
    currency_code_ar: '',
    currency_code_en: '',
    active: '',
    currency_symbol: ""

  })
  const { country_name_en,
    country_name_ar,
    country_code,
    currency_code_ar,
    currency_code_en,
    active,
    currency_symbol


  } = upData;
  useEffect(async () => {
    const getCountry = async (id) => {

      try {
        const responsee = await fetch(
          `${global.apiUrl}api/countries?paginate=0`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + userToken,

              Accept: "application/json",
            },
          }
        );
        if (responsee.status == 204) {

        }
        const response = await responsee.json();
        console.log('response', response);
        console.log(response);
        if (response.success == true) {
          let cont = response.payload.filter(item => item.id == id)[0]
          if (cont) {
            setUpData({

              country_name_en: cont.country_name_en,
              country_name_ar: cont.country_name_ar,
              country_code: cont.country_code,
              currency_code_ar: cont.currency_code_ar,
              currency_code_en: cont.currency_code_en,
              // currency_symbol: cont.currency_symbol,
              active: cont.active,


            })
          }

        }
      } catch (err) {
        console.log(err);

      }
    }
    getCountry(match.params.id)
  }, [refresh])



  const handleData = (e) => {
    setUpData({ ...upData, [e.target.name]: e.target.value })

    setErrorMessage('')
    setSuccessAdd('')
  }



  const handleUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)

    setErrorMessage('')
    setSuccessAdd('')

    try {
      const responsee = await fetch(
        `${global.apiUrl}api/countries/${match.params.id}`,
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
            country_code,
            currency_code_ar,
            currency_code_en,
            currency_symbol,
            active,
            _method: "put"

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
        setSuccessAdd(i18n.language == 'ar' ? "???? ?????????? ???????? ??????????" : "Country Updated Successfuly")

        setRefresh(!refresh)


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

                <CButton color="success" className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
                  onClick={() => history.goBack()} >{i18n.language == 'ar' ? `????????` : `Back`}
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

                        <CCol md='12'> <strong>?????????????? ????????????</strong></CCol>
                        <CCol md="6" lg="6" xl="6">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">?????????? ??????????????????</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="country_name_en"

                                onChange={handleData}
                                placeholder={`?????????? ??????????????????`}
                                value={upData.country_name_en} />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md="6" lg="6" xl="6">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">{`?????????? ????????????`}</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="country_name_ar"

                                onChange={handleData}
                                placeholder={`?????????? ????????????`}
                                value={upData.country_name_ar} />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md="6" lg="6" xl="6">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">{`?????? ????????????`}</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="country_code"

                                onChange={handleData}
                                placeholder={`?????? ????????????`}
                                value={upData.country_code} />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md="6" lg="6" xl="6">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">{`????????????`}</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">
                              <CSelect custom name="active"
                                required value={upData.active} onChange={(e) => handleData(e)}>
                                <option value='' >  ???????? ????????   </option>

                                <option value='1' >     ??????????   </option>
                                <option value='0' >     ?????? ??????????   </option>
                              </CSelect>
                            </CCol>
                          </CFormGroup>

                        </CCol>

                        <CCol md='12'> <strong>?????????????? ????????????</strong></CCol>
                        <CCol md="6" lg="6" xl="6">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">?????? ???????????? ??????????????????</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="currency_code_ar"

                                onChange={handleData}
                                placeholder={`?????? ???????????? ??????????????????`}
                                value={upData.currency_code_en} />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md="6" lg="6" xl="6">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">{`?????? ???????????? ????????????`}</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="currency_code_ar"

                                onChange={handleData}
                                placeholder={`?????? ???????????? ????????????`}
                                value={upData.currency_code_ar} />
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
                            ??????
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

export default CountryUpdate
