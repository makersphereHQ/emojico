var strength = 32;
var checksum = 0;
var current;
var active = false;
var inputA = document.getElementById('app-input--a');
var inputB = document.getElementById('app-input--b');
var inputC = document.getElementById('app-input--c');
var inputD = document.getElementById('app-input--d');
var inputE = document.getElementById('app-input--e');
var inputF = document.getElementById('app-input--f');
var inputG = document.getElementById('app-input--g');
var output = document.getElementById('app-output');
var storage = document.getElementById('app-output__storage');
function log(e) {
    window.current = e;
}
function validate(i) {
    if (window.debug === true) { console.log(i.length); }
    if (i.length > 2) {
        if (window.debug === true) { console.log(i.length); }
        return false;
    } else {
        var regex = RegExp('[\u231A-\uD83E\uDDC0]', 'g');
        return regex.test(i);
    }
}
function change(e) {
    var input = e.value;
    var validation = validate(input);
    if (window.debug === true) { console.log(input); console.log(validation); }
    if (validation === false) {
        e.value = '';
        e.className = 'app-content__main-input app-content__main-input-is--error';
        console.log('Owh, not an Emoji...');
    } if (validation === true) {
        window.checksum++;
        e.className = 'app-content__main-input app-content__main-input-is--ok';
        if (window.debug === true) { console.log(checksum); }
    }
}
function encode(data) {
    var str = String.fromCharCode.apply(null,data);
    return btoa(str).replace(/.{76}(?=.)/g,'$&\n');
}
function generate(e) {
    if (window.checksum >= 7) {
        if (window.debug === true) { console.log('Generating passcode...'); }
        var string = window.inputA.value + window.inputB.value +
                     window.inputC.value + window.inputD.value +
                     window.inputE.value + window.inputF.value +
                     window.inputG.value;
        scrypt_module_factory(function (scrypt) {
            var N = Math.pow(2, 14);
            var r = 8;
            var p = 1;
            var L = 40;
            var salt = 'salt';
            if (window.debug === true) { console.log(string); }
            code = encode(scrypt.crypto_scrypt(scrypt.encode_utf8(string), scrypt.encode_utf8(salt), N, r, p, L));
        });
        if (window.debug === true) { console.log(code); }
        window.storage.value = code;
        window.inputA.value = ''; window.inputB.value = '';
        window.inputC.value = ''; window.inputD.value = '';
        window.inputE.value = ''; window.inputF.value = '';
        window.inputG.value = '';
        window.current.blur();
        window.output.className = 'app-output__field app-output__field--is-inactive';
        window.active = true;
    } if (window.checksum < 7) {
        console.log('Nope...');
    }
}
function show(e) {
    if (window.active === true) {
        e.value = window.storage.value;
        e.className = 'app-output__field';
    }
}
function done(e) {
    if (window.active === true) {
        if (window.debug === true) { console.log(window.storage.value); }
        e.value = '\uD83D\uDE4C Alright, your passcode is copied!';
        e.className = 'app-output__field app-output__field--is-inactive';
    }
}
