const imgArray = [];



function startApp() {
  loadData();
  displayPage(imgArray);
  attachListeners();

}

function ImageData(rawData) {
  for(let key in rawData) {
    this[key] = rawData[key];
  }
}

function loadImgArray(data){
  data.forEach( element => {
    imgArray.push(new ImageData(element));
  });
}


function loadData() {

  const success = retrievedInfo => loadImgArray(retrievedInfo);

  $.get('./data/page-1.json', (data) => {
    if (data.length) {
      success(data);
    } else {
      console.log('something went wrong with $.get');
    }
  }, 'json');

}

function displayPage(data) {
  const keywordArr = [];
  console.log(imgArray);
  console.log(typeof imgArray);

  data.forEach(element => {
    let template = $('#photoScript').html();
    let templateScript = Handlebars.compile(template);
    let context = { 'keyword' : element.keyword, 'title' : element.title, 'image_url' : element.image_url, 'description' : element.description };
    let html = templateScript(context);

    $('main').append(html);

    if (!keywordArr.includes(element.keyword)) {
      keywordArr.push(element.keyword);
    }

  });

  keywordArr.forEach(element => {
    const $newOption = $('#option-template').clone();
    $newOption.text(element);
    $newOption.attr('value', element);
    $('#selectPics').append($newOption);
  });
}


function attachListeners() {
  $('#selectPics').on('change', event => {
    const $choice = $(event.target).val();
    console.log($choice);

    if ($choice === 'default') {
      $('.photo-class').show();
    } else {
      $('.photo-class').hide();
      $('.photo-class[data-keyword="' + $choice + '"]').show();
    }

  });

  $('#selectFilter').on('change', event => {
    const $filter = $(event.target).val();
    console.log($filter);

    // clear out picture from DOM

    // sort data

    // recall render function



    //if title
    // data.sort((a,b) => {
    //   if (a.title > b.title) return 1;
    //   if (b.title > a.title) return -1;
   //   return 0;
   // });

    //if horns
   // data.sort( (a,b) => a.horns - b.horns );

  });
}

$(startApp);


