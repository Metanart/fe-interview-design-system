import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tabs } from './Tabs';
import { TabsList } from './TabsList/TabsList';
import { Tab } from './Tab/Tab';
import { TabPanel } from './TabPanel/TabPanel';
import { Typography } from '../Typography/Typography';

const meta = {
  title: 'Components/Tabs/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Tabs component for displaying tabbed content. Supports pill and underline variants with keyboard navigation.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const PillTabs: Story = {
  args: {
    defaultActiveTabId: "overview",
    tabVariant: "pill",
    tabsGroupId: "storybook-tabs-pill",
    children: null,
  },
  render: () => (
    <Tabs 
      defaultActiveTabId="overview" 
      tabVariant="pill"
      tabsGroupId="storybook-tabs-pill"
    >
      <TabsList>
        <Tab
          id="overview"
          onClick={() => {}}
          onKeyDown={() => {}}
        >
          Overview
        </Tab>
        <Tab
          id="details"
          onClick={() => {}}
          onKeyDown={() => {}}
        >
          Details
        </Tab>
        <Tab
          id="settings"
          onClick={() => {}}
          onKeyDown={() => {}}
        >
          Settings
        </Tab>
        <Tab
          id="advanced"
          onClick={() => {}}
          onKeyDown={() => {}}
        >
          Advanced
        </Tab>
      </TabsList>
      <TabPanel id="overview">
        <Typography variant="header-1">Overview</Typography>
        <Typography variant="body-m">
          This is the overview tab content. Here you can see a summary of all the important information.
          The overview provides a high-level perspective on the current state of the system.
        </Typography>
        <Typography variant="body-m">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt 
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
          laboris nisi ut aliquip ex ea commodo consequat.
        </Typography>
      </TabPanel>
      <TabPanel id="details">
        <Typography variant="header-1">Details</Typography>
        <Typography variant="body-m">
          This is the details tab content. Here you can find comprehensive information about specific 
          aspects of the system. The details section provides in-depth analysis and granular data.
        </Typography>
        <Typography variant="body-m">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
          mollit anim id est laborum.
        </Typography>
      </TabPanel>
      <TabPanel id="settings">
        <Typography variant="header-1">Settings</Typography>
        <Typography variant="body-m">
          This is the settings tab content. Here you can configure various options and preferences 
          for the system. The settings allow you to customize the behavior according to your needs.
        </Typography>
        <Typography variant="body-m">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque 
          laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi 
          architecto beatae vitae dicta sunt explicabo.
        </Typography>
      </TabPanel>
      <TabPanel id="advanced">
        <Typography variant="header-1">Advanced</Typography>
        <Typography variant="body-m">
          This is the advanced tab content. Here you can access advanced features and configurations 
          that require more technical knowledge. Use these options with caution.
        </Typography>
        <Typography variant="body-m">
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia 
          consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
        </Typography>
      </TabPanel>
    </Tabs>
  ),
};

export const UnderlineTabs: Story = {
  args: {
    defaultActiveTabId: "home",
    tabVariant: "underline",
    tabsGroupId: "storybook-tabs-underline",
    children: null,
  },
  render: () => (
    <Tabs 
      defaultActiveTabId="home" 
      tabVariant="underline"
      tabsGroupId="storybook-tabs-underline"
    >
      <TabsList>
        <Tab
          id="home"
          onClick={() => {}}
          onKeyDown={() => {}}
        >
          Home
        </Tab>
        <Tab
          id="products"
          onClick={() => {}}
          onKeyDown={() => {}}
        >
          Products
        </Tab>
        <Tab
          id="about"
          onClick={() => {}}
          onKeyDown={() => {}}
        >
          About
        </Tab>
        <Tab
          id="contact"
          onClick={() => {}}
          onKeyDown={() => {}}
        >
          Contact
        </Tab>
      </TabsList>
      <TabPanel id="home">
        <Typography variant="header-1">Home</Typography>
        <Typography variant="body-m">
          Welcome to the home page. This is the main landing area where visitors first arrive. 
          Here you'll find the most important information and navigation options.
        </Typography>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus 
          hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut 
          eleifend nibh porttitor.
        </p>
      </TabPanel>
      <TabPanel id="products">
        <Typography variant="header-1">Products</Typography>
        <Typography variant="body-m">
          Browse our extensive product catalog. We offer a wide range of high-quality items 
          designed to meet your needs. Each product is carefully selected and tested for quality.
        </Typography>
        <Typography variant="body-m">
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip 
          ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
          esse cillum dolore eu fugiat nulla pariatur.
        </Typography>
      </TabPanel>
      <TabPanel id="about">
        <Typography variant="header-1">About</Typography>
        <Typography variant="body-m">
          Learn more about our company, mission, and values. We've been serving customers for 
          many years with dedication and excellence. Our team is committed to providing the 
          best possible experience.
        </Typography>
        <Typography variant="body-m">
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
          mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit 
          voluptatem accusantium doloremque laudantium.
        </Typography>
      </TabPanel>
      <TabPanel id="contact">
        <Typography variant="header-1">Contact</Typography>
        <Typography variant="body-m">
          Get in touch with us! We're here to help answer any questions you may have. Reach out 
          through any of our contact channels and we'll respond as soon as possible.
        </Typography>
        <Typography variant="body-m">
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia 
          consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro 
          quisquam est, qui dolorem ipsum quia dolor sit amet.
        </Typography>
      </TabPanel>
    </Tabs>
  ),
};

