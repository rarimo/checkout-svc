import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { ApiVersionGuard } from '@nestjsx/api-version'

import { AllExceptionsFilter } from './all-exceptions.interceptors'
import { HeadersEntryInterceptor } from './headers-entry.interceptors'
import { HeadersExitInterceptor } from './headers-exit.interceptors'
import { ResponseInterceptor } from './response.interceptors'

export const basicInterceptors = [
  {
    provide: APP_INTERCEPTOR,
    useClass: HeadersEntryInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: ResponseInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: HeadersExitInterceptor,
  },
  {
    provide: APP_FILTER,
    useClass: AllExceptionsFilter,
  },
  {
    provide: APP_GUARD,
    useClass: ApiVersionGuard,
  },
]

export * from './all-exceptions.interceptors'
