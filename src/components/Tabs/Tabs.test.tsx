import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Tabs } from './Tabs';
import { TabsList } from './TabsList/TabsList';
import { Tab } from './Tab/Tab';
import { TabPanel } from './TabPanel/TabPanel';

// Helper function to render a complete Tabs setup
const renderTabs = (variant: 'pill' | 'underline' = 'pill', defaultActiveTabId = 'tab1') => {
  return render(
    <Tabs defaultActiveTabId={defaultActiveTabId} tabVariant={variant} tabsGroupId="test-tabs">
      <TabsList>
        <Tab id="tab1" onClick={() => {}} onKeyDown={() => {}}>
          Tab 1
        </Tab>
        <Tab id="tab2" onClick={() => {}} onKeyDown={() => {}}>
          Tab 2
        </Tab>
        <Tab id="tab3" onClick={() => {}} onKeyDown={() => {}}>
          Tab 3
        </Tab>
      </TabsList>
      <TabPanel tabId="tab1">
        <div>Content for Tab 1</div>
      </TabPanel>
      <TabPanel tabId="tab2">
        <div>Content for Tab 2</div>
      </TabPanel>
      <TabPanel tabId="tab3">
        <div>Content for Tab 3</div>
      </TabPanel>
    </Tabs>
  );
};

