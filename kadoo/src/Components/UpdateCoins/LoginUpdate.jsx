import React, { useEffect, useState } from 'react'

export default function LoginUpdate() {
    const[login,setLogin]=useState(false)
    const[handle,setHandle]=useState(true)

    useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(),
    }
    fetch('http://127.0.0.1:8000/api/coin/daily-login-update/', requestOptions)
    .then((response) => response.json())
    .then((data) => {
      setLogin(true)
    })
    }, [handle]);

    useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(),
    }
    fetch('http://127.0.0.1:8000/api/coin/daily-login-update/', requestOptions)
    .then((response) => response.json())
    .then((data) => {
    })
    }, [login]);

    return (
        <div></div>
        )}