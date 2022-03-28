import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import * as db from "../lib/azure-cosmosdb-mongodb"

const httpTrigger: AzureFunction = async function (
    context: Context,
    req: HttpRequest
): Promise<void> {

    try {
        let response = null;

        await db.init();

        switch (req.method) {
            case "POST":
                if (req.body.document) {
                    const insertOneResponse = await db.addTodo(req.body.document);
                    response = {
                        documentResponse: insertOneResponse
                    }
                } else {
                    throw Error("No document found");
                }
                break;
            case "GET":
                const todos = await db.getTodos();
                response = {
                    todos: todos
                }
                break;
            default:
                throw Error(`${req.method} not allowed`)
        }

        context.res = {
            body: response,
        };
    } catch (err) {
        context.log(`*** Error throw: ${JSON.stringify(err)}`);

        context.res = {
            status: 500,
            body: err
        };
    }
};

export default httpTrigger;
