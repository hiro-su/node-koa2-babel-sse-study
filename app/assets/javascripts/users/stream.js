function subscribe(es) {
  es.addEventListener('open', function (e) {
    console.log('open');
  });

  es.addEventListener('user', function (e) {
    var lastEvent = e.lastEventId.split('/');
    document.getElementById('id').innerHTML = lastEvent[0];
    document.getElementById('count').innerHTML = lastEvent[1];
    document.getElementById('data').innerHTML = e.data;
    document.getElementById('close').href = '/stream/' + lastEvent[0] + '/close';
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
subscribe(new EventSource('/stream/' + id));
