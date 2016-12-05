function subscribe(es) {
  es.addEventListener('user', function (e) {
    var data = JSON.parse(e.data);
    document.getElementById('data').innerHTML = data;
  });
}

subscribe(new EventSource('/users/1/stream'));