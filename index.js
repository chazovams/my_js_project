 var MyForm = {
 	validate: validate,
 	getData: getData,
 	setData: setData,
 	submit: submit
 }

 var submitButton = document.getElementById('submitButton');
 submitButton.addEventListener('click', submitIfValid, false);

 function submitIfValid() {
 	if (MyForm.validate().isValid) {
 		MyForm.submit();
 	}
 }

 function validate() {
 	var validationResult = {
 		isValid : true,
 		invalidFields: []
 	}

 	var form = document.getElementById("myForm");

 	if (!validateFio(form.fio)) {
 		validationResult.isValid = false;
 		validationResult.invalidFields.push(form.fio.name);
 		form.fio.classList.add("error");
 	} else {
 		form.fio.classList.remove("error");
 	}

 	if (!validateEmail(form.email)) {
 		validationResult.isValid = false;
 		validationResult.invalidFields.push(form.email.name);
 		form.email.classList.add("error");
 	} else {
 		form.email.classList.remove("error");
 	}

 	if (!validatePhone(form.phone)) {
 		validationResult.isValid = false;
 		validationResult.invalidFields.push(form.phone.name);
 		form.phone.classList.add("error");
 	} else {
 		form.phone.classList.remove("error");
 	}

 	form.submitButton.disabled = validationResult.isValid;

 	return validationResult;
 }

 function validateFio(fio) {
 	var regexp = /^[A-Za-zА-Яа-я]+\s[A-Za-zА-Яа-я]+\s[A-Za-zА-Яа-я]+$/;
 	return regexp.test(fio.value);
 }

function validateEmail(email) {  
	var regexp = /@((ya)|(yandex))\.((ru)|(ua)|(by)|(kz)|(com))$/;
  	return email.validity.valid & regexp.test(email.value);
}  

function validatePhone(phone) {
	var regexp = /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/;

	if(!regexp.test(phone.value)) {
		return false;
	}

	var digits = phone.value.match(new RegExp(/\d/, 'g'));

	if (digits.length != 11) {
		return false;
	}

	var digitsSum = 0;

	digits.forEach(function(item) {
		digitsSum += parseInt(item);
	})

	return digitsSum < 31;
}

function getData() {
	var form = document.getElementById("myForm");

	var dataObject = {};
	dataObject[form.fio.name] = form.fio.value;
	dataObject[form.email.name] = form.email.value;
	dataObject[form.phone.name] = form.phone.value;

	return dataObject;
}

function setData(dataObject) {
	var form = document.getElementById("myForm");

	form.fio.value = dataObject[form.fio.name];
	form.email.value = dataObject[form.email.name];
	form.phone.value = dataObject[form.phone.name];
}

function submit() {
  var form = document.getElementById("myForm"); 
  var formData = MyForm.getData();

  $.ajax({
      url: form.action,
  	  dataType: "json",
      data: formData,
      success: function(data) {
          var response = jQuery.parseJSON(data); 

          var resultField = document.querySelector("#resultContainer");
          resultField.className = "";

          if (response.status == "success") {  
              resultField.innerHTML = ("Success");
              resultField.classList.add("success");
          } else if (response.status == "error") {
			  resultField.innerHTML = (response.reason);
          	  resultField.classList.add("error");
          } else if (response.status == "progress") {
          	  resultField.classList.add("progress");
          	  setTimeout(submit(), response.timeout)
          }
      }
  })
};