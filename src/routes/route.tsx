import * as Sentry from "@sentry/react";
import {
  createBrowserRouter,
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from "react-router-dom";
import { Not_Found } from "~/pages/Not-Found.tsx";
import { Settings } from "~/pages/settings.tsx";
import { Home } from "~/pages/Home.tsx";
import { Profiles } from "~/pages/Profiles.tsx";
import { Profile } from "~/pages/Profile.tsx";
import { Login } from "~/pages/Login.tsx";
import React from "react";
import { SecureRoutes } from "./secureRoutes.tsx";
import { Price } from "~/pages/price.tsx";
import { Records } from "~/pages/ParkingRecords/Records.tsx";
import { Record } from "~/pages/ParkingRecords/record.tsx";
import { ChatRoom } from "~/components/Chats/ChatRoom.tsx";
import { ChatRoomIndex } from "~/components/Chats/ChatRoomIndex.tsx";
import { ChatLayout } from "~/components/Chats/ChatLayout.tsx";
import { Analytics } from "~/pages/Analytics.tsx";
import { Bookings } from "~/pages/Bookings/Bookings.tsx";
import { Booking } from "~/pages/Bookings/Booking.tsx";

Sentry.init({
  dsn: "https://263dcf04ff838f8d40dc84e1b97a7bc8@o4506760346468352.ingest.sentry.io/4506760355577856",
  enabled: false,
  integrations: [
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect: React.useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost:25674"],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

const sentryCreateBrowserRouter =
  Sentry.wrapCreateBrowserRouter(createBrowserRouter);

export const router = sentryCreateBrowserRouter([
  {
    path: "/",
    // element: <Layout />,
    element: <SecureRoutes />,
    errorElement: <Not_Found />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "profiles",
        element: <Profiles />,
        children: [{ path: "/profiles/:id", element: <Profile /> }],
      },
      { path: "settings", element: <Settings /> },
      {
        path: "price",
        element: <Price />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "records",
        // loader: Recordsloader,
        element: <Records />,
      },
      {
        path: "records/:id",
        element: <Record />,
      },
      {
        path: "chats",
        element: <ChatLayout />,
        children: [
          { index: true, element: <ChatRoomIndex /> },
          { path: "/chats/:id", element: <ChatRoom /> },
        ],
      },
      {
        path: "Bookings",
        element: <Bookings />,
      },
      {
        path: "Bookings/:id",
        element: <Booking />,
      },
    ],
  },
  {
    path: "Login",
    element: <Login />,
  },
]);
