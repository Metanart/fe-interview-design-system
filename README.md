# Frontend Interview - Design System - Solution

- Implemented `Badge` component in accordance with the task
- Implemented a group of `Tabs` components
  - `TabsContext`
  - `Tabs`
  - `TabsList`
  - `TabPanel`
  - `Tab`
- `Tabs` supports automatic control via the keyboard
- `Tabs` covered with WCAG aria and role attributes
- `TabsContext` used as a unified system for controlling the appearance of tabs or switching between them
- Implemented simple `Typography` component - for centralizing and simplifying work with text content
- Implemented simple `Stack` component - in order to be able to set the spacing between the tab components
- All created components covered with Storybook stories examples with auto-generated docs
- `SCSS` preprocessor was used to simplify the cascading style sheet code
- Design tokens are organized into separate files by group and are used as native CSS variables

# Frontend Interview - Design System - Task
Hey 👋

This is the base repository for the home test. The repository is created with `vite` and is empty, but contains some packages already installed, in particular:

- `react`
- `storybook`
- `vitest`

## Install and run

```bash
# Install dependencies
# This project use `pnpm` as package manager, but you can use also `npm` or `yarn`.
pnpm install

# And run the project
pnpm dev

# Optional: Run Storybook
pnpm storybook
```

## Figma file

The figma file of the home test is available [here](https://www.figma.com/design/OclakAGLSXDoMKLFvwLNMP/%F0%9F%92%BB-Design-System-Home-Test---Tabs-Component?node-id=0-1&t=4pG7NN6HKxgxroDz-1).
