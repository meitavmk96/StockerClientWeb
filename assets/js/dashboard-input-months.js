function createDropDownMonthsInput(months) {
    var input = $("#monthInput");
    var dropdownOptions = $("#months-dropdown-options");
    var isInputClicked = false;
    var hideTimeout; // Declare hideTimeout variable

    input.click(function (e) {
        e.stopPropagation(); // Prevent the click event from bubbling up

        if (!dropdownOptions.is(":visible")) {
            dropdownOptions.show();
        }

        isInputClicked = true;
    });

    input.focus(function () {
        if (!isInputClicked) {
            dropdownOptions.show();
        }
    });

    input.blur(function () {
        hideTimeout = setTimeout(function () {
            dropdownOptions.hide();
        }, 200); // Delay the hiding of the dropdown options by 200 milliseconds
    });

    dropdownOptions.on("click", "li", function (e) {
        var selectedValue = $(this).data("value");
        input.val(selectedValue);
        dropdownOptions.hide();
        isInputClicked = false;
        clearTimeout(hideTimeout); // Clear the timeout when an option is selected
        e.stopPropagation(); // Prevent the click event from propagating to document click event
    });

    input.on("input", function () {
        var text = input.val().toUpperCase();
        if (text === "") {
            renderMedsOptions(months);
            input[0].setCustomValidity(""); // Reset custom validity message
            dropdownOptions.show(); // Show dropdown options when input is empty
        } else {
            var filteredOptions = months.filter(function (option) {
                return option.medName.toUpperCase().indexOf(text) > -1;
            });
            renderMedsOptions(filteredOptions);
            if (filteredOptions.length === 0) {
                input[0].setCustomValidity("אנא בחר חודש מתוך הרשימה");
            } else {
                input[0].setCustomValidity(""); // Reset custom validity message
            }
            dropdownOptions.show(); // Show dropdown options when input has text
        }
    });

    // Handle click on any input field to hide the dropdown options
    $("input").not("#monthInput").click(function () {
        clearTimeout(hideTimeout); // Clear the timeout when clicking on another input
        dropdownOptions.hide();
        isInputClicked = false;
    });

    $(document).on("click", function (e) {
        if (!$(e.target).closest(".dropdown-options").length) {
            clearTimeout(hideTimeout);
            dropdownOptions.hide();
            isInputClicked = false;
        }
    });
}

function renderMonthsOptions(months) {
    var str = "";
    for (var i = 0; i < months.length; i++) {
        str += `<li id="${i + 1}" data-value="${months[i]}">${months[i]}</li>`;
    }
    $("#months-dropdown-options").empty().append(str);
}