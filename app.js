// images = [
//     "https://daring.uin-suka.ac.id/pic2/g3ydcmbwg15t1mbtgm",
//     "https://daring.uin-suka.ac.id/pic2/g3ydcmbwg15t1mbtgq",
//     "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbqg2",
//     "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbqg3",
//     "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbqgm",
//     "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbqgq",
//     "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbqgA",
//     "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbqgy",
//     "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbqg7",
//     "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbqh1",
//     "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbqh2",
//     "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbrg1",
//     "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbrg2",
//     "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbrg3",
//     "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbrgm",
//     "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbrgq",
//     "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbrgA",
//     "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbrgy",
//     "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbrg7",
//     "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbrh1",
//     "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbrh2",
//     "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbsg1",
//     "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbsg2",
//     "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbsg3",
//     "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbsgm",
//     "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbsgq",
//     "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbsgA",
//     "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbsgy",
//     "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbsg7",
//     "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbsh1",
//     "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbsh2"
// ]  

class Mahasiswa {

    #nama
    #nama_panggilan
    #tahun_angkatan
    #nim
    #foto
    #asal

    constructor(nama, nama_panggilan, tahun_angkatan, nim, foto, asal, kata_kata){
        this.#nama = nama
        this.#nama_panggilan = nama_panggilan
        this.#tahun_angkatan = tahun_angkatan
        this.#nim = nim
        this.#foto = foto
        this.#asal = asal
        this.kata_kata = kata_kata
    }

    getNama(){
        return this.#nama
    }

    getNamaPanggilan(){
        return this.#nama_panggilan
    }

    getFoto(){
        return this.#foto
    }

    getAsal(){
        return this.#asal
    }

    getNIM(){
        let tahun_angkatan = this.#tahun_angkatan
        let nim = this.#nim

        return `${tahun_angkatan}1060500${nim > 9 ? nim : `0${nim}`}`
    }

    static generateGrid(firstTime){
        const gridMahasiswa = document.querySelector(".grid-mahasiswa")
        const results = document.querySelector(".results")
        const zeroResult = document.querySelector(".zero-result")

        zeroResult.style.display = "none"

        if (!firstTime){
            gridMahasiswa.innerHTML = ""
        }

        let array = [...showArrayMahasiswa]

        // gender filtering
        if (gender !== "All genders"){
            array = [...showArrayMahasiswa].filter(mahasiswa => mahasiswa.jenis_kelamin.toLowerCase() == gender.toLowerCase())
        }

        // sorting array
        if (sort == "Alphabet"){
            array = [...array].sort((a, b) => a.getNama().localeCompare(b.getNama()))
        }

        // fill the grid
        for (let mahasiswa of array){
            gridMahasiswa.innerHTML += 
            `<div class="mahasiswa" nim="${mahasiswa.getNIM()}">
                <div class="img"><img src="${mahasiswa.getFoto()}" alt="${mahasiswa.getNama()}"></div>
                <div class="info">
                    <div class="nama">${mahasiswa.getNamaPanggilan().includes("Zidan") ? "Zidan" : mahasiswa.getNamaPanggilan()}</div>
                    <div class="nim">${mahasiswa.getNIM()}</div>
                </div>
            </div>`
        } 

        // showing result
        results.innerText = `Showing ${gridMahasiswa.children.length} results`

        // if there is no result
        if (gridMahasiswa.children.length == 0){
            zeroResult.style.display = "block"
        }

        // action when click on mahasiswa
        const mahasiswas = document.querySelectorAll(".mahasiswa")

        mahasiswas.forEach(mahasiswa => {
            mahasiswa.addEventListener("click", () => {
                Mahasiswa.clickMahasiswa(mahasiswa.getAttribute("nim"))
            })
        })
    }

    static clickMahasiswa(nim){
        let selectedMahasiswa = [...showArrayMahasiswa].filter(mahasiswa => mahasiswa.getNIM() == nim)[0]

        const detailMahasiswaContainer = document.querySelector(".detail-mahasiswa-container")
        const overlayElement = document.querySelector(".overlay")

        detailMahasiswaContainer.innerHTML = 
        `<div class="mahasiswa">
            <div class="img">
                <img src="${selectedMahasiswa.getFoto()}" alt="${selectedMahasiswa.getNama()}">
            </div>
            <table class="info">
                <tr>
                    <td class="label">Nama</td>
                    <td>
                        <div class="nama">
                            <span>${selectedMahasiswa.getNama()}</span>
                            ${selectedMahasiswa.jenis_kelamin == "male" ?
                            `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-gender-male male" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M10 14m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0"></path>
                                <path d="M19 5l-5.4 5.4"></path>
                                <path d="M19 5h-5"></path>
                                <path d="M19 5v5"></path>
                            </svg>` : 
                            `<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-gender-female female" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M12 9m-5 0a5 5 0 1 0 10 0a5 5 0 1 0 -10 0"></path>
                                <path d="M12 14v7"></path>
                                <path d="M9 18h6"></path>
                            </svg>`}
                        </div>
                    </td>
                </tr>
                <tr>
                    <td class="label">Nama Panggilan</td>
                    <td>${selectedMahasiswa.getNamaPanggilan()}</td>
                </tr>
                <tr>
                    <td class="label">NIM</td>
                    <td>${selectedMahasiswa.getNIM()}</td>
                </tr>
                <tr>
                    <td class="label">Asal kota</td>
                    <td>${selectedMahasiswa.getAsal()}</td>
                </tr>
                <tr>
                    <td class="label">Kata-kata hari ini</td>
                    <td>${selectedMahasiswa.kata_kata}</td>
                </tr>
            </table>
        </div>
        <div class="close-btn">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M18 6l-12 12"></path>
                <path d="M6 6l12 12"></path>
            </svg>
        </div>`

        // show detailMahasiswa
        detailMahasiswaContainer.classList.add("active")
        overlayElement.classList.add("active")
        
        // close detailMahasiswa
        document.querySelector(".close-btn").addEventListener("click", () => {
            detailMahasiswaContainer.innerHTML = ""
            detailMahasiswaContainer.classList.remove("active")
            overlayElement.classList.remove("active")
        })
        overlayElement.addEventListener("click", () => {
            detailMahasiswaContainer.innerHTML = ""
            detailMahasiswaContainer.classList.remove("active")
            overlayElement.classList.remove("active")
        })
    }
}

