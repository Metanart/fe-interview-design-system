import type { Meta, StoryObj } from '@storybook/react-vite';
import { Typography } from './Typography';

const meta = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Typography component for displaying text with consistent styling across the design system.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['body-m', 'body-s'],
      description: 'The typography variant to use',
    },
    children: {
      control: 'text',
      description: 'The text content to display',
    },
  },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is the default typography variant (body-m)',
  },
};

export const BodyMedium: Story = {
  args: {
    variant: 'body-m',
    children: 'This is body medium text. It is used for standard body content and provides good readability for longer paragraphs.',
  },
};

export const BodySmall: Story = {
  args: {
    variant: 'body-s',
    children: 'This is body small text. It is typically used for secondary information, captions, or when space is limited.',
  },
};

export const AllVariants: Story = {
  args: {
    variant: 'body-m',
    children: '',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Typography variant="body-m">
        Body Medium: This is the standard body text size used for most content. It provides excellent readability for paragraphs and general text content.
      </Typography>
      <Typography variant="body-s">
        Body Small: This is a smaller variant used for secondary information, captions, or when you need to fit more content in a limited space.
      </Typography>
    </div>
  ),
};

export const LongText: Story = {
  args: {
    variant: 'body-m',
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  },
};

export const ShortText: Story = {
  args: {
    variant: 'body-s',
    children: 'Short caption text',
  },
};

export const WithSpecialCharacters: Story = {
  args: {
    variant: 'body-m',
    children: 'Typography supports special characters: @#$%^&*()!? and numbers: 1234567890',
  },
};

