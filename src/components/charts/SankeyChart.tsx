import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SankeyNode {
  id: string;
  name: string;
  category: 'source' | 'settlement' | 'participant';
  value?: number;
}

interface SankeyLink {
  source: string;
  target: string;
  value: number;
  color?: string;
}

interface SankeyChartProps {
  title: string;
  nodes: SankeyNode[];
  links: SankeyLink[];
  height?: number;
  className?: string;
}

export function SankeyChart({ title, nodes, links, height = 400, className }: SankeyChartProps) {
  // Calculate positions for a simple 3-column layout
  const sourceNodes = nodes.filter(n => n.category === 'source');
  const settlementNodes = nodes.filter(n => n.category === 'settlement');
  const participantNodes = nodes.filter(n => n.category === 'participant');

  const columnWidth = 200;
  const nodeHeight = 40;
  const nodeSpacing = 60;
  const columnSpacing = 180;

  // Position nodes in columns
  const positionedNodes = [
    ...sourceNodes.map((node, i) => ({
      ...node,
      x: 20,
      y: 50 + i * nodeSpacing,
      width: columnWidth,
      height: nodeHeight
    })),
    ...settlementNodes.map((node, i) => ({
      ...node,
      x: 20 + columnSpacing,
      y: 50 + i * nodeSpacing,
      width: columnWidth,
      height: nodeHeight
    })),
    ...participantNodes.map((node, i) => ({
      ...node,
      x: 20 + columnSpacing * 2,
      y: 50 + i * nodeSpacing,
      width: columnWidth,
      height: nodeHeight
    }))
  ];

  // Calculate total value for link width scaling
  const maxValue = Math.max(...links.map(l => l.value));

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative" style={{ height: `${height}px` }}>
          <svg width="100%" height="100%" className="overflow-visible">
            {/* Define gradients for flows */}
            <defs>
              <linearGradient id="flowGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.8" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="flowGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--secondary))" stopOpacity="0.8" />
                <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="flowGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.3" />
              </linearGradient>
            </defs>

            {/* Render links/flows */}
            {links.map((link, i) => {
              const sourceNode = positionedNodes.find(n => n.id === link.source);
              const targetNode = positionedNodes.find(n => n.id === link.target);
              
              if (!sourceNode || !targetNode) return null;

              const strokeWidth = Math.max(2, (link.value / maxValue) * 20);
              const gradientId = `flowGradient${(i % 3) + 1}`;
              
              // Simple curved path
              const startX = sourceNode.x + sourceNode.width;
              const startY = sourceNode.y + sourceNode.height / 2;
              const endX = targetNode.x;
              const endY = targetNode.y + targetNode.height / 2;
              
              const midX = startX + (endX - startX) / 2;
              
              return (
                <path
                  key={`${link.source}-${link.target}`}
                  d={`M ${startX} ${startY} Q ${midX} ${startY} ${midX} ${(startY + endY) / 2} Q ${midX} ${endY} ${endX} ${endY}`}
                  stroke={`url(#${gradientId})`}
                  strokeWidth={strokeWidth}
                  fill="none"
                  opacity="0.7"
                />
              );
            })}

            {/* Render nodes */}
            {positionedNodes.map((node) => {
              const colors = {
                source: 'hsl(var(--primary))',
                settlement: 'hsl(var(--secondary))', 
                participant: '#10B981'
              };

              return (
                <g key={node.id}>
                  <rect
                    x={node.x}
                    y={node.y}
                    width={node.width}
                    height={node.height}
                    fill={colors[node.category]}
                    rx="8"
                    opacity="0.9"
                  />
                  <text
                    x={node.x + node.width / 2}
                    y={node.y + node.height / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="white"
                    fontSize="12"
                    fontWeight="500"
                  >
                    {node.name}
                  </text>
                  {node.value && (
                    <text
                      x={node.x + node.width / 2}
                      y={node.y + node.height / 2 + 15}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="white"
                      fontSize="10"
                      opacity="0.8"
                    >
                      {(node.value / 1000000).toFixed(1)}M BHD
                    </text>
                  )}
                </g>
              );
            })}

            {/* Category labels */}
            <text x="120" y="30" textAnchor="middle" className="text-sm font-medium fill-muted-foreground">
              Sources of Liquidity
            </text>
            <text x="300" y="30" textAnchor="middle" className="text-sm font-medium fill-muted-foreground">
              Settlement
            </text>
            <text x="480" y="30" textAnchor="middle" className="text-sm font-medium fill-muted-foreground">
              Participants
            </text>
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}