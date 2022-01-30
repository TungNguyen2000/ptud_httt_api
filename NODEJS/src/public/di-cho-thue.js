var cart = $('.product-store')
var totalCount = $('.total-count')
var totalPrice = $('.total-price')
var totalPriceAndShip = $('.total-price-and-ship')
$("#txtAddress").on("keypress", function (e) {
    if (e.key === 'Enter') {
        searchLocation();
    }
});
var x = document.getElementById("buyer-address");
var checkoutAddress = document.getElementById("address-checkout");

var localSearch = []
var shopping_cart = {}
var CartItemsByStore = {}
window.onload = function () {
    getLocation();
    getCart();

};
function getLocation() {
    var position = JSON.parse(localStorage.getItem('position'))
    if (!position) {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(showPosition, showError)
        } else {
            window.alert("Geolocation is not supported by this browser");
        }
    }
    else {
        var address = JSON.parse(localStorage.getItem('address'))
        x.innerHTML = address.formatted_address
        if (checkoutAddress) {
            checkoutAddress.value = address.formatted_address
        }
        getStore();
    }

}
function showPosition(position) {
    $.ajax({
        url: `https://rsapi.goong.io/Geocode?latlng=${position.coords.latitude},${position.coords.longitude}&api_key=DRrVm7GwoRNp4gEDSIKp6E2rEJFzzB4jeHaL5Ns0`,
        success: function (result) {
            x.innerHTML = result.results[0].formatted_address
            checkoutAddress.value = address.formatted_address
            localStorage.setItem('position', JSON.stringify(position))
            localStorage.setItem('address', JSON.stringify(result.results[0]))
            getStore();
        }
    });
}
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}
function getStore(address) {
    var address = JSON.parse(localStorage.getItem('address'))
    var local = address.address_components[parseInt(address.address_components.length / 2)].short_name
    $.ajax({
        method: 'POST',
        url: `/api/stores`,
        data: { local: local },
        success: function (result) {
            result.sort((a, b) => {
                var m1 = getDistanceFromLatLonInKm(parseFloat(a.storeLat), parseFloat(a.storeLng), address.geometry.location.lat, address.geometry.location.lng)
                var m2 = getDistanceFromLatLonInKm(parseFloat(b.storeLat), parseFloat(b.storeLng), address.geometry.location.lat, address.geometry.location.lng)
                return m1 - m2
            })
            $('#list-store').empty();
            result.forEach((element) => {
                $('#list-store').append(
                    `
                    <div class="col-xl-3 col-lg-4 col-md-4 col-6">
                        <div class="single-product">
                            <div class="product-img">
                                <a href="/store-detail/${element.storeId}">
                                    <img class="default-img" src="https://via.placeholder.com/550x600"
                                        alt="#">
                                    <img class="hover-img" src="https://via.placeholder.com/550x600"
                                        alt="#">
                                </a>
                                <div class="button-head">
                                    <div class="product-action">
                                        <a title="Wishlist" href="#"><i class=" ti-heart "></i><span>Add
                                                to Wishlist</span></a>
                                    </div>
                                    <div class="product-action-2">
                                        <a title="Store Info" href="#">Store Info</a>
                                    </div>
                                </div>
                            </div>
                            <div class="product-content">
                                <h3><a href="product-details.html" >${element.storeName} (${getDistanceFromLatLonInKm(parseFloat(element.storeLat), parseFloat(element.storeLng), address.geometry.location.lat, address.geometry.location.lng).toFixed(2)} km)</a></h3>
                                <div class="product-price">
                                    <span class="text-ellipsis" title="${element.storeAddress}" >${element.storeAddress}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
                )
            })
        }
    })
}
function searchLocation() {
    var address = $("#txtAddress").val()
    $.ajax({
        url: `https://rsapi.goong.io/geocode?api_key=DRrVm7GwoRNp4gEDSIKp6E2rEJFzzB4jeHaL5Ns0&address=${address}`,
        success: function (result) {
            localSearch = result.results
            $('#result-address').empty()
            result.results.forEach((element, index) => {
                $('#result-address').append(
                    `<div><span class="buyer-address fix-weight" title="${element.formatted_address}">${element.formatted_address}</span> <button onclick="selectAdress(${index})" class="btn" data-dismiss="modal">chọn</button></div>`
                );
            });

        }
    })
}
function selectAdress(i) {
    localStorage.setItem('address', JSON.stringify(localSearch[i]))
    getLocation();
}
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}
function deg2rad(deg) {
    return deg * (Math.PI / 180)
}
function goToByScroll(id) {
    // Scroll
    $('html,body').animate({
        scrollTop: $("#" + id).offset().top - $(window).height() / 3
    }, 'slow');
}
function getCart() {
    $.ajax({
        method: "post",
        url: "/api/carts",
        success: function (result) {
            cart.empty();
            if (!result) {
                shopping_cart = null;
                return;
            }
            shopping_cart = result;
            CartItemsByStore = {};
            shopping_cart.cartItems.forEach((item) => {
                if (!CartItemsByStore[item.product.productType.store.storeName]) {
                    CartItemsByStore[item.product.productType.store.storeName] = []
                }
                CartItemsByStore[item.product.productType.store.storeName].push(item)
            })
            for (const [key, cartitem] of Object.entries(CartItemsByStore)) {
                let htmlofProduct = ''
                cartitem.forEach((item) => {
                    htmlofProduct += `
                    <li>
                        <a href="#" onclick="PlusCartItem(${item.product.productId})" class="plus action" title="thêm 1 sản phẩm"><i
                        class="fa fa-plus"></i></a>
                        <a href="#" onclick="MinusCartItem(${item.product.productId},${item.cartItemQuantity})" class="minus action" title="Giảm 1 sản phẩm"><i
                        class="fa fa-minus"></i></a>
                        <div class="item-quantity">${item.cartItemQuantity}</div>
                        <a href="#" onclick="DeleteCartItem(${item.product.productId})" class="remove action" title="Xoá sản phẩm"><i
                                class="fa fa-remove"></i></a>
                        <a class="cart-img" href="/store-detail/${item.product.productType.storeId}"><img src="https://via.placeholder.com/70x70"
                                alt="#" /></a>
                        <h4><a href="/store-detail/${item.product.productType.storeId}">${item.product.productName}</a></h4>
                        <p class="quantity">${item.cartItemQuantity} ${item.product.productUnit} -
                            <span class="amount">${formatCurrency(item.cartItemPrice)}đ</span>
                        </p>
                    </li>
                    `
                })
                cart.append(`
                    <div class="store-name dropdown-cart-header"><strong>${key}</strong></div>
                    <ul class="shopping-list">
                        <!-- List cart replace here here-->
                        ${htmlofProduct}
                    </ul>
                `)
            }

            totalCount.text(result.cartItems.length)
            totalPrice.text(formatCurrency(result.cartPrice + 'VND'))
            totalPriceAndShip.text(formatCurrency(result.cartPrice + 15000 + 'VND'))
        }
    })
}
function formatCurrency(value) {
    return value.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
}
function AddCartItems(ProductId) {
    cartitem = {
        "CartId": shopping_cart.cartId,
        "ProductId": ProductId,
        "CartItemQuantity": 1,
        "UserId": shopping_cart.userId
    }
    $.ajax({
        method: "post",
        url: "/api/cartitems",
        data: cartitem,
        success: function (result) {
            console.log(result)
            if (result.cartId) {
                getCart()
            }
        }
    })
}
function DeleteCartItem(ProductId) {
    cartitem = {
        "CartId": shopping_cart.cartId,
        "ProductId": ProductId,
        "CartItemQuantity": 1,
        "UserId": shopping_cart.userId
    }
    $.ajax({
        method: "delete",
        url: "/api/cartitems",
        data: { ...cartitem },
        success: function (result) {
            if (result.cartId) {
                getCart()
            }
        }
    })
}
function PlusCartItem(ProductId) {
    AddCartItems(ProductId)
}
function MinusCartItem(ProductId, CartItemQuantity) {
    cartitem = {
        "CartId": shopping_cart.cartId,
        "ProductId": ProductId,
        "CartItemQuantity": CartItemQuantity - 1,// số lượng trừ (ex: )
        "UserId": shopping_cart.userId
    }
    if (cartitem.cartItemQuantity == 0) {
        DeleteCartItem(ProductId)
    } else {
        $.ajax({
            method: "put",
            url: "/api/cartitems",
            data: cartitem,
            success: function (result) {
                console.log(result)
                if (result.cartId) {
                    getCart()
                }
            }
        })
    }
}