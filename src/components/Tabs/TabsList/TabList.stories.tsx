import type { Meta, StoryObj } from '@storybook/react-vite';

import { TabsProvider } from '../TabsContext';
import { Tab } from '../Tab/Tab';
import { TabsList } from './TabsList';
import { Badge } from '../../Badge/Badge';

const meta = {
  title: 'Components/Tabs/TabsList',
  component: TabsList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'TabsList component for displaying a list of tabs in a row. Supports pill and underline variants with responsive gaps.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TabsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PillTabs: Story = {
  args: {
    children: null,
  },
  render: () => (
    <TabsProvider 
      defaultActiveTabId="tab-1" 
      tabsGroupId="storybook-tabs-pill"
      tabVariant="pill"
    >
      <TabsList>
        <Tab
          id="tab-1"
          onClick={() => {}}
          onKeyDown={() => {}}
        >
          Overview
        </Tab>
        <Tab
          id="tab-2"
          onClick={() => {}}
          onKeyDown={() => {}}
        >
          Details
        </Tab>
        <Tab
          id="tab-3"
          onClick={() => {}}
          onKeyDown={() => {}}
        >
          Settings
        </Tab>
        <Tab
          id="tab-4"
          onClick={() => {}}
          onKeyDown={() => {}}
        >
          Advanced
        </Tab>
      </TabsList>
    </TabsProvider>
  ),
};

export const PillTabsWithBadges: Story = {
  args: {
    children: null,
  },
  render: () => (
    <TabsProvider 
      defaultActiveTabId="tab-1" 
      tabsGroupId="storybook-tabs-pill"
      tabVariant="pill"
    >
      <TabsList>
        <Tab
          id="tab-1"
          onClick={() => {}}
          onKeyDown={() => {}}
        >
          Overview <Badge variant="neutral">3</Badge>
        </Tab>
        <Tab
          id="tab-2"
          onClick={() => {}}
          onKeyDown={() => {}}
        >
          Details <Badge variant="positive">1</Badge>
        </Tab>
        <Tab
          id="tab-3"
          onClick={() => {}}
          onKeyDown={() => {}}
        >
          Settings <Badge variant="negative">2</Badge>
        </Tab>
        <Tab
          id="tab-4"
          onClick={() => {}}
          onKeyDown={() => {}}
        >
          Advanced <Badge variant="neutral">3</Badge>
        </Tab>
      </TabsList>
    </TabsProvider>
  ),
};

export const UnderlineTabs: Story = {
  args: {
    children: null,
  },
  render: () => (
    <TabsProvider 
      defaultActiveTabId="tab-1" 
      tabsGroupId="storybook-tabs-underline"
      tabVariant="underline"
    >
      <TabsList>
        <Tab
          id="tab-1"
          onClick={() => {}}
          onKeyDown={() => {}}
        >
          Overview
        </Tab>
        <Tab
          id="tab-2"
          onClick={() => {}}
          onKeyDown={() => {}}
        >
          Details
        </Tab>
        <Tab
          id="tab-3"
          onClick={() => {}}
          onKeyDown={() => {}}
        >
          Settings
        </Tab>
        <Tab
          id="tab-4"
          onClick={() => {}}
          onKeyDown={() => {}}
        >
          Advanced
        </Tab>
      </TabsList>
    </TabsProvider>
  ),
};

