var nimString: string = "049973116",
nim = parseInt(nimString.slice(-8)),
tinggiSegitiga = nim % 10;

function segitiga(nilaitinggi: number): void {
    for (let i = 1; i <= nilaitinggi; i++) {
        let line: string = "";
        for (let j = 1; j <= i; j++) {
            line += j + " ";
        }
        console.log(line.trim());
    }
}

console.log("NIM = " + nimString);
console.log("TInggi Segitiga = " + tinggiSegitiga);
segitiga(tinggiSegitiga);
