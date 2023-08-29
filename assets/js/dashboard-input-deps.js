function createDropDownDepsInput(optionsList) {
    var input = $("#depInput");
    var dropdownOptions = $("#deps-dropdown-options");
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

    input.on("depInput", function () {
        var text = input.val().toUpperCase();
        if (text === "") {
            renderOptions(optionsList);
            input[0].setCustomValidity(""); // Reset custom validity message
            dropdownOptions.show(); // Show dropdown options when input is empty
        } else {
            var filteredOptions = optionsList.filter(function (option) {
                return option.toUpperCase().indexOf(text) > -1;
            });
            renderOptions(filteredOptions);
            if (filteredOptions.length === 0) {
                input[0].setCustomValidity("אנא בחר את סוג המחלקה מתוך הרשימה");
            } else {
                input[0].setCustomValidity(""); // Reset custom validity message
            }
            dropdownOptions.show(); // Show dropdown options when input has text
        }
    });

    // Handle click on any input field to hide the dropdown options
    $("depInput").not("#depInput").click(function () {
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

function renderDepOptions(Arr) {
    let str = "";
    for (var i = 0; i < Arr.length; i++) {
        str += `<li data-value="${Arr[i]}">${Arr[i]}</li>`;
    }
    $("#deps-dropdown-options").empty().append(str);
}