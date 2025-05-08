import {
  IIncomingEvent,
  RouteDefinition,
  MetaEventHandler,
  EventHandlerType,
  EventHandlerClass,
  StoneIncomingEvent,
  FactoryEventHandler,
  FunctionalEventHandler
} from './declarations'
import { RouterBlueprint } from './options/RouterBlueprint'

/**
 * Utility function to define a function-based event handler.
 *
 * @param module - The EventHandler module.
 * @returns The MetaEventHandler.
 */
export function defineEventHandler <U extends IIncomingEvent = IIncomingEvent> (
  module: FunctionalEventHandler<U>
): MetaEventHandler<U>

/**
 * Utility function to define a factory-based event handler.
 *
 * @param module - The EventHandler module.
 * @param isFactory - Indicates if the handler is a factory function. e.g. `true` for a factory function.
 * @returns The MetaEventHandler.
 */
export function defineEventHandler <U extends IIncomingEvent = IIncomingEvent> (
  module: FactoryEventHandler<U>,
  isFactory: true
): MetaEventHandler<U>

/**
 * Utility function to define a factory-based event handler.
 *
 * @param module - The EventHandler module.
 * @param isFactory - Indicates if the handler is a factory function. e.g. `false` for a class.
 * @param action - The action name for the event handler.
 * @returns The MetaEventHandler.
 */
export function defineEventHandler <U extends IIncomingEvent = IIncomingEvent> (
  module: EventHandlerClass<U>,
  isFactory: false,
  action?: string
): MetaEventHandler<U>

/**
 * Utility function to define an event handler.
 *
 * @param module - The EventHandler module.
 * @param isFactory - Indicates if the handler is a factory function. e.g. `true` for a factory function, `false` for a class, or `undefined` for a functional handler.
 * @param action - The action name for the event handler.
 * @returns The StoneBlueprint.
 */
export function defineEventHandler<U extends IIncomingEvent = IIncomingEvent> (
  module: EventHandlerType<U>,
  isFactory?: boolean,
  action?: string
): MetaEventHandler<U> {
  return {
    action,
    module,
    isFactory,
    isClass: isFactory === false
  }
}

/**
 * Utility function to define a route with function-based handler.
 *
 * @param path - The path for the route.
 * @param module - The EventHandler module.
 * @param options - Optional route definition options.
 * @returns The RouterBlueprint.
 */
export function defineRoute<U extends StoneIncomingEvent = StoneIncomingEvent> (
  path: string,
  module: FunctionalEventHandler<U>,
  options?: RouteDefinition<U>
): RouterBlueprint<U>

/**
 * Utility function to define a route with factory-based handler.
 *
 * @param path - The path for the route.
 * @param module - The EventHandler module.
 * @param options - Optional route definition options.
 * @returns The RouterBlueprint.
 */
export function defineRoute<U extends StoneIncomingEvent = StoneIncomingEvent> (
  path: string,
  module: FactoryEventHandler<U>,
  options?: RouteDefinition<U> & { isFactory: true }
): RouterBlueprint<U>

/**
 * Utility function to define a route with class-based handler.
 *
 * @param path - The path for the route.
 * @param module - The EventHandler module.
 * @param options - Optional route definition options.
 * @returns The RouterBlueprint.
 */
export function defineRoute<U extends StoneIncomingEvent = StoneIncomingEvent> (
  path: string,
  module: EventHandlerClass<U>,
  options?: RouteDefinition<U> & { isFactory: false, action: string }
): RouterBlueprint<U>

/**
 * Utility function to define a route.
 *
 * @param path - The path for the route.
 * @param module - The EventHandler module.
 * @param options - Optional route definition options.
 * @returns The RouterBlueprint.
 */
export function defineRoute<U extends StoneIncomingEvent = StoneIncomingEvent> (
  path: string,
  module: EventHandlerType<U>,
  options?: RouteDefinition<U> & { isFactory?: boolean, action?: string }
): RouterBlueprint<U> {
  return {
    stone: {
      router: {
        definitions: [
          {
            ...options,
            path,
            handler: { module, action: options?.action, isFactory: options?.isFactory }
          }
        ]
      }
    }
  }
}

/**
 * Utility function to define multiple routes with function-based handlers.
 *
 * @param routes - An array of route definitions, each containing path, module, and options.
 * @returns The RouterBlueprint.
 */
export function defineRoutes<U extends StoneIncomingEvent = StoneIncomingEvent> (
  routes: Array<[string, FunctionalEventHandler<U>, RouteDefinition<U>] | RouteDefinition<U>>
): RouterBlueprint<U>

/**
 * Utility function to define multiple routes with factory-based handlers.
 *
 * @param routes - An array of route definitions, each containing path, module, and options.
 * @returns The RouterBlueprint.
 */
export function defineRoutes<U extends StoneIncomingEvent = StoneIncomingEvent> (
  routes: Array<[string, FactoryEventHandler<U>, RouteDefinition<U> & { isFactory: true }] | RouteDefinition<U>>
): RouterBlueprint<U>

/**
 * Utility function to define multiple routes with class-based handlers.
 *
 * @param routes - An array of route definitions, each containing path, module, and options.
 * @returns The RouterBlueprint.
 */
export function defineRoutes<U extends StoneIncomingEvent = StoneIncomingEvent> (
  routes: Array<[string, EventHandlerClass<U>, RouteDefinition<U> & { isFactory: false, action: string }] | RouteDefinition<U>>
): RouterBlueprint<U>

/**
 * Utility function to define multiple routes.
 *
 * @param routes - An array of route definitions, each containing path, module, and options.
 * @returns The RouterBlueprint.
 */
export function defineRoutes<U extends StoneIncomingEvent = StoneIncomingEvent> (
  routes: Array<[string, EventHandlerType<U>, RouteDefinition<U> & { isFactory?: boolean, action?: string }] | RouteDefinition<U>>
): RouterBlueprint<U> {
  const definitions = routes.map(v => Array.isArray(v)
    ? ({ ...v[2], path: v[0], handler: { module: v[1], action: v[2]?.action, isFactory: v[2]?.isFactory } })
    : v
  )

  return { stone: { router: { definitions } } }
}
