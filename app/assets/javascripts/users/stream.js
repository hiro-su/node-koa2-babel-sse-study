function subscribe(es) {
  es.addEventListener('open', function (e) {
    console.log('open');
  });

  es.addEventListener('user', function (e) {
    var data = JSON.parse(e.data);
    document.getElementById('data').innerHTML = data;
  });

  es.addEventListener('error', function (e) {
    console.error('error');
  });

  es.addEventListener('close', function (e) {
    es.close();
    alert('disconnected');
  });
}

var id = location.pathname.split('/')[2];
subscribe(new EventSource('/users/' + id + '/stream'));
