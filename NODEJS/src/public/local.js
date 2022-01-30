var x = document.getElementById("buyer-address");
window.onload = function () {
    getLocation();
};
function getLocation() {
    var position = JSON.parse(localStorage.getItem('address-shipper'))
    if (!position) {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(showPosition, showError)
        } else {
            window.alert("Geolocation is not supported by this browser");
        }
    }
    else {
        var address = JSON.parse(localStorage.getItem('address-shipper'))
        x.innerHTML = address.formatted_address
    }

}
function showPosition(position) {
    $.ajax({
        url: `https://rsapi.goong.io/Geocode?latlng=${position.coords.latitude},${position.coords.longitude}&api_key=DRrVm7GwoRNp4gEDSIKp6E2rEJFzzB4jeHaL5Ns0`,
        success: function (result) {
            x.innerHTML = result.results[0].formatted_address
            localStorage.setItem('position', JSON.stringify(position))
            localStorage.setItem('address-shipper', JSON.stringify(result.results[0]))
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
    localStorage.setItem('address-shipper', JSON.stringify(localSearch[i]))
    getLocation();
}
var timer,value = null;
$("#txtAddress").bind("keyup", function (e) {
    clearTimeout(timer);
    var str = $(this).val();
    if (str.length > 2 && value != str) {
        timer = window.setTimeout(function () {
            searchLocation();
        }, 500)
    }
});