function subscribe(es) {
  es.addEventListener('user', function (e) {
    var data = JSON.parse(e.data);
    document.getElementById('data').innerHTML = data;
  });
}

var id = location.pathname.split('/')[2];
subscribe(new EventSource('/users/' + id + '/stream'));
