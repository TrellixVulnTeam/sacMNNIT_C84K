$("#contact-form").validator().on("submit", function (event) {
    if (event.isDefaultPrevented()) {
        // handle the invalid form...
        formError();
        submitMSG(false, "Did you fill in the form properly?");
    } else {
        // everything looks good!
        event.preventDefault();
        $("#contact-submit").html('<i class="fas fa-spinner fa-spin"></i>');
        submitForm();
    }
});


function submitForm(){
    // Initiate Variables With Form Content
    var name = $("#name").val();
    // var email = $("#email").val();
    // var message = $("#message").val();
    // var csrf = $("#csrf").attr("csrf");

    // console.log('its data going'+name+ " and csrf :"+csrf)

    $.ajax({
        url: "contactmail",
        type: "post",
        data: $("#contact-form").serialize(), //"name=" + name + "&email=" + email + "&message=" + message+"&csrfmiddlewaretoken="+csrf, 
        // data: $("form-submit").serialize(),
        cache:false,
        // beforeSend : function(){

        // },
        success : function(text){
            if (text == "success"){
                formSuccess(name);
            } else {
                formError();
                submitMSG(false,text);
            }
        }
    });
}

function formSuccess(name){
    $("#contact-form")[0].reset();
    submitMSG(true, "It's good to hear from you "+name+".Thank you!")
}

function formError(){
    $("#contact-form").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        $(this).removeClass();
    });
}

function submitMSG(valid, msg){
    if(valid){
        var msgClasses = "h3 text-left tada animated text-success";
    } else {
        var msgClasses = "h3 text-left text-danger";
    }
    // $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
    alert(msg);
    $("#contact-submit").html('Send <i class="icon-paper-plane" aria-hidden="true"></i>');
}