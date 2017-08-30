 var div = document.getElementById('submitButton');

 div.addEventListener('click', validate, false);

 function validate(e) {
 	var regexp = /^[A-Za-zА-Яа-я]+\s[A-Za-zА-Яа-я]+\s[A-Za-zА-Яа-я]+$/;
 	var fio = document.getElementsByName("fio")[0].value;
	console.log(e.target);
	console.log(regexp.test(fio));
 	
 	return regexp.test(fio);
 }