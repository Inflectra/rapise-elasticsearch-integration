//Put your custom functions and variables in this file

eval(File.IncludeOnce('%WORKDIR%/ElasticIntegration.js'));

/* Index

PUT rapise
{
  "mappings": {
    "regression": {
      "properties": {
        "timestamp": {
          "type":   "date",
          "format": "yyyy-MM-dd'T'HH:mm:ss"
        },
        "testname": {
          "type": "string"
        },
        "status": {
          "type": "integer"
        }
      }
    }
  }
}

*/


/* Add data

POST rapise/regression
{
  "timestamp": "2017-07-03T15:12:13",
  "testname": "Elastic.js",
  "status": 1
}

*/
