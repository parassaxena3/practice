//Node JS Overview
/*
Node.js is an open-source, cross-platform runtime environment for server-side JavaScript applications. Node.js is built on Chrome's V8 JavaScript engine and uses an event-driven, non-blocking I/O model that makes it lightweight and efficient.


Key Features of Node.js:

*Asynchronous and Event-Driven: Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, ideal for real-time applications.
*Single-Threaded: Node.js uses a single-threaded event loop to handle multiple concurrent connections, which allows it to scale easily.
*Cross-Platform: Node.js is cross-platform and runs on Windows, macOS, and Linux.
*NPM Ecosystem: Node.js has a rich ecosystem of open-source libraries and packages available through the Node *Package Manager (NPM).
*Performance: Node.js provides high performance due to its non-blocking I/O model and V8 JavaScript engine.
*Scalability: Node.js is highly scalable and can handle a large number of concurrent connections with minimal overhead.


Core components of Node.js:

V8 Engine: It is the JavaScript engine that powers Google Chrome. It is used to execute JavaScript code.

Libuv: It is a multi-platform support library with a focus on asynchronous I/O. It provides event loop, file system, and networking functionality. Libuv is also used by other projects like Rust.

Core Library: It includes various modules that provide core functionality for building web servers, file systems, and more.

Node.js Modules: Node.js has a built-in module system that allows you to load modules using require() and define modules using module.exports.

Node Package Manager (NPM): It is the default package manager for Node.js that allows you to install, publish, and manage packages and dependencies.


Modules in Node.js:

Built-in Modules: Node.js comes with a set of built-in modules like http, fs (file system), path, url, util, events, etc.
Custom Modules: You can create your own modules by defining them in separate files and exporting them using module.exports.
Third-Party Modules: You can install third-party modules using NPM. For example, express, lodash, etc.


process.nextTick(): The process.nextTick() method is used to schedule a callback function to be invoked in the next iteration of the event loop. It is often used to defer the execution of a function until the current operation completes. 
eg: process.nextTick(() => {
  console.log('This will be executed in the next iteration of the event loop');
});

*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Event Emitter in Node.js
/*
 The EventEmitter class in Node.js is a core module that provides an event-driven architecture for handling events in Node.js. It allows you to create custom events and emit them when certain actions occur. You can also listen for these events and execute callback functions when they are emitted.

Custom Named Events: 
You can create any custom event by naming it appropriately for your application's logic.
const EventEmitter = require('events');
const myEmitter = new EventEmitter();
myEmitter.on('customEvent', () => {
  console.log('Custom event occurred!');
});
myEmitter.emit('customEvent');

Event Arguments: 
You can pass arguments along with the event when emitting it.
myEmitter.on('customEvent', (arg1, arg2) => {
  console.log(`Custom event occurred with arguments: ${arg1}, ${arg2}`);
});
myEmitter.emit('customEvent', 'arg1', 'arg2');

Predefined Events in Node.js Core Modules:
error: This event is emitted when an error occurs.
myEmitter.on('error', (err) => {
  console.error('An error occurred:', err);
});

EventEmitter in Core Modules:
Many core modules in Node.js use the EventEmitter class to emit events. For example, the fs module emits events like 'open', 'close', 'data', etc. when working with files. Similarly, the http module emits events like 'request', 'response', etc. when working with HTTP requests.

const fs = require('fs');
const watcher = fs.watch('example.txt');
watcher.on('change', (eventType, filename) => {
  console.log(`File ${filename} changed with event type: ${eventType}`);
});

Process events:
The process object in Node.js is an instance of EventEmitter and emits events like 'exit', 'uncaughtException', 'warning', etc. You can listen for these events and handle them accordingly.
process.on('exit', (code) => {
  console.log(`About to exit with code: ${code}`);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
});
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// File System Module in Node.js
/*
The fs module in Node.js provides file system-related functionality to work with files and directories. It allows you to perform various operations like reading, writing, updating, deleting, and renaming files.

Common fs module methods:
const fs = require('fs').promises;

Reading Files:
await fs.readFile(filePath, 'utf8');
Writing Files:
await fs.writeFile(filePath, data);
Updating Files:
await fs.appendFile(filePath, data);
Deleting Files:
await fs.unlink(filePath);
Renaming Files:
await fs.rename(oldPath, newPath);
Creating Directories:
await fs.mkdir(directoryPath);
Reading Directories:
await fs.readdir(directoryPath);
Removing Directories:
await fs.rmdir(directoryPath);

*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Streams in Node.js
/*
Streams are an essential concept in Node.js, used to handle reading or writing files, network communications, or any kind of end-to-end information exchange in a more efficient way. Streams provide a way to work with large data sets without requiring you to load the entire data set into memory at once.

Types of Streams
Readable Streams: Streams from which data can be read (e.g., fs.createReadStream).
Writable Streams: Streams to which data can be written (e.g., fs.createWriteStream).
Duplex Streams: Streams that are both readable and writable (e.g., TCP sockets).
Transform Streams: Duplex streams where the output is computed based on the input (e.g., zlib.createGzip).

// Example of reading a file using a Readable Stream:
const fs = require('fs');
const readableStream = fs.createReadStream('example.txt', { encoding: 'utf8' });
readableStream.on('data', chunk => {
  console.log('New chunk received:', chunk);
});
readableStream.on('end', () => {
  console.log('No more data to read.');
});
readableStream.on('error', err => {
  console.error('Error reading file:', err);
});

// Example of writing to a file using a Writable Stream:
const writableStream = fs.createWriteStream('output.txt');
writableStream.write('Hello, world!\n');
writableStream.write('This is another line.\n');
writableStream.end();
writableStream.on('finish', () => {
  console.log('Finished writing to file.');
});

Piping:
One of the most powerful features of streams is the ability to pipe them together. Piping is a mechanism to connect the output of one stream to the input of another, passing data through multiple streams.

// Example of piping a Readable Stream to a Writable Stream:
const readableStream = fs.createReadStream('example.txt');
const writableStream = fs.createWriteStream('output.txt');
readableStream.pipe(writableStream);
writableStream.on('finish', () => {
  console.log('Piping complete.');
});

*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Child Processes in Node.js

/*
Node.js provides the ability to spawn child processes to execute other programs or scripts. This is particularly useful for performing CPU-intensive tasks, as it allows you to keep the main event loop free by delegating heavy computations to child processes. The child_process module provides methods to create child processes.

Note: When you spawn a child process in Node.js, it's essentially creating a new instance of the Node.js runtime which executes separately from the parent process. This new instance has its own memory space and its own instance of the V8 engine, which includes its own event loop.


Key Methods of the child_process Module:

import { spawn, exec, execFile, fork } from 'child_process';

1. spawn(): 
Purpose: Used for spawning new processes.
Execution: Launches a new process with a specified command and arguments.
Output Handling: Streams the stdout and stderr of the child process (uses streams).
Use Case: Ideal for long-running processes, real-time data processing, or when you need to handle large amounts of output. for eg image processing, data processing

const ls = spawn('ls', ['-lh', '/usr']);
ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});
ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});
ls.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});


2. exec():
Purpose: Used for executing a command in a shell.
Execution: Spawns a shell, then executes the command within that shell.
Output Handling: Buffers the stdout and stderr of the command and passes them to a callback.
Use Case: Suitable for commands that produce relatively small amounts of output or when you need to use shell features like piping and redirection.

exec('ls -lh /usr', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});

3. execFile():
Purpose: Similar to exec, but directly executes a specified file without spawning a shell.
Execution: Executes the specified file directly with given arguments.
Output Handling: Buffers the stdout and stderr of the command and passes them to a callback.
Use Case: More secure than exec for executing binaries or scripts without shell parsing, and it avoids shell injection vulnerabilities.

execFile('node', ['--version'], (error, stdout, stderr) => {
  if (error) {
    console.error(`execFile error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});

4. fork(): 
Purpose: Used specifically for spawning new Node.js processes.
Execution: Spawns a new Node.js process and establishes an IPC (Inter-Process Communication) channel between the parent and child processes.
Output Handling: Provides an IPC channel for communication between the processes, suitable for sending messages and sharing data.
Use Case: Ideal for creating worker processes that run Node.js scripts, enabling parallel execution and communication between processes.

// parent.js
const child = fork('child.js');
child.on('message', (message) => {
  console.log('Message from child:', message);
});
child.send({ hello: 'world' });

// child.js
process.on('message', (message) => {
  console.log('Message from parent:', message);
  process.send({ response: 'Hi parent' });
});

Summary of When to Use Each
spawn: Use when you need to handle large amounts of output or when you need the child process to run for an extended period, streaming the output.
exec: Use when you need to run a command and get the complete output as a buffer, especially when you need shell features.
execFile: Use when you need to run a specific executable or script without the overhead and security risks of a shell.
fork: Use when you need to create a child process specifically to run Node.js scripts and need an IPC channel for communication.
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Worker Threads in Node.js
/*
Worker threads in Node.js provide a way to run JavaScript code in parallel, using separate threads to perform CPU-intensive tasks that would otherwise block the single-threaded event loop of Node.js. This allows you to take advantage of multi-core systems and improve the performance of your Node.js applications.

Key Concepts of Worker Threads
Main Thread: The primary thread where the Node.js application runs.
Worker Thread: Additional threads that can execute code in parallel with the main thread.
Worker Pool: A collection of worker threads that can be used to handle multiple tasks concurrently.


import { Worker } from "worker_threads";

const worker = new Worker("./js/Worker.js", {
  workerData: { someData: "Hello, worker!" },
});

worker.on("message", (message) => {
  console.log("Message from worker:", message);
});

worker.on("error", (error) => {
  console.error("Worker error:", error);
});

worker.on("exit", (code) => {
  console.log(`Worker exited with code ${code}`);
});
worker.postMessage("Hello, worker thread!");

*/

