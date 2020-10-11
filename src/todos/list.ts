'use strict'

import { DynamoDB } from 'aws-sdk'
import { ScanInput } from 'aws-sdk/clients/dynamodb'

const dynamoDb = new DynamoDB.DocumentClient()
const params = {
  TableName: process.env.DYNAMODB_TABLE,
}

module.exports.list = (event: any, context: any, callback: any) => {
  // fetch all todos from the database
  // For production workloads you should design your tables and indexes so that your applications can use Query instead of Scan.
  dynamoDb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.error(error)
      callback(null, {
        statusCode: error.statusCode || 501,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Couldn\'t fetch the todo items.',
      })
      return
    }

    // create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    }
    callback(null, response)
  })
}
