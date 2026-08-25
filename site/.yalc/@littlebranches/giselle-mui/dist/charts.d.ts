import * as react from 'react';
import { SxProps, Theme } from '@mui/material/styles';
import { CardProps } from '@mui/material/Card';

type StatCardColor = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

type RadialProgressItem = {
    /** Series segment label displayed in the chart and legend. */
    label: string;
    /** Percentage value (0–100) for this segment. */
    value: number;
    /** MUI palette key used to colour this segment and its legend dot. */
    color: StatCardColor;
};
type RadialProgressCardProps = Omit<CardProps, 'title' | 'children'> & {
    /**
     * Card title shown in the `CardHeader`.
     * Omit to suppress the header entirely.
     */
    title?: string;
    /**
     * Card subheader shown below `title`.
     * Ignored when `title` is not provided.
     */
    subheader?: string;
    /**
     * Number shown in the radial chart centre — typically an aggregate percentage.
     *
     * **Example:** `35` renders as `"35"` with the `totalLabel` below it.
     */
    total: number;
    /**
     * Short label shown below `total` in the chart centre.
     *
     * @default '%'
     */
    totalLabel?: string;
    /**
     * Chart height in pixels.
     *
     * @default 280
     */
    chartHeight?: number;
    /**
     * Array of series items — one radial segment per item.
     * Segments are rendered from outermost (first) to innermost (last).
     */
    series: RadialProgressItem[];
    sx?: SxProps<Theme>;
};

/**
 * `RadialProgressCard`
 *
 * A `Card` containing a multi-series radial-bar chart and a legend row.
 * Independently implemented using standard MUI v7 theme tokens.
 *
 * **Usage:**
 * ```tsx
 * <RadialProgressCard
 *   title="Store Readiness"
 *   total={35}
 *   totalLabel="% Ready"
 *   series={[
 *     { label: 'Quality',    value: 90, color: 'success'  },
 *     { label: 'Components', value: 50, color: 'primary'  },
 *     { label: 'Theme',      value: 40, color: 'warning'  },
 *     { label: 'Docs',       value: 20, color: 'error'    },
 *   ]}
 * />
 * ```
 *
 * **Quality status (13 May 2026):** DoD 20/20 · Best practices 13/13
 */
declare function RadialProgressCard({ title, subheader, total, totalLabel, chartHeight, series, sx, ...other }: RadialProgressCardProps): react.JSX.Element;

export { RadialProgressCard, type RadialProgressCardProps, type RadialProgressItem };
