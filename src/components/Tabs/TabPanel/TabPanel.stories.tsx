import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tabs } from '../Tabs';
import { TabPanel } from './TabPanel';
import { Typography } from '../../Typography/Typography';

const meta = {
  title: 'Components/Tabs/TabPanel',
  component: TabPanel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'TabPanel component for displaying tab panel content. Only visible when the corresponding tab is active.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TabPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tabId: 'contact',
    children: null,
  },
  render: () => (
    <Tabs 
      defaultActiveTabId="contact" 
      tabsGroupId="storybook-tabpanel"
    >
      <TabPanel tabId="contact">
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

