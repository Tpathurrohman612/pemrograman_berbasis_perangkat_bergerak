var nimString = "049973116", nim = parseInt(nimString.slice(-8)), tinggiSegitiga = nim % 10;
function segitiga(nilaitinggi) {
    for (var i = 1; i <= nilaitinggi; i++) {
        var line = "";
        for (var j = 1; j <= i; j++) {
            line += j + " ";
        }
        console.log(line.trim());
    }
}
console.log("NIM = " + nimString);
console.log("TInggi Segitiga = " + tinggiSegitiga);
segitiga(tinggiSegitiga);
