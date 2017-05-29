function syllables(word) {
  if(word == null){
    return 0;
  }
  word = word.toLowerCase();
  if(word.length <= 3) {
    return 1;
  }
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  var syls = word.match(/[aeiouy]{1,2}/g);

  if(syls != null){
    return syls.length;
  }else{
    return 0;
  }
}

function words(text){
  var w = text.match(/("[^"]+"|[^"\s]+)/g);
  if(w == null){
    return [];
  }
  return w;
}

function sentences(text){
  var s = text.match(/(.*?(?:\.|\?|!))(?: |$)/g);
  if(s == null){
    return [];
  }
  return s;
}

function characters(text){
  text = text.replace(/\W/g, '');
  return text.length;
}

function ari(text){
  var chars_num = characters(text);
  var words_num = words(text).length;
  var sentences_num = sentences(text).length;
  if(sentences_num == 0){
    return 0;
  }
  return 4.71*((chars_num + 0.0) / (words_num+0.0)) + 0.5*((words_num+0.0) / (sentences_num + 0.0)) - 21.43;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function kincaid(text){
  var wordlist = words(text);
  var sentences_num = sentences(text).length;
  var syllables_num = 0;
  for(var i = 0; i < wordlist.length; i++){
    syllables_num += syllables(wordlist[i])
  }
  if(sentences_num == 0){
    return 0;
  }
  return 0.39*(wordlist.length / sentences_num) + 11.8*(syllables_num/wordlist.length) - 15.59;
}

function update(){
  var text = $("#input").val();
  if(text == null){
    text = "";
  }
  var sentenceslength = sentences(text).length;
  $(".words").text(numberWithCommas(words(text).length));
  $(".sentences").text(numberWithCommas(sentenceslength));
  $(".characters").text(numberWithCommas(characters(text)));
  var level = kincaid(text);
  var out = "unknown"
  if(!(sentenceslength > 3 || text.length > 75)){
    out = "?"
  } else if(level <= 5){
    out = "Elementary"
  }else if (level > 16) {
    out = "Graduate"
  }else{
    out = level.toFixed(1);
  }
  $(".level").text(out);
  console.log("1");
  if(text.length == 0){
    $(".stats").hide();
    $(".welcome").fadeIn();
    return;
  }
  console.log("2");
  if(!$(".stats").is(":visible")){
    $(".welcome").hide();
    $(".stats").fadeIn();
  }
  console.log("3");
}
