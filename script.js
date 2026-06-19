/* =========================
   DARK MODE
========================= */

const themeToggle = document.getElementById("themeToggle");

if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme","dark");
        themeToggle.textContent = "☀️";
    }else{
        localStorage.setItem("theme","light");
        themeToggle.textContent = "🌙";
    }
});


/* =========================
   COPY FUNCTION
========================= */

function copyText(id){

    const element = document.getElementById(id);

    if(!element || !element.textContent.trim()){
        alert("Nothing to copy");
        return;
    }

    navigator.clipboard.writeText(
        element.textContent
    );

    alert("Copied!");
}


/* =========================
   AGE CALCULATOR
========================= */

function calculateAge(){

    const birth =
    document.getElementById("birthDate").value;

    const result =
    document.getElementById("ageResult");

    if(!birth){
        result.textContent =
        "Please select birth date";
        return;
    }

    const birthDate = new Date(birth);
    const today = new Date();

    let years =
    today.getFullYear() -
    birthDate.getFullYear();

    let months =
    today.getMonth() -
    birthDate.getMonth();

    let days =
    today.getDate() -
    birthDate.getDate();

    if(days < 0){
        months--;
        days += 30;
    }

    if(months < 0){
        years--;
        months += 12;
    }

    result.textContent =
    `${years} Years ${months} Months ${days} Days`;
}

function resetAge(){

    document.getElementById("birthDate").value = "";
    document.getElementById("ageResult").textContent = "";
}


/* =========================
   QR GENERATOR
========================= */

function generateQR(){

    const text =
    document.getElementById("qrText").value.trim();

    const qr =
    document.getElementById("qrContainer");

    if(!text){
        qr.innerHTML =
        "<p>Please enter text</p>";
        return;
    }

    const url =
    `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(text)}`;

    qr.innerHTML =
    `<img src="${url}" alt="QR Code">`;
}

function resetQR(){

    document.getElementById("qrText").value = "";
    document.getElementById("qrContainer").innerHTML = "";
}


/* =========================
   PASSWORD GENERATOR
========================= */

function generatePassword(){

    const length =
    parseInt(
        document.getElementById("passwordLength").value
    );

    const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

    let password = "";

    for(let i=0;i<length;i++){

        password += chars.charAt(
            Math.floor(
                Math.random() * chars.length
            )
        );
    }

    document.getElementById(
        "passwordResult"
    ).textContent = password;
}

function resetPassword(){

    document.getElementById(
        "passwordResult"
    ).textContent = "";

    document.getElementById(
        "passwordLength"
    ).value = 12;
}


/* =========================
   IMAGE COMPRESSOR
========================= */

function compressImage(){

    const file =
    document.getElementById("imageInput")
    .files[0];

    if(!file){
        alert("Select image first");
        return;
    }

    const reader = new FileReader();

    reader.onload = function(e){

        const img = new Image();

        img.onload = function(){

            const canvas =
            document.getElementById("canvas");

            const ctx =
            canvas.getContext("2d");

            canvas.width =
            img.width * 0.7;

            canvas.height =
            img.height * 0.7;

            ctx.drawImage(
                img,
                0,
                0,
                canvas.width,
                canvas.height
            );

            canvas.style.display =
            "block";

            const compressed =
            canvas.toDataURL(
                "image/jpeg",
                0.6
            );

            const download =
            document.getElementById(
                "downloadImage"
            );

            download.href = compressed;
            download.style.display =
            "inline-block";
        };

        img.src = e.target.result;
    };

    reader.readAsDataURL(file);
}

function resetCompressor(){

    document.getElementById(
        "imageInput"
    ).value = "";

    document.getElementById(
        "canvas"
    ).style.display = "none";

    document.getElementById(
        "downloadImage"
    ).style.display = "none";
}


/* =========================
   BMI CALCULATOR
========================= */

function calculateBMI(){

    const weight =
    parseFloat(
        document.getElementById("weight").value
    );

    const height =
    parseFloat(
        document.getElementById("height").value
    ) / 100;

    const result =
    document.getElementById("bmiResult");

    if(!weight || !height){

        result.textContent =
        "Enter valid values";

        return;
    }

    const bmi =
    weight / (height * height);

    result.textContent =
    `BMI: ${bmi.toFixed(2)}`;
}

function resetBMI(){

    document.getElementById("weight").value="";
    document.getElementById("height").value="";
    document.getElementById("bmiResult").textContent="";
}


/* =========================
   GST CALCULATOR
========================= */

