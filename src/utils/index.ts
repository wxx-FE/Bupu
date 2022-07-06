import {getCurrentInstance} from "vue";

type WaterMarkOptions = {
    content?: string
    number?: number
    size?: number
    backgroundColor?: string
    color?: string
    fontSize?: number
}

type WaterMarkDefaultOptions = {
    content: string
    number: number
    size: number
    backgroundColor: string
    color: string
    fontSize: number
}
export type {WaterMarkDefaultOptions, WaterMarkOptions}

export function getWatermarkSVGBg(options: WaterMarkOptions) {
    let defaultOptions: WaterMarkDefaultOptions = {
        content: "水印",
        number: 5,
        size: 0,
        backgroundColor: "transparent",
        color: "#e5e5e5",
        fontSize: 16
    }
    let {content, number, size, backgroundColor, color, fontSize} = Object.assign(defaultOptions, options)
    let clientWidth: number = window.innerWidth
    let svgSize: number = clientWidth / number + size;
    let svg = document.createElement('svg');
    let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    let text = document.createElementNS('http://www.w3.org/2000/svg', 'text');

    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('width', svgSize + 'px');
    svg.setAttribute('height', svgSize + 'px');
    rect.setAttribute('width', svgSize + "px");
    rect.setAttribute('height', svgSize + "px");
    rect.setAttribute('fill', backgroundColor);
    svg.appendChild(rect);

    text.innerHTML = content;
    text.setAttribute('x', '100');
    text.setAttribute('y', '100');
    text.setAttribute('font-size', fontSize + "px");
    text.setAttribute('fill', color);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('transform', 'rotate(-45, 80, 120)');

    svg.appendChild(text);

    return svg;
}

export function getSvgUrl(svg: any): string {
    let url: string = 'data:image/svg+xml';
    if (typeof btoa === 'function') {
        url += ';base64,' + btoa(unescape(encodeURIComponent(svg)));
    } else {
        url += ',' + encodeURIComponent(svg);
    }
    return url;
}

//导出当前组件的一些静态方法
export function useExpose(apis: Record<string, any>) {
    const instance: any = getCurrentInstance()
    if (instance) {
        Object.assign(instance.proxy, apis)
    }
}
