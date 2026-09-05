'use client';
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/charts-index.ts
var charts_index_exports = {};
__export(charts_index_exports, {
  RadialProgressCard: () => RadialProgressCard
});
module.exports = __toCommonJS(charts_index_exports);

// src/components/chart/radial-progress/radial-progress-card.tsx
var import_react = require("react");
var import_Card = __toESM(require("@mui/material/Card"), 1);
var import_CardContent = __toESM(require("@mui/material/CardContent"), 1);
var import_CardHeader = __toESM(require("@mui/material/CardHeader"), 1);
var import_Divider = __toESM(require("@mui/material/Divider"), 1);
var import_Box = __toESM(require("@mui/material/Box"), 1);
var import_Typography = __toESM(require("@mui/material/Typography"), 1);
var import_styles = require("@mui/material/styles");

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
var import_jsx_runtime = require("react/jsx-runtime");
var ReactApexChart = (0, import_react.lazy)(() => import("react-apexcharts"));
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
  const theme = (0, import_styles.useTheme)();
  const resolvedColors = (0, import_react.useMemo)(
    () => series.map((item) => theme.palette[item.color].main),
    [series, theme]
  );
  const chartSeries = (0, import_react.useMemo)(() => series.map((s) => s.value), [series]);
  const chartLabels = (0, import_react.useMemo)(() => series.map((s) => s.label), [series]);
  const chartOptions = (0, import_react.useMemo)(
    () => buildRadialProgressOptions(theme, chartLabels, resolvedColors, total, totalLabel),
    [theme, chartLabels, resolvedColors, total, totalLabel]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_Card.default, { sx: [...Array.isArray(sx) ? sx : [sx]], ...other, children: [
    (title !== void 0 || subheader !== void 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_CardHeader.default, { title, subheader }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_CardContent.default, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Box.default, { sx: chartWrapSx, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, { fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Box.default, { sx: chartFallbackSx(chartHeight) }), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        ReactApexChart,
        {
          type: "radialBar",
          series: chartSeries,
          options: chartOptions,
          width: "100%",
          height: chartHeight
        }
      ) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Divider.default, { sx: legendDividerSx }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Box.default, { sx: legendRowSx, children: series.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_Box.default, { sx: legendItemSx, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Box.default, { sx: legendDotSx(resolvedColors[i] ?? theme.palette.primary.main) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Typography.default, { variant: "subtitle2", children: item.label }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_Typography.default, { variant: "caption", sx: legendValueSx, children: [
          item.value,
          "%"
        ] })
      ] }, item.label)) })
    ] })
  ] });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RadialProgressCard
});
//# sourceMappingURL=charts.cjs.map