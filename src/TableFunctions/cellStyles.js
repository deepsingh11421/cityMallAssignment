const nameValidation = (params) => {
    if(params.data.Name === null){
      return {
        backgroundColor: 'transparent'
      }
    }
    if(params.data.Name.length <= 0){
      return {
        backgroundColor: 'red'
      }
    }else if(params.data.Name.length < 3){
      return {
        backgroundColor: 'yellow'
      }
    }else{
      return {backgroundColor: 'transparent'}
    }
  }

  const idValidation = (params) => {
    if(params.data.id === null){
      return {
        backgroundColor: 'transparent'
      }
    }
    if(params.data.id.length <= 0){
      return {
        backgroundColor: 'red'
      }
    }else{
      return {backgroundColor: 'transparent'}
    }
  }

  const emailValidation = (params) => {
    if(params.data.Email === null){
      return {
        backgroundColor: 'transparent'
      }
    }
    if(params.data.Email.length <= 0){
      return {
        backgroundColor: 'red'
      }
    }
    var x=params.data.Email;  
    var atposition=x.indexOf("@");  
    var dotposition=x.lastIndexOf(".");  
    if (atposition<1 || dotposition<atposition+2 || dotposition+2>=x.length){  
      return {backgroundColor: 'yellow'};  
    }  
    return {backgroundColor: 'transparent'};
  }

  const genderValidation = (params) => {
    if(params.data.Gender === null){
      return {
        backgroundColor: 'transparent'
      }
    }
    if(params.data.Gender === ''){
      return {backgroundColor: 'red'}
    }else{
      return {backgroundColor: 'transparent'}
    }
  }

  const dobValidation = (params) => {
    if(params.data.DOB === null){
      return {
        padding: 0,
        backgroundColor: 'transparent'
      }
    }
    if(params.data.DOB === ''){
      return {
        padding: 0,
        backgroundColor: 'red'
      }
    }else{
      return {
        padding: 0,
        backgroundColor: 'transparent'
      }
    }
  }

  const countryValidation = (params) => {
    if(params.data.Country === null){
      return {
        backgroundColor: 'transparent'
      }
    }
    if(params.data.Country === ''){
      return {
        backgroundColor: 'red'
      }
    }else{
      return {
        backgroundColor: 'transparent'
      }
    }
  }

  const cityValidation = (params) => {
    if(params.data.City === null){
      return {
        backgroundColor: 'transparent'
      }
    }
    if(params.data.City === ''){
      return {
        backgroundColor: 'red'
      }
    }else{
      return {
        backgroundColor: 'transparent'
      }
    }
  }

  export {idValidation,nameValidation,emailValidation,genderValidation,dobValidation,countryValidation,cityValidation};