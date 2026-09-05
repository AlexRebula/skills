'use client';

// src/components/chart/radial-progress/radial-progress-card.tsx
import { lazy, Suspense, useMemo } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

// src/components/chart/radial-progress/radial-progress-card.styles.ts
function buildRadialProgressOptions(theme, labels, colors, total, totalLabel) {
  const textSecondary = theme.vars?.palette.text.secondary ?? theme.palette.text.secondary;
  const textPrimary = theme.vars?.palette.text.primary ?? theme.palette.text.primary;
  const trackBg = theme.vars?.palette.grey[200] ?? theme.palette.grey[200];
  return {
    chart: {
      type: "radialBar",
      sparkline: { enabled: true }
    },
    colors,
    labels,
    stroke: { lineCap: "round" },
    fill: { type: "solid" },
    grid: { padding: { top: -20, bottom: -20 } },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 10,
          size: "40%"
        },
        track: {
          margin: 10,
          background: trackBg,
          strokeWidth: "100%"
        },
        dataLabels: {
          total: {
            show: true,
            label: totalLabel,
            color: textSecondary,
            fontSize: "13px",
            fontWeight: 400,
            formatter: () => `${total}`
          },
          value: {
            offsetY: 2,
            color: textPrimary,
            fontSize: "15px",
            fontWeight: 700,
            formatter: (val) => `${Math.round(val)}%`
          },
          name: {
            offsetY: -10,
            fontSize: "11px",
            color: textSecondary
          }
        }
      }
    }
  };
}
var chartWrapSx = {
  mx: "auto",
  overflow: "hidden"
};
var legendDividerSx = {
  my: 2
};
var legendRowSx = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  gap: 2,
  mt: 1
};
var legendItemSx = {
  display: "flex",
  alignItems: "center",
  gap: 0.75
};
var legendValueSx = {
  color: "text.secondary",
  ml: 0.5
};
var LEGEND_DOT_SIZE = 12;
var legendDotSx = (color) => ({
  width: LEGEND_DOT_SIZE,
  height: LEGEND_DOT_SIZE,
  borderRadius: "50%",
  bgcolor: color,
  flexShrink: 0
});
var chartFallbackSx = (chartHeight) => ({
  height: chartHeight
});

// src/components/chart/radial-progress/radial-progress-card.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var ReactApexChart = lazy(() => import("react-apexcharts"));
function RadialProgressCard({
  title,
  subheader,
  total,
  totalLabel = "%",
  chartHeight = 280,
  series,
  sx,
  ...other
}) {
  const theme = useTheme();
  const resolvedColors = useMemo(
    () => series.map((item) => theme.palette[item.color].main),
    [series, theme]
  );
  const chartSeries = useMemo(() => series.map((s) => s.value), [series]);
  const chartLabels = useMemo(() => series.map((s) => s.label), [series]);
  const chartOptions = useMemo(
    () => buildRadialProgressOptions(theme, chartLabels, resolvedColors, total, totalLabel),
    [theme, chartLabels, resolvedColors, total, totalLabel]
  );
  return /* @__PURE__ */ jsxs(Card, { sx: [...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    (title !== void 0 || subheader !== void 0) && /* @__PURE__ */ jsx(CardHeader, { title, subheader }),
    /* @__PURE__ */ jsxs(CardContent, { children: [
      /* @__PURE__ */ jsx(Box, { sx: chartWrapSx, children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Box, { sx: chartFallbackSx(chartHeight) }), children: /* @__PURE__ */ jsx(
        ReactApexChart,
        {
          type: "radialBar",
          series: chartSeries,
          options: chartOptions,
          width: "100%",
          height: chartHeight
        }
      ) }) }),
      /* @__PURE__ */ jsx(Divider, { sx: legendDividerSx }),
      /* @__PURE__ */ jsx(Box, { sx: legendRowSx, children: series.map((item, i) => /* @__PURE__ */ jsxs(Box, { sx: legendItemSx, children: [
        /* @__PURE__ */ jsx(Box, { sx: legendDotSx(resolvedColors[i] ?? theme.palette.primary.main) }),
        /* @__PURE__ */ jsx(Typography, { variant: "subtitle2", children: item.label }),
        /* @__PURE__ */ jsxs(Typography, { variant: "caption", sx: legendValueSx, children: [
          item.value,
          "%"
        ] })
      ] }, item.label)) })
    ] })
  ] });
}
export {
  RadialProgressCard
};
//# sourceMappingURL=charts.js.map