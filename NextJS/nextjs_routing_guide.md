
# Project Routing Guidelines

## Overview

This document provides comprehensive guidelines on the routing structure within our project, focusing on the use of TypeScript enums for managing routes and the organization of routing components within the `components/routing` directory. These guidelines are essential for ensuring consistency, maintainability, type safety, and scalability across the application. Please refer to this guide whenever you're working with routes or routing components to ensure adherence to our routing standards.

## Why We Use Enums for Routing

In this project, we use TypeScript enums to manage all our route paths. This approach offers several benefits:

- **Consistency:** All route paths are defined in one place, ensuring that the same routes are used consistently throughout the application.
- **Maintainability:** If a route needs to be updated, we only need to make the change in one location, reducing the risk of introducing bugs during refactoring.
- **Type Safety:** TypeScript enforces that only valid routes are used, preventing runtime errors related to incorrect routes.
- **Scalability:** As the project grows, having a centralized route management system makes it easier to manage an increasing number of routes.

**Note:** The routes for our application are defined inside `src/types/routes.enum.ts`. Always refer to this file for the most up-to-date routing paths.

## Folder Structure

Here’s a brief overview of our folder structure related to routing:

```
src/
├── app/
│   ├── auth/
│   │   ├── email-verification-sent/
│   │   ├── login/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── page.tsx
│   ├── portal/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.module.css
│   ├── page.tsx
├── components/
│   ├── routing/
│   │   ├── MainHeaderWithRouting.component.tsx
│   │   ├── BreadcrumbsWithRouting.component.tsx
│   │   ├── SidebarWithRouting.component.tsx
```

## Routing Enums

The routes in our application are organized into three main enums:

- **BaseRoutes:** General routes that form the foundation of the application's navigation structure.
- **AuthRoutes:** Routes specific to authentication processes (e.g., login, sign-up, password reset).
- **PortalRoutes:** Routes related to the portal section of the application, typically involving user dashboards, settings, etc.

### Example Enums

```typescript
export enum BaseRoutes {
    ROOT = "/",
    AUTH = "/auth",
    PORTAL = "/portal",
    VALUATION_ESTIMATE = "/valuation-estimate",
    ONBOARD = "/onboard"
}

export enum AuthRoutes  {
    LOGIN = "/auth/login",
    SIGN_UP = "/auth/sign-up",
    PASSWORD_RESET = '/auth/password-reset',
    VERIFY_EMAIL = '/auth/verify-email',
    VERIFY_EMAIL_SENT = '/auth/email-verification-sent'
}

export enum PortalRoutes  {
    DASHBOARD = "/portal/dashboard",
    BLUEPRINT = "/portal/blueprint",
    DOCUMENTS = '/portal/documents',
    SETTINGS = '/portal/settings',
}
```

## Consolidated Route Paths

To further simplify the usage of routes, we have consolidated all the paths from `BaseRoutes`, `AuthRoutes`, and `PortalRoutes` into a single object. This object provides a single source of truth for all route paths in the application.

### Example of Consolidating Route Paths

```typescript
export const routePaths = {
    ...BaseRoutes,
    ...AuthRoutes,
    ...PortalRoutes
};
```

### Accessing a Route Path

When you need to access a specific route path:

```typescript
import { routePaths } from '@/types/routes.enum';

function redirectToDashboard() {
    const dashboardRoute = routePaths.DASHBOARD;
    router.push(dashboardRoute);
}
```

## How to Use Enums in the Application

Whenever you need to define a link or redirect a user within the application, always use the predefined enums or the consolidated `routePaths` object. This ensures that the route you are using is correct and consistent with the rest of the application.

### Example Usage with Enums

```typescript
import Link from 'next/link';
import { AuthRoutes } from '@/types/routes.enum';

export default function LoginForm() {
    return (
        <form>
            {/* Other form fields */}
            <Link href={AuthRoutes.SIGN_UP}>
                <a>Create an Account</a>
            </Link>
        </form>
    );
}
```

## Best Practices

