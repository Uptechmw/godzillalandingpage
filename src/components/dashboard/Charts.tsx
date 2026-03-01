"use client";

import React from 'react';
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    PieChart,
    Pie
} from 'recharts';

// --- Theme Constants ---
const COLORS = {
    accent: '#2563EB',
    accentLight: '#60A5FA',
    muted: '#94A3B8',
    border: '#1F2937',
    surface: '#111827',
    success: '#16A34A',
    danger: '#DC2626',
    text: '#F1F5F9'
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-3 rounded-lg shadow-xl border" style={{ background: COLORS.surface, borderColor: COLORS.border }}>
                <p className="text-xs font-semibold mb-1" style={{ color: COLORS.text }}>{label}</p>
                {payload.map((entry: any, index: number) => (
                    <p key={index} className="text-sm" style={{ color: entry.color }}>
                        {entry.name}: <span className="font-bold">${entry.value.toLocaleString()}</span>
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

// --- 1. Main Overview Chart (Area/Line) ---
export const SalesOverviewChart = ({ data }: { data: any[] }) => (
    <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
                <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={COLORS.accent} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={COLORS.accent} stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} vertical={false} />
                <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: COLORS.muted, fontSize: 12 }}
                    dy={10}
                />
                <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: COLORS.muted, fontSize: 12 }}
                    tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                    type="monotone"
                    dataKey="sales"
                    stroke={COLORS.accent}
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorSales)"
                />
                <Area
                    type="monotone"
                    dataKey="prevSales"
                    stroke={COLORS.muted}
                    strokeDasharray="5 5"
                    strokeWidth={2}
                    fill="transparent"
                />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

// --- 2. Purchases Sparkline ---
export const PurchasesSparkline = ({ data }: { data: any[] }) => (
    <div className="h-[80px] w-full">
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke={COLORS.accent}
                    strokeWidth={2}
                    dot={false}
                />
            </LineChart>
        </ResponsiveContainer>
    </div>
);

// --- 3. Combo Bar Chart ---
export const WeeklyComparisonChart = ({ data }: { data: any[] }) => (
    <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} vertical={false} />
                <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: COLORS.muted, fontSize: 11 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.value > 8000 ? COLORS.accent : COLORS.accentLight} opacity={0.8} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>
);

// --- 4. Progress Semi-Circle ---
export const SalesProgressChart = ({ value, total }: { value: number, total: number }) => {
    const data = [
        { name: 'Progress', value: value },
        { name: 'Remaining', value: total - value },
    ];

    return (
        <div className="h-[180px] w-full flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="100%"
                        startAngle={180}
                        endAngle={0}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={0}
                        dataKey="value"
                        stroke="none"
                    >
                        <Cell fill={COLORS.accent} />
                        <Cell fill={COLORS.border} />
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-[65%] text-center">
                <p className="text-2xl font-extrabold" style={{ color: COLORS.text }}>
                    ${(value / 1000).toFixed(2)}K
                </p>
                <p className="text-xs" style={{ color: COLORS.muted }}>/ ${(total / 1000).toFixed(0)}K</p>
            </div>
        </div>
    );
};
