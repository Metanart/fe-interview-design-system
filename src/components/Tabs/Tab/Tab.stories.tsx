import type { Meta, StoryObj } from '@storybook/react-vite';

import { TabsProvider } from '../TabsContext';
import { Tab } from './Tab';
import type { TabProps } from './Tab';

const meta = {
  title: 'Components/Tabs/Tab',
  component: Tab,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Tab component for displaying tabs and content.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['pill', 'underline'],
    },
    children: {
      control: 'text',
    },
    isSelected: {
      control: 'boolean',
    },
    isDisabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Tab>;

export default meta;
type Story = StoryObj<typeof meta>;

// Helper function to create a tab with handlers
const createTabStory = (
  id: string,
  variant: TabProps['variant'],
  isSelected: boolean,
  isDisabled: boolean = false,
  children: string = 'Label text'
) => {
  return (
    <TabsProvider 
      defaultActiveTabId={isSelected ? id : 'tab-other'} 
      tabsGroupId="storybook-tabs"
      tabVariant={variant}
    >
      <Tab
        id={id}
        variant={variant}
        state="default"
        isSelected={isSelected}
        isDisabled={isDisabled}
        onClick={() => {}}
        onKeyDown={() => {}}
      >
        {children}
      </Tab>
    </TabsProvider>
  );
};

export const PillDefault: Story = {
  render: () => createTabStory('tab-1', 'pill', false, false),
  args: {} as TabProps,
};

export const PillSelected: Story = {
  render: () => createTabStory('tab-1', 'pill', true, false),
  args: {} as TabProps,
};

export const PillDisabled: Story = {
  render: () => createTabStory('tab-1', 'pill', false, true),
  args: {} as TabProps,
};


export const UnderlineDefault: Story = {
  render: () => createTabStory('tab-1', 'underline', false, false),
  args: {} as TabProps,
};

export const UnderlineSelected: Story = {
  render: () => createTabStory('tab-1', 'underline', true, false),
  args: {} as TabProps,
};

export const UnderlineDisabled: Story = {
  render: () => createTabStory('tab-1', 'underline', false, true),
  args: {} as TabProps,
};
