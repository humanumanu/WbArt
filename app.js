//varibles
const artistsDOM = document.querySelector(".artists-main");
const profileDOM = document.querySelector(".profile");
const artDOM = document.querySelector(".art_center");
const galleryDOM = document.querySelector(".gallery-center")
const printButtons = document.querySelectorAll('.option a')
const myCart = document.querySelector('.cart-items')
const clearCart = document.querySelector('.clear-cart')
const goBrowsing = document.querySelector('#continue-browsing')
const dropBar = document.querySelector('#drop-bar')
const confirm = document.querySelector('.qty.button')
const total = document.querySelector('#total')

let cart = [];
//Getting Artists
class Artists{
    async getArtists() {
            let artists = data;
            artists = artists.map(artist =>{
                const artist_id = artist.sys.id;
                const {name} = artist.fields;
                const {pic} = artist.fields;
                const {works} = artist.fields;
                const {desc, fb, insta, twitter} = artist.fields;
                return {artist_id, name, pic, desc, fb, insta, twitter, works}
            })
            return artists;
    }
}
//UI
class UI{
    //Display all artists
    displayArtists(artists){
        let result = '';
        artists.forEach(artist => {
            let works = artist.works
            works = works.map(work => {
                const {img_link} = work.fields;
                const {art_id} = work.sys;
                return {art_id, img_link}
            });
            works = works.slice(0,3)
            result += `
            <div class="artists-center">
                <div id="profile">
                    <a href="profile.html">
                    <img class = "profile_img" src="${artist.pic}" alt="${artist.artist_id}">
                    </a>
                    <p>${artist.name}</p>
                </div>
            <div id="gallery">`;
            works.forEach(work => {
                result +=
                `<div class="work">
                    <div class="art-container">
                        <img src="${work.img_link}">
                        <a href="../Cart/art.html"><div id = "${work.art_id}" class = "work_img"></div></a>
                    </div>
                </div>`;
            })
            result +=`
            </div>
            </div>
            `;
        });
        artistsDOM.innerHTML = result;
    };
    //Display Gallery
    displayGallery(artists){
        let result ='';
        artists.forEach(artist =>{
            artist.works.forEach(work =>{
                result +=`
                    <div class="image-container">
                        <a class="work_img" id="${work.sys.art_id}" href="../Cart/art.html">
                        <img src="${work.fields.img_link}" alt="">
                        </a>
                    </div>
                `
            })
        });
        galleryDOM.innerHTML = result

    };
     //Display profile
    displayProfile(artist){
        let result = '';
        result += `
                <div class ="artist_header">
                    <img src="https://images.unsplash.com/photo-1570742544137-3a469196c32b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1949&q=80">
                </div>
                <div class ="center_part">
                <div class="left_sec">
                <div class="profileimage">
                    <img src="${artist.pic}">
                </div>
                <div class="social">
                    <a href="https://www.instagram.com/quandabangai/"> <img
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png">
                    </a>
                    <a href=?> <img src="https://www.facebook.com/images/fb_icon_325x325.png">
                    </a>
                    <a href=?> <img src="https://pbs.twimg.com/profile_images/1354479643882004483/Btnfm47p_400x400.jpg">
                    </a>
                </div>
            </div>
            <div class="right_sec">
                <div id="introduction">
                    <p>${artist.desc}</p>
                </div>
                <div id="gallery">
                    <div class="artprint">
                        <h3> Art pieces by ${artist.name} </h3>
                    </div>
                    <div class="all_works">
                    `;
        artist.works.forEach(work => {
            result += `
            <div class="work_container">
            <img src="${work.fields.img_link}">
            <a href="../Cart/art.html"><div id ="${work.sys.art_id}"class="work_img"></div></a>
            </div>
            `
        });
        result +=`
        </div>
        </div>
        </div>
        </div>`
        ;

        profileDOM.innerHTML = result;
    };
    //Display art
    displayArt(art,artist){
        let result = "";
        result += `            
            <h1>${art.fields.title}</h1>
            <div class="art_container">
                <!--Left art-->
                <div class="left_art">
                    <div id="normal_view">
                        <img class = "default" src="${art.fields.img_link}" alt="">
                    </div>
                </div>
                <!--End left art-->
                <div class="right_art">
                    <div class="print_options">
                        <h2>Pick a print option</h2>
                `
        art.fields.printOptions.forEach(option => {
            result +=`
                        <div class="option">
                            <a id="${option.type}">${option.type}</a>
                            <div class="price"><p>${option.price} JPY</p></div>
                        </div>
                    `
        });

        result +=`  
                        <button id = "cart_button" class ="hidden">Add to Cart</button>
                        <div class="artist_info">
                            <h3>From the artist</h3>
                            <div class="artist_container">
                                <a href="../Artists/profile.html">
                                    <img class = "profile_img" src="${artist.pic}" alt="${artist.artist_id}">
                                </a>
                                <div class='artist_profile'>
                                    <p><strong>${artist.name}</strong><p>
                                    <p>${artist.desc}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        artDOM.innerHTML = result
    };
    //Display cart
    displayCart(cart){
        let result = '';
        let total_cash = 0;
        if (cart == null || cart.length == 0){
            let emtycart = '';
            emtycart +=`
            <h1 style="margin-top: 2rem">Your Cart is empty</h1>
            <a href="../index/content.html"><button id="browsing">Start Browsing</button></a>
            `
            myCart.innerHTML = emtycart
            clearCart.classList.add('hidden')
            goBrowsing.classList.add('hidden')
            confirm.classList.add('hidden')
            total.classList.add('hidden')

        } else {
            cart.forEach(item =>{
                result += `<div class="cart-item">
                        <div class="item_container">
                            <a href="art.html"><img class="work_img" id="${item.art_id}" src="${item.preview}"></img></a>
                        </div>
                        <div class="title">${item.title}<br>${item.type}</div>
                        <div class="qty input">
                        <input type="text" id ="${item.print_id}" name="qty" value="${item.qty}">
                        </div>
                        <div class="price">${item.price} JPY</div>
                        <div class="total">${parseInt(item.price)*item.qty} JPY</div>
                    </div>`
            });
            myCart.innerHTML = result;
            
            cart.forEach(item => {
                total_cash += parseInt(item.price)*item.qty
            })
            total.innerHTML = "Total: " + total_cash + " JPY"
        }
    };
    //Target artist
    getProfile(artists){
        const buttons = [...document.querySelectorAll(".profile_img")];
        buttons.forEach(button => {
            let id = button.alt;
            button.addEventListener('click', event =>{
                let a = artists.find(item => item.artist_id == id)
                sessionStorage.setItem("selected_profile", JSON.stringify(a))
            })
        })
    };
    //Target Art
    getArt(artists){
        const buttons = [...document.querySelectorAll(".work_img")];
        buttons.forEach(button =>{
            let id = button.id;
            button.addEventListener('click', event =>{
                let a = artists.find(artist => artist.works.find(work => work.sys.art_id == id))
                let b = a.works.find(work => work.sys.art_id == id)
                sessionStorage.setItem("selected_artist", JSON.stringify(a))
                sessionStorage.setItem("selected_art", JSON.stringify(b))
            })
        })
    };
    //Item to cart
    toCart(art,artist){
        const buttons = [...document.querySelectorAll(".option a")]
        const cartButton = document.querySelector("#cart_button")
        const df_pic = document.querySelector(".default")
        let pv = ""
        let chosen = ""
        buttons.forEach(button => {
            button.addEventListener('click',(event=>{
                buttons.forEach(item =>{
                    item.classList.remove('active');
                });
                button.classList.add('active');
                let print_id = button.id;
                pv = art.fields.printOptions.find(option => option.type == print_id);
                df_pic.src = pv.preview;
                pv["title"] = art.fields.title;
                pv["art_id"] = art.sys.art_id;
                pv["qty"] = 1;
                pv["print_id"] = pv.art_id + pv.type
                cartButton.classList.remove("hidden");
            }));
        })
        cartButton.addEventListener('mousedown',(event =>{
            chosen = pv;
            let id = pv.print_id;
            let inCart = cart.find(item => item.print_id == id);
            if (inCart) {
                inCart.qty +=1
            } else{
                cart.push(chosen);
            };
            Database.saveCart(cart)
            cartButton.innerHTML = 'Added'
            cartButton.addEventListener('mouseup', event =>{
                cartButton.innerHTML = "Add to Cart"
            })
        }))
    };
}
//Storage
class Database{
    static saveArtists(artists) {
        localStorage.setItem("artists", JSON.stringify(artists))
    }
    static saveCart(cart){
        localStorage.setItem("cart", JSON.stringify(cart))
    }
};

//Drop bar funtions
function showbar(event){
    const drop = event.currentTarget;
    let bar = document.querySelector('#hide-bar')
    bar.classList.remove('hidden');
    drop.removeEventListener('click', showbar)
    drop.addEventListener('click', hidebar)
};
function hidebar(event){
    const drop = event.currentTarget;
    let bar = document.querySelector('#hide-bar')
    bar.classList.add('hidden');
    drop.removeEventListener('click', hidebar);
    drop.addEventListener('click', showbar);
};
dropBar.addEventListener('click', showbar)

//Footer
let a = document.querySelector('.footer')
if (a !== null){
    a.innerHTML = "This website is inspired by InPrnt"
}