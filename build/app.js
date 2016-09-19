var strength = 32;
var checksum = 0;
var current;
var active = false;
var inputA = document.getElementById('app-input--a');
var inputB = document.getElementById('app-input--b');
var inputC = document.getElementById('app-input--c');
var inputD = document.getElementById('app-input--d');
var output = document.getElementById('app-output');
var storage = document.getElementById('app-output__storage');
function log(e){window.current = e;}
function validate(i){
	console.log(i.length);
	if (i.length > 2) {
		console.log(i.length);
		return false;
	} else {
		var regex = RegExp('[\u231A-\uD83E\uDDC0]', 'g');
		return regex.test(i);
	}
}
function change(e){
	var input = e.value;
	var validation = validate(input);
	console.log(input); console.log(validation);
	if (validation === false) {
		e.value = '';
		e.className = 'app-content__main-input app-content__main-input-is--error';
		console.log('Owh, not an Emoji...');
	} if (validation === true) {
		window.checksum++;
		e.className = 'app-content__main-input app-content__main-input-is--ok';
		console.log(checksum);
	}
}
function generate(e){
	if (window.checksum >= 4) {
		console.log('Generating passcode...');
		var string = window.inputA.value + window.inputB.value + window.inputC.value + window.inputD.value;
		var shaF = new jsSHA('SHA-512', 'TEXT');
		var shaT = new jsSHA('SHA-256', 'TEXT');
		var updateF = shaF.update(string);
		var hashF = shaF.getHash('HEX');
		var updateT = shaT.update(hashF);
		var hashT = shaT.getHash('HEX');
		var hashB = btoa(hashT);
		var code = hashB.substring(0, strength);
		console.log(code);
		window.storage.value = code;
		window.inputA.value = ''; window.inputB.value = ''; window.inputC.value = ''; window.inputD.value = '';
		window.current.blur();
		window.output.className = 'app-output__field app-output__field--is-inactive';
		window.active = true;
	} if (window.checksum != 4) {
		console.log('Nope...');
	}
}
function show(e){
	if (window.active === true) {
		e.value = window.storage.value;
		e.className = 'app-output__field';
	}
}
function done(e){
	if (window.active === true) {
		console.log(window.storage.value);
		e.value = '\uD83D\uDE4C Alright, your passcode is copied!';
		e.className = 'app-output__field app-output__field--is-inactive';
	}
}
