import { parentPort, workerData } from 'worker_threads';

console.log('Worker data:', workerData);

parentPort.postMessage('Hello, main thread!');

parentPort.on('message', (message) => {
    console.log('Worker received message:', message);
    });
