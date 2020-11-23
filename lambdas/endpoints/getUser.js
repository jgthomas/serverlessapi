const Responses = require("../common/API_Responses");
const Dynamo = require("../common/Dynamo");

const tableName = process.env.tableName;

exports.handler = async (event) => {
  //console.log("event", event);

  /*if (!event.pathParameters || !event.pathParameters.ID) {
    // failed without an ID
    return Responses._400({ message: "missing the ID from the path" });
  }*/

  const data = JSON.parse(event.body);

  if (!data || !data.ID) {
    return Responses._400({ message: "No ID provided in payload" });
  }

  //let ID = event.pathParameters.ID;

  const newUser = await Dynamo.get(data.ID, tableName).catch(() => {
    //console.log("error in dynamo write", err);
    return null;
  });

  if (!newUser) {
    return Responses._400({ message: `No user found with ID: ${data.ID}` });
  }

  return Responses._200({ newUser });
};
