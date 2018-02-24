var myApp = new Framework7({
    swipePanel: 'left',
    material: true,
    materialRipple: false,
    fastClicks: true,
    modalCloseByOutside: true,
    cache: false,
    sortable: false,
    swipeout: false
    // ... other parameters
});
 
var $$ = Dom7;
 
// Add view
var mainView = myApp.addView('.view-main');

var devices = [],
    deviceReady = false;

if (localStorage.getItem('ff-devices') !== null) {
  devices = JSON.parse(localStorage.getItem('ff-devices'));
}else{
  localStorage.setItem('ff-devices', JSON.stringify(devices));
}


document.addEventListener('deviceready', function () {
  deviceready = true;
  // Enable to debug issues.
  // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

  
  var notificationOpenedCallback = function(jsonData) {
    // console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    var id = jsonData.notification.payload.additionalData.id,
        name = jsonData.notification.payload.additionalData.serial;

    setTimeout(function() {
      mainView.router.loadPage("views/?id="+id+"?name="+name);
    }, 500);
  };

  window.plugins.OneSignal
    .startInit("ec77f744-7135-44ad-ae83-1d6c89d200d2")
    .handleNotificationOpened(notificationOpenedCallback)
    .inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.Notification)
    .endInit();

  window.plugins.OneSignal.getIds(function(ids) {
    console.log('getIds: ' + JSON.stringify(ids));
  });

  window.plugins.OneSignal.setSubscription(true);


  window.plugins.OneSignal.getTags(function(tags) {
    console.log('Tags Received: ' + JSON.stringify(tags));
  });

  sendTags();
  
  // window.plugins.OneSignal.sendTags({key: "value", key2: "value2"});

  // window.plugins.OneSignal.deleteTag("key");
  
  // Call syncHashedEmail anywhere in your app if you have the user's email.
  // This improves the effectiveness of OneSignal's "best-time" notification scheduling feature.
  // window.plugins.OneSignal.syncHashedEmail(userEmail);
}, false);

myApp.onPageInit('*', function (page) {
  console.log('init '+ page.name);
});

myApp.onPageInit('index', function (page) {
  mainView.router.loadPage('views/home.html');
}).trigger();

myApp.onPageInit('home', function (page) {
  show_devices(); 
});

myApp.onPageInit('device_detail', function (page) {
  // console.log(page.query.id);
  var id = page.query.id;

  $$('#device_serial').html(page.query.name);

  myApp.showIndicator();
  $$.get("http://www.testtmil.sr/firefly/src/public/index.php/api/get_readings/"+id,
    function(data, success){
      var data = JSON.parse(data);
      console.log(data);
      if (data.length > 0) {
        $$('#readings').html("");
      }
      $$.each(data, function(i, value){
        var item = '<li class="accordion-item">'+
                        '<a href="" class="item-link item-content">'+
                            '<div class="item-inner">'+
                                '<div class="item-title">'+data[i].created+'</div>'+
                            '</div>'+
                        '</a> '+
                        '<div class="accordion-item-content content-block">'+
                          '<p><strong>GAS-level: </strong>'+data[i].gas_value+'</p>'+
                          '<p><strong>FIRE level: </strong>'+data[i].fire_value+'</p>'+
                          '<p><strong>FIRE: </strong>'+data[i].fire.toUpperCase()+'</p>'+
                        '</div>'+
                    '</li>';
        $$('#readings').append(item);
      })
      myApp.hideIndicator();
    });


  $$('#showState').on('click', function () {
    var url = "http://www.testtmil.sr/firefly/uploads/";
    var modal = myApp.modal({
      title: 'Last taken state',
      text:  '<div class="state-image">'+
                      '<img src="'+url+page.query.name.toLowerCase()+'.jpg"></div>' +
                  '</div>',
      buttons: [
      {
        text: 'Ok, got it',
        bold: true
      },
    ]
    })
  });
});

$$('#form-add').submit(function(e){
  e.preventDefault();
  add_device();
})

var check_devices = function(){
  device =  JSON.parse(localStorage.getItem('ff-devices'));
}


var show_devices = function(){
  check_devices();

  if (devices) {
      if (devices.length > 0) {
        $$('#devices').html("");
        for (var i = 0; i < devices.length; i++) {
          devices[i]
          var device = '<li>'+
                          '<a href="views/device-detail.html?id='+devices[i].id+'&name='+devices[i].serial+'" class="item-link item-content">'+
                            '<div class="item-inner">'+
                              '<div class="item-title">'+devices[i].serial+'</div>'+
                            '</div>'+
                          '</a>'+
                        '</li>';
          $$('#devices').append(device);
          $$('#btn-count').html('more');
        }
      }
  }
}

var add_device = function(){
  myApp.showIndicator();

  check_devices();

  var formData = myApp.formToJSON('#form-add');

  if (!check_duplicate(formData.name)) {
    $$.post("http://www.testtmil.sr/firefly/src/public/index.php/api/add_device",{
      name: formData.name,
      password: formData.password
    }, function(data){
      data = JSON.parse(data);

      devices[devices.length] = {id: data[0].id, serial: data[0].serial};

      localStorage.setItem('ff-devices', JSON.stringify(devices));

      clear_popup();
      show_devices();
      sendTags();

      myApp.closeModal('.popup-add');
      myApp.hideIndicator();
    });
  }else{
    $$('#error').show().text("Device already added!");
    setTimeout(function() {
      $$('#error').hide();
    }, 1500);
    myApp.hideIndicator();
  }
  
}

var clear_popup = function(){
  $$('#form-add input[name=name], #form-add input[name=password]').val("");
}

var check_duplicate = function(serial){
  for (var i = 0; i < devices.length; i++) {
    if (devices[i].serial == serial) {
      return true;
    }
  }
}

var sendTags = function(){
  if (deviceready) {
    for (var i = 0; i < devices.length; i++) {
      window.plugins.OneSignal.sendTag("device_"+devices[i].id, "subscribed");
    }
  }
}

