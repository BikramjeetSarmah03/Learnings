/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './pages/__root'
import { Route as PostImport } from './pages/post'
import { Route as AboutImport } from './pages/about'
import { Route as AuthImport } from './pages/_auth'
import { Route as IndexImport } from './pages/index'
import { Route as AuthSubmitImport } from './pages/_auth/submit'
import { Route as authSignupImport } from './pages/(auth)/signup'
import { Route as authLoginImport } from './pages/(auth)/login'

// Create/Update Routes

const PostRoute = PostImport.update({
  path: '/post',
  getParentRoute: () => rootRoute,
} as any)

const AboutRoute = AboutImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthSubmitRoute = AuthSubmitImport.update({
  path: '/submit',
  getParentRoute: () => AuthRoute,
} as any)

const authSignupRoute = authSignupImport.update({
  path: '/signup',
  getParentRoute: () => rootRoute,
} as any)

const authLoginRoute = authLoginImport.update({
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/post': {
      id: '/post'
      path: '/post'
      fullPath: '/post'
      preLoaderRoute: typeof PostImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof authLoginImport
      parentRoute: typeof rootRoute
    }
    '/(auth)/signup': {
      id: '/signup'
      path: '/signup'
      fullPath: '/signup'
      preLoaderRoute: typeof authSignupImport
      parentRoute: typeof rootRoute
    }
    '/_auth/submit': {
      id: '/_auth/submit'
      path: '/submit'
      fullPath: '/submit'
      preLoaderRoute: typeof AuthSubmitImport
      parentRoute: typeof AuthImport
    }
  }
}

// Create and export the route tree

interface AuthRouteChildren {
  AuthSubmitRoute: typeof AuthSubmitRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthSubmitRoute: AuthSubmitRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '': typeof AuthRouteWithChildren
  '/about': typeof AboutRoute
  '/post': typeof PostRoute
  '/login': typeof authLoginRoute
  '/signup': typeof authSignupRoute
  '/submit': typeof AuthSubmitRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '': typeof AuthRouteWithChildren
  '/about': typeof AboutRoute
  '/post': typeof PostRoute
  '/login': typeof authLoginRoute
  '/signup': typeof authSignupRoute
  '/submit': typeof AuthSubmitRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/_auth': typeof AuthRouteWithChildren
  '/about': typeof AboutRoute
  '/post': typeof PostRoute
  '/login': typeof authLoginRoute
  '/signup': typeof authSignupRoute
  '/_auth/submit': typeof AuthSubmitRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '' | '/about' | '/post' | '/login' | '/signup' | '/submit'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '' | '/about' | '/post' | '/login' | '/signup' | '/submit'
  id:
    | '__root__'
    | '/'
    | '/_auth'
    | '/about'
    | '/post'
    | '/login'
    | '/signup'
    | '/_auth/submit'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  AuthRoute: typeof AuthRouteWithChildren
  AboutRoute: typeof AboutRoute
  PostRoute: typeof PostRoute
  authLoginRoute: typeof authLoginRoute
  authSignupRoute: typeof authSignupRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  AuthRoute: AuthRouteWithChildren,
  AboutRoute: AboutRoute,
  PostRoute: PostRoute,
  authLoginRoute: authLoginRoute,
  authSignupRoute: authSignupRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/_auth",
        "/about",
        "/post",
        "/login",
        "/signup"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/submit"
      ]
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/post": {
      "filePath": "post.tsx"
    },
    "/login": {
      "filePath": "(auth)/login.tsx"
    },
    "/signup": {
      "filePath": "(auth)/signup.tsx"
    },
    "/_auth/submit": {
      "filePath": "_auth/submit.tsx",
      "parent": "/_auth"
    }
  }
}
ROUTE_MANIFEST_END */
