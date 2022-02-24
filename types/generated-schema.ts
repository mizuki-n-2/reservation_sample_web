/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/admins": {
    post: {
      responses: {
        /** 成功 */
        201: {
          content: {
            "application/json": components["schemas"]["AdminResponse"];
          };
        };
        /** 不正リクエスト */
        400: unknown;
        /** サーバーエラー */
        500: unknown;
      };
      requestBody: {
        content: {
          "application/json": components["schemas"]["AdminRequest"];
        };
      };
    };
  };
  "/login": {
    post: {
      responses: {
        /** 成功 */
        200: {
          content: {
            "application/json": {
              token: string;
            };
          };
        };
        /** 不正リクエスト */
        400: unknown;
        /** Admin Not Found */
        404: unknown;
        /** サーバーエラー */
        500: unknown;
      };
      requestBody: {
        content: {
          "application/json": components["schemas"]["LoginRequest"];
        };
      };
    };
  };
  "/reservations": {
    get: {
      responses: {
        /** 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["ReservationsResponse"];
          };
        };
        /** サーバーエラー */
        500: unknown;
      };
    };
    post: {
      responses: {
        /** 成功 */
        201: {
          content: {
            "application/json": components["schemas"]["ReservationResponse"];
          };
        };
        /** 不正リクエスト */
        400: unknown;
        /** Schedule Not Found */
        404: unknown;
        /** サーバーエラー */
        500: unknown;
      };
      requestBody: {
        content: {
          "application/json": components["schemas"]["ReservationRequest"];
        };
      };
    };
  };
  "/reservations/{id}": {
    get: {
      parameters: {
        path: {
          /** 予約ID */
          id: string;
        };
      };
      responses: {
        /** 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["ReservationResponse"];
          };
        };
        /** Reservation Not Found */
        404: unknown;
        /** サーバーエラー */
        500: unknown;
      };
    };
    delete: {
      parameters: {
        path: {
          /** 予約ID */
          id: string;
        };
      };
      responses: {
        /** 成功 */
        204: never;
        /** Reservation Not Found */
        404: unknown;
        /** サーバーエラー */
        500: unknown;
      };
    };
  };
  "/schedules": {
    get: {
      responses: {
        /** 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["SchedulesResponse"];
          };
        };
        /** サーバーエラー */
        500: unknown;
      };
    };
  };
  "/schedules/{id}": {
    get: {
      parameters: {
        path: {
          /** スケジュールID */
          id: string;
        };
      };
      responses: {
        /** 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["ScheduleResponse"];
          };
        };
        /** Schedule Not Found */
        404: unknown;
        /** サーバーエラー */
        500: unknown;
      };
    };
  };
  "/admin/schedules": {
    post: {
      responses: {
        /** 成功 */
        201: {
          content: {
            "application/json": components["schemas"]["ScheduleResponse"];
          };
        };
        /** 不正リクエスト */
        400: unknown;
        /** Unauthorized */
        401: unknown;
        /** サーバーエラー */
        500: unknown;
      };
      requestBody: {
        content: {
          "application/json": components["schemas"]["ScheduleRequest"];
        };
      };
    };
  };
  "/admin/schedules/{id}": {
    delete: {
      parameters: {
        path: {
          /** スケジュールID */
          id: string;
        };
      };
      responses: {
        /** 成功 */
        204: never;
        /** Unauthorized */
        401: unknown;
        /** Schedule Not Found */
        404: unknown;
        /** サーバーエラー */
        500: unknown;
      };
    };
    patch: {
      parameters: {
        path: {
          /** スケジュールID */
          id: string;
        };
      };
      responses: {
        /** 成功 */
        200: {
          content: {
            "application/json": components["schemas"]["ScheduleResponse"];
          };
        };
        /** Unauthorized */
        401: unknown;
        /** Schedule Not Found */
        404: unknown;
        /** サーバーエラー */
        500: unknown;
      };
      requestBody: {
        content: {
          "application/json": {
            max_number: number;
          };
        };
      };
    };
  };
}

export interface components {
  schemas: {
    AdminRequest: {
      name: string;
      /** Format: email */
      email: string;
      /** Format: password */
      password: string;
    };
    LoginRequest: {
      /** Format: email */
      email: string;
      /** Format: password */
      password: string;
    };
    AdminResponse: {
      /** Format: uuid */
      id: string;
      name: string;
      /** Format: email */
      email: string;
      /** Format: password */
      password: string;
      /** Format: date-time */
      created_at: string;
      /** Format: date-time */
      updated_at: string;
    };
    ReservationRequest: {
      name: string;
      /** Format: email */
      email: string;
      phone_number: string;
      address: string;
      adult_number: number;
      primary_school_child_number: number;
      child_number: number;
      /** Format: uuid */
      schedule_id: string;
    };
    ReservationResponse: {
      /** Format: uuid */
      id: string;
      name: string;
      /** Format: email */
      email: string;
      phone_number: string;
      address: string;
      adult_number: number;
      primary_school_child_number: number;
      child_number: number;
      /** Format: uuid */
      search_id: string;
      /** Format: uuid */
      schedule_id: string;
      /** Format: date-time */
      created_at: string;
      /** Format: date-time */
      updated_at: string;
    };
    ReservationsResponse: components["schemas"]["ReservationResponse"][];
    ScheduleRequest: {
      /** Format: date */
      date: string;
      start_time: string;
      max_number: number;
    };
    ScheduleResponse: {
      /** Format: uuid */
      id: string;
      /** Format: date */
      date: string;
      start_time: string;
      max_number: number;
      reservation_number: number;
      /** Format: date-time */
      created_at: string;
      /** Format: date-time */
      updated_at: string;
    };
    SchedulesResponse: components["schemas"]["ScheduleResponse"][];
  };
}

export interface operations {}

export interface external {}