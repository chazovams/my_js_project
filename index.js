 var div = document.getElementById('submitButton');
 div.addEventListener('click', validate, false);

 function validate(e) {
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

	console.log(digitsSum);

	return digitsSum < 31;
}