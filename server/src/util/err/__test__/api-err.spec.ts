import { describe, it, expect, vi } from "vitest";
import ApiErr from "../api-err";


describe('api-err', () => {

    it('should format error with mandatory fields', () => {
        const error = ApiErr.format({ code: 404, cause: 'User not found!' });
        expect(error).toEqual({
          cause: 'User not found!',
          error: 'Not Found',
          code: 404,
        });
      });

      it('should format error with mandatory fields and description', () => {
        const error = ApiErr.format({
          code: 404,
          message: 'User not found!',
          description: 'This error happens when there is no user created',
        });
        expect(error).toEqual({
          message: 'User not found!',
          error: 'Not Found',
          code: 404,
          description: 'This error happens when there is no user created',
        });
      });

      it('should format error with mandatory fields and description and documentation', () => {
        const error = ApiErr.format({
          code: 404,
          message: 'User not found!',
          description: 'This error happens when there is no user created',
          documentation: 'https://mydocs.com/error-404',
        });
        expect(error).toEqual({
          message: 'User not found!',
          error: 'Not Found',
          code: 404,
          description: 'This error happens when there is no user created',
          documentation: 'https://mydocs.com/error-404',
        });
      });
});