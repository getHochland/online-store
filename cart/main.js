let products = [
    {
        id: 1,
        title: 'Baellerry Leather',
        price: 200000,
        image: 'images/Baellerry Leather.jpg',
        gender: 'man',
    },
    {
        id: 2,
        title: 'Ingersoll',
        price: 20000,
        image: 'images/Ingersoll.jpg',
        gender: 'man',
    },
    {
        id: 3,
        title: 'Longines Master',
        price: 50000,
        image: 'images/Longines Master.jpg',
        gender: 'man',
    },
    {
        id: 4,
        title: 'NIKA CELEBRITY',
        price: 100000,
        image: 'images/NIKA CELEBRITY.jpg',
        gender: 'man',
    },
    {
        id: 5,
        title: 'Patek Philippe',
        price: 500000,
        image: 'images/Patek Philippe.jpg',
        gender: 'man',
    },
    {
        id: 6,
        title: 'Skeleton',
        price: 150000,
        image: 'images/Skeleton.jpg',
        gender: 'man',
    },
    {
        id: 7,
        title: 'Amanda',
        price: 50000,
        image: 'images/Amanda.jpg',
        gender: 'woman',
    },
    {
        id: 8,
        title: 'Defile',
        price: 200000,
        image: 'images/Defile.jpg',
        gender: 'woman',
    },
    {
        id: 9,
        title: 'Quartz',
        price: 100000,
        image: 'images/Quartz.jpg',
        gender: 'woman',
    },
];


products.forEach(function (item){
    let productsContainer = document.querySelector('.products-block');
    productsContainer.insertAdjacentHTML('beforeend', '<div class="product" data-id="'+ item.id +'" data-filter="'+ item.gender +'"><div class="product-image"><img src="'+ item.image +'"></div><div class="product-title">'+ item.title +'</div> <div class="product-buy"><div class="product-buy__price">'+ item.price +'р</div><button class="product-buy__btn">Купить</button></div></div>')
});

//cart

let  cart = $('.cart');
console.log(cart);
let cartBlock = document.querySelector('.cart-block');
let cartQuantity = document.querySelector('.cart-quantity');
let buy = document.querySelectorAll('.product-buy__btn');
let cartQtyMinus = document.querySelectorAll('.cart-products-item__text-quantity-minus');
let cartTotalPrice = document.querySelector('.cart-block__buy span');
let cartProductsBlock = document.querySelector('.cart-products');

let Products = [];

$(document).on('click', '.cart > a', function (){
    if (checkItem()){
        cartBlock.classList.toggle('active');
    }
    else {
        cartBlock.classList.remove('active');
        $('.cart > a').disable = true;
    }
})

cartQtyMinus.forEach(function (item){
    item.addEventListener('click', function (){
    })
});

let cartProducts = [];

function addToCart (product, type){
let productData = [];

    if (checkCartItem(product.id)){
        cartProducts.forEach(function (item, index, array) {
            if (item.productId == product.id){
                if (item.productQty <= 1 && type == '-'){
                    return false;
                }
                cartProducts[index].productQty = eval(cartProducts[index].productQty + type + 1);
                cartProducts[index].productTotal = cartProducts[index].productPrice * cartProducts[index].productQty;
            }
        });
    }
    else {
        productData = {
            'productId': product.id,
            'productTitle': product.title,
            'productPrice': product.price,
            'productTotal': product.price,
            'productImage': product.image,
            'productQty': 1,
        };
        cartProducts.push(productData);
    }
    getTotalQuantity();
    getTotalPrice();
    renderCart();
}

function checkCartItem (productID) {
    let checkId = false;
    cartProducts.forEach(function (item, index, array) {
        if (item.productId == productID){
            checkId = true;
        }
    });

    return checkId;
}

buy.forEach(function(item, i, arr) {
    item.addEventListener('click', function () {

        let product = {
            'id': products[i].id,
            'image': products[i].image,
            'title': products[i].title,
            'price': products[i].price
        };

        addToCart(product,'+');
    })
});

function renderCart(){
    let li = document.querySelectorAll('.cart-products-item');
    for (let i = 0; i < li.length; i++) {
        li[i].remove();
    }
    cartProducts.forEach(function (item, index, array) {

        cartProductsBlock.insertAdjacentHTML('beforeend', '<div class="cart-products-item" data-id="'+ item.productId +'"><div class="cart-products-item__image"><img src="'+ item.productImage +'"></div><div class="cart-products-item__text"><div class="cart-products-item__text-title">'+ item.productTitle +'</div><div class="cart-products-item__text-quantity"><button class="cart-products-item__text-quantity-minus"><span>-</span></button><div class="cart-products-item__text-quantity-number"><span>'+ item.productQty +'</span></div><button class="cart-products-item__text-quantity-plus"><span>+</span></button></div><div class="cart-products-item__text-price"><span>'+ item.productTotal +'</span></div></div><div class="cart-products-item__delete"><button><img src="images/delete.png"></button></div></div>')
    });
}

