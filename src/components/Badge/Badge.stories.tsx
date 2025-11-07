import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';
import { Typography } from '../Typography/Typography';

const meta = {
  title: 'Components/Generic/Badge',
  component: Badge,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Badge component for displaying labels, status indicators, and small pieces of information. Badges are typically used to highlight important information or show status.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'positive', 'negative'],
    },
    children: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Neutral: Story = {
  args: {
    variant: 'neutral',
    children: 'Neutral Badge',
  },
};

export const Positive: Story = {
  args: {
    variant: 'positive',
    children: 'Positive Badge',
  },
};

export const Negative: Story = {
  args: {
    variant: 'negative',
    children: 'Negative Badge',
  },
};

export const AllVariants: Story = {
  args: {
    variant: 'neutral',
    children: '',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Badge variant="neutral">Neutral</Badge>
        <Badge variant="positive">Positive</Badge>
        <Badge variant="negative">Negative</Badge>
      </div>
    </div>
  ),
};

export const WithNumbers: Story = {
  args: {
    variant: 'neutral',
    children: '42',
  },
};

export const WithLongText: Story = {
  args: {
    variant: 'neutral',
    children: 'This is a longer badge text',
  },
};

export const StatusIndicators: Story = {
  args: {
    variant: 'neutral',
    children: '',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Badge variant="positive">Active</Badge>
        <Badge variant="neutral">Pending</Badge>
        <Badge variant="negative">Inactive</Badge>
      </div>
    </div>
  ),
};

export const CountBadges: Story = {
  args: {
    variant: 'neutral',
    children: '',
  },
  render: () => (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <Badge variant="neutral">0</Badge>
      <Badge variant="neutral">5</Badge>
      <Badge variant="positive">12</Badge>
      <Badge variant="negative">99+</Badge>
    </div>
  ),
};

export const NotificationBadges: Story = {
  args: {
    variant: 'neutral',
    children: '',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Typography variant="body-s">Messages</Typography>
        <Badge variant="positive">3</Badge>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Typography variant="body-s">Alerts</Typography>
        <Badge variant="negative">1</Badge>
      </div>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <Typography variant="body-s">Updates</Typography>
        <Badge variant="neutral">7</Badge>
      </div>
    </div>
  ),
};

export const InContext: Story = {
  args: {
    variant: 'neutral',
    children: '',
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Typography variant="header-3">User Status</Typography>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Typography>John Doe</Typography>
          <Badge variant="positive">Online</Badge>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Typography>Jane Smith</Typography>
          <Badge variant="neutral">Away</Badge>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Typography>Bob Johnson</Typography>
          <Badge variant="negative">Offline</Badge>
        </div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Typography variant="header-3">Task Status</Typography>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Typography>Complete feature</Typography>
          <Badge variant="positive">Done</Badge>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Typography>Review PR</Typography>
          <Badge variant="neutral">In Progress</Badge>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <Typography>Fix bug</Typography>
          <Badge variant="negative">Blocked</Badge>
        </div>
      </div>
    </div>
  ),
};

