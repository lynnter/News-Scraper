var unSaveArticle = (id) => {
     console.log('iddd: ', id);
     $.ajax({
          method: "POST",
          url: "/updateArticles/" + id,
          data: { saved: false }
     })
}

var renderArticles = () => {
     $.ajax({
       method: "GET",
       url: "/articles",
       data: {saved: true}
     }).then(data => {
         // For each one
         console.log(data);
         for (var i = 0; i < data.length; i++) {
           // Display the apropos information on the page
           // $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
           $("#articles").append(`<div id=${data[i]._id}-card class="card w-100">
             <div class="card-body">
               <h5 class="card-title">${data[i].title}</h5>
               ${data[i].link}
               <p class="card-text"><div id ="notes"></div>${data[i].summary}</p>
               <div id=${data[i]._id} class="btn btn-primary">Unsave Article</div>
             </div>
           </div>`)
           $(document).on("click", `#${data[i]._id}`, function(v) {
             unSaveArticle(v.target.id);
             $(`#${v.target.id}-card`).empty();
           })
         }
     });
   }
renderArticles();