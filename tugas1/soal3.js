var nimString = "049973116", nim = parseInt(nimString.slice(-8)), lastTwodigits = nim % 100, addTwodigits = lastTwodigits + 10;
var line = "";
function bilanganPrima(n) {
    if (n < 1) {
        return false;
    }
    for (var i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) {
            return false;
        }
        ;
    }
    return true;
}
console.log("NIM = " + nimString);
console.log("Bilangan Prima antara " + lastTwodigits + " sampai " + (lastTwodigits + 10) + "=");
for (var i = 1; i <= addTwodigits; i++) {
    if (bilanganPrima(i)) {
        line += i + ",";
    }
    ;
}
console.log(line.slice(0, -1));
