import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      userName: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      items: [
        {
          itemId: data.items.itemId,
          itemCreatedAt: Date.now,
          itemPrice: data.items.itemPrice,
          itemCount: data.items.itemCount,
          itemTotalAmount: data.items.itemTotalAmount
        }
      ],
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call('put', params);
    return success(params.Item);
  } catch (e) {
    return failure({ status: false });
  }
}