/*
Key Differences Between Worker Threads and Child Processes:

Memory Management:

    Worker Threads: Share the same memory space with the parent process, which can lead to easier data sharing but requires careful management to avoid race conditions.

    Child Processes: Have separate memory spaces, providing complete isolation but requiring serialization and deserialization of data for communication.

Resource Usage:

    Worker Threads: More lightweight in terms of resource usage and faster to create and manage.
    
    Child Processes: More resource-intensive and heavier to create, as each child process is a full-fledged OS process.

Use Case Suitability:

    Worker Threads: Suitable for parallel execution of JavaScript code within the same application, especially for CPU-bound tasks.

    Child Processes: Suitable for running external applications, scripts, or isolated tasks that need to be executed independently of the main application.

Communication Mechanism:

    Worker Threads: Use postMessage and onmessage for message passing within the same memory space.

    Child Processes: Use standard input/output streams or message passing via IPC channels for communication.


When to Use Each:

    Worker Threads: Use when you need to perform CPU-intensive tasks in parallel without the overhead of multiple processes, and when you want to share memory between threads. for eg. image processing, data processing

    Child Processes: Use when you need to run external applications or scripts, when tasks need to be isolated from the main process, or when you need to leverage multi-core processing capabilities. for eg. running a python script from node.js

*/