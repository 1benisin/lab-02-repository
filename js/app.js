

const imgArray = [];



function ImageData(rawData) {
  for (let key in rawData) {
    this[key] = rawData[key];
  }
}

// ----------  FUNCTIONS

function startApp() {
  loadData();
}

function loadData() {
  $.get('./data/page-1.json')
    .then(data => {
      loadImgArray(data);
      displayPage(imgArray);
      attachListeners();
    });
}

function loadImgArray(data) {
  data.forEach(element => {
    imgArray.push(new ImageData(element));
  });
}

function displayPage(data) {
  const keywordArr = [];

  data.forEach(element => {
    let template = $('#photoScript').html();
    let templateScript = Handlebars.compile(template);
    let context = { 'keyword': element.keyword, 'title': element.title, 'image_url': element.image_url, 'description': element.description };
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
    $('main').empty();
    // sort data
    if ($filter === 'Horns')
      imgArray.sort((a, b) => a.horns - b.horns);
    if ($filter === 'Title')
      imgArray.sort((a, b) => {
        if (a.title < b.title) return -1
        if (a.title > b.title) return 1
        return 0
      });

    // recall render function
    displayPage(imgArray);

  });
}

$(startApp);


