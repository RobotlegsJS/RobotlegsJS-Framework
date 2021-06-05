// ------------------------------------------------------------------------------
//  Copyright (c) 2017-present, RobotlegsJS. All Rights Reserved.
//
//  NOTICE: You are permitted to use, modify, and distribute this file
//  in accordance with the terms of the license agreement accompanying it.
// ------------------------------------------------------------------------------

// eslint-disable-next-line @rushstack/typedef-var
export const ILogger = Symbol("ILogger");

/**
 * The Robotlegs logger contract
 */
export interface ILogger {
    /**
     * Source indentifier
     */
    source: any;

    /**
     * Logs a message for debug purposes
     *
     * @param message Message to log
     * @param params Message parameters
     */
    debug(message: any, params?: any[]): void;

    /**
     * Logs a message for notification purposes
     *
     * @param message Message to log
     * @param params Message parameters
     */
    info(message: any, params?: any[]): void;

    /**
     * Logs a warning message
     *
     * @param message Message to log
     * @param params Message parameters
     */
    warn(message: any, params?: any[]): void;

    /**
     * Logs an error message
     *
     * @param message Message to log
     * @param params Message parameters
     */
    error(message: any, params?: any[]): void;

    /**
     * Logs a fatal error message
     *
     * @param message Message to log
     * @param params Message parameters
     */
    fatal(message: any, params?: any[]): void;
}
