var checksum = 0;
var current;
var active = false;
var salt = 'salt';
var viewOutput = document.getElementById('view__output');
var viewInput = document.getElementById('view__input');
var viewFront = document.getElementById('view__front');
var formInput = document.getElementById('form__input');
var formFront = document.getElementById('form__front');
var inputA = document.getElementById('input__a');
var inputB = document.getElementById('input__b');
var inputC = document.getElementById('input__c');
var inputD = document.getElementById('input__d');
var inputE = document.getElementById('input__e');
var inputF = document.getElementById('input__f');
var inputEmail = document.getElementById('input__email');
var outputA = document.getElementById('output');
var outputB = document.getElementById('output__storage');
function log(e) {
    window.current = e;
}
function validate(i) {
    if (window.debug === true) { console.log(i.length); }
    if (i.length > 2) {
        if (window.debug === true) { console.log(i.length); }
        return false;
    } else {
        var input = stripVariationSelectors(i);
        if (window.debug === true) { console.log(input.length); }
        var regex = RegExp('[\u231A-\uD83E\uDDC0]', 'g');
        return regex.test(input);
    }
}
function change(e) {
    var input = e.value;
    var validation = validate(input);
    if (window.debug === true) { console.log(input); console.log(validation); }
    if (validation === false) {
        e.value = '';
        e.className = 'main__input main__input--is-error animated jello';
        setTimeout(function () {
            e.className = 'main__input main__input--is-error';
        }, 500);
        console.log('Owh, not an Emoji...');
    } if (validation === true) {
        window.checksum++;
        e.className = 'main__input main__input--is-ok';
        if (window.debug === true) { console.log(checksum); }
    }
}
function encode(data) {
    var str = String.fromCharCode.apply(null,data);
    return btoa(str).replace(/.{76}(?=.)/g,'$&\n');
}
function generate() {
    if (window.checksum >= 6) {
        if (window.debug === true) { console.log('Generating passcode...'); }
        var string = window.inputA.value + window.inputB.value +
                     window.inputC.value + window.inputD.value +
                     window.inputE.value + window.inputF.value;
        scrypt_module_factory(function (scrypt) {
            var N = Math.pow(2, 14);
            var r = 8;
            var p = 1;
            var L = 15;
            var salt = window.salt;
            if (window.debug === true) { console.log(string); }
            code = encode(scrypt.crypto_scrypt(scrypt.encode_utf8(string), scrypt.encode_utf8(salt), N, r, p, L));
        });
        if (window.debug === true) { console.log(code); }
        window.outputB.value = code;
        window.inputA.value = ''; window.inputB.value = '';
        window.inputC.value = ''; window.inputD.value = '';
        window.inputE.value = ''; window.inputF.value = '';
        window.current.blur();
        window.viewInput.className = 'main__content main__content--is-input animated zoomOut';
        setTimeout(function () {
            window.viewInput.className = 'main__content main__content--is-input amain__content main__content--is-hidden animated';
            window.viewOutput.className = 'main__content main__content--is-output animated fadeInDown';
        }, 500);
        window.outputA.className = 'main__output main__output--is-inactive';
        window.active = true;
    } if (window.checksum < 6) {
        console.log('Nope...');
    }
}
function launch() {
    var email = window.inputEmail;
    if (email.value !== '') {
        if (window.debug === true) { console.log('Generating salt...'); }
        window.salt = email.value;
        if (window.debug === true) { console.log(window.salt); }
        window.viewFront.className = 'main__content main__content--is-front animated zoomOut';
        setTimeout(function () {
            window.viewFront.className = 'main__content main__content--is-front amain__content main__content--is-hidden animated';
            window.viewInput.className = 'main__content main__content--is-input animated fadeInDown';
            window.inputA.focus();
        }, 500);
    } else {
        console.log('Nope...');
        email.className = 'main__email animated shake';
        setTimeout(function () {
            email.className = 'main__email';
        }, 1100);
    }
}
function show() {
    if (window.active === true) {
        this.value = window.outputB.value;
        this.className = 'main__output';
    }
}
function done() {
    if (window.active === true) {
        if (window.debug === true) { console.log(window.outputB.value); }
        this.value = '\uD83D\uDE4C Alright, your passcode is copied!';
        this.className = 'main__output main__output--is-inactive';
    }
}
window.addEventListener('load', function () {
    window.inputEmail.focus();
});
window.formFront.addEventListener('submit', function (e) {
    launch(e);
    e.preventDefault();
});
window.formInput.addEventListener('submit', function (e) {
    generate(e);
    e.preventDefault();
});
window.outputA.addEventListener('focus', show, true);
window.outputA.addEventListener('blur', done, true);
