
export const ValidateData = (email , password ) =>{
    const isValidEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email)
    const isValidPassword = password;

    if(!isValidEmail) return 'Email not valid'
    if(!isValidPassword) return 'Password not valid'
    return null

}