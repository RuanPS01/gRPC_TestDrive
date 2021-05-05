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

var parseArgs = require('minimist');
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var hello_proto = grpc.loadPackageDefinition(packageDefinition).helloworld;

function main() {
  var client = new hello_proto.Greeter('localhost:50051',
                                       grpc.credentials.createInsecure());
  client.sayHello({name: 'ruan'}, function(err, response) {
    console.log('Greeting:', response.message);
  });
  client.sayHelloAgain({name: 'ruan'}, function(err, response) {
    console.log('Greeting:', response.message);
  });

  client.test123({number: 10}, function(err, response) {
    // console.log(response);
    console.log('-----------------------------------------------');
    console.log('---- Model:', response.model);
    console.log('---- Firmware Version:', response.fwVer);
    console.log('---- Hardware Version:', response.hwVer);
    console.log('---- Number:', response.numberParam);
    console.log('-----------------------------------------------');
  });
  //{"model":"MODEL_SLC_5_B5000","fwVer":"V2.3.1-181-g6f8d","hwVer":"5.0"}
}

main();
