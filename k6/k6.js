import http from 'k6/http';
import { check, group } from 'k6';

export let options = {
   stages: [
       { duration: '0.5m', target: 5 }, // simulate ramp-up of traffic from 1 to 3 virtual users over 0.5 minutes.
       { duration: '1m', target: 10},
       { duration: '0.5m', target: 0 }, // ramp-down to 0 users
     ],
};

export default function () {
   group('API uptime check', () => {
       const response = http.get('https://dummyjson.com/products/1');
       check(response, {
           "status code should be 200": res => res.status === 200,
       });
   });
  }

