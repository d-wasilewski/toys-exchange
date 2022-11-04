/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    get: operations["AppController_getHello"];
  };
  "/user/sign-up": {
    post: operations["UserController_signupUser"];
  };
  "/user/users": {
    get: operations["UserController_getUsers"];
  };
  "/user/user": {
    post: operations["UserController_getUserById"];
  };
  "/auth/login": {
    post: operations["AuthController_login"];
  };
  "/auth/protected": {
    get: operations["AuthController_protectedRoute"];
  };
  "/auth/test": {
    get: operations["AuthController_getTest"];
  };
  "/toy/create-toy": {
    post: operations["ToysController_createToy"];
  };
  "/toy/toys": {
    get: operations["ToysController_getToys"];
  };
}

export interface components {
  schemas: {
    RegisterUserDto: {
      id: number;
      email: string;
      name?: string | null;
      password: string;
    };
    ToyDto: {
      id: number;
      name: string;
      category: string;
      imgUrl: string;
      description: string;
      address: string;
      ownerId: number;
    };
    UserDto: {
      id: number;
      email: string;
      name?: string | null;
      password: string;
      toys: components["schemas"]["ToyDto"][];
    };
    UserIdDto: {
      id: number;
    };
    AccessTokenDto: {
      access_token: string;
    };
    UserLoginDto: {
      id: number;
      email: string;
      name: string;
    };
  };
}

export interface operations {
  AppController_getHello: {
    parameters: {};
    responses: {
      200: {
        content: {
          "application/json": string;
        };
      };
    };
  };
  UserController_signupUser: {
    parameters: {};
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["UserDto"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["RegisterUserDto"];
      };
    };
  };
  UserController_getUsers: {
    parameters: {};
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["UserDto"][];
        };
      };
    };
  };
  UserController_getUserById: {
    parameters: {};
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["UserDto"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserIdDto"];
      };
    };
  };
  AuthController_login: {
    parameters: {};
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["AccessTokenDto"];
        };
      };
    };
  };
  AuthController_protectedRoute: {
    parameters: {};
    responses: {
      200: {
        content: {
          "application/json": string;
        };
      };
    };
  };
  AuthController_getTest: {
    parameters: {};
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["UserLoginDto"];
        };
      };
    };
  };
  ToysController_createToy: {
    parameters: {};
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["ToyDto"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["ToyDto"];
      };
    };
  };
  ToysController_getToys: {
    parameters: {};
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["ToyDto"][];
        };
      };
    };
  };
}

export interface external {}