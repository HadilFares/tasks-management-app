import React from 'react'
import Message from '../../components/Message'
import contact from "../../assets/contact.svg"
function RegisterScreen() {
    return (
        <div class="text-center">
           <Message  variant={'dark'}> Please contact your admin to add you </Message>
           <img src={contact} alt="logo"  width={"700px"} height={"400px"} />
        </div>
    )
}

export default RegisterScreen
