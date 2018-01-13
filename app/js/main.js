$( document ).ready(function() {

  // GET THE CATEGORIES AND CREATE CATEGORY BUTTONS
  $.ajax({url: "https://opentdb.com/api_category.php", success: function(data){
    let categories = data.trivia_categories;
    for (var i = 0; i < categories.length; i++) {
      let html = "<button class='category' data-categoryid='"+categories[i].id+"'>"+categories[i].name+"</button>";
      $('.categories').append(html);
    }
  }});

});
