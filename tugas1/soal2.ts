var nimString: string = "049973116",
nim = parseInt(nimString.slice(-8)),
lastTwodigits = nim % 100,
last3digits = parseInt(nimString.slice(-3, -2));

function deretAritmatika(n: number): void {
    let step: number = last3digits + 1,
    line: string ="";
    for (let i = 0; i <= 10; i++) {
        line += n + ",";
        n += step;
    }
    console.log(line.slice(0,-1));
}

console.log("NIM = " + nimString);
console.log("Jumlah Step = " + (last3digits + 1));
console.log("Deret Aritmatika = ");
deretAritmatika(lastTwodigits);
