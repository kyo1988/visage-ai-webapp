"use client";
import { useState } from "react";

export default function RadarSVG({ labels, values, locale = 'en' }: { labels: string[]; values: number[]; locale?: string }) {
  const [tooltip, setTooltip] = useState<{ show: boolean; x: number; y: number; label: string; value: number; description: string } | null>(null);
  
  const cx = 160, cy = 140, r = 100;
  const N = labels.length || 0;
  
  // 各指標の説明を定義
  const getIndicatorDescription = (label: string, value: number) => {
    const descriptions: { [key: string]: { ja: string; en: string; good: boolean } } = {
      "Texture": { 
        ja: "肌の質感・滑らかさ。数値が高いほど滑らかで健康的", 
        en: "Skin texture and smoothness. Higher values indicate smoother, healthier skin",
        good: true 
      },
      "Hydration": { 
        ja: "肌の水分量。数値が高いほど潤いがある", 
        en: "Skin hydration level. Higher values indicate more moisture",
        good: true 
      },
      "Pores": { 
        ja: "毛穴の状態。数値が高いほど毛穴が目立たない", 
        en: "Pore condition. Higher values indicate less visible pores",
        good: true 
      },
      "Wrinkles": { 
        ja: "しわの状態。数値が高いほどしわが少ない", 
        en: "Wrinkle condition. Higher values indicate fewer wrinkles",
        good: true 
      },
      "Pigmentation": { 
        ja: "色素沈着・シミの状態。数値が高いほど色素沈着が少ない", 
        en: "Pigmentation and dark spots. Higher values indicate less pigmentation",
        good: true 
      },
      "Sensitivity": { 
        ja: "肌の敏感度。数値が高いほど敏感でない", 
        en: "Skin sensitivity. Higher values indicate less sensitivity",
        good: false 
      }
    };
    
    const desc = descriptions[label] || { ja: "指標の詳細", en: "Indicator details", good: true };
    return {
      description: locale === 'ja' ? desc.ja : desc.en,
      good: desc.good
    };
  };

  const toXY = (i: number, val: number) => {
    const a = (-Math.PI / 2) + (2 * Math.PI * i) / N;
    const rr = r * Math.max(0, Math.min(1, val));
    return [cx + rr * Math.cos(a), cy + rr * Math.sin(a)];
  };
  
  const poly = values.map((v, i) => toXY(i, v)).map(([x, y]) => `${x},${y}`).join(" ");
  
  const handleMouseEnter = (e: React.MouseEvent, label: string, value: number, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const [x, y] = toXY(index, 1);
    const desc = getIndicatorDescription(label, value);
    
    setTooltip({
      show: true,
      x: rect.left + x * (rect.width / 320),
      y: rect.top + y * (rect.height / 320),
      label,
      value,
      description: desc.description
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  // ツールチップの位置を最適化（セクション内に収める）
  const getTooltipPosition = (x: number, y: number) => {
    const tooltipWidth = 180;
    const tooltipHeight = 80;
    
    let left = x + 20;
    let top = y - 40;
    
    // 右端で切れる場合は左側に表示
    if (left + tooltipWidth > x + 200) {
      left = x - tooltipWidth - 20;
    }
    
    // 上端で切れる場合は下側に表示
    if (top < y - 100) {
      top = y + 20;
    }
    
    return { left, top };
  };

  return (
    <div className="relative">
      <svg viewBox="0 0 320 320" role="img" aria-label="Skin profile radar" aria-describedby="radar-description">
        {[...Array(N).keys()].map(i => {
          const [x, y] = toXY(i, 1);
          return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#e5e7eb" />;
        })}
        {[0.25, 0.5, 0.75, 1].map((g) => (
          <circle key={g} cx={cx} cy={cy} r={r * g} fill="none" stroke="#eef2f7" />
        ))}
        <polygon points={poly} fill="rgba(14,165,233,0.18)" stroke="var(--va-accent)" />
        
        {/* 各指標の軸にホバー領域を追加 */}
        {labels.map((label: string, i: number) => {
          const a = (-Math.PI / 2) + (2 * Math.PI * i) / N;
          const x = cx + (r * 1.15 * Math.cos(a));
          const y = cy + (r * 1.15 * Math.sin(a));
          const [axisX, axisY] = toXY(i, 1);
          
          return (
            <g key={label}>
              {/* ホバー領域（透明な四角形） */}
              <rect
                x={axisX - 20}
                y={axisY - 20}
                width="40"
                height="40"
                fill="transparent"
                onMouseEnter={(e) => handleMouseEnter(e, label, values[i], i)}
                onMouseLeave={handleMouseLeave}
                style={{ cursor: 'pointer' }}
              />
              {/* 項目名 */}
              <text x={x} y={y} fontSize="11" textAnchor="middle" fill="#6b7280" fontWeight="500">
                {label}
              </text>
            </g>
          );
        })}
        
        {/* 数値を表示 */}
        {values.map((val: number, i: number) => {
          const a = (-Math.PI / 2) + (2 * Math.PI * i) / N;
          const rr = r * Math.max(0, Math.min(1, val));
          const x = cx + rr * Math.cos(a);
          const y = cy + rr * Math.sin(a);
          const displayValue = Math.round(val * 100);
          return (
            <text key={`value-${i}`} x={x} y={y - 6} fontSize="11" textAnchor="middle" fill="#0ea5e9" fontWeight="600">
              {displayValue}
            </text>
          );
        })}
      </svg>
      
      {/* ツールチップ */}
      {tooltip && (
        <div
          className="absolute z-50 w-44 rounded-lg bg-slate-900 p-3 text-sm text-white shadow-lg"
          style={{
            ...getTooltipPosition(tooltip.x, tooltip.y)
          }}
        >
          <div className="font-semibold">{tooltip.label}</div>
          <div className="mt-1 text-slate-300 text-xs leading-relaxed">{tooltip.description}</div>
          <div className="mt-2 text-xs">
            <span className="text-sky-400">
              {locale === 'ja' ? '数値' : 'Value'}: {Math.round(tooltip.value * 100)}
            </span>
            <span className="ml-1 text-slate-400">/ 100</span>
          </div>
        </div>
      )}
    </div>
  );
}
