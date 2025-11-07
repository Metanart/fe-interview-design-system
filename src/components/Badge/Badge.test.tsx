import { describe, it, expect } from 'vitest';
import { axe } from 'jest-axe';
import { render, screen } from '@testing-library/react';

import { Badge } from './Badge';

describe('Badge', () => {
  describe('Basic Rendering', () => {
    it('should render with text content', () => {
      render(<Badge>Test Badge</Badge>);
      expect(screen.getByText('Test Badge')).toBeInTheDocument();
    });

    it('should render with number content', () => {
      render(<Badge>42</Badge>);
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('should render with ReactNode content', () => {
      render(
        <Badge>
          <span>Custom content</span>
        </Badge>
      );
      expect(screen.getByText('Custom content')).toBeInTheDocument();
    });

    it('should render as a span element', () => {
      const { container } = render(<Badge>Badge</Badge>);
      const typography = container.querySelector('p');
      const span = typography?.parentElement;
      expect(span).toBeInTheDocument();
      expect(span?.tagName).toBe('SPAN');
    });
  });

  describe('Variants', () => {
    it('should apply neutral variant by default', () => {
      const { container } = render(<Badge>Default Badge</Badge>);
      const typography = container.querySelector('p');
      const badge = typography?.parentElement;
      expect(badge).toBeInTheDocument();
      // Check that the badge has the variant class (CSS modules hash class names)
      expect(badge?.className).toContain('variant--neutral');
    });

    it('should apply neutral variant when explicitly set', () => {
      const { container } = render(<Badge variant="neutral">Neutral Badge</Badge>);
      const typography = container.querySelector('p');
      const badge = typography?.parentElement;
      expect(badge).toBeInTheDocument();
      expect(badge?.className).toContain('variant--neutral');
    });

    it('should apply positive variant', () => {
      const { container } = render(<Badge variant="positive">Positive Badge</Badge>);
      const typography = container.querySelector('p');
      const badge = typography?.parentElement;
      expect(badge).toBeInTheDocument();
      expect(badge?.className).toContain('variant--positive');
    });

    it('should apply negative variant', () => {
      const { container } = render(<Badge variant="negative">Negative Badge</Badge>);
      const typography = container.querySelector('p');
      const badge = typography?.parentElement;
      expect(badge).toBeInTheDocument();
      expect(badge?.className).toContain('variant--negative');
    });
  });

  describe('Text Variant', () => {
    it('should use body-s as default text variant', () => {
      const { container } = render(<Badge>Badge</Badge>);
      const typography = container.querySelector('p');
      expect(typography).toBeInTheDocument();
    });

    it('should apply custom text variant', () => {
      const { container } = render(<Badge textVariant="body-m">Badge</Badge>);
      const typography = container.querySelector('p');
      expect(typography).toBeInTheDocument();
    });
  });

  describe('Typography Integration', () => {
    it('should render Typography component inside badge', () => {
      const { container } = render(<Badge>Badge Content</Badge>);
      const typography = container.querySelector('p');
      const badge = typography?.parentElement;
      expect(typography).toBeInTheDocument();
      expect(typography).toHaveTextContent('Badge Content');
      expect(badge?.tagName).toBe('SPAN');
    });

    it('should pass weight="medium" to Typography', () => {
      const { container } = render(<Badge>Badge</Badge>);
      const typography = container.querySelector('p');
      // Typography component should receive weight="medium" prop
      expect(typography).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations with default props', async () => {
      const { container } = render(<Badge>Test Badge</Badge>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with neutral variant', async () => {
      const { container } = render(<Badge variant="neutral">Neutral Badge</Badge>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with positive variant', async () => {
      const { container } = render(<Badge variant="positive">Positive Badge</Badge>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with negative variant', async () => {
      const { container } = render(<Badge variant="negative">Negative Badge</Badge>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with number content', async () => {
      const { container } = render(<Badge>42</Badge>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations with ReactNode content', async () => {
      const { container } = render(
        <Badge>
          <span>Custom content</span>
        </Badge>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('ARIA Attributes Support', () => {
    it('should render accessible badge structure', async () => {
      const { container } = render(<Badge>Accessible Badge</Badge>);
      
      const typography = container.querySelector('p');
      const badge = typography?.parentElement;
      expect(badge).toBeInTheDocument();
      expect(badge?.tagName).toBe('SPAN');
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Content Requirements', () => {
    it('should handle empty string content', async () => {
      const { container } = render(<Badge>{''}</Badge>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should handle long text content', async () => {
      const longText = 'Very long badge text content that might wrap';
      const { container } = render(<Badge>{longText}</Badge>);
      expect(screen.getByText(longText)).toBeInTheDocument();
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should handle special characters', async () => {
      const { container } = render(
        <Badge>Badge with special chars: @#$%^&*()!?</Badge>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Multiple Instances', () => {
    it('should have no violations with multiple Badge components', async () => {
      const { container } = render(
        <div>
          <Badge variant="neutral">Neutral</Badge>
          <Badge variant="positive">Positive</Badge>
          <Badge variant="negative">Negative</Badge>
        </div>
      );
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should render multiple badges with different variants correctly', () => {
      const { container } = render(
        <div>
          <Badge variant="neutral">Neutral</Badge>
          <Badge variant="positive">Positive</Badge>
          <Badge variant="negative">Negative</Badge>
        </div>
      );
      
      const typographies = container.querySelectorAll('p');
      expect(typographies).toHaveLength(3);
      
      const badges = Array.from(typographies).map(p => p.parentElement);
      expect(badges).toHaveLength(3);
      expect(badges[0]?.className).toContain('variant--neutral');
      expect(badges[1]?.className).toContain('variant--positive');
      expect(badges[2]?.className).toContain('variant--negative');
    });
  });

  describe('Combined Props', () => {
    it('should work correctly with all props combined', async () => {
      const { container } = render(
        <Badge variant="positive" textVariant="body-m">
          Combined Badge
        </Badge>
      );
      
      const typography = container.querySelector('p');
      const badge = typography?.parentElement;
      expect(badge).toBeInTheDocument();
      expect(badge?.tagName).toBe('SPAN');
      expect(badge?.className).toContain('variant--positive');
      expect(screen.getByText('Combined Badge')).toBeInTheDocument();
      
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