1. **Always Use Enums or routePaths:** Whenever you reference a route, use the appropriate enum or the `routePaths` object. Do not hardcode paths directly into your components or pages.
2. **Keep Enums Updated:** As new routes are added, ensure they are properly defined in the relevant enum. This maintains the integrity of the routing structure.
3. **Review Changes:** When modifying routes, review the enums and `routePaths` to ensure that any necessary updates are made. This helps prevent broken links or navigation issues.

# Routing Components

## Overview

The `components/routing` directory is dedicated to housing all routing-related components within our project. These components are responsible for managing the routing, links, and overall navigation structure of the application. The primary focus of this folder is to apply routing logic to navigation components imported from the `design-system`, ensuring that these components are ready for use across the application with minimal additional coding.

## Purpose

The primary purpose of the `routing` folder is to encapsulate all components that directly relate to the application's routing logic. This includes:

- **Navigation Components**: Utilizing navigation components from the `design-system` and applying routing logic to them, ensuring that these components are ready to be used throughout the application.
- **Link Wrappers**: Custom link components that handle navigation, modify the behavior of `Next.js` links, and reduce repetitive coding.
- **Reusability**: By centralizing routing logic in this folder, we can minimize the need to write repetitive code, making it easier to maintain and update routing across the application.

## Best Practices

### **.component.tsx Extension**

All components within this folder should use the `.component.tsx` extension. This naming convention helps to clearly differentiate between component files and other types of files, such as utility functions or styles.

### **No Markup or Styling in This Folder**

Components in the `routing` directory should focus solely on routing logic. All markup and styling should be handled within the `components/design-system` directory. This approach ensures a clear separation of concerns: the `routing` components handle navigation logic, while the `design-system` components manage the UI.

### **Leverage `Next.js` Routing and Link**

Routing components should make full use of `Next.js` routing and the `<Link>` component. The `<Link>` component is essential for client-side navigation, prefetching routes, and maintaining the history stack. Here’s a quick overview of the `<Link>` component's primary props:

- **`href` (required):** The path or URL to navigate to.
- **`replace`:** When true, replaces the current history state instead of adding a new URL into the browser’s history stack.
- **`scroll`:** Defaults to true. Controls whether the page scrolls to the top after navigation.
- **`prefetch`:** Controls whether the route is prefetched when it enters the viewport.

### **Create Reusable Routing Components**

If you find yourself coding the same routing logic multiple times, or if you anticipate a route being used frequently across the application (e.g., `/portal/dashboard`), consider creating a reusable link component. This helps centralize routing logic and makes it easier to maintain and update routes.

### Example: `MainHeaderWithRouting` Component

Rather than including all logic in one place, we import a `MainHeader` component from the `design-system` and create a `MainHeaderWithRouting` component in the `routing` folder. This component handles the routing logic, allowing for a clean separation of concerns.

```tsx
// src/components/routing/MainHeaderWithRouting.component.tsx
import React from 'react';
import MainHeader from '@/components/design-system/organisms/headers/MainHeader';
import Link, { LinkProps } from 'next/link';

interface CustomLinkProps extends LinkProps {
  children: React.ReactNode;
}

const CustomLink: React.FC<CustomLinkProps> = ({ href, children, ...props }) => (
  <Link href={href} {...props}>
    <a>{children}</a>
  </Link>
);

interface MainHeaderWithRoutingProps {
  pathForHome?: string;
  logoPath?: string;
}

const MainHeaderWithRouting: React.FC<MainHeaderWithRoutingProps> = ({
  pathForHome = '/',
  logoPath = '/assets/images/bridge-logo.png',
}) => {
  return (
    <MainHeader
      LinkComponent={CustomLink}
      linkProps={{ href: pathForHome }}
      logoPath={logoPath}
    />
  );
};

export default MainHeaderWithRouting;
```

### Example: `PortalDashboardLink` Component with Params

This example demonstrates how to create a `PortalDashboardLink` component that allows passing parameters as props, which are then applied to the link.

```tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { PortalRoutes } from '@/types/routes.enum';

interface PortalDashboardLinkProps {
  params?: Record<string, string>;
  children: React.ReactNode;
}

const PortalDashboardLink: React.FC<PortalDashboardLinkProps> = ({ params = {}, children

 }) => {
  const searchParams = new URLSearchParams(params).toString();
  const dashboardUrl = `${PortalRoutes.DASHBOARD}${searchParams ? `?${searchParams}` : ''}`;

  return (
    <Link href={dashboardUrl}>
      {children}
    </Link>
  );
};

export default PortalDashboardLink;
```

