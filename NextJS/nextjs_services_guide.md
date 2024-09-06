# Proposed Services Folder Structure and Usage

## Overview

The `services` folder is intended to handle API interactions and business logic in a scalable and maintainable way. By organizing services, Data Transfer Objects (DTOs), and type definitions systematically, we ensure consistency, reusability, and efficiency across the application. This structure supports client-side and server-side data fetching, integration with React Query, and the usage of Higher-Order Components (HOCs).

## Folder Structure

```
src/
└── services/
    ├── auth/
    │   ├── auth.config.ts
    │   ├── auth.service.ts
    │   ├── auth.types.ts
    │   └── definitions/
    │       ├── auth-params.ts
    │       ├── auth-responses.ts
    │       └── auth-dtos.ts
    │
    ├── video/
    │   ├── video.service.ts
    │   ├── video.types.ts
    │   └── definitions/
    │       ├── video-params.ts
    │       ├── video-responses.ts
    │       └── video-dtos.ts
    │
    ├── base/
    │   └── api.service.ts
    │
    └── index.ts
```

In the `index.ts` file, you would export all services:

**File: `src/services/index.ts`**

```typescript
export { default as authService } from './auth/auth.service';
export { default as videoService } from './video/video.service';
export { APIService } from './base/api.service';
```

## Service Implementation

The implementation of services should focus on robust error handling and functionality. Accurate DTOs are critical to avoid issues, particularly when backend documentation is lacking or error handling is insufficient. Below are examples to illustrate a typical service setup. These examples can be adapted as needed for your specific context.

### `AuthService`

**File: `src/services/auth/auth.service.ts`**

```typescript
import { APIService } from '../base/api.service';
import type { LoginDto, RegisterDto, FetchUserDto } from './definitions/auth-dtos';
import type { AuthResponses } from './definitions/auth-responses';

class AuthService extends APIService {
    async login(data: LoginDto): Promise<AuthResponses.Login> {
        try {
            const response = await this.post<AuthResponses.Login>('/auth/login', data);
            return response;
        } catch (error) {
            console.error('Login failed', error);
            throw new Error('Failed to login');
        }
    }

    async register(data: RegisterDto): Promise<AuthResponses.Register> {
        try {
            const response = await this.post<AuthResponses.Register>('/auth/register', data);
            return response;
        } catch (error) {
            console.error('Registration failed', error);
            throw new Error('Failed to register');
        }
    }

    async fetchUser(userId: string): Promise<AuthResponses.FetchUser> {
        try {
            const response = await this.get<AuthResponses.FetchUser>(`/auth/user/${userId}`);
            return response;
        } catch (error) {
            console.error('Failed to fetch user', error);
            throw new Error('Failed to fetch user');
        }
    }
}

export default new AuthService();
```

### `VideoService`

**File: `src/services/video/video.service.ts`**

```typescript
import { APIService } from '../base/api.service';
import type { CreateVideoDto, UpdateVideoDto, FetchVideoParams } from './definitions/video-dtos';
import type { VideoResponses } from './definitions/video-responses';

class VideoService extends APIService {
    async createVideo(data: CreateVideoDto): Promise<VideoResponses.CreateVideo> {
        try {
            const response = await this.post<VideoResponses.CreateVideo>('/videos', data);
            return response;
        } catch (error) {
            console.error('Failed to create video', error);
            throw new Error('Failed to create video');
        }
    }

    async updateVideo(id: number, data: UpdateVideoDto): Promise<VideoResponses.UpdateVideo> {
        try {
            const response = await this.put<VideoResponses.UpdateVideo>(`/videos/${id}`, data);
            return response;
        } catch (error) {
            console.error('Failed to update video', error);
            throw new Error('Failed to update video');
        }
    }

    async fetchVideos(params: FetchVideoParams): Promise<VideoResponses.FetchVideos> {
        try {
            const response = await this.get<VideoResponses.FetchVideos>('/videos', { params });
            return response;
        } catch (error) {
            console.error('Failed to fetch videos', error);
            throw new Error('Failed to fetch videos');
        }
    }
}

export default new VideoService();
```

## Using Services in React Components

To utilize these services within React components, you can import the service and call its methods directly. With everything exported from `index.ts`, services can be imported easily using destructured syntax. Here’s an example of how `authService` might be used in a React component like a login form:

### Example Login Form Component

**File: `src/app/auth/login/LoginForm/LoginForm.component.tsx`**

