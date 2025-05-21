import {
  IIncomingEvent,
  RouteDefinition,
  MetaEventHandler,
  EventHandlerType,
  EventHandlerClass,
  StoneIncomingEvent,
  FactoryEventHandler,
  FunctionalEventHandler
} from '../declarations'
import { RouterBlueprint } from '../options/RouterBlueprint'

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
 * @param options - Options to specify the handler type.
 * @param options.isFactory - Indicates that the handler is a factory function.
 * @returns The MetaEventHandler.
 */
export function defineEventHandler <U extends IIncomingEvent = IIncomingEvent> (
  module: FactoryEventHandler<U>,
  options: { isFactory: true }
): MetaEventHandler<U>

/**
 * Utility function to define a class-based event handler.
 *
 * @param module - The EventHandler module.
 * @param options - Options to specify the handler type.
 * @param options.isClass - Indicates that the handler is a class.
 * @param options.action - The action name for the event handler.
 * @returns The MetaEventHandler.
 */
export function defineEventHandler <U extends IIncomingEvent = IIncomingEvent> (
  module: EventHandlerClass<U>,
  options: { isClass: true, action: string }
): MetaEventHandler<U>

/**
 * Utility function to define an event handler.
 *
 * @param module - The EventHandler module.
 * @param options - Optional handler definition options.
 * @param options.isFactory - Indicates that the handler is a factory function.
 * @param options.isClass - Indicates that the handler is a class.
 * @param options.action - The action name for the event handler.
 * @returns The MetaEventHandler.
 */
export function defineEventHandler<U extends IIncomingEvent = IIncomingEvent> (
  module: EventHandlerType<U>,
  options?: { isFactory?: boolean, isClass?: boolean, action?: string }
): MetaEventHandler<U> {
  return {
    ...options,
    module
  }
}

/**
 * Utility function to define a route with function-based handler.
 *
 * @param module - The EventHandler module.
 * @param options - Optional route definition options.
 * @returns The RouterBlueprint.
 */
export function defineRoute<U extends StoneIncomingEvent = StoneIncomingEvent> (
  module: FunctionalEventHandler<U>,
  options: RouteDefinition<U>
): RouterBlueprint<U>

/**
 * Utility function to define a route with factory-based handler.
 *
 * @param module - The EventHandler module.
 * @param options - Route definition options with isFactory set to true.
 * @param options.isFactory - Indicates that the handler is a factory function.
 * @returns The RouterBlueprint.
 */
export function defineRoute<U extends StoneIncomingEvent = StoneIncomingEvent> (
  module: FactoryEventHandler<U>,
  options: RouteDefinition<U> & { isFactory: true }
): RouterBlueprint<U>

/**
 * Utility function to define a route with class-based handler.
 *
 * @param module - The EventHandler module.
 * @param options - Route definition options with isClass and action.
 * @param options.isClass - Indicates that the handler is a class.
 * @param options.action - The action name for the event handler.
 * @returns The RouterBlueprint.
 */
export function defineRoute<U extends StoneIncomingEvent = StoneIncomingEvent> (
  module: EventHandlerClass<U>,
  options: RouteDefinition<U> & { isClass: true, action: string }
): RouterBlueprint<U>

/**
 * Utility function to define a route.
 *
 * @param module - The EventHandler module.
 * @param options - Route definition options.
 * @param options.isFactory - Indicates that the handler is a factory function.
 * @param options.isClass - Indicates that the handler is a class.
 * @param options.action - The action name for the event handler.
 * @returns The RouterBlueprint.
 */
export function defineRoute<U extends StoneIncomingEvent = StoneIncomingEvent> (
  module: EventHandlerType<U>,
  options: RouteDefinition<U> & { isClass?: boolean, isFactory?: boolean, action?: string }
): RouterBlueprint<U> {
  return {
    stone: {
      router: {
        definitions: [
          {
            ...options,
            handler: { module, action: options?.action, isFactory: options?.isFactory, isClass: options?.isClass }
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
  routes: Array<[FunctionalEventHandler<U>, RouteDefinition<U>] | RouteDefinition<U>>
): RouterBlueprint<U>

/**
 * Utility function to define multiple routes with factory-based handlers.
 *
 * @param routes - An array of route definitions, each containing path, module, and options.
 * @returns The RouterBlueprint.
 */
export function defineRoutes<U extends StoneIncomingEvent = StoneIncomingEvent> (
  routes: Array<[FactoryEventHandler<U>, RouteDefinition<U> & { isFactory: true }] | RouteDefinition<U>>
): RouterBlueprint<U>

/**
 * Utility function to define multiple routes with class-based handlers.
 *
 * @param routes - An array of route definitions, each containing path, module, and options.
 * @returns The RouterBlueprint.
 */
export function defineRoutes<U extends StoneIncomingEvent = StoneIncomingEvent> (
  routes: Array<[EventHandlerClass<U>, RouteDefinition<U> & { isClass: true, action: string }] | RouteDefinition<U>>
): RouterBlueprint<U>

/**
 * Utility function to define multiple routes.
 *
 * @param routes - An array of route definitions, each containing path, module, and options.
 * @returns The RouterBlueprint.
 */
export function defineRoutes<U extends StoneIncomingEvent = StoneIncomingEvent> (
  routes: Array<[EventHandlerType<U>, RouteDefinition<U> & { isFactory?: boolean, isClass?: boolean, action?: string }] | RouteDefinition<U>>
): RouterBlueprint<U> {
  const definitions = routes.map(v => Array.isArray(v)
    ? ({ ...v[1], handler: { module: v[0], action: v[1]?.action, isClass: v[1]?.isClass, isFactory: v[1]?.isFactory } })
    : v
  )

  return { stone: { router: { definitions } } }
}
