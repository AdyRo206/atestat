const telefoane = {
    "Galaxy S24": {
        "Display": "6.1 inch",
        "Memorie": "Up to 512 GB",
        "Ram": "8 GB",
        "Baterie": "4000 mAh",
        "Preț": "4299 lei",
        "Imagine": "../assets/galaxy_s24.avif"
    },
    "Galaxy S24 Plus": {
        "Display": "6.4 inch",
        "Memorie": "Up to 512 GB",
        "Ram": "8 GB",
        "Baterie": "4400 mAh",
        "Preț": "4500 lei",
        "Imagine": "../assets/galaxy_s24.avif"
    },
    "Galaxy S24 FE": {
        "Display": "6.1 inch",
        "Memorie": "Up to 512 GB",
        "Ram": "8 GB",
        "Baterie": "4400 mAh",
        "Preț": "4199 lei",
        "Imagine": "../assets/galaxy_s24fe.avif"
    },
    "Galaxy S24 Ultra": {
        "Display": "6.9 inch",
        "Memorie": "Up to 1 TB",
        "Ram": "Up to 12 GB",
        "Baterie": "5000 mAh",
        "Preț": "5199 lei",
        "Imagine": "../assets/galaxy_s24ultra.png"
    },
    "Galaxy Z Fold6": {
        "Display": "7.6 inch pliabil",
        "Memorie": " Up to 1 TB",
        "Ram": "12 GB",
        "Baterie": "5000 mAh",
        "Preț": "10599 lei",
        "Imagine": "../assets/fold6_navy.avif"
    },
    "Galaxy Z Flip6": {
        "Display": "6.4 inch pliabil",
        "Memorie": "Up to 1 TB",
        "Ram": "12 GB",
        "Baterie": "4500 mAh",
        "Preț": "5999 lei",
        "Imagine": "../assets/z_flip6_yellow.webp"
    },
    "Galaxy A35": {
        "Display": "6.4 inch",
        "Memorie": "Up to 512 GB",
        "Ram": "8 GB",
        "Baterie": "4000 mAh",
        "Preț": "1499 lei",
        "Imagine": "../assets/galaxy_a35.avif"
    },
    "Galaxy A55": {
        "Display": "6.4 inch",
        "Memorie": "Up to 512 GB",
        "Ram": "8 GB",
        "Baterie": "4400 mAh",
        "Preț": "1899 lei",
        "Imagine": "../assets/galaxy_a55.avif"
    }
};

function compara() {
    const telefon1 = document.getElementById('telefon1').value;
    const telefon2 = document.getElementById('telefon2').value;

    if (telefon1 === telefon2) {
        document.getElementById('rezultat').innerHTML = "Te rog să selectezi două telefoane diferite.";
        return;
    }

    const specs1 = telefoane[telefon1];
    const specs2 = telefoane[telefon2];

    let rezultat = `<h2>Comparație între ${telefon1} și ${telefon2}</h2>`;
    rezultat += "<table><tr><th>Specificatie</th><th>" + telefon1 + "</th><th>" + telefon2 + "</th></tr>";

    rezultat += `<tr>
                    <td>Imagine</td>
                    <td><img src="${specs1.Imagine}" alt="${telefon1}" style="width:100px;height:auto;"></td>
                    <td><img src="${specs2.Imagine}" alt="${telefon2}" style="width:100px;height:auto;"></td>
                 </tr>`;

for (let specificatie in specs1) {
    if (specificatie !== "Imagine") { 
    rezultat += `<tr>
                    <td>${specificatie}</td>
                    <td>${specs1[specificatie]}</td>
                    <td>${specs2[specificatie]}</td>
                </tr>`;
    }
}

    rezultat += `<tr>
    <td></td>
    <td><button onclick="location.href='#'">Cumpără</button></td>
    <td><button onclick="location.href='#'">Cumpără</button></td>
 </tr>`;

    rezultat += "</table>";
    
    document.getElementById('rezultat').innerHTML = rezultat;
}