function calculateGST(){

    const amount =
    parseFloat(
        document.getElementById("gstAmount").value
    );

    const rate =
    parseFloat(
        document.getElementById("gstRate").value
    );

    const result =
    document.getElementById("gstResult");

    if(isNaN(amount) || isNaN(rate)){
        result.textContent =
        "Enter valid values";
        return;
    }

    const gst =
    amount * rate / 100;

    const total =
    amount + gst;

    result.textContent =
    `GST: ₹${gst.toFixed(2)}
Total: ₹${total.toFixed(2)}`;
}

function resetGST(){

    document.getElementById("gstAmount").value="";
    document.getElementById("gstRate").value="";
    document.getElementById("gstResult").textContent="";
}


/* =========================
   SCIENTIFIC CALCULATOR
========================= */

function appendCalc(value){

    document.getElementById(
        "calcDisplay"
    ).value += value;
}

function calculateExpression(){

    try{

        document.getElementById(
            "calcDisplay"
        ).value =
        eval(
            document.getElementById(
                "calcDisplay"
            ).value
        );

    }catch{

        alert("Invalid expression");
    }
}

function clearCalc(){

    document.getElementById(
        "calcDisplay"
    ).value = "";
}


/* =========================
   TIMER
========================= */

let timerInterval;

function startTimer(){

    clearInterval(timerInterval);

    let minutes =
    parseInt(
        document.getElementById(
            "timerMinutes"
        ).value
    );

    if(isNaN(minutes)){
        alert("Enter minutes");
        return;
    }

    let seconds =
    minutes * 60;

    timerInterval =
    setInterval(() => {

        const min =
        Math.floor(seconds / 60);

        const sec =
        seconds % 60;

        document.getElementById(
            "timerDisplay"
        ).textContent =
        `${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;

        if(seconds <= 0){

            clearInterval(
                timerInterval
            );

            alert(
                "Time Finished!"
            );
        }

        seconds--;

    },1000);
}

function resetTimer(){

    clearInterval(timerInterval);

    document.getElementById(
        "timerMinutes"
    ).value = "";

    document.getElementById(
        "timerDisplay"
    ).textContent = "00:00";
}


/* =========================
   TAP COUNTER
========================= */

let tapCount =
parseInt(
localStorage.getItem("tapCount")
) || 0;

document.getElementById(
"tapCount"
).textContent = tapCount;

function increaseTap(){

    tapCount++;

    localStorage.setItem(
        "tapCount",
        tapCount
    );

    document.getElementById(
        "tapCount"
    ).textContent = tapCount;
}

function resetTap(){

    tapCount = 0;

    localStorage.setItem(
        "tapCount",
        tapCount
    );

    document.getElementById(
        "tapCount"
    ).textContent = tapCount;
}


/* =========================
   UNIT CONVERTER
========================= */

function convertKM(){

    const km =
    parseFloat(
        document.getElementById(
            "kmInput"
        ).value
    );

    if(isNaN(km)){

        document.getElementById(
            "unitResult"
        ).textContent =
        "Enter value";

        return;
    }

    const miles =
    km * 0.621371;

    document.getElementById(
        "unitResult"
    ).textContent =
    `${km} KM = ${miles.toFixed(2)} Miles`;
}

function resetUnit(){

    document.getElementById(
        "kmInput"
    ).value = "";

    document.getElementById(
        "unitResult"
    ).textContent = "";
}

/* =========================
   BUTTON SOUND + VIBRATION
========================= */

const clickSound = new Audio(
'data:audio/wav;base64,UklGRlQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YTAAAAAA////AAAA////AAAA////AAAA////'
);

document.querySelectorAll("button").forEach(button => {

    button.addEventListener("click", () => {

        // Vibration
        if(navigator.vibrate){
            navigator.vibrate(30);
        }

        // Sound
        clickSound.currentTime = 0;

        clickSound.play().catch(() => {});
    });

});

/* =========================
   PDF GENERATOR
========================= */

function generatePDF(){

    const text =
    document.getElementById("pdfText").value.trim();

    if(!text){
        alert("Please enter some text");
        return;
    }

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.text(text, 10, 20);

    doc.save("document.pdf");
}

function resetPDF(){

    document.getElementById(
        "pdfText"
    ).value = "";
}

function downloadQR(){

    const qrImage =
    document.querySelector("#qrContainer img");

    if(!qrImage){
        alert("Generate QR first");
        return;
    }

    const link =
    document.createElement("a");

    link.href = qrImage.src;
    link.download = "qr-code.png";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
