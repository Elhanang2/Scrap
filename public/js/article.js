$(document).ready(function(){
    $(".cleararticle").hide();
    $(document).on("click",".scrapenewarticle",function(event){
        event.preventDefault();
        $.getJSON("/scrape", function(data) {
            // For each one
            console.log("hhhhhhhhhhhhh"+ data);
            // for (var i = 0; i < data.length; i++) {
            //   console.log("data should be here"+data);
            //   $("#topstory").append("<p>" + data[i].title + "</p>" +"<img id='image'"+" src='"+data[i].imagelink+ "'>" + "<br />" + data[i].textlink );
           
            if(data){
               
            }else{
                $("footer").children("p").append("scrape data not exists");
            }
           });
        
           location.reload();
    });
    
        
    $.ajax({
        method: "GET",
        url: "/topstory" 
      })
        // With that done, add the note information to the page
        .then(function(data) {
            console.log("daaaaaaaaaa"+data);
           
                for (var i = 0; i < data.length; i++) {
                    
                    $("#topstory").append("<p class='title'>" + data[i].title + "</p>" 
                    + "<img id='image'"+" src='"+data[i].imagelink+ "'>" 
                    + "<button class='savearticle btn btn-success' type='submit' data-id='"+data[i]._id+"'>"+"Save Article"+"</button>"
                    + "<br />" +"<a class='textlink' href='"+data[i].titlelink +"'>" + "Read More" +"</a>");
                    
                }
           
        });
      
    $(document).on("click",".savearticle", function(event){
        event.preventDefault();
        // $(".form").empty();
        
         var name= $(".username").val().trim();
        var comment= $(".textinput").val().trim();
        var articleid= $(this).attr("data-id");
        console.log("name"+name);
        console.log(comment);
        var newcomment={
            name: name,
            comment: comment,
            
        }
        $.ajax({
            method: "GET",
            url: "/comment/" 
          })
            // With that done, add the note information to the page
            .then(function(data) {
              console.log(data);
              
            //   var usercomment={
            //       name:data.name,
            //       comment: data.comment
            //   }
             
            });

        $.post("/comment/"+ articleid, newcomment).then(function(results){
            console.log(results);

        });
        $(".username").val("");
            $(".textinput").val("");
       
        // $.ajax({
        //     method: "POST",
        //     url: "/comment/"+ articleid,
        //     data:{
        //         name: $("#username").val(),
        //         comment: $("#textinput").val()
        //     }
        // }).then(function(data){
        //     console.log(data);
            
        //     // 
            
        // });
        $("#username").val("");
        $("#textinput").val("");   
    });
    
    
});