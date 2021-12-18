import { ActionInterface } from './constants';
export declare const isNullOrUndefined: (value: string | undefined | null) => boolean;
export declare const hasRequiredParameters: (action: ActionInterface) => void;
export declare const extractErrorMessage: (error: unknown) => string;
