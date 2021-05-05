/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

var PROTO_PATH = './helloworld.proto';

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

/**
 * Implements the SayHello RPC method.
 */
function sayHello(call, callback) {
  callback(null, { message: 'Hello ' + call.request.name });
}

function sayHelloAgain(call, callback) {
  callback(null, { message: 'Hello again, ' + call.request.name });
}

function test123(call, callback) {
  var numberParam = Number(call.request.number) + 4;
  callback(null, { model: "MODEL_SLC_5_B5000", fwVer: "V2.3.1-181-g6f8d", hwVer: "5.0", numberParam: numberParam  });
}

function main() {
  var server = new grpc.Server();
  server.addService(hello_proto.Greeter.service,
    { sayHello: sayHello, sayHelloAgain: sayHelloAgain, test123: test123 });
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
  });
}

main();
