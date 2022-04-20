import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';


const Address = ({ Address }) => {
    const [t, i18n] = useTranslation();
    return (
        <div className="row myAddressRow">
            <div className='col-md-12 addressCol'>
                <div className=" addressDetail ">

                    <h6 className=" f-w-400"><b>الدولة  :</b>{Address.city.country.country_name_en}{' / '}{Address.country_code}
                    </h6>
                </div>
                <div className="addressDetail">

                    <h6 className="  f-w-400"><b>المدينة  :</b>{Address.city.name_en}
                    </h6>
                </div>

                {Address.city.country_id === 117 ?
                    <>
                        <div className="addressDetail">

                            <h6 className="  f-w-400"><b>المنطقة  :</b>{JSON.parse(Address.line_1).Area}
                            </h6>
                        </div>
                        <div className="addressDetail">

                            <h6 className=" f-w-400"><b>القطعة  :</b>{JSON.parse(Address.line_1).Block}
                            </h6>
                        </div>
                        <div className="addressDetail">

                            <h6 className=" f-w-400"><b>الجادة  :</b>{JSON.parse(Address.line_1).Jaddah ? JSON.parse(Address.line_1).Jaddah : "-"}
                            </h6>
                        </div>
                        <div className="addressDetail">

                            <h6 className="  f-w-400"><b>الشارع  :</b>{JSON.parse(Address.line_2).Street ? JSON.parse(Address.line_2).Street : "-"}
                            </h6>
                        </div>
                        <div className=" addressDetail">

                            <h6 className="  f-w-400"><b>البناء  :</b>{JSON.parse(Address.line_2).Building}
                            </h6>
                        </div>
                        <div className=" addressDetail">

                            <h6 className="  f-w-400"><b>الطابق  :</b>{JSON.parse(Address.line_3).Floor ? JSON.parse(Address.line_3).Floor : "-"}
                            </h6>
                        </div>
                        <div className=" addressDetail">

                            <h6 className="  f-w-400"><b>الشقة  :</b>{JSON.parse(Address.line_3).Flat ? JSON.parse(Address.line_3).Flat : "-"}
                            </h6>
                        </div>
                        <div className=" addressDetail">

                            <h6 className="  f-w-400"><b>PCAIID  :</b>{JSON.parse(Address.line_3).PCAIID ? JSON.parse(Address.line_3).PCAIID : "-"}
                            </h6>
                        </div>

                    </>
                    :
                    <>
                        <div className="addressDetail  ">

                            <b>السطر 1  :</b>  <h6 className=" f-w-400">{Address.line_1}
                            </h6>
                        </div>
                        {Address.line_2 && <div className="addressDetail ">

                            <b>السطر 2  :</b>  <h6 className="  f-w-400">{Address.line_2}
                            </h6>
                        </div>}
                        {Address.line_3 && <div className=" addressDetail ">

                            <b>السطر 3  :</b>   <h6 className="  f-w-400">{Address.line_3}
                            </h6>
                        </div>}
                        {Address.post_code && <div className=" addressDetail ">

                            <b>  الرمز البريدي :</b>   <h6 className="  f-w-400">{Address.post_code}
                            </h6>
                        </div>}
                        {Address.state_code && <div className=" addressDetail ">

                            <b>   رمز الولاية  :</b>   <h6 className="  f-w-400">{Address.state_code}
                            </h6>
                        </div>}
                    </>

                }




            </div>
        </div>
    )
}

export default Address;