
let theme = localStorage.getItem("theme");

$(`link[href = '/css/${theme}.css']`).removeAttr("disabled");

$(document).ready(function(){

    let postQty = 0;

    $.getJSON("/all/posts", function(data){
        data.forEach(function(){
            postQty += 1;
        })
    });

    $("#toggle-usertool").on("click",  function(){
        if ($("#user").css("right") !== "15px"){
            $("#user").css({
                "right" : "15px"    
            });

            $("#user-toggle-box").css("display", "block");
        }

        else {
            $("#user").css("right", "-365px");
            $("#user-toggle-box").css("display", "block")
        }
    });

    $("#themes").on("click", "button", function(){
        style = $(this).text().toLowerCase();

        $("link").each(function(i){
            if ($(this).attr("title") && $(this).attr("href") !== `/css/${style}.css`) {
                $(this).attr("disabled", true);
            }
            else {
                $(this).removeAttr("disabled");
            }
        })
        localStorage.setItem("theme", style);
    });

    $("#user-toggle-box").on("click", function() {
        $(this).css("display", "none");
        $("#user").css("right", "-365px");
    });

    $(".close-modal").on("click", function(){
        $(this).parent().css("display", "none");
    });

    $("#user").on("click", "#toggle-post", function(){
        $("#post-box").css({
            "display" : "block"
        })
    });

    $("#sign-up").on("click", function(){
        event.preventDefault();
        $.ajax({
            xhrFields: {
                withCredentials: true,
            },
            type: "POST",
            dataType: "json",
            url: "/api/signup",
            data: {
                username: $("input[placeholder = Username]").val(),
                password: $("input[type=password]").val(),
                id: Math.floor(Math.random() * 200).toString()
            }
        });
    });

    $("#sign-in").on("click", function(){
        event.preventDefault();

        $.ajax({
            type: "POST",
            dataType: "json",
            url: "/api/login",
            data: {
                username: $("input[placeholder = Username]").val(),
                password: $("input[type=password]").val()
            },
            success: function() {
                window.location.reload();
                console.log("SUCCESS");
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    });

    $("#logout").on("click", function(){
        $.ajax({
            method: "POST",
            url: "/api/logout",
            success: function() {
                window.location.reload();
            }
        });
    });

    $("#submit-post").on("click", function(){
        console.log(postQty);
        event.preventDefault();
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "/submit/post",
            data: {
                title: $("input[placeholder = Title").val(),
                body: $("#post-body").val(),
                img: $("input[type = file]").val(),
                genre: $("input[placeholder = Genre]").val(),
                tag: $("input[placeholder = 'Tag...']").val(),
                id: (postQty + 1 ).toString()
            }
        })
    })
    
});