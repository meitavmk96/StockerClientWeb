function renderUser(user) { //render active user
    let str = `<h6> ${user.firstName} ${user.lastName}</h6>`;
    str += `<span> ${user.position}</span>`;
    document.getElementById("user_ph1").innerHTML += str;
    str = `<span>שלום, ${user.firstName}</span>`;
    document.getElementById("user_ph2").innerHTML += str;
}

function clearStorage() {
    sessionStorage.clear();
}

function reload() {
    var item = sessionStorage.getItem('Id');
    if (item !== null) {
        sessionStorage.removeItem('Id');
        location.reload();
    }
}

function areArraysIdentical(arr1, arr2) {
    //const slicedArr1 = arr1.slice(1);
    if (arr1.length !== arr2.length) {
        return false; // Arrays have different lengths, not identical
    }

    for (let i = 0; i < arr1.length; i++) {
        if (JSON.stringify(arr1[i]) !== JSON.stringify(arr2[i])) {
            return false; // Arrays have different values at index i, not identical
        }
    }
    return true; // Arrays are identical
}

function sweetalert(title, text, bool, isGoToPage, page) {
    swal({
        title: title,
        text: text,
        buttons: {
            confirm: {
                text: "OK",
                value: true,
                visible: true
            }
        },
        dangerMode: bool,
        closeOnClickOutside: false
    })
        .then(function (willDelete) {
            if (willDelete) {
                if (isGoToPage) {
                    window.location.href = page;
                } else {
                    return false;
                }
            }
        });
}