class MahasiswaLakiLaki extends Mahasiswa {
    jenis_kelamin = "male"
}

class MahasiswaPerempuan extends Mahasiswa {
    jenis_kelamin = "female"
}

let arrayMahasiswa = [
    new MahasiswaLakiLaki(
        "Sstri Haris Abdurizal", 
        "Satria", 
        20, 33, "https://daring.uin-suka.ac.id/pic2/g3ydcmbwg15t1mbtgm",
        "",
        ""
    ),
    new MahasiswaLakiLaki(
        "Tegar Bagus Wicaksono", 
        "Tegar", 
        21, 34, "https://daring.uin-suka.ac.id/pic2/g3ydcmbwg15t1mbtgq",
        "",
        ""
    ),
    new MahasiswaLakiLaki(
        "Muhammad Eka Widya Atmaja", 
        "Ka", 
        22, 1, "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbqg2", 
        "NTB", 
        "Apa aj deh"
    ),
    new MahasiswaPerempuan(
        "Kiki Puspita Sari", 
        "Kiki", 
        22, 2, "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbqg3",
        "",
        ""
    ),
    new MahasiswaLakiLaki(
        "Muhammad Dedad Fajarsodiq Akastangga", 
        "Dedad", 
        22, 3, "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbqgm", 
        "Bima", 
        "Balance is a process not a destination"
    ),
    new MahasiswaPerempuan(
        "Qonita Nadya Ramadhani", 
        "Nita", 
        22, 4, "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbqgq",
        "Boyolali",
        "Gabisa berkata-kata 😁"
    ),
    new MahasiswaLakiLaki(
        "Bagus Adhitama", 
        "Adhit/Lopi", 
        22, 5, "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbqgA", 
        "Klaten", 
        "Meminta izin itu lebih sulit daripada meminta maaf."
    ),
    new MahasiswaLakiLaki(
        "Mochammad Cah Anugrah Gusti",
        "Gusti", 
        22, 6, "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbqgy",
        "Yogyakarta",
        "Seburuk apapun masa lalumu, itu telah berlalu. Sekarang, fokus untuk kebahagiaan dirimu di masa depan"
    ),
    new MahasiswaLakiLaki(
        "Muhammad Jamaluddin", 
        "Jamal", 
        22, 7, "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbqg7", 
        "Pati", 
        "Alhamdulillah"
    ),
    new MahasiswaPerempuan(
        "Alya Azzahra",
        "Alya", 
        22, 8, "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbqh1",
        "",
        ""
    ),
    new MahasiswaLakiLaki(
        "Abdullah Ridho Laksmana", 
        "Idok", 
        22, 9, "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbqh2", 
        "Sukabumi", 
        "kode aj gk ada titik koma bisa eror, apalagi hidup gweh tanpa loh 🤫"
    ),
    new MahasiswaLakiLaki(
        "Muhammad Abdurrouf Firmansyah",
        "Roup",
        22, 10, "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbrg1",
        "Blitar",
        "malu bertanya tau-tau minum susu buat 50 tahun keatas. Mana udh habis se box..🥹🥹"
    ),
    new MahasiswaPerempuan(
        "Firdy Dwi Aryani",
        "Firdy", 
        22, 11, "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbrg2",
        "Rangkasbitung",
        "Sesungguhnya masang gas ke kompor portable susah banget rek"
    ),
    new MahasiswaLakiLaki(
        "Faturrohman Fairuz Zaki", 
        "Fatur", 
        22, 12, "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbrg3", 
        "Wonogiri", 
        "Tetap semangat🥹"
    ),
    new MahasiswaLakiLaki(
        "Hasan Al Haidar", 
        "Hasan", 
        22, 13, "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbrgm", 
        "Wonogiri", 
        "Kunci menang by1 adalah kerjasama tim"
    ),
    new MahasiswaPerempuan(
        "Sri Harmonis", 
        "Monis", 
        22, 14, "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbrgq", 
        "Indramayu", 
        "https://vt.tiktok.com/ZSNh1hQGU/"
    ),
    new MahasiswaPerempuan(
        "Husnul Khatimah",
        "Husnul", 
        22, 15, "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbrgA",
        "",
        ""
    ),
    new MahasiswaLakiLaki(
        "Zidane Zahran Lazuar Purnomo", 
        "Zidan, Dan Zahran, Sahabat Sapi, SS, Yidan, Zizah, Jidun, Tong, dll💀", 
        22, 16, "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbrgy", 
        "Sleman", 
        "Jika anda tidak berawal dari keluarga sukses, maka keluarga sukses itu harus dimulai dari anda"
    ),
    new MahasiswaLakiLaki(
        "Amiruzidan Hafauzani Kholid",
        "Amir", 
        22, 17, "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbrg7",
        "",
        ""
    ),
    new MahasiswaPerempuan(
        "Chasna Lazuardi Nafis", 
        "Chasna", 
        22, 18, "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbrh1", 
        "Cilacap", 
        "Kalo take away nasi padang, pisahlah kuahnya. Telat dikit rasanya asem :)"
    ),
    new MahasiswaLakiLaki(
        "Rizki Surya Nugroho", 
        "Sureee ya", 
        22, 19, "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbrh2", 
        "Cilacap", 
        "Tuluse ati bakal kalah karo baguse rai😔"
    ),
    new MahasiswaLakiLaki(
        "Rafi Alaudin Al Hafidz",
        "Rafi", 
        22, 20, "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbsg1",
        "",
        ""
    ),
    new MahasiswaLakiLaki(
        "Mufid Bahaudin Nugroho", 
        "Mufid", 
        22, 21, "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbsg2", 
        "Sleman", 
        "Easy learn, hard master"
    ),
    new MahasiswaLakiLaki(
        "Muhammad Alkautsar Fathur Rohim",
        "Alka", 
        22, 22, "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbsg3",
        "",
        ""
    ),
    new MahasiswaLakiLaki(
        "Hernadhif Rafif Wiryawan",
        "Nadhif", 
        22, 23, "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbsgm",
        "Yogyakarta",
        "Menggila"
    ),
    new MahasiswaLakiLaki(
        "Raffausta Abyasa Riano",
        "Raffa",
        22, 24, "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbsgq", 
        "Pekanbaru",
        "Kuda lumping asli Wonogiri😅"
    ),
    new MahasiswaLakiLaki(
        "Muhammad Faris Bakri",
        "Faris", 
        22, 25, "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbsgA",
        "",
        ""
    ),
    new MahasiswaLakiLaki(
        "Luthfi Arif Syauqi",
        "Luthfi", 
        22, 26, "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbsgy",
        "",
        ""
    ),
    new MahasiswaLakiLaki(
        "Ibnu Zaki Alhawari",
        "Zaki", 
        22, 28, "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbsg7",
        "Sukabumi",
        "Good fighter never show their pain"
    ),
    new MahasiswaLakiLaki(
        "Atsilah Utsman Faaiz",
        "Fais", 
        22, 27, "https://daring.uin-suka.ac.id/pic2/g3zdcmbwg15t1mbsh1",
        "Belitung",
        "Tiada hari tanpa main ML"
    )
]

