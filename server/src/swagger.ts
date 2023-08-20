import manageController from './http/controllers/docs/manage-controller.json';
import getController from './http/controllers/docs/get-controller.json';
import deleteController from './http/controllers/docs/delete-controller.json';
import trashController from './http/controllers/docs/trash-controller.json';
import notificationsController from './http/controllers/docs/notifications-controller.json';
import userController from './http/controllers/docs/user-controller.json';
import notification from './http/controllers/docs/schemas/notification.json';
import task from './http/controllers/docs/schemas/task.json';
import trash from './http/controllers/docs/schemas/trash.json';
import user from './http/controllers/docs/schemas/user.json';
import { OpenAPIV3 } from 'express-openapi-validator/dist/framework/types';


const docs = {
    openapi: '3.0.0',
    info: {
        title: 'TaskList API Documentation',
        version: '2.1.0',
    },
    paths: {
        ...deleteController,
        ...getController,
        ...manageController,
        ...notificationsController,
        ...trashController,
        ...userController,
    },
    components: {
        schemas: {
            ...notification,
            ...task,
            ...trash,
            ...user
        }
    },
    tags: [
        {
            "name": "Trash",
            "description": "Trash tasks controller"
        },
        {
            "name": "Users",
            "description": "User controller"
        },
        {
            "name": "Notifications",
            "description": "Notifications tasks controller"
        },
        {
            "name": "ManageTasks",
            "description": "Manage tasks controller"
        },
        {
            "name": "QueryTasks",
            "description": "Get tasks controller"
        },
        {
            "name": "DeleteTasks",
            "description": "Delete tasks controller"
        }
    ],
};

export default JSON.stringify(docs) as unknown as OpenAPIV3.Document;