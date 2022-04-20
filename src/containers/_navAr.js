import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'لوحة التحكم',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    // badge: {
    //   color: 'info',
    //   text: 'NEW',
    // }
  },

  {
    _tag: 'CSidebarNavTitle',
    _children: ['إدارة']
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'الشركات',
    route: '/companies',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'كل الشركات',
        to: '/companies/companies',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'إضافة شركة جديدة',
        to: '/companies/AddNewCompany',
      },


    ],
  },


  {
    _tag: 'CSidebarNavDropdown',
    name: 'المستخدمون',
    route: '/users',
    icon: 'cil-user',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'كل المستخدمين',
        to: '/users',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'إضافة مستخدم جديد',
        to: '/users/AddNewUser',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'المرسل إليهم',
    route: '/Reciepients',
    icon: 'cil-user',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'كل المرسل إليهم',
        to: '/Reciepients/AllReciepients',
      },
      // {
      //   _tag: 'CSidebarNavItem',
      //   name: 'إضافة مستلم جديد',
      //   to: '/Reciepients/AddNewReciepient',
      // },
    ],
  },



  {
    _tag: 'CSidebarNavDropdown',
    name: 'التصنيفات',
    route: '/Categories',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'كل التصنيفات',
        to: '/Categories/AllCategories',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'إضافة تصنيف جديد',
        to: '/Categories/AddNewCategory',
      },
    ],
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'الصفحات',
    route: '/DynamicPages',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'كل الصفحات',
        to: '/DynamicPages/AllPages',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'إضافة صفحة جديدة',
        to: '/DynamicPages/AddNewPage',
      },
    ],
  },



  {
    _tag: 'CSidebarNavDropdown',
    name: 'الدول',
    route: '/Countries',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'كل الدول',
        to: '/Countries/AllCountries',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'إضافة دولة جديدة',
        to: '/Countries/AddNewCountry',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'المواقع',
    route: '/Locations',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'الدول',
        to: '/Locations/Countries',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'المدن',
        to: '/Locations/Cities',
      },

    ],
  },


  {
    _tag: 'CSidebarNavDropdown',
    name: 'طلبات المراسلة',
    route: '/ContactUs',
    icon: 'cil-phone',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'الرسائل',
        to: '/ContactUs/messages',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'الردود',
        to: '/ContactUs/Replies',
      },
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'الاسئلة الشائعة',
    to: '/FAQs',
    icon: 'cil-align-center',
  },



  {
    _tag: 'CSidebarNavDivider',
    className: 'm-2'
  }
]

export default _nav
