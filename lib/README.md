# Color System Reference

## 9-Step Red Gradient Scale

The color system represents the spectrum of extinction risk from Least Concern to Extinct.

### Color Values

| Status                | Code | Hex Color | Description           |
| --------------------- | ---- | --------- | --------------------- |
| Least Concern         | LC   | `#4A1F1F` | Dark Muted Red        |
| Near Threatened       | NT   | `#5A2A2A` | Slightly Brighter Red |
| Vulnerable            | VU   | `#6B3535` | Medium Red            |
| Endangered            | EN   | `#7D4040` | Brighter Red          |
| Critically Endangered | CR   | `#8F4B4B` | Bright Red            |
| Extinct in the Wild   | EW   | `#A15656` | Very Bright Red       |
| Extinct               | EX   | `#FF1744` | Neon Red              |

### Usage

```typescript
import { EXTINCTION_COLORS, getStatusColor, STATUS_LABELS } from "@/lib/colors";

// Direct access
const color = EXTINCTION_COLORS.CR; // '#8F4B4B'

// Get color by status string
const color2 = getStatusColor("EN"); // '#7D4040'

// Get label
const label = STATUS_LABELS["CR"]; // 'Critically Endangered'
```

### Tailwind Classes

The colors are also available as Tailwind classes:

- `bg-extinction-lc` through `bg-extinction-ex3`
- `text-status-LC` through `text-status-EX`
