import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { Cloud, fetchSimpleIcons, renderSimpleIcon, type SimpleIcon } from 'react-icon-cloud';
import { usePortfolio } from '../../context/PortfolioContext';

interface CustomIcon {
  name: string;
  image: string;
}

interface IconCloudProps {
  slugs: string[];
  customIcons?: CustomIcon[];
  iconSize?: number;
  sphereSize?: number;
}

/**
 * Runtime shape of each tag tracked internally by the vendored TagCanvas
 * engine (react-icon-cloud). Not part of react-icon-cloud's public API —
 * its built-in `tooltip: 'div'` option never toggles the tooltip visible,
 * so we read this state ourselves to drive our own themed tooltip instead.
 */
interface TagCanvasTag {
  title?: string;
  x: number;
  y: number;
  w: number;
  h: number;
  sc?: number;
  alpha?: number;
}

interface TagCanvasInstance {
  taglist: TagCanvasTag[];
}

declare global {
  interface Window {
    TagCanvas?: { tc?: Record<string, TagCanvasInstance> };
  }
}

const CloudContainer = styled.div<{ $size: number }>`
  position: relative;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Tooltip = styled.div<{ $x: number; $y: number }>`
  position: fixed;
  left: ${({ $x }) => $x}px;
  top: ${({ $y }) => $y}px;
  transform: translate(-50%, -130%);
  background: ${({ theme }) => theme.card_light || theme.card};
  color: ${({ theme }) => theme.text_primary};
  border: 1px solid #1d4e89;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 500;
  box-shadow: rgba(29, 78, 137, 0.25) 0px 4px 16px;
  pointer-events: none;
  white-space: nowrap;
  z-index: 20;
`;

const renderCustomIcon = (icon: CustomIcon, size: number) => (
  <a key={icon.name} title={icon.name} onClick={(e) => e.preventDefault()} style={{ cursor: 'pointer' }}>
    <img src={icon.image} width={size} height={size} alt={icon.name} style={{ objectFit: 'contain' }} />
  </a>
);

const IconCloud = ({ slugs, customIcons = [], iconSize = 40, sphereSize = 260 }: IconCloudProps) => {
  const { darkMode } = usePortfolio();
  const [data, setData] = useState<{ simpleIcons: Record<string, SimpleIcon> } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<{ title: string; x: number; y: number } | null>(null);

  useEffect(() => {
    let active = true;
    setData(null);
    if (slugs.length > 0) {
      fetchSimpleIcons({ slugs }).then((res) => {
        if (active) setData(res);
      });
    }
    return () => {
      active = false;
    };
  }, [slugs]);

  const bgHex = darkMode ? '#14213D' : '#FFFFFF';
  const fallbackHex = darkMode ? '#F2F3F4' : '#14213D';

  const icons = useMemo(() => {
    const simpleIconTags = data
      ? Object.values(data.simpleIcons).map((icon) =>
          renderSimpleIcon({
            icon,
            bgHex,
            fallbackHex,
            minContrastRatio: darkMode ? 2 : 1.2,
            size: iconSize,
            aProps: {
              title: icon.title,
              onClick: (e) => e.preventDefault(),
            },
          })
        )
      : [];
    const customTags = customIcons.map((icon) => renderCustomIcon(icon, iconSize));
    return [...simpleIconTags, ...customTags];
  }, [data, bgHex, fallbackHex, darkMode, iconSize, customIcons]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const canvas = containerRef.current?.querySelector('canvas');
    const taglist = canvas && window.TagCanvas?.tc?.[canvas.id]?.taglist;
    if (!canvas || !taglist) return;

    // tag.x/y/w/h live in the canvas's intrinsic drawing-buffer space
    // (canvas.width/height attributes), not its CSS-rendered size, so the
    // cursor position must be rescaled into that same space before comparing.
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const relX = (e.clientX - rect.left - rect.width / 2) * scaleX;
    const relY = (e.clientY - rect.top - rect.height / 2) * scaleY;

    let bestTag: TagCanvasTag | null = null;
    for (const tag of taglist) {
      const scale = tag.sc ?? 1;
      const halfW = (tag.w * scale) / 2;
      const halfH = (tag.h * scale) / 2;
      if (Math.abs(relX - tag.x) <= halfW && Math.abs(relY - tag.y) <= halfH) {
        if (!bestTag || (tag.alpha ?? 0) > (bestTag.alpha ?? 0)) {
          bestTag = tag;
        }
      }
    }

    if (bestTag?.title) {
      setHovered({ title: bestTag.title, x: e.clientX, y: e.clientY });
    } else {
      setHovered(null);
    }
  };

  return (
    <CloudContainer
      $size={sphereSize}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHovered(null)}
    >
      <Cloud
        containerProps={{ style: { width: sphereSize, height: sphereSize } }}
        canvasProps={{ style: { width: '100%', height: '100%', maxWidth: 'none' } }}
        options={{
          shape: 'sphere',
          reverse: true,
          depth: 1,
          wheelZoom: false,
          imageScale: 2,
          activeCursor: 'default',
          initial: [0.1, -0.1],
          clickToFront: 500,
          outlineColour: '#0000',
          maxSpeed: 0.04,
          minSpeed: 0.02,
        }}
      >
        {icons}
      </Cloud>
      {hovered && <Tooltip $x={hovered.x} $y={hovered.y}>{hovered.title}</Tooltip>}
    </CloudContainer>
  );
};

export default IconCloud;
