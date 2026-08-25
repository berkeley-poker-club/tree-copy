import type { QueryKey, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import type { CreateEventBody, CreateInstagramPostBody, Event, HealthStatus, InstagramPost } from "./api.schemas";
import { customFetch } from "../custom-fetch";
import type { ErrorType, BodyType } from "../custom-fetch";
type AwaitedInput<T> = PromiseLike<T> | T;
type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;
type SecondParameter<T extends (...args: never) => unknown> = Parameters<T>[1];
/**
 * Returns server health status
 * @summary Health check
 */
export declare const getHealthCheckUrl: () => string;
export declare const healthCheck: (options?: RequestInit) => Promise<HealthStatus>;
export declare const getHealthCheckQueryKey: () => readonly ["/api/healthz"];
export declare const getHealthCheckQueryOptions: <TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData> & {
    queryKey: QueryKey;
};
export type HealthCheckQueryResult = NonNullable<Awaited<ReturnType<typeof healthCheck>>>;
export type HealthCheckQueryError = ErrorType<unknown>;
/**
 * @summary Health check
 */
export declare function useHealthCheck<TData = Awaited<ReturnType<typeof healthCheck>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof healthCheck>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * Returns all events sorted by date ascending
 * @summary List all events
 */
export declare const getListEventsUrl: () => string;
export declare const listEvents: (options?: RequestInit) => Promise<Event[]>;
export declare const getListEventsQueryKey: () => readonly ["/api/events"];
export declare const getListEventsQueryOptions: <TData = Awaited<ReturnType<typeof listEvents>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listEvents>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listEvents>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListEventsQueryResult = NonNullable<Awaited<ReturnType<typeof listEvents>>>;
export type ListEventsQueryError = ErrorType<unknown>;
/**
 * @summary List all events
 */
export declare function useListEvents<TData = Awaited<ReturnType<typeof listEvents>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listEvents>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Create a new event
 */
export declare const getCreateEventUrl: () => string;
export declare const createEvent: (createEventBody: CreateEventBody, options?: RequestInit) => Promise<Event>;
export declare const getCreateEventMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createEvent>>, TError, {
        data: BodyType<CreateEventBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createEvent>>, TError, {
    data: BodyType<CreateEventBody>;
}, TContext>;
export type CreateEventMutationResult = NonNullable<Awaited<ReturnType<typeof createEvent>>>;
export type CreateEventMutationBody = BodyType<CreateEventBody>;
export type CreateEventMutationError = ErrorType<void>;
/**
 * @summary Create a new event
 */
export declare const useCreateEvent: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createEvent>>, TError, {
        data: BodyType<CreateEventBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createEvent>>, TError, {
    data: BodyType<CreateEventBody>;
}, TContext>;
/**
 * @summary Delete an event
 */
export declare const getDeleteEventUrl: (id: number) => string;
export declare const deleteEvent: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteEventMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteEvent>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteEvent>>, TError, {
    id: number;
}, TContext>;
export type DeleteEventMutationResult = NonNullable<Awaited<ReturnType<typeof deleteEvent>>>;
export type DeleteEventMutationError = ErrorType<void>;
/**
 * @summary Delete an event
 */
export declare const useDeleteEvent: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteEvent>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteEvent>>, TError, {
    id: number;
}, TContext>;
/**
 * @summary List featured Instagram posts
 */
export declare const getListInstagramPostsUrl: () => string;
export declare const listInstagramPosts: (options?: RequestInit) => Promise<InstagramPost[]>;
export declare const getListInstagramPostsQueryKey: () => readonly ["/api/instagram-posts"];
export declare const getListInstagramPostsQueryOptions: <TData = Awaited<ReturnType<typeof listInstagramPosts>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listInstagramPosts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}) => UseQueryOptions<Awaited<ReturnType<typeof listInstagramPosts>>, TError, TData> & {
    queryKey: QueryKey;
};
export type ListInstagramPostsQueryResult = NonNullable<Awaited<ReturnType<typeof listInstagramPosts>>>;
export type ListInstagramPostsQueryError = ErrorType<unknown>;
/**
 * @summary List featured Instagram posts
 */
export declare function useListInstagramPosts<TData = Awaited<ReturnType<typeof listInstagramPosts>>, TError = ErrorType<unknown>>(options?: {
    query?: UseQueryOptions<Awaited<ReturnType<typeof listInstagramPosts>>, TError, TData>;
    request?: SecondParameter<typeof customFetch>;
}): UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
};
/**
 * @summary Add an Instagram post to the feed
 */
export declare const getCreateInstagramPostUrl: () => string;
export declare const createInstagramPost: (createInstagramPostBody: CreateInstagramPostBody, options?: RequestInit) => Promise<InstagramPost>;
export declare const getCreateInstagramPostMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createInstagramPost>>, TError, {
        data: BodyType<CreateInstagramPostBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof createInstagramPost>>, TError, {
    data: BodyType<CreateInstagramPostBody>;
}, TContext>;
export type CreateInstagramPostMutationResult = NonNullable<Awaited<ReturnType<typeof createInstagramPost>>>;
export type CreateInstagramPostMutationBody = BodyType<CreateInstagramPostBody>;
export type CreateInstagramPostMutationError = ErrorType<void>;
/**
 * @summary Add an Instagram post to the feed
 */
export declare const useCreateInstagramPost: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof createInstagramPost>>, TError, {
        data: BodyType<CreateInstagramPostBody>;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof createInstagramPost>>, TError, {
    data: BodyType<CreateInstagramPostBody>;
}, TContext>;
/**
 * @summary Remove an Instagram post from the feed
 */
export declare const getDeleteInstagramPostUrl: (id: number) => string;
export declare const deleteInstagramPost: (id: number, options?: RequestInit) => Promise<void>;
export declare const getDeleteInstagramPostMutationOptions: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteInstagramPost>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationOptions<Awaited<ReturnType<typeof deleteInstagramPost>>, TError, {
    id: number;
}, TContext>;
export type DeleteInstagramPostMutationResult = NonNullable<Awaited<ReturnType<typeof deleteInstagramPost>>>;
export type DeleteInstagramPostMutationError = ErrorType<void>;
/**
 * @summary Remove an Instagram post from the feed
 */
export declare const useDeleteInstagramPost: <TError = ErrorType<void>, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<Awaited<ReturnType<typeof deleteInstagramPost>>, TError, {
        id: number;
    }, TContext>;
    request?: SecondParameter<typeof customFetch>;
}) => UseMutationResult<Awaited<ReturnType<typeof deleteInstagramPost>>, TError, {
    id: number;
}, TContext>;
export {};
//# sourceMappingURL=api.d.ts.map