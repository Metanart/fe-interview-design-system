import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Typography } from './Typography';

describe('Typography Accessibility', () => {
  describe('Basic Accessibility', () => {
    it('should have no accessibility violations with default props', async () => {
      const { container } = render(<Typography>Test content</Typography>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with body-m variant', async () => {
      const { container } = render(
        <Typography variant="body-m">Body medium text</Typography>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with body-s variant', async () => {
      const { container } = render(
        <Typography variant="body-s">Body small text</Typography>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Semantic HTML', () => {
    it('should render as a paragraph element', () => {
      const { container } = render(<Typography>Test content</Typography>);
      const paragraph = container.querySelector('p');
      expect(paragraph).toBeInTheDocument();
    });

    it('should have proper semantic structure', () => {
      const { getByText } = render(
        <Typography variant="body-m">Semantic text content</Typography>
      );
      const element = getByText('Semantic text content');
      expect(element.tagName).toBe('P');
    });
  });

  describe('ARIA Attributes Support', () => {
    it('should accept and apply aria-label', async () => {
      const { container, getByLabelText } = render(
        <Typography aria-label="Important notice">Content</Typography>
      );
      
      const element = getByLabelText('Important notice');
      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute('aria-label', 'Important notice');
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should accept and apply aria-labelledby', async () => {
      const { container } = render(
        <div>
          <span id="label">Label Text</span>
          <Typography aria-labelledby="label">Content</Typography>
        </div>
      );
      
      const paragraph = container.querySelector('p[aria-labelledby="label"]');
      expect(paragraph).toBeInTheDocument();
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should accept and apply aria-describedby', async () => {
      const { container } = render(
        <div>
          <span id="description">Description text</span>
          <Typography aria-describedby="description">Content</Typography>
        </div>
      );
      
      const paragraph = container.querySelector('p[aria-describedby="description"]');
      expect(paragraph).toBeInTheDocument();
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should accept and apply role attribute', async () => {
      const { container } = render(
        <Typography role="text">Content with role</Typography>
      );
      
      const paragraph = container.querySelector('p[role="text"]');
      expect(paragraph).toBeInTheDocument();
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should accept and apply id attribute', async () => {
      const { container } = render(
        <Typography id="typography-id">Content with id</Typography>
      );
      
      const paragraph = container.querySelector('#typography-id');
      expect(paragraph).toBeInTheDocument();
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Screen Reader Compatibility', () => {
    it('should be accessible via screen readers with text content', () => {
      const { getByText } = render(
        <Typography>Accessible text content</Typography>
      );
      
      const element = getByText('Accessible text content');
      expect(element).toBeInTheDocument();
      expect(element).toBeVisible();
    });

    it('should render children content correctly', () => {
      const { getByText } = render(
        <Typography>
          <strong>Bold</strong> and <em>italic</em> text
        </Typography>
      );
      
      expect(getByText('Bold')).toBeInTheDocument();
      expect(getByText('italic')).toBeInTheDocument();
    });
  });

  describe('Content Requirements', () => {
    it('should handle empty content without violations', async () => {
      const { container } = render(<Typography>{''}</Typography>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should handle long text content without violations', async () => {
      const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(10);
      const { container } = render(<Typography>{longText}</Typography>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should handle special characters without violations', async () => {
      const { container } = render(
        <Typography>Text with special chars: @#$%^&*()!?</Typography>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Multiple Instances', () => {
    it('should have no violations with multiple Typography components', async () => {
      const { container } = render(
        <div>
          <Typography variant="body-m">First paragraph</Typography>
          <Typography variant="body-s">Second paragraph</Typography>
          <Typography>Third paragraph</Typography>
        </div>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should maintain accessibility with nested inline elements', async () => {
      const { container } = render(
        <Typography>
          Text with <strong>bold</strong> and <em>italic</em> nested elements
        </Typography>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Combined Accessibility Features', () => {
    it('should work correctly with multiple ARIA attributes', async () => {
      const { container } = render(
        <Typography
          id="combined-test"
          aria-label="Combined test"
          aria-describedby="desc"
          role="text"
        >
          Content
        </Typography>
      );
      
      const paragraph = container.querySelector('#combined-test');
      expect(paragraph).toHaveAttribute('aria-label', 'Combined test');
      expect(paragraph).toHaveAttribute('aria-describedby', 'desc');
      expect(paragraph).toHaveAttribute('role', 'text');
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