```typescript
"use client";

import React, { useState, ChangeEvent, FormEvent, MouseEvent } from 'react';
import { routePaths } from '@/types/routes.enum';
import { authService } from '@services';
import ContainedButton from '@/components/design-system/atoms/buttons/ContainedButton';
import TextInputGroup from '@/components/design-system/molecules/forms/TextInputGroup';
import SecureTextInputGroup from '@/components/design-system/molecules/forms/SecureTextInputGroup';
import ParagraphText from '@/components/design-system/atoms/typography/ParagraphText';
import CardWithTitle from '@/components/design-system/molecules/cards/CardWithTitle';
import Link from 'next/link';

interface FormValues {
  email: string;
  password: string;
}

interface FormErrors {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({ email: '', password: '' });
  const [formErrors, setFormErrors] = useState<FormErrors>({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPasswordTextSecure, setIsPasswordTextSecure] = useState<boolean>(true);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSecurePressOnChange = () => {
    setIsPasswordTextSecure(!isPasswordTextSecure);
  };

  const handleOnMouseDown = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const validate = (): boolean => {
    let errors: FormErrors = { email: '', password: '' };

    if (!formValues.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = 'Invalid email address';
    }

    if (!formValues.password) {
      errors.password = 'Password is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).every((key) => !errors[key as keyof FormErrors]);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      try {
        const response = await authService.login(formValues);
        console.log('Login successful:', response);
        // Handle successful login, e.g., redirect
      } catch (error) {
        console.error('Login failed:', error);
        setFormErrors({ ...formErrors, email: 'Login failed. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <CardWithTitle titleProps={{ text: "Login" }}>
      <form onSubmit={handleSubmit}>
        <TextInputGroup
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          name="email"
          disabled={isLoading}
          value={formValues.email}
          onChange={handleChange}
          error={Boolean(formErrors.email)}
          helperText={formErrors.email}
        />
        <SecureTextInputGroup
          label="Password"
          fullWidth
          margin={"normal"}
          name="password"
          value={formValues.password}
          disabled={isLoading}
          onChange={handleChange}
          error={Boolean(formErrors.password)}
          helperText={formErrors.password}
          isSecure={isPasswordTextSecure}
          securePressOnChange={handleSecurePressOnChange}
          handleOnMouseDown={handleOnMouseDown}
        />

        <ParagraphText variant="body2" align="left" sx={{ mt: 3, mb: 3 }}>
          <Link href={routePaths.PASSWORD_RESET} color="primary">
            Forgot my password
          </Link>
        </ParagraphText>

        <ContainedButton isLoading={isLoading} fullWidth text={"Login"} />
      </form>

      <ParagraphText variant="body2" align="center" sx={{ mt: 2 }}>
        Don't have an account?{' '}
        <Link href={routePaths.SIGN_UP} color="primary">
          Sign Up
        </Link>
      </ParagraphText>
    </CardWithTitle>
  );


};

export default LoginForm;
```

## Integrating Services with React Query

If you have a structure like this, you can integrate it with React Query for better data fetching and state management, knowing exactly what types you’ll get back since they’re predefined.

### Example React Query Hook

**File: `src/hooks/queries/useUserQuery.ts`**

```typescript
import { useQuery } from '@tanstack/react-query';
import { authService } from '@services';

const fetchUser = async (id: number) => {
  try {
    const response = await authService.fetchUser(id);
    return response.user;
  } catch (error) {
    throw new Error('Failed to fetch user');
  }
};

export const useUserQuery = (id: number) => {
  return useQuery(['user', id], () => fetchUser(id));
};
```

### Using Higher-Order Components (HOCs) with React Query

Higher-Order Components (HOCs) can be used to encapsulate the data fetching logic provided by React Query, allowing for reusable components that handle state and error management consistently.

**File: `src/hocs/withUserData.tsx`**

```typescript
import React from 'react';
import { useUserQuery } from '../hooks/queries/useUserQuery';
import type { AuthResponses } from '../services/auth/definitions/auth-responses';

// Higher-Order Component function
export function withUserData<T extends { user?: AuthResponses.User; error?: string }>(
  WrappedComponent: React.ComponentType<T>
) {
  return function ComponentWithUserData(props: Omit<T, 'user' | 'error'>) {
    const { data: user, error } = useUserQuery(1); // Example user ID

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    if (!user) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...(props as T)} user={user} />;
  };
}
```

## Benefits of Using HOCs for Data Fetching

Higher-Order Components (HOCs) simplify data fetching by encapsulating the logic in a reusable wrapper. This approach offers several benefits:

- **Encapsulates Data Fetching**: HOCs handle data fetching and state management, allowing components to focus solely on rendering.
- **Promotes Reusability**: Reusable HOCs can be applied to multiple components without duplicating data fetching logic.
- **Ensures Consistency**: Centralizes data fetching logic, leading to consistent data handling and error management.

