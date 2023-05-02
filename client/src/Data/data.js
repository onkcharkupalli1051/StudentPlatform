import { useSelector } from "react-redux";

import React from 'react'
let user;

export const Temp = () => {
    user = useSelector((state) => state.user);
  return (
    <></>
  )
}

export const SidebarMenu = [
    {
        name: 'Home Page',
        path: '/',
        icon: 'fa-solid fa-house'
    },
    {
        name: 'My Schedule',
        path: '/userschedule',
        icon: 'fa-solid fa-solid fa-clock'
    },
    {
        name: 'Habit Report',
        path: '/habitreport',
        icon: 'fa-solid fa-file'
    },
    {
        name: 'Track Progress',
        path: '/trackprogress',
        icon: 'fa-solid fa-bars-progress'
    },
    {
        name: 'My Profile',
        path: `/userprofile/${user?._id}`,
        icon: 'fa-solid fa-user'
    },
]