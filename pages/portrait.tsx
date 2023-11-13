import React, { useRef, useEffect } from "react";
import { getRandomPathStr } from "organic-shape";

interface PortraitProps {
    width: number;
    height: number;
    style?: React.CSSProperties;
}

export default function Portrait(portraitProps: PortraitProps) {
    const { width, height, style = {} } = portraitProps;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const blur = 5;
    const blurRatio = 3;
    const blurExtra = blur * blurRatio;

    useEffect(() => {
        const image = new Image();
        image.src = "/portrait.jpeg";
        const canvas = canvasRef.current!;
        const context = canvas.getContext("2d")!;
        context.fillStyle = "#000000";
        // context.fillRect(0, 0, context.canvas.width, context.canvas.height);

        const pathStr = getRandomPathStr(width - 2 * blurExtra, height - 2 * blurExtra, 10);
        const path2D = new Path2D(pathStr);

        image.onload = () => {
            context.filter = `blur(${blur}px)`;
            context.translate(blurExtra, blurExtra);
            context.fill(path2D);
            context.globalCompositeOperation = "source-in";
            context.filter = "none";
            context.translate(-blurExtra, -blurExtra);
            context.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height);
        };
    }, []);

    return <canvas style={{ ...style }} ref={canvasRef} width={width} height={height} />;
}