### How to Use `PortalDashboardLink`

The `PortalDashboardLink` component can be used to link to the portal dashboard, with the option to pass query parameters that will be applied to the link.

#### Example Usage:

```tsx
import PortalDashboardLink from '@/components/routing/PortalDashboardLink.component';

export default function SomeComponent() {
  const queryParams = { ref: 'email', campaign: 'summer_sale' };

  return (
    <PortalDashboardLink params={queryParams}>
      Go to Dashboard with Params
    </PortalDashboardLink>
  );
}
```

In this example, the `PortalDashboardLink` component will generate a link to `/portal/dashboard?ref=email&campaign=summer_sale`, applying the provided query parameters to the URL.

### Keep Routing Components Focused

Ensure that routing components are focused solely on routing logic. Do not include unrelated logic such as data fetching, state management, or non-routing-related functions. Keeping these components lean and purpose-driven will improve maintainability and reusability.

## Route Types

The route types used across the application are defined in the `types` folder under `types/routes.enum.ts`. The reason for placing them here, rather than in the `src/components/routing` folder, is to ensure they are accessible throughout the project. Defining routes in the `types` folder allows for importing these routes into multiple places without creating circular dependencies. This setup also facilitates interfaces between various files, ensuring that routing remains consistent and manageable across different parts of the application.

### Example of the Route Types Definition:

```typescript
// src/types/routes.enum.ts

export enum BaseRoutes {
    ROOT = "/",
    AUTH = "/auth",
    PORTAL  = "/portal",
    VALUATION_ESTIMATE = "/valuation-estimate",
    ONBOARD = "/onboard"
}

export enum AuthRoutes  {
    LOGIN = "/auth/login",
    SIGN_UP = "/auth/sign-up",
    PASSWORD_RESET = '/auth/password-reset',
    VERIFY_EMAIL = '/auth/verify-email',
    VERIFY_EMAIL_SENT = '/auth/email-verification-sent'
}

export enum PortalRoutes  {
    DASHBOARD = "/portal/dashboard",
    BLUEPRINT = "/portal/blueprint",
    DOCUMENTS = '/portal/documents',
    SETTINGS = '/portal/settings',
}

// Combine all route paths into one object
export const routePaths = {
    ...BaseRoutes,
    ...AuthRoutes,
    ...PortalRoutes
};
```

### Example Components

Here’s a brief overview of the types of components that should be housed in this directory:

1. **Global Navigation Bar**

    - **Purpose**: A component that serves as the main navigation bar for the application, appearing on most, if not all, pages.
    - **Example Usage**: See the `MainHeaderWithRouting` component example above.

2. **Sidebar**

    - **Purpose**: A vertical navigation menu used in specific layouts to provide users with quick access to different sections of a page or related pages.
    - **Example Usage**: See the `SidebarWithRouting` component example above.

3. **Breadcrumbs**

    - **Purpose**: A breadcrumb navigation component that helps users understand their current position within the application’s hierarchy.
    - **Example Usage**: See the `BreadcrumbsWithRouting` component example above.

4. **Custom Link Components**

    - **Purpose**: Custom components that extend or modify the behavior of `Next.js` links, such as adding active states, handling dynamic routes, or integrating with analytics.
    - **Example Usage**:
        ```tsx
        // src/components/routing/CustomLink.component.tsx
        import React from 'react';
        import Link from 'next/link';
        import { useRouter } from 'next/router';

        interface CustomLinkProps {
          href: string;
          children: React.ReactNode;
        }

        const CustomLink: React.FC<CustomLinkProps> = ({ href, children }) => {
          const router = useRouter();
          const isActive = router.pathname === href;

          return (
            <Link href={href}>
              <a className={isActive ? 'active' : ''}>{children}</a>
            </Link>
          );
        };

        export default CustomLink;
        ```

By following these guidelines, you ensure that our project’s routing remains consistent, maintainable, and scalable. Always use the predefined enums or `routePaths` for routing, and utilize the components in the `routing` directory to manage navigation logic efficiently.

