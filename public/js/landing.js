$(document).ready(function(){
$.getJSON("/all/posts", function(data){
    data.forEach(function(data){
        $("#content").append(
            `
            <div class="post" value = ${data.id}>
                <div class="thumbnail"></div>
                <div class="info">
                    <p class = "title">${data.title}</p>
                    <p class="author">${data.author}</p>
                    <p class="score">${data.score ? data.score : " "}</p>
                    <p class="impression">${data.impression ? data.impression : " "}</p>
                    <p class="genre">${data.genre}</p>
                </div>
            </div>
            `
        );

    });
})

$("#content").on("click", ".post", function(){
    window.location.replace("/post/" + $(this).attr("value") + "")
})

});