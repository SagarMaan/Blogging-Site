
//-----------GLOBAL REGX FUNCTION---------//


function validateName(id) {

    let regex = /^[a-zA-Z ]{1,30}$/;
    return regex.test(id);
  
  }
  
  function validatePass(id) {
  
    let regex = /^((?=.*[a-zA-Z])(?=.*\d).{8,20}$).*$/;
    return regex.test(id);
  
  }
  
  function validateEmail(id) {
  
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(id);
  
  }
  
  //----------------------------------------------------------------------------------//
  