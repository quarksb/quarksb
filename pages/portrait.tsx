import React, { useRef, useEffect, use } from "react";
import { getCurvesByPolygon, getEaseElasticOut, getPathStr, getPolygon, getRandomPathStr, interpolatePolygon, resizeCurvesByBBox } from "organic-shape";

interface PortraitProps {
    width: number;
    height: number;
    style?: React.CSSProperties;
}

export default function Portrait(portraitProps: PortraitProps) {
    const { width, height, style = {} } = portraitProps;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const blur = 10;
    const blurRatio = 3;
    const blurExtra = blur * blurRatio;

    useEffect(() => {
        const offscreenCanvas = new OffscreenCanvas(width, height);
        const offscreenContext = offscreenCanvas.getContext("2d")!;

        const image = new Image(width, height);
        image.src = "/portrait.jpeg";
        const canvas = canvasRef.current!;
        const context = canvas.getContext("2d")!;
        offscreenContext.fillStyle = "#000000";
        // context.fillRect(0, 0, context.canvas.width, context.canvas.height);

        image.onload = () => {
            const createPolygon = () => getPolygon(width, height, 8, 0.4, Math.random());
            const currentState = {
                polygon: createPolygon(),
                targetPolygon: createPolygon(),
                repeat: 0,
                duration: 3000,
            };
            let initTime = performance.now();
            const baseRender = (time: number) => {
                if (time > currentState.repeat * currentState.duration) {
                    currentState.polygon = currentState.targetPolygon;
                    currentState.targetPolygon = createPolygon();
                    currentState.repeat++;
                }

                const baseT = (time - initTime - currentState.repeat * currentState.duration) / currentState.duration;
                const t = getEaseElasticOut(baseT);
                const tempPolygon = interpolatePolygon(currentState.polygon, currentState.targetPolygon, t);
                const curves = getCurvesByPolygon(tempPolygon);
                resizeCurvesByBBox(curves, { x: blurExtra, y: blurExtra, width: width - 2 * blurExtra, height: height - 2 * blurExtra });

                const pathStr = getPathStr(curves);

                const path2D = new Path2D(pathStr);
                offscreenContext.clearRect(0, 0, width, height);
                offscreenContext.save();
                offscreenContext.filter = `blur(${blur}px)`;
                offscreenContext.fill(path2D);
                offscreenContext.filter = "none";
                offscreenContext.globalCompositeOperation = "source-in";
                offscreenContext.drawImage(image, 0, 0, width, height);
                offscreenContext.restore();

                context.clearRect(0, 0, width, height);
                context.drawImage(offscreenCanvas, 0, 0, width, height);
                requestAnimationFrame(baseRender);
            };

            requestAnimationFrame(baseRender);
        };

        // window.requestAnimationFrame(() => {});
    }, []);

    return <canvas style={{ ...style }} ref={canvasRef} width={width} height={height} />;
}
