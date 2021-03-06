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
import './AddNewReciepient.scss'

import { CAlert } from '@coreui/react'
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import '../../../globalVar'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
// import { set } from 'core-js/core/dict'
// import MIN_SAFE_INTEGER from 'core-js/fn/number/min-safe-integer'
const theme = createTheme({
  direction: 'rtl', // Both here and <body dir="rtl">
});
// Create rtl cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const AddNewReciepient = () => {
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
  const [customer, setCustomer] = useState(null)
  const [allCustomers, setAllCustomers] = useState([])
  const [countries, setCountries] = useState([])
  const [addresses, setAddresses] = useState([{
    id: Math.floor(Math.random() * (10000 + 1)),
    line_1: '',
    line_2: '',
    line_3: '',
    city: null,
    state_code: '',
    post_code: '',
    country_code: null,
    country: null,
    type: '',
    main: '',
    cities: []
  }])
  const [upData, setUpData] = useState({

    name_ar: '',
    name_en: '',

  })
  const { name_ar,
    name_en,
  } = upData;

  useEffect(async () => {
    const fetchUsers = async (e) => {
      try {
        const responsee = await fetch(
          `${global.apiUrl}api/users?paginate=0`,
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
        console.log('faqs', response);
        if (response.success) {


          setAllCustomers(response.payload.filter(item => item.admin == 0))
          //  setTotalPages(response.payload.last_page)

        }
        if (response.message && response.message == "Unauthenticated.") {
          localStorage.removeItem("token");
          localStorage.clear()

          history.push("/login");
        }

      } catch (err) {
        console.log(err);

      }



    }

    fetchUsers()
    const fetchCountries = async (e) => {
      try {
        const responsee = await fetch(
          `${global.apiUrl}api/shipping/countries`,
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + userToken,
              // "Content-Type": "application/json",
              //'Access-Control-Allow-Origin': 'https://localhost:3000',
              // 'Access-Control-Allow-Credentials': 'true',
              Accept: "application/json",
            },
          }
        );
        const response = await responsee.json();
        // console.log('response',response);
        console.log('faqs', response);
        if (response.success) {
          setCountries(response.payload)
        }
        if (response.message && response.message == "Unauthenticated.") {
          localStorage.removeItem("token");
          localStorage.clear()
          history.push("/login");
        }
      } catch (err) { console.log(err); }

    }

    fetchCountries()
  }, [refresh])




  const handleData = (e) => {
    setUpData({ ...upData, [e.target.name]: e.target.value })

    setErrorMessage('')
    setSuccessAdd('')
  }
  const [phones, setPhones] = useState([""])

  const handlePhones = (i) => (e) => {
    setPhones(
      ...[phones, (phones[i] = e.target.value)]
    );
    console.log('phones', phones)

  };




  const handleAddUser = async (e) => {
    e.preventDefault()
    setLoading(true)

    setErrorMessage('')
    setSuccessAdd('')

    try {
      const responsee = await fetch(
        `${global.apiUrl}api/reciepients`,
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
            customer_id: customer.customer.id, name_ar,
            name_en, addresses


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
        setSuccessAdd("?????? ?????????? ?????????? ??????????")
        setAddresses([{
          id: Math.floor(Math.random() * (10000 + 1)),
          line_1: '',
          line_2: '',
          line_3: '',
          city: null,
          state_code: '',
          post_code: '',
          country_code: null,
          country: null,
          type: '',
          main: '',
          cities: []
        }])
        setCustomer(null)
        setUpData({
          name_ar: '',
          name_en: '',
        })

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
  const fetchCities = async (code, index) => {
    try {
      const responsee = await fetch(
        `${global.apiUrl}api/shipping/cities?code=${code}&paginate=0`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + userToken,

            Accept: "application/json",
          },
        }
      );
      if (responsee.status == 204) {
        let temp = [...addresses]
        temp[index].cities = []
        setAddresses(...temp)
      }
      const response = await responsee.json();
      // console.log('response',response);
      console.log('faqs', response);
      if (response.success) {
        let temp = [...addresses]
        temp[index].cities = response.payload
        setAddresses([...temp])
      }

    } catch (err) { console.log(err); }

  }

  const handleCountry = async (value, index) => {
    let temp = [...addresses]
    temp[index].country = value
    temp[index].city = null
    if (value != null) {
      fetchCities(value.Code, index)
      temp[index].country_code = value.Code
    }
    else {
      temp[index].cities = []
      temp[index].country_code = ''
    }

    setAddresses([...temp])

  }
  const handleCity = async (value, index) => {
    console.log('value', value)
    let temp = [...addresses]
    temp[index].city = value
    setAddresses([...temp])
  }
  const handleAddressData = async (e, index) => {
    console.log(e.target.value, e.target.name,)
    let temp = [...addresses]
    temp[index][e.target.name] = e.target.value
    setAddresses([...temp])
  }

  const handleMoreAddress = async () => {

    let temp = [...addresses]
    temp.push({
      id: Math.floor(Math.random() * (10000 + 1)),
      line_1: '',
      line_2: '',
      line_3: '',
      city: null,
      state_code: '',
      post_code: '',
      country_code: null,
      country: null,
      type: '',
      main: '',
      cities: []
    })
    setAddresses([...temp])
  }
  const removeAddress = async (id) => {

    let temp = [...addresses].filter((item => item.id != id))

    setAddresses([...temp])
  }



  console.log('data', upData)

  console.log('adresss', addresses)
  return (
    <div className="c-app c-default-layout flex-row align-items-center register-cont">

      <CContainer>


        <CCard className="">



          <CCardHeader>
            <CRow className=" row-gap-15">

              <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
                <strong>?????????? ?????????? ????????</strong>
              </CCol>

              <CCol md="6" lg="6" xl="6" className='row-gap-15 col-gap-15'>

                <CButton color="success" className='col-lg-6  col-md-6 col-sm-12 col-xs-12 updatebtn'
                  onClick={() => history.goBack()} >  ????????
                </CButton>

              </CCol>
            </CRow>
          </CCardHeader>

          <CRow>
            <CCol xs="12" sm="12" md="12" className=''>
              <CForm onSubmit={(e) => { handleAddUser(e) }}>
                <CCardBody>
                  <CCard>
                    <CCardBody>
                      <CRow >


                        {/* className="justify-content-center" */}

                        <CCol md='12'> <strong>?????????????? ??????????????</strong></CCol>
                        <CCol md="12" lg="12" xl="12">

                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">????????????</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">
                              <CacheProvider value={cacheRtl}>
                                <ThemeProvider theme={theme}>
                                  <div dir="rtl">
                                    <Autocomplete
                                      id="country-select-demo"
                                      size="small"
                                      options={allCustomers}
                                      autoHighlight

                                      dir='rtl'
                                      rtl='true'
                                      value={customer}
                                      onChange={(event, newValue) => {
                                        setCustomer(newValue);
                                      }}
                                      getOptionLabel={(option) => option.name + ' ( id : ' + option.id + ' )'}
                                      renderOption={(props, option) => (
                                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>

                                          ?????? : {option.name} / ( ?????????? :{option.email}) / ( ???????? : {option.customer.phone ? option.customer.phone : '-'}) / ( Id: {option.id})
                                        </Box>
                                      )}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          required
                                          label={i18n.language == 'ar' ? "???????? ????????" : "Select Country"}
                                          inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                          }}
                                        />
                                      )}
                                      required={true}
                                    />

                                  </div>
                                </ThemeProvider>
                              </CacheProvider>




                            </CCol>
                          </CFormGroup>

                        </CCol>
                        <CCol md="6" lg="6" xl="6">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">?????? ?????????????? ????????????????</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="name_ar"
                                required
                                onChange={handleData}
                                placeholder={`?????? ?????????????? ????????????????`}
                                value={upData.name_ar} />
                            </CCol>
                          </CFormGroup>
                        </CCol>
                        <CCol md="6" lg="6" xl="6">
                          <CFormGroup row>
                            <CCol md="12">
                              <CLabel htmlFor="text-input">?????? ?????????????? ??????????????????????</CLabel>
                            </CCol>
                            <CCol xs="12" md="12">

                              <CInput name="name_en"
                                required
                                onChange={handleData}
                                placeholder={`?????? ?????????????? ??????????????????????`}
                                value={upData.name_en} />
                            </CCol>
                          </CFormGroup>
                        </CCol>

                        {addresses &&
                          <>
                            <CCol md='12'>
                              <strong>????????????????</strong>
                            </CCol>
                            {
                              addresses.map((item, index) => {
                                return (<React.Fragment key={item.id}>
                                  <hr className='fullWidth' />

                                  <CCol md='12'>
                                    <CRow className=" row-gap-15">
                                      <CCol md="6" lg="6" xl="6" className="justify-content-center align-self-center align-items-center place-items-center text-capitalize">
                                        <strong>{`?????????? ${index + 1}`}</strong>
                                      </CCol>

                                      <CCol md="6" lg="6" xl="6" className='row-gap-15 col-gap-15'>

                                        {index > 0 && <CButton color="danger" className='col-lg-3  col-md-3 col-sm-12 col-xs-12 updatebtn'
                                          onClick={() => removeAddress(item.id)} >  ?????? ??????????
                                        </CButton>}

                                      </CCol>
                                    </CRow>



                                  </CCol>
                                  <CCol md="6" lg="6" xl="6">

                                    <CFormGroup row>
                                      <CCol md="12">
                                        <CLabel htmlFor="text-input">???????????? </CLabel>
                                      </CCol>
                                      <CCol xs="12" md="12">
                                        <CacheProvider value={cacheRtl}>
                                          <ThemeProvider theme={theme}>
                                            <div dir="rtl">
                                              <Autocomplete
                                                id="country-select-demo"
                                                size="small"
                                                options={countries}
                                                required
                                                autoHighlight
                                                dir='rtl'
                                                rtl='true'
                                                value={item.country}
                                                onChange={(event, newValue) => {
                                                  handleCountry(newValue, index);
                                                }}
                                                getOptionLabel={(option) => option.Name + "  " + option.Code}
                                                renderOption={(props, option) => (
                                                  <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                                                    <img
                                                      loading="lazy"
                                                      width="20"
                                                      src={`https://flagcdn.com/w20/${option.Code.toLowerCase()}.png`}
                                                      srcSet={`https://flagcdn.com/w40/${option.Code.toLowerCase()}.png 2x`}
                                                      alt=""
                                                    />
                                                    {option.Name} ({option.Code}) +{option.InternationalCallingNumber}
                                                  </Box>
                                                )}
                                                renderInput={(params) => (
                                                  <TextField
                                                    required
                                                    {...params}
                                                    label={i18n.language == 'ar' ? "???????? ????????" : "Select Country"}
                                                    inputProps={{
                                                      ...params.inputProps,
                                                      autoComplete: 'new-password', // disable autocomplete and autofill
                                                    }}
                                                  />
                                                )}
                                              />

                                            </div>
                                          </ThemeProvider>
                                        </CacheProvider>
                                      </CCol>
                                    </CFormGroup>

                                  </CCol>
                                  <CCol md="6" lg="6" xl="6">

                                    <CFormGroup row>
                                      <CCol md="12">
                                        <CLabel htmlFor="text-input">?????????????? </CLabel>
                                      </CCol>
                                      <CCol xs="12" md="12">
                                        <CacheProvider value={cacheRtl}>
                                          <ThemeProvider theme={theme}>
                                            <div dir="rtl">
                                              <Autocomplete
                                                id="country-select-demo"
                                                size="small"
                                                options={item.cities}
                                                autoHighlight
                                                dir='rtl'
                                                rtl='true'
                                                value={item.city}
                                                onChange={(event, newValue) => {
                                                  handleCity(newValue, index);
                                                }}
                                                getOptionLabel={(option) => option}

                                                renderInput={(params) => (
                                                  <TextField
                                                    required
                                                    {...params}
                                                    label={i18n.language == 'ar' ? "???????? ??????????" : "Select Country"}
                                                    inputProps={{
                                                      ...params.inputProps,
                                                      autoComplete: 'new-password', // disable autocomplete and autofill
                                                    }}
                                                  />
                                                )}
                                              />

                                            </div>
                                          </ThemeProvider>
                                        </CacheProvider>




                                      </CCol>
                                    </CFormGroup>

                                  </CCol>
                                  <CCol md="12" lg="12" xl="12">
                                    <CFormGroup row>
                                      <CCol md="12">
                                        <CLabel htmlFor="text-input">         ?????????? 1    </CLabel>
                                      </CCol>
                                      <CCol xs="12" md="12">

                                        <CInput name="line_1"
                                          required
                                          autoComplete='off'
                                          onChange={(e) => handleAddressData(e, index)}
                                          placeholder={`?????????? 1`}
                                          value={item.line_1} />
                                      </CCol>
                                    </CFormGroup>
                                  </CCol>
                                  <CCol md="12" lg="12" xl="12">
                                    <CFormGroup row>
                                      <CCol md="12">
                                        <CLabel htmlFor="text-input">   ?????????? 2</CLabel>
                                      </CCol>
                                      <CCol xs="12" md="12">

                                        <CInput name="line_2"
                                          onChange={(e) => handleAddressData(e, index)}
                                          placeholder={`?????????? 2`}
                                          value={item.line_2} />
                                      </CCol>
                                    </CFormGroup>
                                  </CCol>
                                  <CCol md="12" lg="12" xl="12">
                                    <CFormGroup row>
                                      <CCol md="12">
                                        <CLabel htmlFor="text-input">      ?????????? 3    </CLabel>
                                      </CCol>
                                      <CCol xs="12" md="12">

                                        <CInput name="line_3"
                                          onChange={(e) => handleAddressData(e, index)}
                                          placeholder={`?????????? 3`}
                                          value={item.line_3} />
                                      </CCol>
                                    </CFormGroup>
                                  </CCol>
                                  <CCol md="3" lg="3" xl="3">
                                    <CFormGroup row>
                                      <CCol md="12">
                                        <CLabel htmlFor="text-input">  ?????? ??????????????   </CLabel>
                                      </CCol>
                                      <CCol xs="12" md="12">

                                        <CInput name="state_code"
                                          onChange={(e) => handleAddressData(e, index)}
                                          placeholder={`?????? ??????????????`}
                                          value={item.state_code} />
                                      </CCol>
                                    </CFormGroup>
                                  </CCol>
                                  <CCol md="3" lg="3" xl="3">
                                    <CFormGroup row>
                                      <CCol md="12">
                                        <CLabel htmlFor="text-input">?????????? ??????????????  </CLabel>
                                      </CCol>
                                      <CCol xs="12" md="12">

                                        <CInput name="post_code"

                                          onChange={(e) => handleAddressData(e, index)}
                                          placeholder={`?????????? ??????????????`}
                                          value={item.post_code} />
                                      </CCol>
                                    </CFormGroup>
                                  </CCol>

                                  <CCol md="3" lg="3" xl="3">

                                    <CFormGroup row>
                                      <CCol md="12">
                                        <CLabel htmlFor="text-input">
                                          ???????? ?????????????? </CLabel>
                                      </CCol>
                                      <CCol xs="12" md="12">
                                        <CSelect custom name="main" id="select"
                                          required value={item.main} onChange={(e) => handleAddressData(e, index)}>
                                          <option value='' >????????</option>

                                          <option value='1'>??????????</option>
                                          <option value='0'> ???????? </option>


                                        </CSelect>
                                      </CCol>
                                    </CFormGroup>

                                  </CCol>

                                  <CCol md="3" lg="3" xl="3">

                                    <CFormGroup row>
                                      <CCol md="12">
                                        <CLabel htmlFor="text-input">
                                          ??????????   </CLabel>
                                      </CCol>
                                      <CCol xs="12" md="12">
                                        <CSelect custom name="type" id="select"
                                          required value={item.type} onChange={(e) => handleAddressData(e, index)}>
                                          <option value='' >????????</option>

                                          <option value='home'>????????</option>
                                          <option value='work'> ?????? </option>
                                          <option value='other'> ???????? ?????? </option>


                                        </CSelect>
                                      </CCol>
                                    </CFormGroup>

                                  </CCol>

                                  <hr className='fullWidth' />
                                </React.Fragment>)
                              })
                            }

                          </>
                        }

                        <CCol md="12" lg="12" xl="12" className='row-gap-15 col-gap-15'>

                          <CButton color="primary" type='button' className='col-lg-4  col-md-4 col-sm-12 col-xs-12 updatebtn'
                            onClick={() => handleMoreAddress()} >  ?????????? ?????????? ????????
                          </CButton>

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

export default AddNewReciepient