let showArrayMahasiswa = [...arrayMahasiswa]
let gender = "All genders"
let sort = "Default"

// initial
Mahasiswa.generateGrid(true)

// show and hide filters menu
const showFilterBtns = document.querySelectorAll(".header")

showFilterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        btn.nextElementSibling.classList.toggle("active")
    })
})

document.addEventListener("click", (e) => {
    if (!showFilterBtns[0].contains(e.target)){
        showFilterBtns[0].nextElementSibling.classList.remove("active")
    }
    
    if (!showFilterBtns[1].contains(e.target)){
        showFilterBtns[1].nextElementSibling.classList.remove("active")
    }
})

// search
const search = document.getElementById("search")

search.addEventListener("input", e => {

    keyword = e.target.value.toLowerCase()

    showArrayMahasiswa = [...arrayMahasiswa].filter(mahasiswa => mahasiswa.getNama().toLowerCase().includes(keyword))

    Mahasiswa.generateGrid(false)
})

// handle when gender filter is changing
const genderMenus = document.querySelectorAll(".gender .item")

genderMenus.forEach(menu => {
    menu.addEventListener("click", () => {
        if (gender != menu.innerText){
            gender = menu.innerText
            document.querySelector(".gender-result").innerText = gender

            Mahasiswa.generateGrid(false)
        }
    })
})

// handle when sort filter is changing
const sortMenus = document.querySelectorAll(".sort .item")

sortMenus.forEach(menu => {
    menu.addEventListener("click", () => {
        if (sort != menu.innerText){
            sort = menu.innerText
            document.querySelector(".sort-result").innerText = sort

            Mahasiswa.generateGrid(false)
        }
    })
})