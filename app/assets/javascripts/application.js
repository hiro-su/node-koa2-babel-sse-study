import 'babel-polyfill';
import 'event-source-polyfill';

function subscribe(es) {
  es.addEventListener('open', () => {
    console.log('open');
  });

  es.addEventListener('user', e => {
    const lastEvent = e.lastEventId.split('/');
    document.getElementById('id').innerHTML = lastEvent[0];
    document.getElementById('count').innerHTML = lastEvent[1];
    document.getElementById('data').innerHTML = e.data;
    document.getElementById('close').href = '/stream/' + lastEvent[0] + '/close';
  });

  es.addEventListener('error', () => {
    console.error('error');
  });

  es.addEventListener('close', () => {
    es.close();
    alert('disconnected');
  });
}

const id = location.pathname.split('/')[2];
subscribe(new EventSource('/stream/' + id));
