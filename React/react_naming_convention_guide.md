## Naming Conventions and Best Practices

This section outlines the naming conventions and common React practices used throughout the project to ensure code consistency, readability, and maintainability.

### **File Naming Conventions**

1. **Component Files:**
   - Use `PascalCase` for all React component files with a `.component.tsx` extension.
   - **Example:** `UserProfile.component.tsx` for a `UserProfile` component.

2. **Next.js Special Files:**
   - Retain the standard names for Next.js specific files, such as `page.tsx` and `layout.tsx`, which do not require the `.component.tsx` extension.
   - These files are typically located in the `src/app` folder.
   - **Example:** `page.tsx`, `layout.tsx`.

3. **Styles Files:**
   - Separate style files for components should use the component's name followed by a `.styles.tsx` extension.
   - **Example:** `UserProfile.styles.tsx` for styles related to the `UserProfile` component.

4. **Test Files:**
   - Test files should be named using the component name followed by `.spec.tsx`.
   - **Example:** `UserProfile.spec.tsx`.

5. **Storybook Files:**
   - Storybook stories should use the component name followed by `.stories.tsx`.
   - **Example:** `UserProfile.stories.tsx`.

6. **Organize Files by Feature:**
   - Group related files by feature rather than by type. This keeps your project organized and makes it easier to find all the files related to a specific feature.
   - **Example:** Create a `UserProfile` folder containing `UserProfile.component.tsx`, `UserProfile.styles.tsx`, `UserProfile.spec.tsx`, and `UserProfile.stories.tsx`.

7. **Component Entry Points:**
   - The only time you should use an `index.js` or `index.tsx` file is if you are exporting the component as a default export from the index file.
   - **Example:**
     ```typescript
     export { default } from './LoginForm.component';
     ```
   - **Explanation:** This approach allows you to import the component like this:
     ```typescript
     import LoginForm from './LoginForm';
     ```
     instead of:
     ```typescript
     import LoginForm from './LoginForm/LoginForm.component';
     ```
     While you could name your files as `LoginForm/LoginForm`, structuring your components this way makes the codebase more readable, searchable, and easier to navigate, especially in larger projects.

8. **Organize Assets by Type:**
   - Store assets (e.g., images, fonts) in folders named according to their type to keep the project structure organized.
   - **Example:** Store all images in an `images` folder and fonts in a `fonts` folder.

### **Variable Naming Conventions**

1. **General Variables:**
   - Use `camelCase` for naming all variables, including state variables, props, and other general variables.
   - **Example:** `isLoggedIn`, `userProfileData`, `fetchUserData`.

2. **Boolean State Variables:**
   - Use the prefix `is` for boolean state variables to clearly indicate a true/false condition.
   - **Examples:**
     - `isModalOpen`: Indicates whether a modal is open.
     - `isLoading`: Indicates whether content is loading.
     - `isUserLoggedIn`: Indicates whether a user is logged in.

3. **String, Numeric, and Object State Variables:**
   - Name these variables descriptively based on the content or purpose.
   - **Examples:**
     - `userName`: Stores the user’s name.
     - `currentPage`: Tracks the current page number in pagination.
     - `formData`: Stores form input values as an object.

4. **Array State Variables:**
   - Use a plural noun to indicate that the state holds a collection of items.
   - **Examples:**
     - `tasks`: Stores an array of to-do tasks.
     - `users`: Stores a list of user objects.
     - `itemsInCart`: Stores an array of items in the shopping cart.

5. **State Variables Representing User Data:**
   - Prefix with `user` to indicate ownership by the user, followed by a descriptive noun.
   - **Examples:**
     - `userProfile`: Stores the user's profile information.
     - `userCart`: Holds items that the user has added to their cart.
     - `userPreferences`: Stores the user's selected preferences, such as theme and language.
     - `userOrderHistory`: Contains an array of the user’s past orders.

6. **Avoid Abbreviations or Acronyms:**
   - Do not use abbreviations or acronyms in variable names. Names should be self-explanatory, ensuring clarity for any developer working on the codebase, even years later.
   - **Example:** Use `userAuthenticationStatus` instead of `authStatus`.

7. **Exception for Backend Values:**
   - If the values received from the backend do not follow PascalCase, retain the original casing to match the backend. This helps maintain consistency with the backend data structure. We don't want to define props as `snake_case` just because they are that way on the backend; however, when destructuring, there's no need to rename them to camelCase in that specific file if they are already `snake_case`. Additionally, there's no reason to change the case when displaying the variable.

### **Function Naming Conventions**

1. **Event Handlers:**
   - Event handler functions should be named specifically to reflect the action they perform.
   - Prefix event handler functions with `handle` and use `camelCase`.
   - Avoid generic names; be specific about the action the handler performs.
   - **Examples:**
     - `handleFormSubmit`: Handles the submission of a form.
     - `handleUserLogin`: Handles the user login process.

2. **Custom Hooks:**
   - Custom hooks should begin with `use` and follow `camelCase`.
   - **Examples:**
     - `useFetchData`: A custom hook to fetch data.
     - `useToggle`: A custom hook to toggle a boolean value.
     - `useWindowSize`: A custom hook to track window size.

3. **Helper Functions:**
   - Use `camelCase` for helper functions and name them based on their functionality.
   - **Examples:**
     - `calculateTotal`: Calculates the total of a list of items.
     - `formatDate`: Formats a date string.
     - `filterItems`: Filters a list of items based on a condition.

4. **Avoid Abbreviations or Acronyms:**
   - Do not use abbreviations or acronyms in function names. Ensure that function names are clear and descriptive, even to developers unfamiliar with the project.
   - **Example:** Use `initializeUserProfile` instead of `initUserProfile`.

### **React Specific Practices**

1. **Component Naming:**
   - React components should always use `PascalCase`.
   - **Example:** `UserProfile`, `LoginButton`.

2. **JSX PascalCase:**
   - Ensure that all JSX elements representing custom components are named using `PascalCase`.
   - This ensures clarity and consistency in component usage.

3. **Boolean Values in JSX:**
   - Always provide explicit boolean values in JSX attributes.
   - **Example:** `<Button disabled={true} />` instead of `<Button disabled />`.

4. **Self-Closing Tags:**
   - Use self-closing tags for components without children.
   - **Example:** `<Input />` instead of `<Input></Input>`.

5. **Hooks Rules:**
   - Follow the Rules of Hooks:
     - Only call hooks at the top level of your component or custom hook.
     - Do not call hooks inside loops, conditions, or nested functions.
   - Ensure that dependencies in hooks are managed correctly, especially in `useEffect`.

### **Why These Conventions?**

- **Readability:** Consistent naming conventions make the codebase more readable and easier to navigate, especially in larger projects.
- **Clarity:** Avoiding abbreviations and being explicit in naming helps future developers understand the code without needing extensive documentation.
- **Maintainability:** A well-organized codebase with clear naming conventions is easier to maintain and update over time.
- **Consistency with Backend:** Retaining the original casing for backend values ensures consistency and reduces potential errors when interfacing with backend services. We don't want to define props as `snake_case` just because they are that way on the backend; however, when destructuring, there's no need to rename them to camelCase in that specific file if they are already `snake_case`. Additionally, there's no reason to change the case when displaying the variable.

By adhering to these conventions and practices, we maintain a consistent and high-quality codebase, ensuring that all developers and contributors can easily navigate, understand, and extend the project.