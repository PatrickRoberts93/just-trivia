$( document ).ready(function() {

  // GET THE CATEGORIES AND CREATE CATEGORY BUTTONS
  $.ajax({url: "https://opentdb.com/api_category.php", success: function(data){
    let categories = data.trivia_categories;
    console.log(categories)
    for (var i = 0; i < categories.length; i++) {
      let html = "<button class='category' data-categoryid='"+categories[i].id+"'>"+categories[i].name+"</button>";
      $('.filters-inner').append(html);
    }
  }});

  // GENERATE A HINT FOR THE ANSWER
  function generateHint(answer) {

    let hint;

    if (isNaN(answer.charAt(0))) {
      hint = "The first letter of the answer is "+answer.charAt(0)+".";
    }
    else {
      hint = "Sorry, no hint for this question yet. I'll get around to it."
    }

    return hint;

  }

  ////////////////////// GETS AND INSERTS A NEW QUESTION //////////////////////
  function newQuestion() {

    let category = "",
        numActiveCategories = $('.active').length,
        categoryIndex;

    $('#answer').css('opacity',0);
    $('#question-hint').css('opacity',0);
    $('#question').css('color',"#D9D9D9");

    // BUILD CATEGORY URL
    if  (numActiveCategories > 0) {
     categoryIndex = Math.floor((Math.random() * numActiveCategories) + 0);;
      $('.active').each(function(i) {
        if (i == categoryIndex) {
          category = "&category="+$(this).data('categoryid');
          return category;
        }
      });
    };

    $.ajax({url: "https://opentdb.com/api.php?amount=1"+category+"&type=multiple", success: function(data){

      console.log(data);

      var answer = data.results[0].correct_answer;
      var question = data.results[0].question;
      var category = data.results[0].category;
      var difficulty = data.results[0].difficulty;
      var hint = generateHint(answer);

      if(question.indexOf("of the following") != -1 || question.indexOf("of these") != -1 || question.indexOf("is not") != -1){
        console.log("MULTIPLE CHOICE QUESTION SKIPPED - DETECTED KEYWORD IN QUESTION ('of the following', 'of these' or 'is not')");
        newQuestion();
      }

      else if(answer.indexOf("True") != -1 || question.indexOf("False") != -1){
        console.log("TRUE OR FALSE QUESTION SKIPPED - DETECTED KEYWORD IN ANSWER ('True' or 'False')");
        newQuestion();
      }

      else {
        $('#question').html(question).css('color',"#000");;
        $('#answer').html(answer);
        $('#question-category').html(category);
        $('#question-difficulty').html(difficulty);
        $('#question-hint').html(hint);

      }
    }});

  };
  ////////////////////////////////////////////////////////////////////////////

  //GET A NEW QUESTION ON PAGE LOAD
  newQuestion();

  //TOGGLE CATEGORY
  $('.categories').on('click', '.category', function(){
    $(this).toggleClass('active');
  });

  $('.question-container').on('click', '#new-question', function() {
    newQuestion();
  });

  $('.question-container').on('click', '#show-answer', function() {
    $('#answer').css('opacity',1);
  });

  $('.question-container').on('click', '#hint', function() {
    $('#question-hint').css('opacity',1);
  });

  $('.categories').on('click', 'h3', function() {
    $(this).toggleClass('open')
    $('.filters').slideToggle();
  });

});
