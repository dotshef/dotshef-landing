import React from "react";

type Props = {
    size?: number | string;
    color?: string;
    durationSec?: number;
    radius?: number;
};

export default function BlockStack3x3({
                                          size = 96,
                                          color = "var(--color-brand-black)",
                                          durationSec = 1.8,
                                          radius = 4,
                                      }: Props) {
    const cssSize = typeof size === "number" ? `${size}px` : size;

    // 3x3 index를 "쌓이는" 순서로 정렬 (아래->위, 왼->오)
    // row: 2 -> 0, col: 0 -> 2
    const order: Array<{ r: number; c: number; idx: number }> = [];
    let idx = 0;
    for (let r = 2; r >= 0; r--) {
        for (let c = 0; c < 3; c++) {
            order.push({ r, c, idx: idx++ });
        }
    }

    const style: Record<string, string> = {
        width: cssSize,
        height: cssSize,
        "--bs-size": cssSize,
        "--bs-color": color,
        "--bs-duration": `${durationSec}s`,
        "--bs-radius": `${radius}px`,
    };

    return (
        <div
            className="block-stack-3x3"
            style={style as React.CSSProperties}
            aria-hidden="true"
        >
            <svg viewBox="0 0 100 100" width="100%" height="100%" role="img" aria-hidden="true">
                {/* 살짝 3D 느낌을 위한 그림자 레이어 */}
                <g opacity="0.18" transform="translate(2,2)">
                    {order.map(({ r, c, idx }) => (
                        <rect
                            key={`s-${idx}`}
                            className={`bs-tile bs-tile-${idx}`}
                            x={10 + c * 26}
                            y={10 + r * 26}
                            width="22"
                            height="22"
                            rx={radius}
                            fill="var(--bs-color)"
                        />
                    ))}
                </g>

                {/* 메인 블록 */}
                <g>
                    {order.map(({ r, c, idx }) => (
                        <rect
                            key={`m-${idx}`}
                            className={`bs-tile bs-tile-${idx}`}
                            x={10 + c * 26}
                            y={10 + r * 26}
                            width="22"
                            height="22"
                            rx={radius}
                            fill="var(--bs-color)"
                        />
                    ))}
                </g>
            </svg>
        </div>
    );
}
