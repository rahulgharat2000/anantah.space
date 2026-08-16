# Fashion Design System

The Fashion MFE owns this design system. Other Anantah modules may consume its ideas, but must not import its implementation across micro-frontend boundaries.

## Foundations

- `tokens.css` defines semantic color, typography, spacing, radius, shadow, control-size, and content-width tokens.
- `components.css` contains styles owned by reusable controls only.
- Feature styles remain beside their feature or in `fashion.css` while the storefront is small.
- Interactive controls must retain a visible focus state and a minimum 32px compact or 40px default height.
- Motion must respect the global `prefers-reduced-motion` rule.

## Public controls

Import controls from the design-system barrel:

```tsx
import {
  Button,
  EmptyState,
  IconButton,
  Notice,
  SearchField,
  SegmentedControl,
  Skeleton,
} from "../../design-system";
```

- `Button`: command actions with primary, secondary, and danger variants.
- `IconButton`: familiar icon-only commands with a required accessible label and tooltip.
- `SearchField`: consistently labeled search input.
- `SegmentedControl`: one-of-many compact selection.
- `Notice`: neutral or error feedback with an optional action.
- `EmptyState`: no-results or no-content feedback.
- `Skeleton`: non-interactive loading placeholder.

Product cards, commerce pricing, inventory labels, and route navigation remain feature or application concerns. Add a component here only when it is reusable across at least two Fashion features or establishes a required accessibility contract.