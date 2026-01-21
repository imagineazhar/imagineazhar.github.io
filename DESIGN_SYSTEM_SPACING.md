# Spacing Design System

## Overview
This website uses a comprehensive spacing system based on a 4px base unit, providing consistent and scalable spacing across all components.

## Base Unit & Scale
- **Base Unit**: 4px (0.25rem)
- **Scale**: Multiples of 4px creating an exponential scale
- **CSS Variables**: `--space-1` through `--space-11`

## Spacing Scale

| Token | Value | Pixels | Common Use |
|-------|-------|--------|------------|
| `--space-1` | 0.25rem | 4px | Minimal gaps, borders |
| `--space-2` | 0.5rem | 8px | Small component spacing |
| `--space-3` | 0.75rem | 12px | Button padding, small elements |
| `--space-4` | 1rem | 16px | Component padding, form elements |
| `--space-5` | 1.5rem | 24px | Card spacing, medium gaps |
| `--space-6` | 2rem | 32px | Section headers, large gaps |
| `--space-7` | 3rem | 48px | Container spacing, major sections |
| `--space-8` | 4rem | 64px | Hero sections, large containers |
| `--space-9` | 5rem | 80px | Extra large spacing |
| `--space-10` | 6rem | 96px | Page-level spacing |
| `--space-11` | 8rem | 128px | Maximum spacing |

## Utility Classes

### Margin Classes
```css
/* All directions */
.m-1 { margin: 4px; }
.m-4 { margin: 16px; }
.m-7 { margin: 48px; }

/* Directional margins */
.mt-3 { margin-top: 12px; }    /* Top */
.mb-5 { margin-bottom: 24px; } /* Bottom */
.ml-2 { margin-left: 8px; }    /* Left */
.mr-6 { margin-right: 32px; }  /* Right */

/* Bidirectional */
.mx-4 { margin-left/right: 16px; }  /* Horizontal */
.my-3 { margin-top/bottom: 12px; }  /* Vertical */

/* Negative margins */
.-m-2 { margin: -8px; }
```

### Padding Classes
```css
/* All directions */
.p-2 { padding: 8px; }
.p-5 { padding: 24px; }

/* Directional padding */
.pt-4 { padding-top: 16px; }
.pb-3 { padding-bottom: 12px; }
.pl-6 { padding-left: 32px; }
.pr-2 { padding-right: 8px; }

/* Bidirectional */
.px-5 { padding-left/right: 24px; }
.py-4 { padding-top/bottom: 16px; }
```

### Gap Classes (Flexbox/Grid)
```css
.gap-3 { gap: 12px; }
.gap-6 { gap: 32px; }
.gap-8 { gap: 64px; }
```

## Component Patterns

### Section Spacing (Responsive)
```css
.section-spacing-xs { padding: clamp(2rem, 4vh, 3rem) 0; } /* 32px - 48px */
.section-spacing-sm { padding: clamp(3rem, 6vh, 4rem) 0; } /* 48px - 64px */
.section-spacing-md { padding: clamp(4rem, 8vh, 6rem) 0; } /* 64px - 96px */
.section-spacing-lg { padding: clamp(6rem, 12vh, 8rem) 0; } /* 96px - 128px */
.section-spacing-xl { padding: clamp(8rem, 16vh, 12rem) 0; } /* 128px - 192px */
```

### Container Spacing (Responsive)
```css
.container-padding-xs { padding: 0 clamp(1rem, 2vw, 1.5rem); }   /* 16px - 24px */
.container-padding-sm { padding: 0 clamp(1.5rem, 3vw, 2rem); }   /* 24px - 32px */
.container-padding-md { padding: 0 clamp(2rem, 4vw, 3rem); }     /* 32px - 48px */
.container-padding-lg { padding: 0 clamp(3rem, 6vw, 4rem); }     /* 48px - 64px */
.container-padding-xl { padding: 0 clamp(4rem, 8vw, 6rem); }     /* 64px - 96px */
```

### Content Spacing
```css
.content-spacing-xs { margin-bottom: 16px; } /* Small elements */
.content-spacing-sm { margin-bottom: 24px; } /* Medium elements */
.content-spacing-md { margin-bottom: 32px; } /* Large elements */
.content-spacing-lg { margin-bottom: 64px; } /* Sections */
.content-spacing-xl { margin-bottom: 96px; } /* Major breaks */
```

## Implementation Examples

### Cards
```html
<div class="card p-5 mb-6">
  <h3 class="mb-3">Card Title</h3>
  <p class="mb-4">Card content with proper spacing.</p>
  <button class="btn">Action</button>
</div>
```

### Layout Grid
```html
<div class="grid gap-6">
  <div class="item p-4">Item 1</div>
  <div class="item p-4">Item 2</div>
  <div class="item p-4">Item 3</div>
</div>
```

### Form Layout
```html
<form class="form">
  <div class="form-group mb-5">
    <label class="mb-2">Email</label>
    <input class="p-3" type="email">
  </div>
  <button class="btn mt-4">Submit</button>
</form>
```

## Best Practices

### 1. Use the Scale
- Always use spacing tokens instead of arbitrary values
- This ensures visual consistency across the design system

### 2. Responsive Spacing
- Use `clamp()` for responsive spacing that scales with viewport
- Section and container spacing should be responsive

### 3. Spacing Hierarchy
- Larger spacing for major sections (`--space-7` to `--space-11`)
- Medium spacing for components (`--space-4` to `--space-6`)
- Small spacing for details (`--space-1` to `--space-3`)

### 4. Negative Margins Sparingly
- Use negative margins for special cases (overlaps, alignments)
- Avoid for general layout - prefer padding adjustments

### 5. Gap vs Margin
- Use `gap` for flexbox and grid layouts
- Use margins for spacing between block elements
- Avoid mixing gap and margin approaches

## Legacy Support

The old `.spacing-*` classes are still supported for backward compatibility:
- `.spacing-sm` → `margin-bottom: 32px`
- `.spacing-md` → `margin-bottom: 48px`
- `.spacing-lg` → `margin-bottom: 64px`
- `.spacing-xl` → `margin-bottom: 96px`

## Tools & Resources

- **CSS Variables**: All spacing tokens are available as CSS custom properties
- **Utility Classes**: Pre-built classes for rapid development
- **Component Patterns**: Standardized spacing for common UI patterns
- **Responsive**: Built-in responsive behavior where appropriate

This system ensures consistent, scalable, and maintainable spacing throughout the entire website.