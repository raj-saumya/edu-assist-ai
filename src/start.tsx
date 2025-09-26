import { createMiddleware, createStart } from '@tanstack/react-start'
import { createSerializationAdapter } from '@tanstack/react-router'
import type { Register } from '@tanstack/react-router'

declare module '@tanstack/react-start' {
  interface Register {
    server: {
      requestContext: {
        fromFetch: boolean
      }
    }
  }
}

export const serverMw = createMiddleware().server(({ next, context }) => {
  context.fromFetch

  const nonce = Math.random().toString(16).slice(2, 10)
  return next({
    context: {
      fromServerMw: true,
      nonce,
    },
  })
})

export const fnMw = createMiddleware({ type: 'function' })
  .middleware([serverMw])
  .server(({ next, context }) => {
    context.fromFetch

    return next({
      context: {
        fromFnMw: true,
      },
    })
  })

const serializeClass = createSerializationAdapter({
  key: 'Test',
  test: (v) => v instanceof Test,
  toSerializable: (v) => v.test,
  fromSerializable: (v) => new Test(v),
})

export class Test {
  constructor(public test: string) {}
  init() {
    return this.test
  }
}

export const startInstance = createStart(() => {
  return {
    defaultSsr: true,
    serializationAdapters: [serializeClass],
    requestMiddleware: [serverMw],
    functionMiddleware: [fnMw],
  }
})


type test3 = Register extends {
  config: infer TConfig
}
  ? TConfig extends {
      '~types': infer TTypes
    }
    ? TTypes
    : unknown
  : unknown

startInstance.createMiddleware().server(({ next, context }) => {
  context.fromFetch
  context.fromServerMw

  return next({
    context: {
      fromStartInstanceMw: true,
    },
  })
})
