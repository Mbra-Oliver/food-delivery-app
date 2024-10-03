/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(app)` | `/(app)/` | `/(app)/(tabs)` | `/(app)/(tabs)/` | `/(app)/(tabs)/explore` | `/(app)/(tabs)/orders` | `/(app)/(tabs)/profile` | `/(app)/explore` | `/(app)/orders` | `/(app)/pages/cart` | `/(app)/pages/profile/Edit` | `/(app)/pages/search` | `/(app)/profile` | `/(tabs)` | `/(tabs)/` | `/(tabs)/explore` | `/(tabs)/orders` | `/(tabs)/profile` | `/_sitemap` | `/auth/login` | `/auth/register` | `/explore` | `/orders` | `/pages/cart` | `/pages/profile/Edit` | `/pages/search` | `/profile`;
      DynamicRoutes: `/(app)/pages/foods/${Router.SingleRoutePart<T>}` | `/(app)/pages/orders/${Router.SingleRoutePart<T>}` | `/(app)/pages/orders/status/${Router.SingleRoutePart<T>}` | `/pages/foods/${Router.SingleRoutePart<T>}` | `/pages/orders/${Router.SingleRoutePart<T>}` | `/pages/orders/status/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/(app)/pages/foods/[id]` | `/(app)/pages/orders/[id]` | `/(app)/pages/orders/status/[status]` | `/pages/foods/[id]` | `/pages/orders/[id]` | `/pages/orders/status/[status]`;
    }
  }
}
