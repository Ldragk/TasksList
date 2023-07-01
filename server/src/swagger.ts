import swaggerJsdoc from "swagger-jsdoc";

const swaggerDefinition = {
    info: {
        title: "Task-List",
        version: "2.1.0",
        description: "The task list API"
    },
    securityDefinitions: {
        xAccessToken: {
            type: "user-auth",
            name: "x-access-token",
            in: "header"
        }
    },
    security: [
        {
            xAccessToken: []
        }
    ]
};

const options = {
    swaggerDefinition,
    apis: ["./src/http/controllers/open-api/*.yml"],    
    transform: (swaggerDoc: { paths: { [x: string]: { security: never[]; }; }; }, file: string | string[]) => {       
        if (file.includes("createUser.ts") || file.includes("authenticate.ts")) {          
            swaggerDoc.paths["/user"].security = [];
            swaggerDoc.paths["/user/authenticate"].security = [];
        }
        return swaggerDoc;
    }
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