describe('Tabs Integration Tests', () => {
  describe('Basic Rendering', () => {
    it('should render all tabs and panels', () => {
      renderTabs();
      
      expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Tab 2' })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: 'Tab 3' })).toBeInTheDocument();
      
      // Use getAllByRole with hidden option to get all panels (including hidden ones)
      const panels = screen.getAllByRole('tabpanel', { hidden: true });
      expect(panels).toHaveLength(3);
      
      // Verify content exists for all panels
      expect(screen.getByText('Content for Tab 1')).toBeInTheDocument();
      expect(screen.getByText('Content for Tab 2')).toBeInTheDocument();
      expect(screen.getByText('Content for Tab 3')).toBeInTheDocument();
    });

    it('should render with pill variant by default', () => {
      renderTabs('pill');
      const tablist = screen.getByRole('tablist');
      expect(tablist).toBeInTheDocument();
    });

    it('should render with underline variant', () => {
      renderTabs('underline');
      const tablist = screen.getByRole('tablist');
      expect(tablist).toBeInTheDocument();
    });
  });

  describe('Initial State', () => {
    it('should set the default active tab', () => {
      renderTabs('pill', 'tab2');
      
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      const tab3 = screen.getByRole('tab', { name: 'Tab 3' });
      
      expect(tab1).toHaveAttribute('aria-selected', 'false');
      expect(tab2).toHaveAttribute('aria-selected', 'true');
      expect(tab3).toHaveAttribute('aria-selected', 'false');
    });

    it('should show only the active tab panel content', () => {
      renderTabs('pill', 'tab1');
      
      // Use getAllByRole with hidden option to get all panels (including hidden ones)
      const panels = screen.getAllByRole('tabpanel', { hidden: true });
      const panel1 = panels.find(p => p.id === 'test-tabs-panel-tab1');
      const panel2 = panels.find(p => p.id === 'test-tabs-panel-tab2');
      const panel3 = panels.find(p => p.id === 'test-tabs-panel-tab3');
      
      expect(panel1).toBeDefined();
      expect(panel2).toBeDefined();
      expect(panel3).toBeDefined();
      
      expect(panel1).not.toHaveAttribute('hidden');
      expect(panel2).toHaveAttribute('hidden');
      expect(panel3).toHaveAttribute('hidden');
      
      expect(screen.getByText('Content for Tab 1')).toBeVisible();
      expect(screen.getByText('Content for Tab 2')).not.toBeVisible();
      expect(screen.getByText('Content for Tab 3')).not.toBeVisible();
    });
  });

  describe('Mouse Click Navigation', () => {
    it('should switch tabs when clicking on a tab', async () => {
      const user = userEvent.setup();
      renderTabs('pill', 'tab1');
      
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      
      // Initially tab1 is active
      expect(tab1).toHaveAttribute('aria-selected', 'true');
      expect(tab2).toHaveAttribute('aria-selected', 'false');
      
      // Click tab2
      await user.click(tab2);
      
      // Now tab2 should be active
      expect(tab1).toHaveAttribute('aria-selected', 'false');
      expect(tab2).toHaveAttribute('aria-selected', 'true');
    });

    it('should show the correct panel content after clicking a tab', async () => {
      const user = userEvent.setup();
      renderTabs('pill', 'tab1');
      
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      
      // Use getAllByRole with hidden option to get all panels
      let panels = screen.getAllByRole('tabpanel', { hidden: true });
      let panel1 = panels.find(p => p.id === 'test-tabs-panel-tab1');
      let panel2 = panels.find(p => p.id === 'test-tabs-panel-tab2');
      
      // Initially panel1 is visible
      expect(panel1).toBeDefined();
      expect(panel2).toBeDefined();
      expect(panel1).not.toHaveAttribute('hidden');
      expect(panel2).toHaveAttribute('hidden');
      
      // Click tab2
      await user.click(tab2);
      
      // Re-query panels after state change
      panels = screen.getAllByRole('tabpanel', { hidden: true });
      panel1 = panels.find(p => p.id === 'test-tabs-panel-tab1');
      panel2 = panels.find(p => p.id === 'test-tabs-panel-tab2');
      
      // Now panel2 should be visible
      expect(panel1).toHaveAttribute('hidden');
      expect(panel2).not.toHaveAttribute('hidden');
      
      expect(screen.getByText('Content for Tab 2')).toBeVisible();
      expect(screen.getByText('Content for Tab 1')).not.toBeVisible();
    });

    it('should work with pill variant', async () => {
      const user = userEvent.setup();
      renderTabs('pill', 'tab1');
      
      const tab3 = screen.getByRole('tab', { name: 'Tab 3' });
      await user.click(tab3);
      
      expect(tab3).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Content for Tab 3')).toBeVisible();
    });

    it('should work with underline variant', async () => {
      const user = userEvent.setup();
      renderTabs('underline', 'tab1');
      
      const tab3 = screen.getByRole('tab', { name: 'Tab 3' });
      await user.click(tab3);
      
      expect(tab3).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Content for Tab 3')).toBeVisible();
    });
  });

  describe('Keyboard Navigation - ArrowLeft', () => {
    it('should navigate to previous tab with ArrowLeft key', async () => {
      const user = userEvent.setup();
      renderTabs('pill', 'tab2');
      
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      
      // Focus on tab2
      tab2.focus();
      
      // Press ArrowLeft
      await user.keyboard('{ArrowLeft}');
      
      // Should navigate to tab1
      expect(tab1).toHaveAttribute('aria-selected', 'true');
      expect(tab2).toHaveAttribute('aria-selected', 'false');
      expect(screen.getByText('Content for Tab 1')).toBeVisible();
    });

    it('should wrap around from first tab to last tab with ArrowLeft', async () => {
      const user = userEvent.setup();
      renderTabs('pill', 'tab1');
      
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab3 = screen.getByRole('tab', { name: 'Tab 3' });
      
      tab1.focus();
      await user.keyboard('{ArrowLeft}');
      
      // Should wrap to tab3
      expect(tab3).toHaveAttribute('aria-selected', 'true');
      expect(tab1).toHaveAttribute('aria-selected', 'false');
      expect(screen.getByText('Content for Tab 3')).toBeVisible();
    });

    it('should automatically activate tab on ArrowLeft navigation', async () => {
      const user = userEvent.setup();
      renderTabs('pill', 'tab2');
      
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      
      tab2.focus();
      await user.keyboard('{ArrowLeft}');
      
      // Tab should be activated immediately (automatic activation)
      expect(tab1).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Content for Tab 1')).toBeVisible();
    });
  });

  describe('Keyboard Navigation - ArrowRight', () => {
    it('should navigate to next tab with ArrowRight key', async () => {
      const user = userEvent.setup();
      renderTabs('pill', 'tab1');
      
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      
      tab1.focus();
      await user.keyboard('{ArrowRight}');
      
      // Should navigate to tab2
      expect(tab2).toHaveAttribute('aria-selected', 'true');
      expect(tab1).toHaveAttribute('aria-selected', 'false');
      expect(screen.getByText('Content for Tab 2')).toBeVisible();
    });

    it('should wrap around from last tab to first tab with ArrowRight', async () => {
      const user = userEvent.setup();
      renderTabs('pill', 'tab3');
      
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab3 = screen.getByRole('tab', { name: 'Tab 3' });
      
      tab3.focus();
      await user.keyboard('{ArrowRight}');
      
      // Should wrap to tab1
      expect(tab1).toHaveAttribute('aria-selected', 'true');
      expect(tab3).toHaveAttribute('aria-selected', 'false');
      expect(screen.getByText('Content for Tab 1')).toBeVisible();
    });

    it('should automatically activate tab on ArrowRight navigation', async () => {
      const user = userEvent.setup();
      renderTabs('pill', 'tab1');
      
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      
      tab1.focus();
      await user.keyboard('{ArrowRight}');
      
      // Tab should be activated immediately (automatic activation)
      expect(tab2).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Content for Tab 2')).toBeVisible();
    });
  });

  describe('Keyboard Navigation - Home Key', () => {
    it('should navigate to first tab with Home key', async () => {
      const user = userEvent.setup();
      renderTabs('pill', 'tab3');
      
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab3 = screen.getByRole('tab', { name: 'Tab 3' });
      
      tab3.focus();
      await user.keyboard('{Home}');
      
      // Should navigate to tab1
      expect(tab1).toHaveAttribute('aria-selected', 'true');
      expect(tab3).toHaveAttribute('aria-selected', 'false');
      expect(screen.getByText('Content for Tab 1')).toBeVisible();
    });

    it('should automatically activate first tab on Home key', async () => {
      const user = userEvent.setup();
      renderTabs('pill', 'tab2');
      
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      
      tab2.focus();
      await user.keyboard('{Home}');
      
      // Tab should be activated immediately
      expect(tab1).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Content for Tab 1')).toBeVisible();
    });
  });

  describe('Keyboard Navigation - End Key', () => {
    it('should navigate to last tab with End key', async () => {
      const user = userEvent.setup();
      renderTabs('pill', 'tab1');
      
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab3 = screen.getByRole('tab', { name: 'Tab 3' });
      
      tab1.focus();
      await user.keyboard('{End}');
      
      // Should navigate to tab3
      expect(tab3).toHaveAttribute('aria-selected', 'true');
      expect(tab1).toHaveAttribute('aria-selected', 'false');
      expect(screen.getByText('Content for Tab 3')).toBeVisible();
    });

    it('should automatically activate last tab on End key', async () => {
      const user = userEvent.setup();
      renderTabs('pill', 'tab2');
      
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      const tab3 = screen.getByRole('tab', { name: 'Tab 3' });
      
      tab2.focus();
      await user.keyboard('{End}');
      
      // Tab should be activated immediately
      expect(tab3).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Content for Tab 3')).toBeVisible();
    });
  });

  describe('Tab Panel Visibility', () => {
    it('should hide inactive panels', async () => {
      const user = userEvent.setup();
      renderTabs('pill', 'tab1');
      
      // Use getAllByRole with hidden option to get all panels
      let panels = screen.getAllByRole('tabpanel', { hidden: true });
      let panel1 = panels.find(p => p.id === 'test-tabs-panel-tab1');
      let panel2 = panels.find(p => p.id === 'test-tabs-panel-tab2');
      let panel3 = panels.find(p => p.id === 'test-tabs-panel-tab3');
      
      // Initially only panel1 is visible
      expect(panel1).toBeDefined();
      expect(panel2).toBeDefined();
      expect(panel3).toBeDefined();
      expect(panel1).not.toHaveAttribute('hidden');
      expect(panel2).toHaveAttribute('hidden');
      expect(panel3).toHaveAttribute('hidden');
      
      // Switch to tab2
      await user.click(screen.getByRole('tab', { name: 'Tab 2' }));
      
      // Re-query panels after state change
      panels = screen.getAllByRole('tabpanel', { hidden: true });
      panel1 = panels.find(p => p.id === 'test-tabs-panel-tab1');
      panel2 = panels.find(p => p.id === 'test-tabs-panel-tab2');
      panel3 = panels.find(p => p.id === 'test-tabs-panel-tab3');
      
      // Now only panel2 is visible
      expect(panel1).toHaveAttribute('hidden');
      expect(panel2).not.toHaveAttribute('hidden');
      expect(panel3).toHaveAttribute('hidden');
    });

    it('should show only one panel at a time', async () => {
      const user = userEvent.setup();
      renderTabs('pill', 'tab1');
      
      let panels = screen.getAllByRole('tabpanel', { hidden: true });
      let visiblePanels = panels.filter(panel => !panel.hasAttribute('hidden'));
      
      expect(visiblePanels).toHaveLength(1);
      
      // Switch tabs
      await user.click(screen.getByRole('tab', { name: 'Tab 2' }));
      
      // Re-query panels after state change
      panels = screen.getAllByRole('tabpanel', { hidden: true });
      visiblePanels = panels.filter(panel => !panel.hasAttribute('hidden'));
      expect(visiblePanels).toHaveLength(1);
    });
  });

  describe('Keyboard Navigation with Variants', () => {
    it('should work with pill variant', async () => {
      const user = userEvent.setup();
      renderTabs('pill', 'tab1');
      
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      
      tab1.focus();
      await user.keyboard('{ArrowRight}');
      
      expect(tab2).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Content for Tab 2')).toBeVisible();
    });

    it('should work with underline variant', async () => {
      const user = userEvent.setup();
      renderTabs('underline', 'tab1');
      
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      
      tab1.focus();
      await user.keyboard('{ArrowRight}');
      
      expect(tab2).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Content for Tab 2')).toBeVisible();
    });
  });

  describe('Complete Navigation Flow', () => {
    it('should handle complete navigation sequence', async () => {
      const user = userEvent.setup();
      renderTabs('pill', 'tab1');
      
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      const tab3 = screen.getByRole('tab', { name: 'Tab 3' });
      
      // Start at tab1
      tab1.focus();
      expect(tab1).toHaveAttribute('aria-selected', 'true');
      
      // Navigate right to tab2
      await user.keyboard('{ArrowRight}');
      expect(tab2).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Content for Tab 2')).toBeVisible();
      
      // Navigate right to tab3
      await user.keyboard('{ArrowRight}');
      expect(tab3).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Content for Tab 3')).toBeVisible();
      
      // Navigate left back to tab2
      await user.keyboard('{ArrowLeft}');
      expect(tab2).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Content for Tab 2')).toBeVisible();
      
      // Go to first with Home
      await user.keyboard('{Home}');
      expect(tab1).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Content for Tab 1')).toBeVisible();
      
      // Go to last with End
      await user.keyboard('{End}');
      expect(tab3).toHaveAttribute('aria-selected', 'true');
      expect(screen.getByText('Content for Tab 3')).toBeVisible();
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations with pill variant', async () => {
      const { container } = renderTabs('pill');
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with underline variant', async () => {
      const { container } = renderTabs('underline');
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have proper ARIA attributes', () => {
      renderTabs('pill', 'tab1');
      
      const tablist = screen.getByRole('tablist');
      expect(tablist).toHaveAttribute('aria-orientation', 'horizontal');
      
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      expect(tab1).toHaveAttribute('aria-selected', 'true');
      expect(tab1).toHaveAttribute('aria-controls');
      
      const panel1 = screen.getByRole('tabpanel', { name: 'Tab 1' });
      expect(panel1).toHaveAttribute('aria-labelledby');
    });
  });

  describe('Enter and Space Key Activation', () => {
    it('should activate tab with Enter key', async () => {
      const user = userEvent.setup();
      renderTabs('pill', 'tab1');
      
      const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      
      // Tab2 is not selected initially
      expect(tab2).toHaveAttribute('aria-selected', 'false');
      
      // Focus and press Enter on tab2
      tab2.focus();
      await user.keyboard('{Enter}');
      
      // Tab2 should now be active
      expect(tab2).toHaveAttribute('aria-selected', 'true');
      expect(tab1).toHaveAttribute('aria-selected', 'false');
      expect(screen.getByText('Content for Tab 2')).toBeVisible();
    });

    it('should activate tab with Space key', async () => {
      const user = userEvent.setup();
      renderTabs('pill', 'tab1');
      
      const tab3 = screen.getByRole('tab', { name: 'Tab 3' });
      const tab1 = screen.getByRole('tab', { name: 'Tab 1' });
      
      // Tab3 is not selected initially
      expect(tab3).toHaveAttribute('aria-selected', 'false');
      
      // Focus and press Space on tab3
      tab3.focus();
      await user.keyboard(' ');
      
      // Tab3 should now be active
      expect(tab3).toHaveAttribute('aria-selected', 'true');
      expect(tab1).toHaveAttribute('aria-selected', 'false');
      expect(screen.getByText('Content for Tab 3')).toBeVisible();
    });
  });
});