function getTotalQuantity(){
    let cartTotalQty = 0;
    cartProducts.forEach(function (item, index){
        cartTotalQty = cartTotalQty + item.productQty;
        cartQuantity.innerHTML = cartTotalQty;
    })
}

function getTotalPrice(){
    let TotalPrice = 0;
    cartProducts.forEach(function (item, index){
        TotalPrice = TotalPrice + item.productTotal;
        cartTotalPrice.innerHTML = TotalPrice + 'р';
    })
}

function removeItemToCart(productID){
    cartProducts.forEach(function (item,i,array){
        if (item.productId == productID){
            delete array[i];
            console.log(array);
        }
    })
}

$(document).on('click', '.cart-products-item__text-quantity-minus', function (){
    let productId = $(this).parents('.cart-products-item').attr('data-id');
    products.forEach(function (item,i){
        if (item.id == productId){
            addToCart(item, '-');
        }
    })
    console.log(cartProducts);
});

$(document).on('click', '.cart-products-item__text-quantity-plus', function (){
    let productId = $(this).parents('.cart-products-item').attr('data-id');
    products.forEach(function (item,i){
        if (item.id == productId){
            addToCart(item, '+');
        }
    })
});

$(document).on('click', '.cart-products-item__delete', function (){
    let productId = $(this).parents('.cart-products-item').attr('data-id');
    removeItemToCart(productId);
    getTotalQuantity();
    getTotalPrice();
    renderCart();
    if (checkItem()){

    }
    else {
        $('.cart-block__buy span').html('0р');
        $('.cart-quantity').html('0');
        cartBlock.classList.remove('active');
        $('.cart > a').disable = true;
    }
});
function checkItem(){
    let check = true;
    if ($('.cart-products-item').length == 0){
        check = false;
    }
    return check;
}
//Filter
$(document).on('click', '.gender-block', function (){
    let gender = this.dataset.filter;
    $('.gender-button > button').html(this.textContent).removeClass();
    $('.gender-button > button').html(this.textContent).addClass(gender);
    checkDataGender (gender)
    let minPrice = +$('.min-price').val();
    let maxPrice = +$('.max-price').val();
    filterPrice (minPrice, maxPrice, $('.product-buy__price'))
})

function checkDataGender (dataGender){
    $.each($('.product'), function (index, item){
        let showAllElements = dataGender.toLowerCase() === 'all';

        if (item.dataset.filter === dataGender || showAllElements){
            item.classList.remove('hide')
        }
        else {
            item.classList.add('hide')
        }
    })
}
$(document).on('click', '.gender-button > button', function (){
    $('.gender-sub-menu').toggleClass('active');
})
$(document).on('click', function (){
    if (this.activeElement == $('.gender-button > button')[0]){

    }
    else {
        $('.gender-sub-menu').removeClass('active');
    }
})

let arrPrice = [];
let maxPrice = 0;
let min

$.each(products, function (index, item){
    arrPrice.push(item.price)
})
for (let i = 1; i < arrPrice.length; ++i) {
    if (arrPrice[i] > maxPrice) maxPrice = arrPrice[i];
}

$('.max-price').val(maxPrice)

$(document).on('click', '.price button', function (){
    let minPrice = +$('.min-price').val();
    let maxPrice = +$('.max-price').val();
    filterPrice (minPrice, maxPrice, $('.product-buy__price'))
})

function filterPrice (min, max, arr){
    let gender = $('.gender-button button').attr('class');
    $.each(arr , function (index, item){
        let price = +this.textContent.replace(/[р]/gi, '')
        if (price<=max && price>=min && gender==item.parentElement.parentElement.dataset.filter || gender == 'all' && price<=max && price>=min){
            item.parentElement.parentElement.classList.remove('hide')
        }
        else {
            item.parentElement.parentElement.classList.add('hide')
        }
    })
}

$(document).on('click', '.reset > button', function (){
    filterReset ()
})

function filterReset (){
    $('.min-price').val(0);
    $('.max-price').val(maxPrice);
    filterPrice (0, maxPrice, $('.product-buy__price'))
    $('.gender-button button').text('пол').removeClass().addClass('all');
    checkDataGender('all');
    price.noUiSlider.set([0, maxPrice]);

}

let price = document.querySelector('.price-range');

noUiSlider.create(price, {
    start: [0, maxPrice],
    connect: true,
    range: {
        'min': 0,
        'max': maxPrice
    },
    step: 10000,
});
price.noUiSlider.on('update', function (){
    $('.min-price').val( Math.round($('.noUi-handle-lower').attr('aria-valuenow')));
    $('.max-price').val( Math.round($('.noUi-handle-upper').attr('aria-valuenow')));
})