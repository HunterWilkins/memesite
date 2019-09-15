$(document).ready(function(){
    let routeId = window.location.href.split("/")[4];
    console.log(routeId);

    $.getJSON("/api/post/" + routeId + "", function(data) {
        $("#post-view").append(
            `
            <header>
                <h1 id = "post-title">${data.title}</h1>
                <p id = "post-author">Author: ${data.author}</p>
                
                <p id ="post-genre">${data.genre}</p>
            </header>
            <hr>

            <article>
            <p id = "post-body">${data.body}</p>
            
            </article>
            <hr>
            <section>
                <p id ="post-impression">Impression: ${data.impression ? data.impression : "Good"}</p>
                <p id ="post-score">${data.score ? data.score : " "}</p>
            </section>
            `
        )
    });

    $.getJSON("/api/comments/" + routeId + "", function(data){
        data.forEach(function(data){

            $("#comments").append(
                `
                <div class = "comment">
                    <p class = "comment-author">${data.commenter}</p>
                    <p class = "comment-text">${data.text}</p>    
                </div>
                `
            )
        });
    })

    $("#submit-comment").on("click", function(){
        $.ajax({
            method: "POST",
            url: "/submit/comment",
            data: {
                text: $("#commentbox").val(),
                post: routeId,
                score: 0
            }
        })
    });
});