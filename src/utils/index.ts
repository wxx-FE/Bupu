export function getWatermarkSVGBg(name: string, svgNumber: number, svgSize: number, bgColor?: string) {
    let clientWidth: number = window.innerWidth
    var size: number = clientWidth / svgNumber + svgSize;
    var svg = document.createElement('svg');
    var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    var text = document.createElementNS('http://www.w3.org/2000/svg', 'text');

    var color = bgColor || 'transparent';
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('width', size + 'px');
    svg.setAttribute('height', size + 'px');

    rect.setAttribute('width', size + "px");
    rect.setAttribute('height', size + "px");
    rect.setAttribute('fill', color);
    svg.appendChild(rect);

    text.innerHTML = name;
    text.setAttribute('x', '100');
    text.setAttribute('y', '100');
    text.setAttribute('font-size', '16px');
    text.setAttribute('fill', '#e5e5e5');
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
