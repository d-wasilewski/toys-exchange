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
    post: operations["UserController_getUsers"];
  };
  "/user/user": {
    post: operations["UserController_getUserById"];
  };
  "/user/block": {
    post: operations["UserController_blockClient"];
  };
  "/user/activate": {
    post: operations["UserController_activateClient"];
  };
  "/auth/login": {
    post: operations["AuthController_login"];
  };
  "/auth/protected": {
    get: operations["AuthController_protectedRoute"];
  };
  "/auth/test": {
    post: operations["AuthController_getTest"];
  };
  "/toy/create-toy": {
    post: operations["ToysController_createToy"];
  };
  "/toy/toys": {
    post: operations["ToysController_getToys"];
  };
  "/toy/user-toys": {
    post: operations["ToysController_getUserToys"];
  };
  "/offer/offers": {
    post: operations["OfferController_getOffers"];
  };
  "/offer/active-offers": {
    post: operations["OfferController_getActiveOffers"];
  };
  "/offer/send": {
    post: operations["OfferController_sendOffer"];
  };
  "/offer/decline": {
    post: operations["OfferController_declineOffer"];
  };
  "/offer/accept": {
    post: operations["OfferController_acceptOffer"];
  };
}

export interface components {
  schemas: {
    RegisterUserDto: {
      role?: "BASIC" | "ADMIN";
      email: string;
      name: string | null;
      password: string;
      phoneNumber: string;
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
      toys: components["schemas"]["ToyDto"][];
      id: number;
      email: string;
      name: string | null;
      password: string;
    };
    UserIdDto: {
      id: number;
    };
    UserLoginDto: {
      email: string;
      password: string;
    };
    AccessTokenDto: {
      access_token: string;
    };
    CreateToyDto: {
      name: string;
      category: string;
      imgUrl: string;
      description: string;
      address: string;
      ownerId: number;
    };
    OwnerIdDto: {
      id: number;
    };
    OfferDto: {
      status: "ACCEPTED" | "DECLINED" | "PENDING";
      id: number;
      senderUserId: number;
      receiverUserId: number;
      toyFromSenderId: number;
      toyFromReceiverId: number;
      createdAt: string;
    };
    ReceiverIdDto: {
      receiverId: number;
    };
    SendOfferDto: {
      senderUserId: number;
      receiverUserId: number;
      toyFromSenderId: number;
      toyFromReceiverId: number;
    };
    OfferIdDto: {
      offerId: number;
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
      201: {
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
  UserController_blockClient: {
    parameters: {};
    responses: {
      201: {
        content: {
          "application/json": { [key: string]: unknown };
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserIdDto"];
      };
    };
  };
  UserController_activateClient: {
    parameters: {};
    responses: {
      201: {
        content: {
          "application/json": { [key: string]: unknown };
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
    requestBody: {
      content: {
        "application/json": components["schemas"]["UserLoginDto"];
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
      201: {
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
        "application/json": components["schemas"]["CreateToyDto"];
      };
    };
  };
  ToysController_getToys: {
    parameters: {};
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["ToyDto"][];
        };
      };
    };
  };
  ToysController_getUserToys: {
    parameters: {};
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["ToyDto"][];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["OwnerIdDto"];
      };
    };
  };
  OfferController_getOffers: {
    parameters: {};
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["OfferDto"][];
        };
      };
    };
  };
  OfferController_getActiveOffers: {
    parameters: {};
    responses: {
      201: {
        content: {
          "application/json": { [key: string]: unknown }[];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["ReceiverIdDto"];
      };
    };
  };
  OfferController_sendOffer: {
    parameters: {};
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["OfferDto"];
        };
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["SendOfferDto"];
      };
    };
  };
  OfferController_declineOffer: {
    parameters: {};
    responses: {
      201: unknown;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["OfferIdDto"];
      };
    };
  };
  OfferController_acceptOffer: {
    parameters: {};
    responses: {
      201: unknown;
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["OfferIdDto"];
      };
    };
  };
}

export interface external {}
